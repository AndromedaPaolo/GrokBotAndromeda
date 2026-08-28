# Fantasy Empire — Generazione e storage dei video/gif

**Tipo documento:** proposta. Nessun job IA, nessun bucket creato.
**Versione:** 1.0 — 28 agosto 2026
**Riferimenti:** `Fantasy_Empire_Video_IA_Azioni.md` · `Fantasy_Empire_Dashboard_Approvazioni.md` · `Fantasy_Empire_Proposta_Commerciale.md` v2.3

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

**Default: xAI Grok Imagine**, che hai già con GrokBot.

| Passo | Modello (agosto 2026) | Costo indicativo |
|---|---|---|
| Still / poster, stesso personaggio | `grok-imagine-image` | ~0,02–0,04 $ / immagine |
| Anima lo still, 5 s, 720p, muto | `grok-imagine-video` | 0,05 $ / s → **0,25 $** a clip |
| Stesso, qualità più alta | `grok-imagine-video-1.5` | 0,08 $ / s → 0,40 $ a clip |

Precache di 120 chiavi con il modello da 0,05 $/s: circa **30 $ una tantum**, più ~3 $ di still. Non è un canone. Non sta nel free tier Cloudflare, sta sul credito xAI.

Perché Grok e non Runway/fal/Kling come default:

- Hai già l'account e GrokBot. Un provider in meno.
- Image-to-video nativo: stesso volto/armatura sulla carta, poi il movimento. Text-to-video da solo fa personaggi che saltano da una clip all'altra.
- Il tono SFW sexy è più a rischio di filtro su fal/Runway. Grok è meno prudente. Resta **obbligatoria** la coda `pending_review` in dashboard: un output esplicito o "young" non diventa `ready`.

GrokBot lancia il job (ha la chiave). Cursor non chiama xAI. Il Worker, a job finito, copia su R2. Tu in dashboard vedi la clip e Approvi (`ready`) o Scarti (delete oggetto + `banned`).

Contratto/ToS xAI da rileggere prima del primo batch: uso commerciale dell'output, marcatura AI Act art. 50 (dichiarazione in player c'è già; la marcatura machine-readable va verificata sul file o in overlay). Senza quella verifica si resta sulla libreria 2D.

---

## 4. Quando si genera (per non far aspettare il combattimento)

La generazione vera impiega decine di secondi. Il turn-based non può restare fermo.

**In Fase 0 il default è precache, non live in partita.**

1. Prima del go-live (o a cap basso): lista delle 80–150 chiavi più frequenti (carte GDD × pochi archetipi × zone).
2. GrokBot le accoda, una alla volta, tetto tipo 20/giorno se vuoi spalmare il credito.
3. Ogni clip finita → R2 → card dashboard `video_new` con player. Approva = `ready`. Scarta = via.
4. In `/play`, cache hit: play immediato. Cache miss: **animazione 2D subito**, job in coda se il tetto giornaliero non è pieno. Il giocatore corrente non aspetta. Il prossimo che fa la stessa azione trova l'MP4.

Live generate senza tetto è la scelta che brucia i 30 $ in una serata di dungeon. Non è il default.

---

## 5. Flusso tecnico (da costruire dopo, non ora)

```
azione ok sul Worker
  → D1 cinematics by video_key
      ready   → URL firmato R2 → <video>
      pending_review / generating → 2D
      miss e tetto ok → enqueue job_id, 2D adesso
           Worker/GrokBot: Imagine Image (se manca poster)
                         → Imagine Video I2V 5s
                         → GET url xAI (scade) → R2.put master + poster
                         → status pending_review
                         → riga dashboard video_new
      miss e tetto pieno → solo 2D, basta
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

---

## 7. Alternative, se il default non va

| Codice | Generazione | Storage | Quando ha senso |
|---|---|---|---|
| **A (default)** | Grok Imagine I2V, precache, miss → 2D + coda | R2 privato | Hai già Grok, Fase 0, 30 $ di batch |
| **B** | Solo still Grok + animazione CSS/canvas. Zero video IA | R2 solo poster | Credito xAI a zero, o policy troppo stretta |
| **C** | fal/Kling al posto di Grok | R2 uguale | Grok rifiuta i prompt o il prezzo xAI sale |
| **D** | Libreria fatta a mano / commissionata, zero API | R2 uguale | Vuoi controllo totale, tempi lunghi |
| **E** | Stesso A, ma Cloudflare Stream per il delivery | R2 resta l'archivio, Stream è il CDN | Volume vero, dopo i pagamenti |

Storage: R2 resta in A–E come archivio. Stream è un *delivery* opzionale, non un secondo posto in cui "vivono" i file.

---

## 8. Fuori scope

Nessuna `XAI_API_KEY` usata qui. Nessun bucket. Nessun MP4. Quando vorrai il primo batch, è un giro a parte: Worker + R2 + una Routine GrokBot + tipo `video_new` in dashboard.
