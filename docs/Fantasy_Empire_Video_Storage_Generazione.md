# Fantasy Empire — Generazione e storage dei video/gif

**Tipo documento:** proposta. Nessun job IA, nessun bucket creato.
**Versione:** 1.3 — 28 agosto 2026
**Riferimenti:** `Fantasy_Empire_Video_IA_Azioni.md` · `Fantasy_Empire_Dashboard_Approvazioni.md` · `Fantasy_Empire_Proposta_Commerciale.md` v2.7

Questa è la soluzione consigliata. Le alternative stanno in fondo e in `Fantasy_Empire_Decisioni_Aperte.md` §13, §17, §18, §22.

---

## 1. Cosa si tiene come file "vero"

**Master: MP4 H.264, 16:9, 3–5 secondi, 720p, audio spento.**

Non GIF. Una GIF di 5 secondi a 16:9 pesa parecchie volte un MP4, decodifica peggio sul telefono, e l'overlay in `/play` è già un `<video>`. Il browser fa autoplay muto sull'MP4 senza chiedere il GIF.

Derivati, solo se servono, **dall'MP4 già in cache**, non una seconda generazione:

| File | A cosa serve | Come nasce |
|---|---|---|
| `{key}/master.mp4` | overlay `/play` | Grok Imagine → copia su R2 |
| `{key}/poster.jpg` | LCP, `prefers-reduced-motion`, fallback | primo frame, o still di Imagine Image |
| `{key}/loop.webp` (opzionale) | vetrina landing, thumb | transcode dal master (Cloudflare media transform). GIF solo se un social lo pretendo, stesso transcode |

Una chiave `video_key`, tre oggetti al massimo. Non tre pipeline.

---

## 2. Dove si salva

**Cloudflare R2, bucket privato.** Non GitHub, non `/public` su Vercel, non Stream in Fase 0, non il link temporaneo di xAI.

Motivi, in ordine:

1. Lo stack è già Cloudflare (Worker + D1). Il Worker scrive con `R2.put`, senza un terzo cloud.
2. Free tier: 10 GB storage, 1M write, 10M read, **egress a 0 €**. 150 clip da ~1–2 MB stanno in 300 MB. Ci stai dentro per anni a questo volume.
3. Gli URL di Grok Imagine sono **temporanei** (`vidgen.x.ai`). La doc xAI dice di scaricare se ti serve una copia. Se punti il player lì, un giorno il video sparisce. Quindi: generate → download immediato → R2 → in D1 resta solo la chiave, non l'URL xAI.
4. Stream (encoding, HLS) serve quando hai migliaia di spettatori o bitrate adattivo. 40 beta e clip da 5 secondi no. Si può accendere dopo, copiando dagli stessi oggetti R2. Non si rigenera.

Layout:

```
r2://fe-cinematics/
  {video_key}/master.mp4
  {video_key}/poster.jpg
  {video_key}/loop.webp     // solo se transcodato
```

D1 `cinematics` resta l'indice (`ready` / `failed` / `banned` / `pending_review`). Il browser non vede il bucket. Il Worker firma un GET breve (pochi minuti) oppure serve lui lo stream. Bucket **non** listabile, niente `r2.dev` pubblico.

`banned` e scarti: si cancella l'oggetto, la riga D1 resta senza file, con il log. GDPR e prova di moderazione.

---

## 3. Chi genera

**Default: xAI Grok Imagine, lanciato da Cursor.** La chiave sta nei secret del Worker. GrokBot non la vede.

| Passo | Modello (agosto 2026) | Costo indicativo |
|---|---|---|
| Still / poster, stesso personaggio | `grok-imagine-image` | ~0,02–0,04 $ / immagine |
| Anima lo still, 5 s, 720p, muto | `grok-imagine-video` | 0,05 $ / s → **0,25 $** a clip |
| Stesso, qualità più alta | `grok-imagine-video-1.5` | 0,08 $ / s → 0,40 $ a clip |

Un lotto di 120 chiavi uniche costa circa **30 $** più still, a 0,05 $/s. Non è un canone. Non sta nel free tier Cloudflare, sta sul credito xAI. Quante chiavi escono nel lotto lo decide la coda richieste, non un precache obbligatorio.

Perché Grok e non Runway/fal/Kling come default:

- Hai già un account xAI. Un provider in meno.
- Image-to-video nativo: stesso volto/armatura sulla carta, poi il movimento. Text-to-video da solo fa personaggi che saltano da una clip all'altra.
- Il tono SFW sexy è più a rischio di filtro su fal/Runway. Grok è meno prudente. Resta **obbligatoria** la coda `pending_review` in dashboard: un output esplicito o "young" non diventa `ready`.

Perché Cursor e non GrokBot: il tubo è codice (Worker, coda richieste, R2, `gen_quota`). Sta nel git. GrokBot tiene mail e X, non i secret xAI.

Le clip escono spesso storte. Quindi **non** si genera in combattimento e **non** si pubblica da sole. Il giocatore chiede. Tu (poi un agent, una volta al giorno) generi. Tu Approvi o Scarti. Solo allora il file è `ready`.

Contratto/ToS xAI da rileggere prima del primo batch: uso commerciale dell'output, marcatura AI Act art. 50 (dichiarazione in player c'è già; la marcatura machine-readable va verificata sul file o in overlay). Senza quella verifica si resta sulla libreria 2D.

---

## 4. Quando si genera: richiesta, poi lotto

Il combat non chiama xAI. Mai. Miss = 2D, si gioca.

1. Il giocatore, su un'azione senza clip `ready`, può **chiedere** quella chiave. Bottone tipo "Richiedi clip". Non parte un loading di 40 secondi sul turno.
2. Il Worker accetta se: entitlement ok, chiave non già `ready`, chiave non già in coda, tetto settimanale ok, budget mese ok. Stessa `video_key` già richiesta da un altro: "già in coda", **non** brucia un posto a chi arriva dopo.
3. UI: "In coda. Arriva col lotto." Overlay resta 2D finché tu non Approvi il file.
4. **All'inizio lo fai tu a mano.** Dashboard: lista `video_req` (chiave, prompt, quanti l'hanno chiesta). Generi still + video come preferisci, carichi su R2, compare `video_new`. Approva = `ready`. Scarta = via, chiave `banned`.
5. **Dopo, quando tu sblocchi il posto,** l'agent Cursor Imagine gira **una volta al giorno** (proposta: 04:00 `Europe/Rome`). Conta le richieste in coda, genera *tutte* le chiavi uniche, scarica, mette su R2, apre una `video_new` per ciascuna. Non mette `ready` da solo. La qualità è il motivo per cui il tasto resta tuo.
6. Quel giro giornaliero non tocca Stripe, non tocca i flag, non è "si paga". È solo il lotto media.

Precache 80–150 resta *opzionale*, a tuo carico, se vuoi un catalogo prima dei beta. Non è più il default. Il catalogo cresce da quello che la gente chiede.

---

## 5. Flusso tecnico (da costruire dopo, non ora)

```
azione ok sul Worker
  → D1 cinematics by video_key
      ready           → URL firmato R2 → <video>
      pending_review  → 2D  (file c'è, aspetti il tuo Approva)
      miss            → 2D. Eventuale CTA "Richiedi clip"

POST /api/cinematics/request  { video_key }
  → già ready o queued globale → 200, niente quota
  → tetto settimana o budget pieni → 429, testo limite
  → insert video_requests queued, gen_quota += 1

Lotto (tu a mano, poi C8 1×/giorno)
  → SELECT DISTINCT video_key FROM video_requests WHERE queued
  → per chiave: Imagine Image (se manca poster)
              → Imagine Video I2V 5s
              → GET url xAI (scade) → R2.put master + poster
              → cinematics pending_review
              → card dashboard video_new
  → richieste di quella chiave: fulfilled

tu Approvi video_new → ready. Chiunque ha quella chiave la vede.
tu Scarti → delete R2, banned. Non si ripubblica da sola.
```

Prompt versionato (`sfw_sexy_v1`) dentro la chiave, come già nel file video. Cambio mood = nuove chiavi, i vecchi file restano finché non li cancelli tu da dashboard.

---

## 6. Cosa non fare

- Tenere gli MP4 su GitHub o in `/public` Vercel.
- Puntare il `<video src>` a `vidgen.x.ai`.
- Generare una GIF da zero per ogni azione.
- Bucket R2 pubblico listabile.
- Far aspettare il combat sul job IA.
- Generare in partita su cache miss. Il miss è 2D. La generazione è un lotto.
- Auto-Approva delle clip. Escono storte. Il tasto resta tuo.
- Chiedere al giocatore una API key Grok / xAI. Genera sempre il progetto. L'abbonamento Visioni paga *noi*, non il provider al posto suo.

---

## 7. Alternative, se il default non va

| Codice | Generazione | Storage | Quando ha senso |
|---|---|---|---|
| **A (default)** | Richiesta giocatore → lotto (prima a mano, poi C8 1×/giorno) → tu Approvi | R2 privato | Le clip escono storte. Combat sempre 2D sul miss |
| **B** | Solo still Grok + animazione CSS/canvas. Zero video IA | R2 solo poster | Credito xAI a zero, o policy troppo stretta |
| **C** | fal/Kling al posto di Grok | R2 uguale | Grok rifiuta i prompt o il prezzo xAI sale |
| **D** | Libreria fatta a mano / commissionata, zero API | R2 uguale | Vuoi controllo totale, tempi lunghi |
| **E** | Stesso A, ma Cloudflare Stream per il delivery | R2 resta l'archivio, Stream è il CDN | Volume vero, dopo i pagamenti |

Storage: R2 resta in A–E come archivio. Stream è un *delivery* opzionale, non un secondo posto in cui "vivono" i file.

---

## 8. Quota settimanale e chi paga xAI

Due contatori, non uno.

| Contatore | Cosa misura | Default | Se è pieno |
|---|---|---|---|
| Budget mese progetto | Spend xAI sul *nostro* account | 80 USD | Nessun job, anche per gli abbonati. Log `BUDGET_BLOCK` |
| `gen_quota` per account | Richieste *accettate* di chiavi nuove, quella settimana (`week_id` = lunedì ISO, `Europe/Rome`) | 7 senza Visioni, 40 con Visioni | Niente nuova richiesta. 2D. Log `QUOTA_WEEK` |

Una richiesta accettata è una chiave che non era `ready` e non era già in coda. Cache hit: zero. "Già in coda" da un altro: zero. Lotto a mano tuo (o precache che fai tu): a tuo carico, non scala `gen_quota`.

Abbonamento Visioni (Fase B, 9,99 €/mese IVA incl.). Non è un ricarico a clip. È un forfait: Santuario aperto + tetto 40 richieste/settimana. Il lotto giornaliero e il tuo Approva restano. Senza catalogo che tiene, 40 job a 0,25 USD bruciano il margine: per questo il 40 esiste.

D1: `gen_quota (user_id, week_id, jobs_used)` e `video_requests (video_key, user_id, status)`. I numeri 7 e 40 stanno in `config`. Cambio = disclosure in-game e T&C.

---

## 9. Fuori scope

Nessuna `XAI_API_KEY` usata qui. Nessun bucket. Nessun MP4. Nessuna chiave del giocatore. Il primo lotto lo fai tu a mano dalla dashboard. L'agent giornaliero è un giro dopo, se Approvi `imagine_batch`. GrokBot non lancia il job.
