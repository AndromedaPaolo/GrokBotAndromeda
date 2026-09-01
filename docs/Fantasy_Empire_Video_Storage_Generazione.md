# Fantasy Empire — Generazione e storage dei video/gif

**Tipo documento:** proposta. Nessun job IA, nessun bucket creato.
**Versione:** 1.4 — 1 settembre 2026
**Riferimenti:** `Fantasy_Empire_Video_IA_Azioni.md` · `Fantasy_Empire_Dashboard_Approvazioni.md` · `Fantasy_Empire_Proposta_Commerciale.md` v2.8

Questa è la soluzione consigliata. Le alternative stanno in fondo e in `Fantasy_Empire_Decisioni_Aperte.md` §13, §17, §18, §22.

---

## 1. Cosa si tiene come file "vero"

**Master: MP4 H.264, 16:9, 3–5 secondi, 720p, audio spento.**

Non GIF. Una GIF di 5 secondi a 16:9 pesa parecchie volte un MP4, decodifica peggio sul telefono, e l'overlay in `/play` è già un `<video>`. Il browser fa autoplay muto sull'MP4 senza chiedere il GIF.

Derivati, solo se servono, **dall'MP4 già in cache**, non una seconda generazione:

| File | A cosa serve | Come nasce |
|---|---|---|
| `{key}/poster.jpg` | LCP, `prefers-reduced-motion`, fallback, **input** per il video | Still se manca (API image o upload tuo). Altrimenti primo frame del master |
| `{key}/master.mp4` | overlay `/play` | **Tu** lo generi dallo still + prompt della card, poi lo carichi sulla stessa card |
| `{key}/loop.webp` (opzionale) | vetrina landing, thumb | transcode dal master (Cloudflare media transform). GIF solo se un social lo pretendo, stesso transcode |

Una chiave `video_key`, tre oggetti al massimo. Non tre pipeline. Il caricamento sulla card **è** lo slot giusto: path R2 = quella chiave, superficie di gioco = quella scritta in dashboard. Non si sceglie a mano una cartella.

---

## 2. Dove si salva

**Cloudflare R2, bucket privato.** Non GitHub, non `/public` su Vercel, non Stream in Fase 0, non un link temporaneo di un generatore (xAI, Kling, altro).

Motivi, in ordine:

1. Lo stack è già Cloudflare (Worker + D1). Il Worker scrive con `R2.put`, senza un terzo cloud.
2. Free tier: 10 GB storage, 1M write, 10M read, **egress a 0 €**. 150 clip da ~1–2 MB stanno in 300 MB. Ci stai dentro per anni a questo volume.
3. Gli URL dei generatori **scadono** (es. `vidgen.x.ai`). Se punti il player lì, un giorno il video sparisce. Quindi: hai il file → upload sulla card → R2. In D1 resta la chiave, non l'URL del tool.
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
| `pending_review` | c'è il master, aspetti il tuo Approva | 2D |
| `ready` | master + poster | `<video>` |
| `failed` / `banned` | file cancellato, riga tenuta | 2D |

Il browser non vede il bucket. Il Worker firma un GET breve (pochi minuti) oppure serve lui lo stream. Bucket **non** listabile, niente `r2.dev` pubblico.

`banned` e scarti: si cancella l'oggetto, la riga D1 resta senza file, con il log. GDPR e prova di moderazione.

---

## 3. Chi genera cosa

**Default: dashboard a buchi. Still se manca. Video lo fai tu. Upload sulla card. La volta dopo c'è.**

Non si genera in combattimento. Non si pubblica da sola. GrokBot non vede i file né le chiavi.

| Passo | Chi | Tool | Costo indicativo |
|---|---|---|---|
| 1. Card "manca video X" | Worker + dashboard | D1 `cinematics` / `video_requests` | 0 |
| 2. Still se manca | Worker su tuo click **Genera still**, o **Carica still** tuo | Default: `grok-imagine-image` (~0,02–0,04 $). Oppure un JPG che hai già | ~0,03 $ o 0 |
| 3. Video dallo still | **Tu** | Quello che usi tu: grok.com, Kling, locale (LTX/Wan), altro. Image-to-video sullo still della card, col prompt della card | 0 sul credito xAI API (resta sul tool che scegli tu) |
| 4. Upload MP4 sulla stessa card | Tu → Worker → R2 `{video_key}/master.mp4` | Dashboard | 0 |
| 5. Approva / Scarta | Tu | Card `video_new` | 0 |

Perché lo still è un file a parte, prima del video:

- Stesso volto / armatura / carta. Text-to-video da solo fa personaggi che saltano da una clip all'altra.
- Lo still è barato (o gratis se lo carichi tu). Il video è il pezzo che esce storto: lo fai tu, lo vedi, poi lo carichi.
- Se lo still c'è già, **non** si rigenera. Si riusa.

Perché il video lo fai tu e non l'API Imagine in loop:

- Le clip I2V escono spesso storte. Un agent 1×/giorno ti riempie la coda di scarti.
- I tool "gratis" (consumer grok.com, Kling free, Spaces) **non** sono un backend di prodotto: niente SLA, tetti, ToS hobby. Usarli **tu** a mano, sulla card, è lecito. Metterli nel Worker no.
- L'API `grok-imagine-video` resta un'**opzione** (Approva `imagine_batch`). Non è il default. ~0,25 $ a clip da 5 s.

Perché Cursor e non GrokBot: il tubo è codice (Worker, coda, R2, `gen_quota`, path `{video_key}`). Sta nel git. GrokBot tiene mail e X, non i file.

Contratto/ToS del tool che usi tu, prima del primo upload pubblico: uso commerciale dell'output, marcatura AI Act art. 50, niente volti reali. Senza quella verifica si resta sulla libreria 2D. Stesso vincolo se un giorno accendi l'API xAI.

---

## 4. Quando si genera: buco in dashboard, poi tu

Il combat non chiama nessun generatore. Mai. Miss = 2D, si gioca.

1. Il giocatore, su un'azione senza clip `ready`, può **chiedere** quella chiave. Bottone tipo "Richiedi clip". Non parte un loading sul turno.
2. Il Worker accetta se: entitlement ok, chiave non già `ready`, chiave non già in coda, tetto settimanale ok. Stessa `video_key` già richiesta da un altro: "già in coda", **non** brucia un posto a chi arriva dopo.
3. UI giocatore: "In coda. Compare in gioco quando il titolo la pubblica." Overlay resta 2D finché tu non Approvi il file.
4. Dashboard: card **Manca video X**. Testo in italiano: tipo azione, carta/evento, archetipo, zona, **dove si vede** (`/play` combat / città / dungeon). Prompt da usare. Quante richieste.
5. Se **non** c'è still: stato `need_still`. Tu premi **Genera still** (API image) oppure **Carica still**. Lo still va su `{video_key}/poster.jpg`. Stato → `need_video`.
6. Se lo still c'è: lo vedi, lo **scarichi**. Fuori dalla dashboard fai image-to-video con quel file e col prompt della card. 3–5 s, 16:9, 720p, muto.
7. **Carica MP4** sulla stessa card. Il Worker mette `{video_key}/master.mp4`. Non scegli la cartella: la chiave *è* la sezione. Stato → `pending_review`. Compare `video_new` col player.
8. Approva = `ready`. La volta dopo, chiunque ha quella chiave la vede. Scarta = file via, riga `banned`.

Catalogo buchi (oltre alle richieste): la stessa coda può elencare chiavi note senza `ready` (azioni del GDD ancora vuote). Le **richieste giocatore** stanno in cima. Precache 80–150 resta *opzionale*, a tuo carico. Non è il default. Il catalogo cresce da quello che la gente chiede e da quello che tu riempi.

L'agent C8 **non** lancia I2V da solo. Tiene still, path R2, card. `imagine_batch` (lotto API 1×/giorno) esiste ma è **spento** finché non lo Approvi tu. Anche allora tu Approvi ogni clip.

---

## 5. Flusso tecnico (da costruire dopo, non ora)

```
azione ok sul Worker
  → D1 cinematics by video_key
      ready           → URL firmato R2 → <video>
      pending_review  → 2D  (file c'è, aspetti il tuo Approva)
      need_still / need_video / miss
                      → 2D. Eventuale CTA "Richiedi clip"

POST /api/cinematics/request  { video_key }
  → già ready o queued globale → 200, niente quota
  → tetto settimana pieno → 429, testo limite
  → insert video_requests queued, gen_quota += 1
  → upsert cinematics need_still|need_video
  → card dashboard video_req  "Manca video X"

Card video_req, still mancante
  → POST genera still  (Imagine Image)  OPPURE upload JPG
  → R2.put {key}/poster.jpg
  → status need_video

Tu (fuori): I2V sullo still + prompt della card

Card video_req, Carica MP4
  → R2.put {key}/master.mp4
  → status pending_review
  → card video_new (player)

tu Approvi video_new → ready. Chiunque ha quella chiave la vede.
tu Scarti → delete R2, banned. Non si ripubblica da sola.

Opzionale, spento: imagine_batch
  → C8 genera I2V API sulle chiavi need_video, stessa coda video_new
```

Prompt versionato (`sfw_sexy_v1`) dentro la chiave, come già nel file video. Cambio mood = nuove chiavi, i vecchi file restano finché non li cancelli tu da dashboard.

---

## 6. Cosa non fare

- Tenere gli MP4 su GitHub o in `/public` Vercel.
- Puntare il `<video src>` a `vidgen.x.ai` o a un altro URL temporaneo.
- Generare una GIF da zero per ogni azione.
- Bucket R2 pubblico listabile.
- Far aspettare il combat sul job IA.
- Generare in partita su cache miss. Il miss è 2D. Il buco sta in dashboard.
- Auto-Approva delle clip. Escono storte. Il tasto resta tuo.
- Chiedere al giocatore una API key Grok / xAI. Genera sempre il progetto (still) o tu (video). L'abbonamento Visioni alza il tetto richieste, non gli fa collegare un provider.
- Usare un Space / free tier come backend del Worker. I tool gratis li usi **tu** sulla card, non il server.

---

## 7. Alternative, se il default non va

| Codice | Generazione | Storage | Quando ha senso |
|---|---|---|---|
| **A (default)** | Dashboard "manca X" → still se manca → **tu** fai il video dallo still → upload sulla card → Approva | R2 privato | Controllo qualità. Combat 2D sul miss. Credito video API a zero |
| **B** | Solo still + animazione 2D/CSS. Zero video IA | R2 solo poster | Ancora meno lavoro, niente overlay filmato |
| **C** | Come A, ma I2V via API (Grok / fal / Kling) al posto delle tue mani | R2 uguale | Troppe card, sblocchi `imagine_batch` |
| **D** | Asset fatti a mano / commissionati, zero IA | R2 uguale | Controllo totale, tempi lunghi |
| **E** | Stesso A, ma Cloudflare Stream per il delivery | R2 resta l'archivio, Stream è il CDN | Volume vero, dopo i pagamenti |

Storage: R2 resta in A–E come archivio. Stream è un *delivery* opzionale, non un secondo posto in cui "vivono" i file.

---

## 8. Quota settimanale e chi paga

Due contatori, non uno.

| Contatore | Cosa misura | Default | Se è pieno |
|---|---|---|---|
| Budget mese progetto | Spend API still (e, se un giorno accendi I2V, video) sul *nostro* account | 80 USD | Nessun **Genera still** da API. Upload still tuo resta. Log `BUDGET_BLOCK` |
| `gen_quota` per account | Richieste *accettate* di chiavi nuove, quella settimana (`week_id` = lunedì ISO, `Europe/Rome`) | 7 senza Visioni, 40 con Visioni | Niente nuova richiesta. 2D. Log `QUOTA_WEEK` |

Una richiesta accettata è una chiave che non era `ready` e non era già in coda. Cache hit: zero. "Già in coda" / "già in dashboard": zero. I buchi che apri tu dal catalogo, senza richiesta giocatore, non scalano `gen_quota`.

Il tetto 7/40 misura **quante chiavi nuove** un account può mettere in coda, non quanti dollari xAI brucia. Col default A il video lo fai tu: il collo di bottiglia è la tua coda in dashboard, non la fattura Imagine Video. Il 40 resta così un abbonato non ti riempie 40 card al giorno.

Abbonamento Visioni (Fase B, 9,99 €/mese IVA incl.). Non è un ricarico a clip. È un forfait: Santuario aperto + tetto 40 richieste/settimana. Still e Approva restano. Se un giorno accendi l'API I2V, 40 job a 0,25 USD bruciano il margine: per questo il 40 esiste anche allora.

D1: `gen_quota (user_id, week_id, jobs_used)` e `video_requests (video_key, user_id, status)`. I numeri 7 e 40 stanno in `config`. Cambio = disclosure in-game e T&C.

---

## 9. Fuori scope

Nessuna `XAI_API_KEY` usata qui. Nessun bucket. Nessun MP4. Nessuna chiave del giocatore. Nessun Space agganciato al Worker. La card "manca video X" è la specifica. Costruirla è un giro dopo, se lo chiedi. GrokBot non lancia il job e non riceve l'upload.
