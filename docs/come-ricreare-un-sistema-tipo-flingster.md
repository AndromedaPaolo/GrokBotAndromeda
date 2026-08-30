# Come ricreare un sistema tipo Flingster (matching gratis, gate 18+ reale)

## Verdetto

Requisito principale: **18+ reale**, non un checkbox e non “sembra maggiorenne”.

**18+ reale** = data di nascita su documento autentico + liveness + face match. Dettaglio: `docs/gate-18-piu-reale.md`.

**Sì, è possibile** costruire un prodotto della stessa categoria: videochat 1:1 casuale tra adulti, con skip, ricerca per sesso e filtri per tag, **dopo** quel gate.

**No, non è possibile** clonare Flingster. Non hai il loro codice, il matching interno, il marchio, né la base di persone online.

**Sì: il matching è gratis** dopo il gate. Uomini/donne li scegli tu **in ricerca**, non un VIP.

**Sesso dal documento:** opzionale. Non serve per l’età. Se lo vuoi, è anti-spoof su *chi sei*; *chi cerchi* resta il form.

**Stima età dal viso:** non soddisfa “realmente”. Lascia `age_estimation` spento.

Strumenti: Didit ID (500/mese $0) o Yoti OVER 18 con **doc scan / Digital ID da documento**. In live i siti random **non** sanno l’età del peer (P2P + checkbox + report); questa proposta fa il documento in ingresso e il report umano in chiamata.

Questo file non è consulenza legale e non è un’implementazione.

---

## Cosa fa Flingster oggi (superficie pubblica)

Da [flingster.com](https://flingster.com/): videochat random 1:1 nel browser, Start, camera, match, Next. Overlay 18+ da checkbox, **niente documento**. Genere dichiarato (uomo / donna / coppia). Filtri genere, paese e tag. Maschere AR. Matching base gratis, VIP per i filtri. Il server in live **non** verifica l’età del peer (video P2P).

Il valore non è il codec video. Il valore è *trovare subito qualcuno* e *cambiarlo in un click*.

## Cosa cambia nel prodotto che stai descrivendo

| Flingster | Tua variante |
|---|---|
| Checkbox 18+ / niente ID | **Gate 18+ reale:** documento + liveness + face match (Didit o Yoti doc). Stima viso spenta |
| Entri e dichiari il genere | Il genere in ricerca lo scegli tu a ogni Start. Il documento *può* fissare chi sei, non è il requisito principale |
| Filtro M/F spesso dietro VIP | **Gratis, in ricerca:** uomini / donne / entrambi |
| Matching gratis, filtri extra a pagamento | **Matching sempre gratis.** Extra eventualmente a pagamento |
| Tag di interesse | Filtri tag (gay, trans, …) sulla stessa schermata di ricerca |
| App store assente, solo web | Stesso vincolo: sito/PWA |

Il gate toglie i minori in **ingresso**. In **chiamata** il video resta P2P: il server non vede i pixel. Sotto è come lavorano i siti random, e cosa fa invece questa proposta.

---

## Minori: come fanno i siti random (e cosa fa questa proposta)

Due domande diverse. I cloni Omegle mescolano tutto in un checkbox.

| | Ingresso (prima di Start) | In chiamata (peer già collegato) |
|---|---|---|
| Domanda | Questo *account* ha 18+? | Questa *faccia davanti alla webcam adesso* ha 18+? |
| Flingster / Chatroulette / analoghi | Checkbox “ho 18 anni” + ToS. Nessun documento. Chatroulette “Candid” = c’è un viso, non quanti anni ha | Quasi niente di automatico. Skip, report, ban IP. Moderatori solo sugli stream *segnalati* |
| Questa proposta | **Documento autentico + liveness + face match.** Stima viso spenta. Senza `over18` niente coda | Stesso P2P: il server **non** guarda il video. Report “minore” → coda umana, mai auto-ban da modello. Niente registrazione di tutte le live |

Il video è WebRTC peer-to-peer: va da browser A a browser B. Il server vede signaling (`next`, `report`), non i frame. Per “vedere se è minorenne” in diretta dovresti far passare tutto il media da te: costi TURN e stai trattando sesso. Quasi nessuno dei siti random lo fa su ogni match. Omegle è morto anche per anonimato + minori senza gate.

**In chiamata loro (e tu, sul P2P) non certificano l’età del peer.** Certificano, nel migliore dei casi, che qualcuno ha cliccato 18+ o — qui — che un documento ha passato il gate. Il resto è segnalazione.

Report in questa proposta:

- Bottone evidente, motivo “minore / abuso” in cima.
- Snapshot solo se il ToS lo dice, solo su report, verso coda umana. **Mai auto-ban** su “sembra minore”: distrugge gli adulti baby-face e non ferma i 17enni che sembrano 22.
- Ban su id provider + device + IP.
- Prestito account (adulto verifica, poi si siede un minore): nessuno lo chiude al 100%. Liveness all’ingresso + re-check su report, non uno scanner a ogni Next.
- Sospetto CSAM: segnalazione alle autorità (NCMEC se USA), non un Next. PhotoDNA sul *segnalato*. Non campionare tutte le chat “per controllo età”.

UK OSA e analoghi: i minori non devono *incontrare* il porno; il controllo efficace è **prima di entrare**. Checkbox da solo non basta in quei Paesi. Questa proposta allinea il gate a quello, non a Flingster.

Approfondimento: `docs/come-i-siti-videochat-rilevano-minori.md`, `docs/gate-18-piu-reale.md`.

---

## Gate 18+ (priorità)

**18+ reale** = data di nascita su documento autentico + liveness + face match. Conservi solo `over18: true` e un id opaco. Butti DoB e immagini.

| Metodo | In questa proposta |
|---|---|
| Checkbox “ho 18 anni” | No. È quello che fanno Flingster/Chatroulette. Non è reale. |
| Stima età dal viso | **Spenta.** Un 16enne che sembra 23 passa. |
| Carta di credito / cellulare | No. Non è prova d’età. |
| Didit ID + liveness passive + face match | Sì. 500 sessioni/mese $0, poi ~$0.33. Dal documento: DoB → `età >= 18`. Non attivare Age Estimation. |
| Yoti `OVER` 18 con `doc_scan` / Digital ID **da documento** | Sì. `age_estimation.allowed: false`. |

Didit: [help free plan](https://help.didit.me/getting-started/free-plan). Yoti: prodotto adult, conferma webcam sul contratto. OCR self-host senza autenticità del documento **non** è 18+ reale (foto del passaporto di un altro).

## Cosa Yoti può e non può fare

Yoti vende tre famiglie di prodotto. Non sono intercambiabili.

### 1. Age Verification (prodotto “adult”)

Sessione `OVER` 18. Due metodi **diversi**:

- **Doc scan / Digital ID da documento** → 18+ reale. Questo.
- **Age estimation (viso)** → non è reale. `allowed: false`.

Ti basta il boolean over 18. Non ti serve il sesso per il gate.

### 2. Digital ID (app Yoti)

L’utente ha già l’app, ha caricato un documento una volta, inquadra un QR (desktop) o tocca Share (mobile). Tu chiedi nella *share policy*:

- `age_over:18` → boolean (obbligatorio per entrare)
- `gender` → `"MALE" | "FEMALE" | "TRANSGENDER" | "OTHER"` sul documento: serve a **chi sei**, non a compilare la ricerca
- `remember_me_id` → stesso utente che torna, senza nome e codice fiscale

Questo è il flusso “riconoscimento tramite app Yoti prima di entrare”.

Non chiedere nome, indirizzo, selfie, numero documento, data di nascita esatta se ti basta `over18`. `gender` solo se vuoi l’anti-spoof chi-sei.

### 3. Identity Verification (IDV / Doc Scan)

Per chi non ha l’app: sul web, documento + selfie, liveness, face match. Campo che conta: `date_of_birth` → `over18`. Cancella i media dopo.

### Cosa non esce da Yoti

- **Gay / lesbica / bi / etero.** Tag in piattaforma, scelti in ricerca o sul profilo.
- **Trans, nella pratica.** L’enum Yoti prevede `TRANSGENDER`, ma CIE e passaporto italiani stampano quasi sempre M o F. Non inferire “è trans” dal volto. Tag `trans` in ricerca.
- **Coppia.** Un documento = una persona. Tag, oppure due verifiche legate.
- **Chi stai cercando.** Yoti non ha un campo “voglio vedere donne”. Quello lo seleziona l’utente sulla UI di ricerca.

Yoti è usata da piattaforme adult per l’età. Per “realmente 18+” usa doc/Digital ID, non la stima. Conferma sul contratto il caso webcam.

---

## Gate d’ingresso (ordine giusto)

```
landing (ToS 18+, privacy, chi è il provider)
    → Didit ID o Yoti doc/Digital ID (stima viso OFF)
    → documento autentico + liveness + face match
    → server: età da DoB >= 18? id già bannato?
    → se no: stop. Nessun cookie “sei dentro”.
    → se sì: account { providerUserId, over18, verifiedAt }
         sexDocumento solo se lo chiedi esplicitamente
    → schermata ricerca (gratis):
         Voglio vedere:  ( ) uomini  ( ) donne  ( ) entrambi
         Tag (opzionale): gay, trans, …
         [ Start ]
    → getUserMedia + coda matching
```

Niente paywall tra il gate 18+ e la coda. Pagare, se esiste un piano, è per extra, non per matchare.

Regole dure:

- Senza sessione `verified` il WebSocket non accetta `enqueue`. **Non** serve `paid`.
- `sexDocumento` è opzionale (stesso scan ID, campo extra). Se c’è, è read-only. Non è il selettore della ricerca.
- `lookingFor` e i tag filtro arrivano **solo** dal form di ricerca, a ogni Start / cambio filtri.
- Rivalidazione: non a ogni Next. Sì se il provider revoca, report grave, stesso volto su account bannato.
- Liveness alla verifica riduce il prestito dell’account a un minore. Non è infallibile (qualcuno può sedersi dopo).

### Chi sei (documento) vs chi cerchi (ricerca)

```
Yoti gender     →  sexDocumento (identità, non UI di ricerca)
MALE            →  male
FEMALE          →  female
TRANSGENDER     →  policy (categoria propria o fuori dai bucket M/F)
OTHER / missing →  policy di fallback; può comunque cercare M/F
```

Non mostrare “sesso biologico confermato”. Eventuale label: “Documento: donna”. Falso e rischioso il resto.

---

## Ricerca: uomini/donne e tag

Due controlli sulla **stessa schermata di ricerca**, prima di Start. Non un profilo bloccato e non un paywall.

### 1 — Voglio vedere (gratis, obbligatorio per Start)

Radio o multi-select:

- Uomini
- Donne
- Entrambi

Il client manda `lookingFor: ['male'] | ['female'] | ['male','female']` sull’`enqueue`. Il server **non** lo deriva da Yoti.

Match **reciproco**, altrimenti chi è `female` sul documento viene inondato da chi ha spuntato solo “donne”:

```
compatibili(A, B) se e solo se
  sexDocumento(B) è in lookingFor(A)     // A ha chiesto di vedere il sesso di B
  AND sexDocumento(A) è in lookingFor(B) // B ha chiesto di vedere il sesso di A
```

Esempio: documento uomo, in ricerca ha selezionato “donne” → solo documenti donna che in *quella* ricerca hanno selezionato “uomini” (o entrambi).

Se A ha scelto “entrambi”, accetta male e female; B deve comunque aver incluso il sesso di A nel proprio `lookingFor`.

### 2 — Tag (filtro di ricerca)

Vocabolario chiuso, stessi 18+: `gay`, `lesbian`, `bi`, `trans`, `couple`, `straight`, …

- Nessun tag = non filtrare sui tag (resta solo “voglio vedere”).
- Uno o più tag = la controparte ha **almeno uno** di quei tag (OR). AND (“gay E trans”) è un toggle a parte.
- Reciprocità anche sui tag, o la coda si svuota in una direzione.

```
tag_ok(A, B) se
  (filtroTag(A) vuoto OR intersezione(filtroTag(A), tag(B)) non vuota)
  AND (filtroTag(B) vuoto OR intersezione(filtroTag(B), tag(A)) non vuota)
```

I tag sul *proprio* profilo (cosa sei disposto a far vedere) e i tag *filtro* (cosa cerchi adesso) sono due liste. Il filtro vive sulla ricerca; il profilo può avere default, sovrascrivibili prima di Start.

Non classificare i volti uomo/donna/trans.

### Code

```
coda[sexDocumento][lookingForKey][tag|any]
```

`lookingForKey` cambia quando l’utente cambia il selettore e preme Start di nuovo: dequeue dal bucket vecchio, enqueue in quello nuovo.

Redis + Lua, pop atomico. Due “Next” nello stesso ms non matchano la stessa persona due volte.

Nessun “sblocca genere col VIP”: il selettore M/F è gratis. Un piano plus, se c’è, può dare priorità in coda o più tag, non il diritto di scegliere uomini/donne.

---

## Gratis vs a pagamento

| Gratis (dopo gate 18+ documento) | Eventuale piano a pagamento |
|---|---|
| Entrare in coda | Priorità in coda |
| Selezionare uomini / donne / entrambi in ricerca | Niente (o pochi) ads |
| Next / skip | Reconnect / Back |
| Tag di ricerca (se li vuoi nel piano free) | Tag extra, location, maschere |

Matching **mai** dietro abbonamento. Processore **adult / high-risk** (CCBill, Segpay, Epoch) solo se vendi extra. Stripe su webcam sessuale random si fa chiudere. Niente claim “donne vere garantite”.

Landing: marketing, ToS, bottone verifica 18+ (Didit o Yoti). Dietro il gate: ricerca e matching, non un checkout.

Yoti/Didit li paghi tu a verifica (Didit: 500/mese $0). Matching gratis + IDV a carico tuo: rate-limit sui nuovi, id provider per non rifare il documento ogni visita.

---

## Architettura (il video, che è la parte facile)

Quattro piani. Non mischiarli.

```
[Browser A]  <--WebRTC media P2P-->  [Browser B]
     ^                                    ^
     | WebSocket signaling                |
     v                                    v
[signaling + matcher]
     |
     +-- Postgres: over18, id provider, tag, extra, ban
     +-- Redis: code di match
     +-- TURN
     +-- Didit e/o Yoti (ID + liveness, stima viso OFF)
     +-- processore pagamenti adult (solo extra)
     +-- coda report / CSAM (umani su “minore”)
```

### Media

WebRTC 1:1 P2P. Il server non deve vedere i frame, salvo TURN. Un SFU serve per stanze o registrazione: qui no, e registrare è un problema legale.

### Signaling

WebSocket: SDP offer/answer, ICE candidate. Node `ws` / Socket.IO, oppure Cloudflare Durable Objects. Sticky session o Redis pub/sub.

### Matching

Redis + Lua. Heartbeat 15s. `ws.close` → togli dalla coda, avvisa il peer. “Next” = teardown `RTCPeerConnection`, poi re-enqueue **con gli stessi lookingFor/tag della ricerca in corso** (o rimostra il form se vuoi che li cambi).

STUN per l’IP pubblico. TURN (coturn o Twilio / Cloudflare Calls) per il 15–30% di NAT/mobili. TURN è la voce di costo che scala col matching gratis: più gente in coda, più relay.

### Flusso chiamata

```
1. Cookie: verified (18+). paid non serve per enqueue
2. UI ricerca: lookingFor + tag → Start
3. getUserMedia → preview
4. enqueue { lookingFor, tags }     // scelti adesso, non da Yoti
5. matcher emette "matched" a entrambi
6. A crea offer, B answer, trickle ICE
7. video remoto + DataChannel o WS per il testo
8. Next / drop: close PC, peer_left, re-enqueue o torna al form ricerca
```

Maschere volto: MediaPipe nel browser, canvas, `captureStream()`. Non in cloud.

---

## Dati minimi da tenere

```
User {
  id
  yotiRememberMeId   // antiban / returning
  sexDocumento       // male | female | other  (Yoti, immutabile; chi sei)
  over18
  verifiedAt
  tags[]             // dichiarati sul profilo (cosa mostri)
  plan, paidUntil    // extra, nullable; matching ignora questo campo
  bans[]
}

// Non persistiti come “identità”; vivono sulla sessione di ricerca:
Search { lookingForSexes[], lookingForTags[] }

Session { userId, ws, lookingFor, filtroTag, countryFromIp, state }
Pair    { a, b, startedAt }
```

Non salvare: nome, foto documento, MRZ, data di nascita, selfie Yoti. Share: `age_over` + `gender` + `remember_me`. IDV: campi, poi `deleteSession`.

IP e device hash per i ban: dati personali, retention corta.

Il client **non** può mentire su `sexDocumento` e `over18`. **Può** (deve) mandare `lookingFor` e filtri tag a ogni ricerca.

---

## Client

Web, HTTPS, una pagina.

- Overlay verifica 18+ (Didit/Yoti), poi **form di ricerca**, poi camera.
- Start, Next, **report** (motivo minore in evidenza). Cambiare M/F = Start di nuovo.
- `<video autoplay playsinline>` (iOS).
- Permessi camera dopo click Start, mai al land.
- PWA sì. App Store / Play: webcam adult random di solito rifiutata.

Stack: TypeScript, Vite, `RTCPeerConnection` nativo.

---

## Moderazione e legge (non è un capitolo opzionale)

Sito adult + webcam random è esposto. Matching gratis aumenta volume. Il gate documento è l’ingresso; in live vale la sezione **Minori** sopra.

- **18+ reale in ingresso.** Checkbox e stima viso non bastano (UK OSA: i bambini non devono incontrare il porno *prima* del check).
- **In chiamata: report, non scanner.** P2P: il server non vede i frame. “Minore” → coda umana, ban id+device+IP. Niente auto-ban da AI sul viso. Niente tap di tutte le live.
- **CSAM è reato.** Segnalazione (NCMEC se USA). PhotoDNA sul *segnalato*. Non campionare le live “per sicurezza”: stai registrando sesso.
- **Non registrare** le chiamate di default.
- **GDPR art. 9** se tieni sesso documento o tag gay/trans. Per il solo `over18` minimizza: niente DoB in chiaro.
- **DSA** in UE: notice-and-action, contatto.
- **ToS:** minori, no registrare l’altro, matching sessuale, gate documento, *chi cerchi* in ricerca, prestito account vietato.
- **§2257 USA** se conservi o pubblichi contenuti sessuali di performer. Avvocato, non questo file.

Spoof “io sono donna”: solo se persistì `sexDocumento` dallo stesso ID. Resta prestito account, replay. Mitigazioni: liveness all’IDV, skip-rate, report, ban.

Bot: rate limit, una sessione video per id verificato, captcha sull’enqueue.

---

## Liquidità

Yoti riduce bot e spoof. Matching **gratis** aiuta la massa in coda (senza massa il matcher è vuoto). Il selettore M/F gratis sposta comunque quasi tutti gli uomini su “donne”: il p95 “cerca donne” resta il problema.

Metrica: rapporto `sexDocumento` *in coda ora*, spezzato per `lookingFor`. Se “cerca donne” è minuti e “cerca uomini” è zero, non è il Lua.

- waitroom sul lookingFor saturo quando l’altro bucket è vuoto
- non promettere “subito solo donne”
- tag gay/trans come code vere

Senza questo il file è un demo a due tab.

---

## Stack di riferimento (MVP, non dogma)

| Pezzo | Scelta |
|---|---|
| Client | TypeScript + Vite, WebRTC nativo, form ricerca M/F prima di Start |
| Signaling | Node 20 + `ws` |
| Matcher | Redis (sorted set + Lua), chiave da `lookingFor` dell’enqueue |
| DB | Postgres |
| TURN | coturn con IP pubblico |
| Auth sessione | cookie httpOnly dopo IDV 18+ (`over18`, non `paid`) |
| Identità | Didit ID o Yoti doc/Digital ID; solo `over18` (+ id opaco). Stima viso OFF |
| Pay | opzionale, extra; il matcher non legge `paidUntil` |
| Hosting media | nessuno (P2P) |
| CDN | Cloudflare sul statico; WS a parte |

Costi: IDV a verifica (Didit 500/mese $0 poi ~$0.33, o Yoti a sessione), TURN sul matching gratis.

---

## Piano di costruzione (senza implementare qui)

Fase 0. Società, ToS, privacy, contratto Didit o Yoti (adult + 18+ da documento), procedura CSAM. Processore pagamenti solo se vendi extra.

Fase 1. Gate 18+ reale: ID + liveness + face match. Solo `over18` + id opaco. Stima viso spenta. Stop se under.

Fase 2. UI ricerca: uomini / donne / entrambi + Start. WS enqueue con `lookingFor`. **Nessun paywall.**

Fase 3. Due browser, signaling, P2P, Next.

Fase 4. Redis: `lookingFor` (+ `sexDocumento` solo se lo persistì dallo stesso ID) + tag OR.

Fase 5. TURN, HTTPS, Safari iOS.

Fase 6. Report (priorità “minore” → umani, mai auto-ban viso), ban su id provider, rate limit, captcha. Procedura CSAM.

Fase 7. Extra a pagamento se li vuoi, maschere, osservabilità (coda p50/p95 per lookingFor e tag, ICE fail, % TURN).

Non invertire: UI senza gate e senza ban è peggio di non lanciare.

---

## Cosa non è ricreabile / non è lecito

- Marchio, UI copiata, JS/API di Flingster.
- Il loro volume di online.
- Dichiarare 18+ con **solo** stima del viso o checkbox.
- Verificare “gay” o “trans” come fatto anagrafico universale.
- Far scegliere uomini/donne a Yoti al posto dell’utente: Yoti non è un form di ricerca.
- App Store / Play come app di sesso random.
- Operare senza CSAM, senza 18+, senza base GDPR.
- Registrare o ridistribuire gli stream senza consenso di entrambi e base legale.

---

## Sintesi

Si può fare un Flingster-like con **18+ reale in ingresso** (documento, non stima), **matching gratis**, **uomini/donne scelti in ricerca** e **tag** autodichiarati.

**IDV (Didit/Yoti doc) → over18 → form ricerca → coda Redis gratis → WS + WebRTC P2P → report umano in live (niente scanner sul video).**

Flingster non certifica l’età di chi è collegato. Questa proposta certifica l’account in ingresso e, in chiamata, fa quello che si può fare in P2P: segnalazione, non magia sul viso.
