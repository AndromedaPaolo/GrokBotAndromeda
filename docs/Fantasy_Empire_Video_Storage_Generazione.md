# Fantasy Empire — Generazione e storage dei video/gif

**Tipo documento:** proposta. Nessun job IA, nessun bucket creato.
**Versione:** 1.5 — 1 settembre 2026
**Riferimenti:** `Fantasy_Empire_Video_IA_Azioni.md` · `Fantasy_Empire_Dashboard_Approvazioni.md` · `Fantasy_Empire_Proposta_Commerciale.md` v2.9

Questa è la soluzione consigliata. Le alternative stanno in fondo e in `Fantasy_Empire_Decisioni_Aperte.md` §13, §17, §18, §22.

---

## 1. Cosa si tiene come file "vero"

**Master: MP4 H.264, 16:9, 3–5 secondi, 720p, audio spento.**

Non GIF. Una GIF di 5 secondi a 16:9 pesa parecchie volte un MP4, decodifica peggio sul telefono, e l'overlay in `/play` è già un `<video>`. Il browser fa autoplay muto sull'MP4 senza chiedere il GIF.

Derivati, solo se servono, **dall'MP4 già in cache**, non una seconda generazione:

| File | A cosa serve | Come nasce |
|---|---|---|
| `{key}/poster.jpg` | LCP, `prefers-reduced-motion`, fallback, **input** per il video | Still se manca (API image o upload tuo). Altrimenti primo frame del master |
| `{key}/master.mp4` | overlay `/play` | **Fase 0:** tu, dallo still, upload sulla card. **Fase B (Visioni):** Worker + `XAI_API_KEY`, I2V, `R2.put` da solo |
| `{key}/loop.webp` (opzionale) | vetrina landing, thumb | transcode dal master (Cloudflare media transform). GIF solo se un social lo pretendo, stesso transcode |

Una chiave `video_key`, tre oggetti al massimo. Non tre pipeline. Il caricamento sulla card **è** lo slot giusto: path R2 = quella chiave, superficie di gioco = quella scritta in dashboard. Non si sceglie a mano una cartella.

---

## 2. Dove si salva

**Cloudflare R2, bucket privato.** Non GitHub, non `/public` su Vercel, non Stream in Fase 0, non un link temporaneo di un generatore (xAI, Kling, altro).

Motivi, in ordine:

1. Lo stack è già Cloudflare (Worker + D1). Il Worker scrive con `R2.put`, senza un terzo cloud.
2. Free tier: 10 GB storage, 1M write, 10M read, **egress a 0 €**. 150 clip da ~1–2 MB stanno in 300 MB. Ci stai dentro per anni a questo volume.
3. Gli URL dei generatori **scadono** (es. `vidgen.x.ai`). Se punti il player lì, un giorno il video sparisce. Quindi: hai il file (upload tuo **o** GET del Worker) → R2. In D1 resta la chiave, non l'URL del tool.
4. Stream (encoding, HLS) serve quando hai migliaia di spettatori o bitrate adattivo. 40 beta e clip da 5 secondi no. Si può accendere dopo, copiando dagli stessi oggetti R2. Non si rigenera.

Layout:

```
r2://fe-cinematics/
  {video_key}/poster.jpg
  {video_key}/master.mp4
  {video_key}/loop.webp     // solo se transcodato
```

D1 `cinematics` resta l'indice:

| `status` | Cosa c'è su R2 | Cosa vedi in `/play` |
|---|---|---|
| `need_still` | niente, o riga senza poster | 2D |
| `need_video` | c'è `poster.jpg`, manca `master.mp4` | 2D (poster solo se `prefers-reduced-motion`) |
| `generating` | job API in corso (solo Fase B / Visioni) | 2D |
| `pending_review` | c'è il master, aspetti il tuo Approva (Fase 0) | 2D |
| `ready` | master + poster | `<video>` |
| `failed` / `banned` | file cancellato, riga tenuta | 2D |

Il browser non vede il bucket. Il Worker firma un GET breve (pochi minuti) oppure serve lui lo stream. Bucket **non** listabile, niente `r2.dev` pubblico.

`banned` e scarti: si cancella l'oggetto, la riga D1 resta senza file, con il log. GDPR e prova di moderazione.

---

## 3. Due tempi, stesso tubo

Stessa `video_key`, stesso R2, stesso combat (miss = 2D). Cambia **chi** mette il `master.mp4`.

| Tempo | Flag | Chi genera il video | Chi carica su R2 | Chi mette `ready` |
|---|---|---|---|---|
| **Fase 0** (gratis) | `GEN_API=off` | **Tu**, dallo still, col tool che vuoi | **Tu**, tasto Carica MP4 sulla card | **Tu**, Approva su `video_new` |
| **Fase B** (Visioni) | `GEN_API=on` | Worker + **nostra** `XAI_API_KEY` (still se manca, poi I2V) | Worker, da solo, stesso path `{video_key}/master.mp4` | Policy check automatico → `ready`. Tu puoi Scarta/ban dopo |

`GEN_API` **non** si accende in beta. Si accende con `STRIPE_LIVE` (stesso evento: checklist verde + preavviso 30 giorni + tuo Approva). In preview il tubo API si costruisce spento, come il checkout.

La chiave è **sempre** del progetto. Mai del giocatore. GrokBot non la vede.

Non si genera in combattimento. Mai. Il turno non aspetta il job.

### 3.1 Fase 0 — banco tuo

| Passo | Chi | Tool | Costo |
|---|---|---|---|
| Card "manca video X" | Worker + dashboard | D1 | 0 |
| Still se manca | **Genera still** o **Carica still** | `grok-imagine-image` ~0,03 $, o JPG tuo | pochi centesimi o 0 |
| Video dallo still | **Tu** | grok.com, Kling, locale, altro | 0 sul credito API video |
| Upload MP4 sulla card | Tu → Worker → R2 | Dashboard | 0 |
| Approva / Scarta | Tu | `video_new` | 0 |

### 3.2 Fase B — API key, carico automatico

Solo richieste di account `visions`. Chi non abbona: tetto 7, vede la **cache** (anche le clip che l'API ha già fatto per un abbonato). Non lancia un job. Non brucia credito.

| Passo | Chi | Tool | Costo indicativo |
|---|---|---|---|
| Richiesta Visioni, chiave nuova | Worker | D1 quota 40 | 0 |
| Still se manca | Worker da solo | `grok-imagine-image` | ~0,03 $ |
| I2V 5 s 720p muto | Worker da solo | `grok-imagine-video` (~0,25 $) o `…-1.5` (~0,40 $) | a clip |
| Download URL (scade) → R2 | Worker da solo | `R2.put {key}/poster.jpg` + `master.mp4` | 0 |
| Policy | Worker | scarto se esplicito / "young" | 0 |
| `ready` | automatico se policy ok | — | 0 |
| Card `video_new` | dashboard, **già live** | Tu Scarta = ban | 0 |

Non è un lotto 1×/giorno. È un job **per richiesta**, in coda, fuori dal turno. UI: "In generazione. La rivedi da questa azione quando è pronta." La volta dopo (o più tardi in sessione, cache hit) c'è.

Budget mese 80 USD: se è pieno, niente job API, anche per gli abbonati. Log `BUDGET_BLOCK`. Overlay 2D. Il 40/settimana esiste perché 40 × 0,25 $ × N abbonati mangia il 9,99 €.

### 3.3 Perché still prima, sempre

Stesso volto / armatura / carta. Text-to-video da solo fa personaggi che saltano. Se lo still c'è già, **non** si rigenera. Fase 0 e Fase B riusano lo stesso poster.

### 3.4 Perché Cursor, non GrokBot

Il tubo è codice: Worker, secret, `GEN_API`, R2, `gen_quota`. Sta nel git. GrokBot tiene mail e X.

Contratto xAI (e del tool che usi tu in Fase 0) prima del pubblico: uso commerciale, AI Act art. 50, niente volti reali. Senza quello si resta sulla libreria 2D.

---

## 4. Quando si genera

Il combat non chiama xAI. Mai. Miss = 2D, si gioca.

### 4.1 Comune (entrambe le fasi)

1. Azione senza clip `ready`: CTA **Richiedi clip**. Niente loading sul turno.
2. Worker accetta se: entitlement ok, chiave non `ready`, non già in coda, tetto settimana ok, e (Fase B job API) budget mese ok. Stessa chiave già in coda: "già in coda", **non** brucia un posto.
3. Cache hit: play. Chiave riempita da te in Fase 0 o dall'API in Fase B è la stessa: la vede **chiunque**.

### 4.2 Fase 0 — `GEN_API=off`

1. UI: "In coda. Compare in gioco quando il titolo la pubblica."
2. Card **Manca video X**: dove si vede, prompt, n. richieste.
3. Still se manca → tu I2V fuori → **Carica MP4** sulla stessa card. La chiave *è* lo slot.
4. `pending_review` → Approva = `ready`. Scarta = `banned`.

Catalogo buchi sotto le richieste. Precache 80–150 opzionale, a tuo carico.

### 4.3 Fase B — `GEN_API=on` (con Stripe live)

1. Solo `entitlements.status = visions` lancia il job. Senza Visioni: 2D, cache se c'è, niente API.
2. Worker: `generating` → still se manca → I2V → GET url (scade) → `R2.put` → policy → `ready` (o `failed`).
3. Card `video_new` in dashboard **dopo**, già live. Serve a Scarta/ban, non a sbloccare il play.
4. Il banco Carica MP4 **resta** per i buchi che vuoi fare tu (trailer, vetrina, scarto da rifare). Non è più il default delle richieste Visioni.

`imagine_batch` 1×/giorno **non** è questo percorso. Il pagato è per-richiesta, automatico. Un lotto notturno resta un'opzione se un giorno vuoi precache a credito, non il default Visioni.

---

## 5. Flusso tecnico (da costruire dopo, non ora)

```
azione ok sul Worker
  → D1 cinematics by video_key
      ready           → URL firmato R2 → <video>
      generating / pending_review / need_* / miss
                      → 2D. Eventuale CTA "Richiedi clip"

POST /api/cinematics/request  { video_key }
  → già ready o queued globale → 200, niente quota
  → tetto settimana pieno → 429
  → GEN_API=off (Fase 0)
        insert video_requests, gen_quota += 1
        card video_req "Manca video X"
        still / upload / Approva come oggi
  → GEN_API=on e status=visions e budget ok
        insert video_requests, gen_quota += 1
        status generating
        still se manca (Imagine Image) → R2 poster
        Imagine Video I2V 5s → GET url → R2 master
        policy ok → ready
        policy ko / fail → failed, niente play
        card video_new (già live, puoi Scarta)
  → GEN_API=on ma non visions
        403 o 2D. Cache se c'è. Nessun job.

tu Scarti video_new → delete R2, banned.
```

Prompt versionato (`sfw_sexy_v1`) dentro la chiave. Cambio mood = nuove chiavi.

---

## 6. Cosa non fare

- Tenere gli MP4 su GitHub o in `/public` Vercel.
- Puntare il `<video src>` a `vidgen.x.ai` o a un altro URL temporaneo.
- Generare una GIF da zero per ogni azione.
- Bucket R2 pubblico listabile.
- Far aspettare il combat sul job IA.
- Generare in partita su cache miss. Il miss è 2D.
- Accendere `GEN_API` in Fase 0. Brucia credito senza incasso.
- Chiedere al giocatore una API key. Genera sempre la nostra. Visioni paga *noi*.
- Usare un Space / free tier come backend del Worker.
- Auto-merge git. L'auto vale **solo** per R2 delle clip Visioni, dopo policy.

---

## 7. Alternative, se il default non va

| Codice | Generazione | Storage | Quando ha senso |
|---|---|---|---|
| **A (default)** | Fase 0 banco tuo. Fase B Visioni: API key + upload automatico + `ready` dopo policy | R2 privato | Quello che hai chiesto. Combat 2D sul miss |
| **B** | Solo still + animazione 2D/CSS. Zero video IA | R2 solo poster | Credito a zero anche a pagamento |
| **C** | Fase B API come A, ma `pending_review` obbligatorio prima di `ready` | R2 uguale | Non ti fidi della policy automatica |
| **D** | Asset fatti a mano / commissionati, zero IA | R2 uguale | Controllo totale, tempi lunghi |
| **E** | Stesso A, Cloudflare Stream per il delivery | R2 archivio, Stream CDN | Volume vero, dopo i pagamenti |

Storage: R2 resta in A–E come archivio.

---

## 8. Quota settimanale e chi paga

Due contatori, non uno.

| Contatore | Cosa misura | Default | Se è pieno |
|---|---|---|---|
| Budget mese progetto | Spend API still + (Fase B) I2V sul *nostro* account | 80 USD | Nessun job API. Banco upload tuo resta. Log `BUDGET_BLOCK` |
| `gen_quota` per account | Richieste *accettate* di chiavi nuove, quella settimana (`week_id` = lunedì ISO, `Europe/Rome`) | 7 senza Visioni, 40 con Visioni | Niente nuova richiesta. 2D. Log `QUOTA_WEEK` |

Una richiesta accettata è una chiave che non era `ready` e non era già in coda. Cache hit: zero. "Già in coda": zero.

Fase 0: il 7 misura card in dashboard, non dollari I2V.

Fase B: il 40 misura job API a ~0,25 $. Senza di esso un abbonato svuota i 9,99 €. Chi non abbona **non** lancia I2V.

Abbonamento Visioni (Fase B, 9,99 €/mese IVA incl.). Forfait: Santuario + tetto 40 + **generazione API a nostro carico**. Non è un ricarico a clip. Disdetta: dal periodo dopo tetto 7, Santuario chiuso, niente nuovi job API. La cache `ready` resta visibile a tutti.

D1: `gen_quota (user_id, week_id, jobs_used)` e `video_requests (video_key, user_id, status)`. I numeri 7 e 40 stanno in `config`. Cambio = disclosure in-game e T&C.

---

## 9. Fuori scope

Nessuna `XAI_API_KEY` usata qui. Nessun bucket. Nessun MP4. Nessuna chiave del giocatore. `GEN_API` non si accende in questo giro. La spec c'è. Costruire banco e, in preview, il tubo API spento: un giro dopo, se lo chiedi. GrokBot non lancia il job.
