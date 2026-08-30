# Come ricreare un sistema tipo Flingster

## Verdetto

**Sì, è possibile** ricreare un sistema della stessa *categoria*: videochat 1:1 casuale tra adulti consenzienti, con skip, filtri, chat testuale e upgrade a pagamento.

**No, non è possibile** (né lecito) clonare Flingster. Non hai il loro codice, il matching interno, il marchio, i 32 milioni di account né il volume di persone online. Articoli che “rivelano l’algoritmo” sono speculazione da marketing, non documentazione tecnica.

Questo file descrive come si costruisce un prodotto *equivalente per funzione*, partendo dalla superficie pubblica di [flingster.com](https://flingster.com/) e da architetture note (WebRTC + coda di matching). Non è un reverse engineering del loro backend.

Flingster è un sito di chat per adulti. Un clone operativo senza verifica dell’età, senza blocco CSAM e senza moderazione è illegale nella maggior parte delle giurisdizioni. La parte tecnica è la più facile. Quella legale e di liquidità è quella che fa fallire quasi tutti i tentativi.

---

## Cosa fa Flingster (modello di prodotto)

Dalla homepage pubblica, il prodotto è questo:

1. L’utente dichiara un genere (uomo, donna, coppia).
2. Premere Start. Il browser chiede camera e microfono.
3. Un matcher accoppia due sessioni live.
4. Parte una videochiamata 1:1 più chat testuale.
5. Next / skip: si chiude il peer e si rientra in coda.
6. Filtri (genere, posizione, tag di interesse) e maschere virtuali sul volto.
7. Funzioni extra: reconnect (“back”), messaggio introduttivo, nascondi posizione, chat privata, report.
8. Base gratis, VIP a pagamento per sbloccare filtri e vantaggi in coda.
9. Nessun obbligo di account per iniziare (o account molto leggero). Sessioni pensate come effimere.

È lo stesso schema di Omegle / Chatroulette, orientato al sesso tra adulti e con filtri a pagamento. Il valore non è il video in sé. Il valore è *trovare subito qualcuno* e *poter cambiare persona in un click*.

---

## Cosa non puoi copiare

- Marchio, logo, copy, CSS, JS e API di Flingster. Copyright e trademark.
- Il loro matching reale. Non è pubblico.
- La loro base utenti. Senza persone online il matcher restituisce attese infinite. Su questi siti il problema vero è lo sbilanciamento di genere: tantissimi uomini, poche donne e coppie. Senza una strategia per quello, il prodotto è un deserto.
- Registrare o ridistribuire stream degli utenti senza consenso esplicito e base legale.

---

## Architettura di riferimento

Quattro piani separati. Non mischiarli.

```
[Browser A]  <--WebRTC media P2P-->  [Browser B]
     ^                                    ^
     | WebSocket signaling                |
     v                                    v
[Server di signaling + matcher] ---- Redis / memoria
     |
     +-- Postgres (account, pagamenti, ban, report)
     +-- TURN (solo se il P2P fallisce)
     +-- Moderazione (report, hash CSAM, age gate)
     +-- Pagamenti (VIP)
```

### Piano media

WebRTC peer-to-peer. Il video va da browser a browser. Il tuo server **non** deve instradare i frame, salvo TURN.

Per 1:1 random questo è lo standard: costo basso, latenza bassa. Un SFU (mediasoup, livekit, Daily) serve se vuoi stanze a più persone, registrazione server-side o maschere applicate in cloud. Per il caso Flingster (due persone, skip rapido) il P2P basta.

### Piano signaling

I browser non possono “chiamarsi” da soli. Serve un server che:

- tiene aperta una WebSocket per ogni utente in chat
- scambia SDP (offer/answer) e ICE candidate tra i due matchati
- non tocca i codec video

Node.js + `ws` o Socket.IO, oppure Cloudflare Workers + Durable Objects. Il signaling è chiacchiera di controllo, pochi KB.

### Piano matching

WebRTC non decide *chi* incontra *chi*. Quello è stato applicativo.

Struttura:

- coda (o più code) in Redis / memoria
- chiave: `waiting:{filtro}` oppure un unico sorted set con score
- operazione atomica: “prendi due sessioni compatibili e toglile dalla coda”
- se uno resta solo, resta in attesa e riceve un heartbeat “searching”

Senza atomicità, due click “Next” contemporanei matchano la stessa persona due volte. Redis `SPOP` / Lua script o un unico processo con coda in-memory risolvono la race.

### Piano applicazione

Account opzionale, VIP, ban, report, IP, device fingerprint, rate limit, GDPR delete. Postgres. Non usare il DB per il matching in hot path: è troppo lento e crea lock.

---

## Flusso runtime

```
1. Cliente: getUserMedia(camera, mic)  ->  stream locale in preview
2. Cliente: WS connect  ->  server assegna sessionId
3. Cliente: { type: "enqueue", gender, lookingFor, country, tags, vip }
4. Matcher: se esiste un peer compatibile, emetti "matched" a entrambi
            altrimenti tieni in coda
5. Peer A (initiator): RTCPeerConnection, createOffer, manda SDP via WS
6. Peer B: setRemoteDescription, createAnswer, manda SDP
7. Entrambi: trickle ICE candidates via WS
8. ICE connected  ->  video remoto sul <video>
9. DataChannel (opzionale) per la chat testuale, oppure eventi WS
10. Next / close / drop:
    - close PeerConnection
    - stop track solo se l’utente esce dal sito, non ad ogni Next
    - server: cancella la coppia, re-enqueue chi ha premuto Next
    - notify l’altro: "peer_left"
```

“Next” è un teardown completo della sessione WebRTC, non un mute. Se non pulisci ICE, track e stato server, restano zombie e la coda si sporca.

STUN: `stun:stun.l.google.com:19302` o un tuo coturn, per scoprire IP pubblico.

TURN: coturn o un servizio (Twilio, Cloudflare Calls, Metered). Circa 15–30% delle coppie (NAT simmetrici, reti mobili, firewall aziendali) **non** riescono in P2P. Senza TURN “non si sente / schermo nero” e perdi utenti. TURN è la voce di costo che scala col traffico, perché lì il video passa dal tuo server.

---

## Matching: come farlo sul serio

FIFO puro (“il prossimo libero”) è un MVP. In produzione, su siti adulti, quasi nessuno lo lascia così.

Code separate per domanda:

```
coda[myGender][lookingFor]
```

Esempio: uomo che cerca donna entra in `M->F` e può essere preso solo da una donna in `F->M` (o coppia che accetta uomini).

Pesi tipici, tutti ricostruibili come prodotto, non come “codice Flingster”:

| Segnale | Perché |
|---|---|
| Compatibilità filtri | Altrimenti il VIP è una truffa |
| Stesso paese / lingua | Latenza e chat che funziona |
| VIP priority | Chi paga salta parte della coda |
| Cooldown su coppie recenti | Evita di rivedere la stessa persona 8 volte |
| Penalità report / skip-rate | Chi flasha e scappa brucia l’altra parte |
| Preferenza verso il genere scarso | Se non proteggi donne/coppie dagli uomini in massa, se ne vanno |

Nuovi utenti “che trovano subito qualcuno”: è un trucco di retention, non magia. Lo fai dando priorità alle prime N sessioni.

Filtri posizione: IP → MaxMind / Cloudflare `CF-IPCountry`. Non GPS. I VPN bucano il filtro. Accettalo o vieta i datacenter ASN.

Congestione: 10k “Next” al secondo non stanno in un unico processo Node senza Redis e sharding. Sharda per regione (`eu`, `us`, `asia`) e matcha prima in-region, poi cross-region se la coda è vuota dopo N secondi.

---

## Mappa funzioni pubbliche → come le implementi

| Funzione Flingster | Implementazione |
|---|---|
| Start senza signup | sessione cookie/JWT anonima + `sessionId` |
| Scelta genere | campo dichiarato; **non** fidartene (vedi spoofing) |
| Video + testo | WebRTC media + DataChannel o WS `chat` |
| Next | teardown + re-enqueue |
| Filtro genere / location | code multiple + gate VIP |
| Interest tags | score di overlap (Jaccard) prima del pop |
| Maschere / blur volto | MediaPipe Face Landmarker o selfie-segmentation nel browser, compositing su canvas, poi `canvas.captureStream()` al PeerConnection. Costa CPU sul client. Server-side è più caro. |
| Safety / report | bottone report → snapshot opzionale (consenso Tos) → coda moderator. Ban per device+IP. |
| Get reconnected / Back | tieni `lastPeerId` 30–120s; se entrambi premono Back, rimatcha quella coppia |
| Hide location | non inviare country al peer; il matcher può usarla lo stesso |
| Intro message | stringa inviata all’evento `matched` |
| Private chat | stesso 1:1, flag `locked` che disabilita Next accidentale e nasconde dalla coda |
| Followers / social | link dichiarati; non scrapare Instagram |
| VIP | Stripe/LemonSqueezy, claim `vip` nel JWT, filtri e priorità coda |

Traduzione automatica della chat: API in tempo reale sul testo (DeepL). Non sul video.

---

## Client (browser)

Una pagina basta.

- `getUserMedia` con fallback “solo testo” se l’utente nega la camera
- preview locale mirrored
- `<video autoplay playsinline>` per il remoto (`playsinline` è obbligatorio su iOS)
- stato UI: idle → searching → connecting → in-call → peer-left
- permessi camera: se li chiedi dopo un gesto utente (click Start) i browser non li bloccano
- mobile: HTTPS obbligatorio per getUserMedia
- non loggare SDP in produzione (contiene IP)

Stack client ragionevole: TypeScript, Vite o Next.js, niente framework video proprietario. `simple-peer` è comodo ma datato. Oggi va bene `RTCPeerConnection` nudo o LiveKit solo se abbandoni il P2P puro.

Maschere: processa il locale su canvas a 15–30 fps, non a 60. Telefono surriscaldato = chiusura tab.

---

## Backend minimo

Servizi:

1. **gateway WS** — sticky session (stesso utente sullo stesso nodo, o Redis pub/sub tra nodi)
2. **matcher** — un writer della coda, o Redis + Lua
3. **api http** — auth, vip, report, tos
4. **coturn** — UDP 3478 + range relay
5. **worker moderazione** — coda report, PhotoDNA / hash CSAM, ban

Dati da tenere:

```
Session { id, ws, gender, lookingFor, country, tags, vip, ipHash, deviceHash, state }
Pair    { a, b, startedAt, lastPeer }
User    { id?, email?, vipUntil, bans[], reportsAgainst }
```

Stati sessione: `idle | queued | matching | rtc | banned`.

Cleanup su `ws.close`: togli dalla coda, avvisa il peer, chiudi la pair. Heartbeat ogni 15s. Senza heartbeat restano slot occupati da tab zombie.

Rate limit: max N Next al minuto, max M report/ora, max 1 sessione video per device.

---

## Moderazione e legge (non è opzionale)

Sito per adulti + webcam random è tra i prodotti più esposti a abuso. Se salti questo blocco, non “lanci dopo”: stai operando fuori legge.

Obblighi tipici (verifica col legale del paese in cui operi e in cui hai utenti):

- **Solo 18+.** Age gate finto (“ho più di 18 anni”) non basta più in UK (Online Safety Act), in diversi stati USA e, in prospettiva, in UE. Serve un age verification provider (Yoti, Veriff, ecc.) o un metodo equivalente riconosciuto. Senza, le store, i processori di pagamento e i regulator ti chiudono.
- **CSAM è reato.** Devi bloccare upload/stream di minori, avere canale di report, e negli USA reporting a NCMEC. Hash matching (PhotoDNA) sul materiale segnalato o su frame campionati *solo dove la legge e il consenso lo permettono*. Non costruire tool per eludere filtri.
- **Non registrare le chiamate** di default. Se registri, serve consenso di entrambi e una policy chiara. Flingster vende l’effimero: copialo come scelta di prodotto.
- **GDPR / ePrivacy** se tocchi l’UE: base giuridica, DPA con Stripe e TURN provider, diritto all’oblio, IP come dato personale, cookie banner non teatro.
- **18 U.S.C. §2257** se pubblichi contenuti sessuali di performer negli USA: record-keeping. Una random chat live non “ospita video”, ma se salvi clip o fai marketing con screenshot di utenti, entri in quel regime. Parlane con un avvocato, non con questo file.
- **Pagamenti adulti.** Stripe può chiudere account adulti. Piano B: processori high-risk (CCBill, Segpay, Epoch). Commissioni alte. Chargeback alti.
- **ToS e record di consenso** al genere dichiarato, al fatto che è un sito sessuale, al divieto di minori, al divieto di registrare l’altro senza consenso.

Spoofing di genere: è il problema di prodotto n.1. Mitigazioni parziali, nessuna perfetta:

- verifica VIP più stretta per chi si dichiara donna/coppia
- modello on-device “persona in frame” (non “è una donna”: i classificatori di sesso su volto sono inaffidabili e discriminatori)
- penalità se l’altra parte skippa in <3 secondi in modo sistematico
- report + ban device

Bot e “broadcast cam”: liveness (movimento, risposta a un gesto), detection di video preregistrati è una corsa agli armamenti. Parti da rate limit e ban, non da un paper di deepfake.

---

## Monetizzazione, come la fanno questi siti

Gratis: matching base, magari con attese lunghe se cerchi il genere scarso.

VIP:

- filtro genere e paese
- priorità in coda
- maschere extra
- Back / reconnect
- niente (o pochi) ads

Prezzo tipico del settore: abbonamento settimanale / mensile, non annuale. Impulso, non loyalty.

Non vendere “donne vere garantite”. È una claim che ti espone a frode e a pubblicità ingannevole. Vendi filtri e velocità.

---

## Stack concreto per un MVP

Non è l’unico, è uno che un team piccolo può far girare.

| Pezzo | Scelta |
|---|---|
| Client | TypeScript + Vite, WebRTC nativo |
| Signaling | Node 20 + `ws`, deploy Fly.io / a VM |
| Matcher | Redis (sorted set + Lua) |
| DB | Postgres |
| TURN | coturn su una VM con IP pubblico e banda |
| Auth | cookie httpOnly, login opzionale magic-link |
| Pay | processore che accetta adult, non dare per scontato Stripe |
| Age | provider di age assurance prima di getUserMedia |
| Hosting media | nessuno, P2P |
| CDN | Cloudflare davanti all’app statica (non al WS, o usa tunnel dedicato) |

Costi a volume basso (centinaia di coppie contemporanee): server piccoli + TURN. A decine di migliaia di online, il TURN e il WS fan-out diventano il budget. Il matching in Redis resta economico.

---

## Piano di costruzione (senza scrivere il prodotto in questo repo)

Fase 0. Legale: società, ToS, privacy, age verification, processore pagamenti adulti, procedura CSAM. Se questa fase non chiude, non andare oltre.

Fase 1. Due browser sulla stessa rete, signaling locale, P2P, Next. Nessun account.

Fase 2. Coda Redis, filtri genere, presenza “online count”.

Fase 3. TURN, deploy HTTPS, mobile Safari.

Fase 4. Report, ban IP/device, rate limit, log di audit.

Fase 5. VIP + pagamenti.

Fase 6. Maschere canvas, tags, Back, intro message.

Fase 7. Multi-regione, osservabilità (match time p50/p95, ICE failure rate, % TURN, skip rate per genere).

Non invertire: un UI clone con matching rotto e senza ban è peggio di non lanciare.

---

## Metriche che dicono se “è come Flingster” o è un demo

- tempo in coda p50 / p95, spezzato per `lookingFor`
- % sessioni che arrivano a ICE `connected`
- % sessioni su TURN (costo)
- durata media chiamata prima di Next
- rapporto uomini / donne / coppie *online in coda*, non registrati
- report per 1000 match
- chargeback VIP

Se il p95 in coda per “uomo cerca donna” è minuti e per “donna cerca uomo” è zero, non hai un matcher da tunare. Hai un problema di offerta. Si risolve con acquisizione, privilegi, e a volte col rifiutare domanda in eccesso (waitroom per uomini free). Flingster e analoghi sopravvivono perché hanno già quella liquidità.

---

## Rischi da mettere in conto

- Apple/Google: una PWA adult è ok sul web. App store, quasi no.
- ISP e blacklist reputazione IP della TURN box (traffico UDP alto, categorie adult).
- DDoS sul WS: un attacco riempie la coda di fake peer. Auth + captcha su enqueue.
- Estorsione / leak: non salvare video. Minimizza i log.
- Moderatori umani bruciati: turni, EAP, niente code infinite di abuse.

---

## Sintesi operativa

Ricostruire *un* Flingster-like è un problema risolto:

**coda di matchmaking + signaling WebSocket + WebRTC P2P + TURN + VIP + moderazione 18+.**

Ricostruire *Flingster* no: brand, utenti, e policy interne non si copiano.

La domanda utile non è “si può fare il video?”. Sì. La domanda è se accetti di costruire prima età, CSAM, ban, pagamenti high-risk e un modo non ingannevole per gestire lo sbilanciamento di genere. Se la risposta è no, il sistema non è ricreabile in modo lecito, solo come prototipo locale a due tab.
