# Come ricreare un sistema tipo Flingster (matching gratis, Yoti, ricerca M/F)

## Verdetto

**Sì, è possibile** costruire un prodotto della stessa categoria: videochat 1:1 casuale tra adulti, con skip, ricerca per sesso e filtri per tag.

**No, non è possibile** clonare Flingster. Non hai il loro codice, il matching interno, il marchio, né la base di persone online. Quello che segue è un prodotto *equivalente per funzione*, non un reverse engineering.

**Sì: il matching è gratis.** Dopo Yoti (18+) entri in coda senza pagare. Uomini/donne li scegli tu **ogni volta che fai una ricerca**, non li paga un piano VIP e non te li blocca il documento.

**Sì, Yoti in ingresso** per l’età. Il sesso sul documento dice *chi sei* (anti-spoof: non ti dichiari donna se il documento dice uomo). *Chi cerchi* è un controllo sulla schermata di ricerca.

**No, Yoti non ti dà** orientamento sessuale, identità “gay”, identità “trans” nella maggior parte dei casi, né il diritto di classificare i volti. Quei filtri sono tag dichiarati dall’utente, non campi del passaporto.

Il servizio non è “tutto gratis”: Yoti, TURN e moderazione costano; un piano a pagamento può coprire extra (priorità, no ads, reconnect). La coda 1:1 no. Questo file non è consulenza legale e non è un’implementazione.

---

## Cosa fa Flingster oggi (superficie pubblica)

Da [flingster.com](https://flingster.com/): videochat random 1:1 nel browser, Start, camera, match, Next. Genere dichiarato (uomo / donna / coppia). Filtri genere, paese e tag di interesse. Maschere AR. Matching base gratis, VIP a pagamento per i filtri. Account assente o leggerissimo.

Il valore non è il codec video. Il valore è *trovare subito qualcuno* e *cambiarlo in un click*.

## Cosa cambia nel prodotto che stai descrivendo

| Flingster | Tua variante |
|---|---|
| Entri e dichiari il genere | Non entri finché Yoti non ha detto che hai 18+; il documento fissa *chi sei* |
| Filtro M/F spesso dietro VIP | **Gratis, in ricerca:** prima di Start scegli uomini / donne / entrambi |
| Matching gratis, filtri extra a pagamento | **Matching sempre gratis.** Extra (ads, priorità, reconnect) eventualmente a pagamento |
| Tag di interesse | Filtri tag (gay, trans, …) sulla stessa schermata di ricerca |
| App store assente, solo web | Stesso vincolo: sito/PWA. L’“app Yoti” è il wallet di identità, non il tuo client |

Yoti toglie i minori e lo spoof “io sono donna”. Non toglie il matching gratis né sposta uomini/donne in un abbonamento.

---

## Cosa Yoti può e non può fare

Yoti vende tre famiglie di prodotto. Non sono intercambiabili.

### 1. Age Verification (stima viso / “over 18”)

Pensata per i siti per adulti. Ti restituisce `over18: true|false` (o un’età stimata). **Non restituisce il sesso.** Basta per chiudere i minori. Non basta per sapere se l’altro è uomo o donna.

### 2. Digital ID (app Yoti)

L’utente ha già l’app, ha caricato un documento una volta, inquadra un QR (desktop) o tocca Share (mobile). Tu chiedi nella *share policy*:

- `age_over:18` → boolean (obbligatorio per entrare)
- `gender` → `"MALE" | "FEMALE" | "TRANSGENDER" | "OTHER"` sul documento: serve a **chi sei**, non a compilare la ricerca
- `remember_me_id` → stesso utente che torna, senza nome e codice fiscale

Questo è il flusso “riconoscimento tramite app Yoti prima di entrare”.

Non chiedere nome, indirizzo, selfie, numero documento, data di nascita esatta se ti basta `over18` + `gender`. Meno dati = meno GDPR.

### 3. Identity Verification (IDV / Doc Scan)

Per chi non ha l’app: sul web, documento + selfie, liveness, face match, estrazione OCR. Campi: `date_of_birth` e `gender`. Calcoli `età >= 18` e memorizzi *chi sei*. Fallback più caro; cancella i media appena hai `over18` + `sex`.

### Cosa non esce da Yoti

- **Gay / lesbica / bi / etero.** Tag in piattaforma, scelti in ricerca o sul profilo.
- **Trans, nella pratica.** L’enum Yoti prevede `TRANSGENDER`, ma CIE e passaporto italiani stampano quasi sempre M o F. Non inferire “è trans” dal volto. Tag `trans` in ricerca.
- **Coppia.** Un documento = una persona. Tag, oppure due verifiche legate.
- **Chi stai cercando.** Yoti non ha un campo “voglio vedere donne”. Quello lo seleziona l’utente sulla UI di ricerca.

Yoti è usata da piattaforme adult per l’età. Il *sesso documento* richiede Digital ID o IDV. Conferma sul contratto che dating/webcam adult + attributo `gender` è accettato.

---

## Gate d’ingresso (ordine giusto)

```
landing (ToS 18+, privacy, cosa legge Yoti)
    → Yoti Digital ID  (o IDV se non ha l’app)
    → server: over18? rememberMeId già bannato?
    → se no: stop. Nessun cookie “sei dentro”.
    → se sì: account { yotiRememberMeId, sexDocumento, over18, verifiedAt }
    → schermata ricerca (gratis):
         Voglio vedere:  ( ) uomini  ( ) donne  ( ) entrambi
         Tag (opzionale): gay, trans, …
         [ Start ]
    → getUserMedia + coda matching
```

Niente paywall tra Yoti e la coda. Pagare, se esiste un piano, è per extra, non per matchare.

Regole dure:

- Senza sessione `verified` il WebSocket non accetta `enqueue`. **Non** serve `paid`.
- `sexDocumento` è read-only (anti-spoof su *chi sei*). Non è il selettore della ricerca.
- `lookingFor` e i tag filtro arrivano **solo** dal form di ricerca, a ogni Start / cambio filtri. L’utente può cercare donne, poi Next, poi cercare uomini, senza rifare Yoti.
- Rivalidazione Yoti: non a ogni Next. Sì se Yoti revoca, report grave, `rememberMeId` nuovo su device bannato.
- Selfie sulla share Yoti riduce il prestito dell’app a un minore. Non è infallibile.

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

| Gratis (dopo Yoti 18+) | Eventuale piano a pagamento |
|---|---|
| Entrare in coda | Priorità in coda |
| Selezionare uomini / donne / entrambi in ricerca | Niente (o pochi) ads |
| Next / skip | Reconnect / Back |
| Tag di ricerca (se li vuoi nel piano free) | Tag extra, location, maschere |

Matching **mai** dietro abbonamento. Processore **adult / high-risk** (CCBill, Segpay, Epoch) solo se vendi extra. Stripe su webcam sessuale random si fa chiudere. Niente claim “donne vere garantite”.

Yoti lo paghi tu a verifica. Matching gratis + verifica a pagamento tuo è un costo: rate-limit sugli account nuovi, `rememberMeId` per non rifare Yoti ogni visita.

Landing: marketing, ToS, bottone Yoti. Dietro Yoti: ricerca e matching, non un checkout.

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
     +-- Postgres: utenti Yoti, sexDocumento, tag profilo, extra pagati, ban
     +-- Redis: code di match (lookingFor arriva dall’enqueue)
     +-- TURN (NAT che non fa P2P)
     +-- Yoti (Digital ID + IDV)
     +-- processore pagamenti adult (solo extra)
     +-- moderazione / report / CSAM
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

- Overlay Yoti / QR, poi **form di ricerca** (uomini / donne / entrambi + tag), poi camera.
- Start, Next, report. Cambiare M/F = aggiorna i radio e Start di nuovo (o un “Applica filtri” che fa dequeue/enqueue).
- `<video autoplay playsinline>` (iOS).
- Permessi camera dopo click Start, mai al land.
- PWA sì. App Store / Play: webcam adult random di solito rifiutata. L’app Yoti resta di Yoti.

Stack: TypeScript, Vite, `RTCPeerConnection` nativo.

---

## Moderazione e legge (non è un capitolo opzionale)

Sito adult + webcam random è esposto. Matching gratis aumenta volume e abuso: il gate Yoti resta.

- **18+ reale.** Checkbox “ho 18 anni” non basta in UK (Online Safety Act) e sta sparendo altrove.
- **CSAM è reato.** Report, ban device+`rememberMeId`+IP, NCMEC se tocchi gli USA. PhotoDNA sul *segnalato*. Non campionare le live senza base legale: stai registrando sesso.
- **Non registrare** le chiamate di default.
- **GDPR art. 9.** Sesso documento e tag gay/trans sono dati particolari. Informative, DPA, minimizzazione, oblio.
- **DSA** in UE: notice-and-action, contatto.
- **ToS:** minori, no registrare l’altro, matching sessuale, *chi sei* da documento, *chi cerchi* scelto in ricerca.
- **§2257 USA** se conservi o pubblichi contenuti sessuali di performer. Avvocato, non questo file.

Spoof “io sono donna”: lo tiene a bada `sexDocumento`, non il radio “voglio vedere”. Resta prestito app, replay, coppie. Mitigazioni: selfie share, liveness IDV, skip-rate, report, ban.

Bot: rate limit, una sessione video per `rememberMeId`, captcha sull’enqueue. Matching gratis senza questo riempie la coda di spazzatura.

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
| Auth sessione | cookie httpOnly dopo Yoti (`verified`, non `paid`) |
| Identità | Yoti Digital ID (`age_over` + `gender` chi sei + remember me); IDV fallback |
| Pay | opzionale, extra; il matcher non legge `paidUntil` |
| Hosting media | nessuno (P2P) |
| CDN | Cloudflare sul statico; WS a parte |

Costi: Yoti a verifica, TURN sul traffico del matching gratis. Extra a pagamento se ti servono a coprire Yoti.

---

## Piano di costruzione (senza implementare qui)

Fase 0. Società, ToS, privacy art. 9, contratto Yoti (età + gender documento), procedura CSAM. Processore pagamenti solo se vendi extra.

Fase 1. Yoti Digital ID: `rememberMeId` + `over18` + `sexDocumento`. Stop se under.

Fase 2. UI ricerca: uomini / donne / entrambi + Start. WS enqueue con `lookingFor`. **Nessun paywall.**

Fase 3. Due browser, signaling, P2P, Next.

Fase 4. Redis: match reciproco `sexDocumento` × `lookingFor` + tag OR.

Fase 5. TURN, HTTPS, Safari iOS.

Fase 6. Report, ban su `rememberMeId`, rate limit, captcha.

Fase 7. IDV fallback, extra a pagamento se li vuoi, maschere, osservabilità (coda p50/p95 per lookingFor e tag, ICE fail, % TURN).

Non invertire: UI senza gate e senza ban è peggio di non lanciare.

---

## Cosa non è ricreabile / non è lecito

- Marchio, UI copiata, JS/API di Flingster.
- Il loro volume di online.
- Età **e** sesso documento usando **solo** la stima del viso Yoti.
- Verificare “gay” o “trans” come fatto anagrafico universale.
- Far scegliere uomini/donne a Yoti al posto dell’utente: Yoti non è un form di ricerca.
- App Store / Play come app di sesso random.
- Operare senza CSAM, senza 18+, senza base GDPR.
- Registrare o ridistribuire gli stream senza consenso di entrambi e base legale.

---

## Sintesi

Si può fare un Flingster-like con **Yoti in ingresso (18+ e chi sei sul documento)**, **matching gratis**, **uomini/donne scelti in ricerca** e **tag** autodichiarati.

**Yoti (età + sesso documento) → form ricerca (lookingFor M/F + tag) → coda Redis reciproca gratis → signaling WS → WebRTC P2P + TURN → report/ban.**

Non si copia Flingster. Il video è la parte facile. Quello che tiene in piedi il prodotto è il gate 18+, il selettore di ricerca che la gente capisce, e abbastanza persone *verificate* del sesso che gli altri hanno spuntato su “voglio vedere”.
