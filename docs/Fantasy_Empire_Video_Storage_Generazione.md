# Fantasy Empire — Generazione e storage dei video/gif

**Tipo documento:** proposta. Nessun job IA, nessun bucket creato.
**Versione:** 1.2 — 28 agosto 2026
**Riferimenti:** `Fantasy_Empire_Video_IA_Azioni.md` · `Fantasy_Empire_Dashboard_Approvazioni.md` · `Fantasy_Empire_Proposta_Commerciale.md` v2.6

Questa è la soluzione consigliata. Le alternative stanno in fondo e in `Fantasy_Empire_Decisioni_Aperte.md` §13, §17, §18.

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

Precache di 120 chiavi con il modello da 0,05 $/s: circa **30 $ una tantum**, più ~3 $ di still. Non è un canone. Non sta nel free tier Cloudflare, sta sul credito xAI.

Perché Grok e non Runway/fal/Kling come default:

- Hai già un account xAI. Un provider in meno.
- Image-to-video nativo: stesso volto/armatura sulla carta, poi il movimento. Text-to-video da solo fa personaggi che saltano da una clip all'altra.
- Il tono SFW sexy è più a rischio di filtro su fal/Runway. Grok è meno prudente. Resta **obbligatoria** la coda `pending_review` in dashboard: un output esplicito o "young" non diventa `ready`.

Perché Cursor e non GrokBot: il tubo è codice (Worker, coda, R2, `gen_quota`). Sta nel git. GrokBot tiene mail e X, non i secret xAI.

L'agent Cursor Imagine accoda il precache. In partita il miss lo processa il Worker, stesso codice. Tu in dashboard vedi la clip e Approvi (`ready`) o Scarti (delete oggetto + `banned`).

Contratto/ToS xAI da rileggere prima del primo batch: uso commerciale dell'output, marcatura AI Act art. 50 (dichiarazione in player c'è già; la marcatura machine-readable va verificata sul file o in overlay). Senza quella verifica si resta sulla libreria 2D.

---

## 4. Quando si genera (per non far aspettare il combattimento)

La generazione vera impiega decine di secondi. Il turn-based non può restare fermo.

**In Fase 0 il default è precache, non live in partita.**

1. Prima del go-live (o a cap basso): lista delle 80–150 chiavi più frequenti (carte GDD × pochi archetipi × zone).
2. Cursor Imagine le accoda, una alla volta, tetto tipo 20/giorno se vuoi spalmare il credito.
3. Ogni clip finita → R2 → card dashboard `video_new` con player. Approva = `ready`. Scarta = via.
4. In `/play`, cache hit: play immediato. Cache miss: **animazione 2D subito**, job in coda se il tetto giornaliero non è pieno. Il giocatore corrente non aspetta. Il prossimo che fa la stessa azione trova l'MP4.

Live generate senza tetto è la scelta che brucia i 30 $ in una serata di dungeon. Non è il default.

Oltre al tetto *giornaliero* di coda (infra), ogni *account* ha un tetto **settimanale** di job. Dettaglio §9. Chiave xAI: sempre la nostra. Nessuna API key del giocatore.

---

## 5. Flusso tecnico (da costruire dopo, non ora)

```
azione ok sul Worker
  → D1 cinematics by video_key
      ready   → URL firmato R2 → <video>
      pending_review / generating → 2D
      miss e tetto settimanale account ok e budget mese ok
           → enqueue job_id, 2D adesso
           Worker (Cursor Imagine / coda miss): Imagine Image (se manca poster)
                         → Imagine Video I2V 5s
                         → GET url xAI (scade) → R2.put master + poster
                         → status pending_review
                         → riga dashboard video_new
                         → gen_quota.jobs_used += 1
      miss e tetto pieno o budget pieno → solo 2D, basta
           (UI: "Limite settimanale. Si rinnova lunedì.")
```

Prompt versionato (`sfw_sexy_v1`) dentro la chiave, come già nel file video. Cambio mood = nuove chiavi, i vecchi file restano finché non li cancelli tu da dashboard.

---

## 6. Cosa non fare

- Tenere gli MP4 su GitHub o in `/public` Vercel.
- Puntare il `<video src>` a `vidgen.x.ai`.
- Generare una GIF da zero per ogni azione.
- Bucket R2 pubblico listabile.
- Far aspettare il combat sul job IA.
- Auto-Approva delle clip. Il tono è il punto legale più caldo del progetto.
- Chiedere al giocatore una API key Grok / xAI. Genera sempre il progetto. L'abbonamento Visioni paga *noi*, non il provider al posto suo.

---

## 7. Alternative, se il default non va

| Codice | Generazione | Storage | Quando ha senso |
|---|---|---|---|
| **A (default)** | Grok Imagine I2V, Cursor + Worker, miss → 2D + coda | R2 privato | Hai xAI, Fase 0, 30 $ di batch. GrokBot fuori |
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
| `gen_quota` per account | Job Imagine di quella settimana (`week_id` = lunedì ISO, `Europe/Rome`) | 7 senza Visioni, 40 con Visioni | Overlay 2D. Log `QUOTA_WEEK`. Testo in UI |

Un job è una chiamata che produce un file nuovo. Cache hit su R2: zero. Precache catalogo (80–150 chiavi prima del go-live): a tuo carico, non scala `gen_quota` dei giocatori.

Abbonamento Visioni (Fase B, 9,99 €/mese IVA incl.). Non è un ricarico a clip. È un forfait: Santuario aperto + tetto 40. Se un abbonato brucia 40 job a 0,25 USD, xAI costa circa 10 USD. Sta sotto i 9,99 € solo se il catalogo cache tiene. Per questo il 40 esiste e il precache è obbligatorio *prima* di vendere Visioni.

D1: `gen_quota (user_id, week_id, jobs_used)`. I numeri 7 e 40 stanno in `config`. Cambio = disclosure in-game e T&C.

---

## 9. Fuori scope

Nessuna `XAI_API_KEY` usata qui. Nessun bucket. Nessun MP4. Nessuna chiave del giocatore. Quando vorrai il primo batch, è un giro a parte: Worker + R2 + agent Cursor Imagine + tipo `video_new` in dashboard. GrokBot non lancia il job.
