# Come ricreare un sistema tipo Flingster (a pagamento, con Yoti)

## Verdetto

**Sì, è possibile** costruire un prodotto della stessa categoria: videochat 1:1 casuale tra adulti, con skip, scelta del sesso da incontrare e filtri per tag.

**No, non è possibile** clonare Flingster. Non hai il loro codice, il matching interno, il marchio, né la base di persone online. Quello che segue è un prodotto *equivalente per funzione*, non un reverse engineering.

**Sì, è possibile** (ed è la scelta giusta) chiudere l’ingresso con Yoti e non lasciare il servizio completamente gratis.

**Sì, è possibile** assegnare il sesso da un documento verificato da Yoti, con i limiti descritti sotto. Non è “il sesso biologico in laboratorio”: è il sesso/genere stampato sul documento.

**No, Yoti non ti dà** orientamento sessuale, identità “gay”, identità “trans” nella maggior parte dei casi, né il diritto di classificare i volti. Quei filtri sono tag dichiarati dall’utente, non campi del passaporto.

Questo file è un piano di prodotto e di architettura. Non è consulenza legale e non è un’implementazione.

---

## Cosa fa Flingster oggi (superficie pubblica)

Da [flingster.com](https://flingster.com/): videochat random 1:1 nel browser, Start, camera, match, Next. Genere dichiarato (uomo / donna / coppia). Filtri genere, paese e tag di interesse. Maschere AR. Base gratis, VIP a pagamento per i filtri. Account assente o leggerissimo.

Il valore non è il codec video. Il valore è *trovare subito qualcuno* e *cambiarlo in un click*.

## Cosa cambia nel prodotto che stai descrivendo

| Flingster | Tua variante |
|---|---|
| Entri e dichiari il genere | Non entri finché Yoti non ha detto età e sesso |
| Sesso autodichiarato (spoofing massiccio) | Sesso assegnato dal documento, non editabile dall’utente |
| Matching gratis, filtri a pagamento | Niente matching gratis: serve un piano a pagamento |
| Tag di interesse opzionali | Filtri tag (gay, trans, …) come preferenza di coda |
| App store assente, solo web | Stesso vincolo: sito/PWA. L’“app Yoti” è il wallet di identità, non il tuo client |

Non è un dettaglio. Togli l’anonimato d’ingresso e il gratis, e il prodotto diventa un’altra cosa: meno volume, meno bot, più costo per utente, più dati personali, più obblighi GDPR.

---

## Cosa Yoti può e non può fare

Yoti vende tre famiglie di prodotto. Non sono intercambiabili.

### 1. Age Verification (stima viso / “over 18”)

Pensata proprio per i siti per adulti. Ti restituisce in sostanza `over18: true|false` (o un’età stimata). **Non restituisce il sesso.** Se usi solo questo, puoi chiudere i minori e **non** puoi assegnare uomo/donna.

### 2. Digital ID (app Yoti)

L’utente ha già l’app, ha caricato un documento una volta, inquadra un QR (desktop) o tocca Share (mobile). Tu chiedi gli attributi nella *share policy*:

- `age_over:18` → boolean
- `gender` → `"MALE" | "FEMALE" | "TRANSGENDER" | "OTHER"` (sesso/genere sul documento registrato in app)
- `remember_me_id` → stesso utente che torna, senza chiedere nome e codice fiscale

Questo è il flusso che corrisponde a “riconoscimento tramite app Yoti prima di entrare”.

Non chiedere nome, indirizzo, selfie, numero documento, data di nascita esatta se ti basta `over18` + `gender`. Meno dati = meno GDPR.

### 3. Identity Verification (IDV / Doc Scan)

Per chi non ha l’app: sul web, documento + selfie, liveness, face match, estrazione OCR. I campi documento includono `date_of_birth` e `gender` con lo stesso enum. Poi calcoli tu `età >= 18` dalla data e assegni il sesso.

Serve come fallback. Costa di più, frizione più alta, trattiene (temporaneamente) immagini del documento. Cancellale da Yoti e da te appena hai derivato `over18` + `sex`.

### Cosa non esce da Yoti

- **Gay / lesbica / bi / etero.** Non sono sul documento. Filtrarli è un tag scelto in piattaforma.
- **Trans, nella pratica quotidiana.** L’enum Yoti prevede `TRANSGENDER`, ma passaporti e carte d’identità (Italia: CIE e passaporto) stampano quasi sempre M o F. Una persona trans con rettifica anagrafica arriverà come M o F *nuovo*. Una senza rettifica arriverà come sesso anagrafico vecchio. Non inferire “è trans” dal volto.
- **Coppia.** Un documento = una persona. “Coppia” non è un sesso verificabile. O è un tag, o entrambi verificano e si legano a un account coppia.
- **Sesso “vero” al 100%.** Documenti senza campo sesso, OCR fallito, X/altro, errori di stato civile. Serve una policy di fallback (ripeti IDV, rifiuta, o coda “sesso non determinato” che non entra nei filtri M/F).

Yoti è usata da piattaforme adult per l’età. Il *sesso* richiede Digital ID o IDV, non la sola stima del viso. Prima di firmare, conferma con Yoti che il tuo caso (dating/webcam adult, richiesta `gender`) è accettato sul contratto, non solo sulla pagina marketing “adult content age verification”.

---

## Gate d’ingresso (ordine giusto)

Minori che pagano sono un problema peggiore dei minori che guardano. Quindi: **Yoti prima, soldi dopo, camera per ultima.**

```
landing (ToS 18+, privacy, cosa viene letto da Yoti)
    → Yoti Digital ID  (o IDV se non ha l’app)
    → server: over18? gender presente? rememberMeId già bannato?
    → se no: stop. Nessun cookie “sei dentro”.
    → se sì: account interno { yotiRememberMeId, sex, over18, verifiedAt }
    → paywall (abbonamento / crediti)
    → lobby: lookingFor (uomini / donne / entrambi) + tag
    → getUserMedia + coda matching
```

Regole dure:

- Senza sessione `verified && paid` il WebSocket di matching non accetta `enqueue`.
- `sex` è read-only. L’utente non lo cambia dal profilo.
- Rivalidazione: non a ogni Next. Sì se scade l’abbonamento, se Yoti revoca, se c’è un report grave, se `rememberMeId` è nuovo su un device già bannato.
- Selfie authentication sulla share (Yoti) riduce il prestito dell’app a un minore. Non è infallibile.

### Assegnazione sesso

```
Yoti gender     →  tuo sex (usato dal matcher)
MALE            →  male
FEMALE          →  female
TRANSGENDER     →  policy: o categoria propria, o non entra nei bucket M/F
OTHER / missing →  non matcha su filtri M/F finché non c’è un documento con M o F
```

Mostra in UI: “Sesso verificato dal documento: donna”. Non scrivere “sesso biologico confermato”. È falso e ti espone.

Tag `trans` (e `gay`, `bi`, …) restano **scelta dell’utente**, visibili solo per il matching, modificabili. Non arrivano da Yoti.

---

## Scelta uomini/donne e filtri tag

Due assi distinti. Non unirli in un unico dropdown.

### Asse 1 — sesso verificato (obbligatorio)

L’utente sceglie chi vuole vedere: uomini, donne, entrambi.

Il match è **reciproco**, altrimenti le donne verificate vengono inondate da uomini che “vogliono vedere donne” senza essere il target di lei.

```
compatibili(A, B) se e solo se
  sex(B) è in lookingFor.sexes(A)
  AND sex(A) è in lookingFor.sexes(B)
```

Esempio: uomo verificato che cerca donne matcha solo donne verificate che accettano uomini.

### Asse 2 — tag dichiarati (filtro)

Esempi di vocabolario chiuso (non testo libero: altrimenti è un cassonetto):

`gay`, `lesbian`, `bi`, `trans`, `couple`, `straight` — più quelli che vuoi, tutti adulti, tutti 18+.

Semantica consigliata:

- Nessun tag selezionato nel filtro = non filtrare su tag (resta solo il sesso).
- Uno o più tag = la controparte deve averne **almeno uno** tra i propri tag (OR). Se vuoi AND (“gay E trans”), è un toggle a parte; l’OR è quello che la gente si aspetta da “voglio vedere i tag gay oppure trans”.
- I tag dell’utente A devono essere accettati anche da B se B ha un filtro tag. Stessa reciprocità, o la coda si svuota in una direzione.

```
tag_ok(A, B) se
  (filtroTag(A) vuoto OR intersezione(filtroTag(A), tag(B)) non vuota)
  AND (filtroTag(B) vuoto OR intersezione(filtroTag(B), tag(A)) non vuota)
```

`gay` non è un sesso. Un uomo gay verificato `male` che filtra `gay` incontra altri `male` (o chi ha scelto di vedere uomini) che hanno il tag `gay`. Una donna trans verificata `female` con tag `trans` entra nelle code “donne” e, se qualcuno filtra `trans`, anche in quelle.

Non costruire un classificatore “questo viso è uomo/donna/trans”. È inaccurato, discriminatorio, e non sostituisce il documento.

### Code, non un SQL `WHERE` sul hot path

```
coda[sex][lookingForSex][tag|any]
```

O un sorted set unico in Redis e uno script Lua che poppa il primo compatibile. Atomicità obbligatoria: due “Next” nello stesso millisecondo non devono matchare la stessa persona due volte.

VIP qui è ridondante se *tutti* pagano: la priorità in coda può dipendere dal piano (base vs plus) o dall’anzianità, non da “filtro genere sbloccato”.

---

## Non completamente gratuito

Modello coerente con il gate Yoti:

1. **Abbonamento obbligatorio** per entrare in coda (settimanale / mensile, prezzi d’impulso come il resto del settore).
2. Eventuale piano plus: priorità, più tag contemporanei, reconnect, niente ads residue.
3. Yoti lo paghi tu a verifica. Scaricalo sul prezzo o sul primo mese, altrimenti i “provo e scappo” ti bruciano il margine.
4. Processore **adult / high-risk** (CCBill, Segpay, Epoch, analoghi). Stripe su webcam sessuale random si fa chiudere. Chargeback alti. Niente claim “donne vere garantite”.

Landing pubblica senza login: marketing, ToS, bottone Yoti. Dietro il bottone, zero videochat.

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
     +-- Postgres: utenti Yoti, sex, tag, pagamenti, ban
     +-- Redis: code di match
     +-- TURN (NAT che non fa P2P)
     +-- Yoti (Digital ID + IDV)
     +-- processore pagamenti adult
     +-- moderazione / report / CSAM
```

### Media

WebRTC 1:1 P2P. Il server non deve vedere i frame, salvo TURN. Un SFU (LiveKit, mediasoup) serve per stanze a più persone o registrazione server-side: qui non ti serve, e registrare è un problema legale.

### Signaling

WebSocket: SDP offer/answer, ICE candidate. Node `ws` / Socket.IO, oppure Cloudflare Durable Objects. Pochi KB. Sticky session o Redis pub/sub tra nodi.

### Matching

Redis + Lua (o un solo writer). Heartbeat 15s. `ws.close` → togli dalla coda, avvisa il peer. “Next” = teardown completo della `RTCPeerConnection`, poi re-enqueue. Non è un mute.

STUN per l’IP pubblico. TURN (coturn o Twilio / Cloudflare Calls) per il 15–30% di NAT/mobili che altrimenti vedono schermo nero. TURN è la voce di costo che scala.

### Flusso chiamata

```
1. Sessione cookie: verified + paid, altrimenti 401 sul WS
2. getUserMedia → preview
3. enqueue { lookingFor, tags }
4. matcher emette "matched" a entrambi
5. A crea offer, B answer, trickle ICE
6. video remoto + DataChannel o WS per il testo
7. Next / drop: close PC, peer_left, re-enqueue chi ha skippato
```

Maschere volto: MediaPipe nel browser, canvas, `captureStream()`. Non in cloud.

---

## Dati minimi da tenere

```
User {
  id
  yotiRememberMeId   // chiave antiban / returning, non PII anagrafica
  sex                // male | female | other   (da Yoti, immutabile)
  over18             // sempre true se è in tabella
  verifiedAt
  tags[]             // dichiarati
  lookingForSexes[]  // male / female
  lookingForTags[]   // filtro OR
  plan, paidUntil
  bans[]
}

Session { userId, ws, countryFromIp, state }  // idle|queued|rtc|banned
Pair    { a, b, startedAt }
```

Non salvare: nome, foto documento, MRZ, data di nascita, selfie Yoti. Chiedi a Yoti `age_over` + `gender` + `remember_me`. Se IDV ti consegna i media, scarica i campi, poi `deleteSession`.

IP e device hash servono per i ban. Sono dati personali: retention corta, base giuridica scritta.

Stati che il client non deve poter mentire: `sex`, `over18`, `paidUntil`. Il client manda solo `lookingFor` e `tags`.

---

## Client

Web, HTTPS, un’app pagina.

- Desktop: overlay Yoti / QR. Mobile: share in-app o handoff.
- Dopo il paywall: preview camera, Start, Next, report.
- `<video autoplay playsinline>` (iOS).
- Permessi camera solo dopo click, mai al land.
- PWA: sì. App Store / Play: webcam adult random viene rifiutata nella stragrande maggioranza dei casi. L’app Yoti resta di Yoti.

Stack ragionevole: TypeScript, Vite, `RTCPeerConnection` nativo. LiveKit solo se abbandoni il P2P.

---

## Moderazione e legge (non è un capitolo opzionale)

Sito adult + webcam random è tra i prodotti più esposti. Yoti sull’età è necessario, non sufficiente.

- **18+ reale.** Checkbox “ho 18 anni” non basta in UK (Online Safety Act) e sta sparendo altrove. Yoti (o equivalente) è il gate.
- **CSAM è reato.** Report in-app, ban device+`rememberMeId`+IP, procedura di segnalazione (NCMEC se tocchi gli USA). Hash sul materiale *segnalato* (PhotoDNA). Non campionare le chiamate live “per sicurezza” senza base legale e avviso chiaro: stai registrando sesso.
- **Non registrare** le chiamate di default. Il prodotto vende l’effimero.
- **GDPR.** Sesso e vita sessuale sono dati particolari (art. 9). Serve base giuridica, informative, DPA con Yoti e col processore, minimizzazione, diritto all’oblio, niente “teniamo il passaporto per sempre”. I tag gay/trans sono dati particolari anche se autodichiarati.
- **DSA** se sei piattaforma in UE: notice-and-action, trasparenza, punto di contatto.
- **Pagamenti adulti** e ToS: divieto minori, divieto di registrare l’altro, consenso al matching sessuale, sesso assegnato da documento.
- **§2257 USA** se pubblichi o conservi contenuti sessuali di performer. Una live effimera non è un tube; se salvi clip o usi screenshot in ads, entri in un altro regime. Avvocato, non questo file.

Spoofing genere: con Yoti sul documento crolla il classico “uomo che si dichiara donna”. Resta il prestito dell’app, i documenti non binari, le coppie, i replay di video. Mitigazioni: selfie sulla share, liveness in IDV, skip-rate, report, ban.

Bot e cam preregistrate: rate limit, una sessione video per `rememberMeId`, captcha sull’enqueue. Non partire da un detector di deepfake.

---

## Liquidità (il motivo per cui i cloni muoiono)

Yoti + pagamento **riducono** i bot e gli uomini che si fingono donne. **Riducono anche** il numero di persone in coda. Il matcher restituisce attese infinite se non c’è massa.

Metrica che conta: rapporto uomini/donne *online in coda ora*, non iscritti. Se “uomo cerca donna” ha p95 di minuti e “donna cerca uomo” ha p50 di zero, non hai un bug nel Lua. Hai un mercato.

Cose che si fanno, nessuna magica:

- waitroom per il sesso in eccesso quando l’altro bucket è vuoto
- non promettere l’altro sesso “subito”
- acquisizione sul lato scarso, non ads a caso
- tag gay/trans possono essere *più* liquidi in sottocode omogenee che il pool etero sbilanciato: progettale come code vere, non come afterthought

Senza una strategia su questo, il resto del file è un demo a due tab.

---

## Stack di riferimento (MVP, non dogma)

| Pezzo | Scelta |
|---|---|
| Client | TypeScript + Vite, WebRTC nativo |
| Signaling | Node 20 + `ws` |
| Matcher | Redis (sorted set + Lua) |
| DB | Postgres |
| TURN | coturn con IP pubblico |
| Auth sessione | cookie httpOnly dopo Yoti |
| Identità | Yoti Digital ID (`age_over` + `gender` + remember me); IDV fallback |
| Pay | processore adult, webhook → `paidUntil` |
| Hosting media | nessuno (P2P) |
| CDN | Cloudflare sul statico; WS a parte |

Costi: Yoti per verifica, processore per abbonamento, TURN per i media che non fanno P2P. Il matcher in Redis resta economico.

---

## Piano di costruzione (senza implementare qui)

Fase 0. Società, ToS, privacy art. 9, contratto Yoti (gender + adult), processore pagamenti, procedura CSAM. Se questa fase non chiude, fermati.

Fase 1. Integrazione Yoti Digital ID: share, receipt, persistenza `rememberMeId` + `sex` + `over18`. Rifiuto se under o senza gender.

Fase 2. Paywall. Nessun WS di chat senza pagamento valido.

Fase 3. Due browser, signaling, P2P, Next. Ancora senza coda globale.

Fase 4. Redis: sesso reciproco + tag OR.

Fase 5. TURN, HTTPS, Safari iOS.

Fase 6. Report, ban su `rememberMeId`, rate limit, audit log.

Fase 7. IDV fallback, maschere, reconnect, osservabilità (tempo coda p50/p95 per lookingFor e per tag, ICE fail, % TURN, report/1000 match).

Non invertire: una UI che “sembra Flingster” senza gate e senza ban è peggio di non lanciare.

---

## Cosa non è ricreabile / non è lecito

- Marchio, UI copiata, JS/API di Flingster.
- Il loro volume di online.
- Un age gate *e* il sesso usando **solo** la stima del viso Yoti.
- Verificare “gay” o “trans” come fatto anagrafico universale.
- Mettere il prodotto sulle store Apple/Google come app di sesso random.
- Operare senza CSAM, senza 18+, senza base GDPR sui dati sessuali.
- Registrare o ridistribuire gli stream senza consenso di entrambi e base legale.

---

## Sintesi

Si può fare un Flingster-like **a pagamento**, con **Yoti in ingresso** e **sesso assegnato dal documento**, più **filtro uomini/donne** e **filtro tag** (gay, trans, …) autodichiarati.

La formula tecnica è:

**Yoti (età + gender) → account immutabile sul sesso → abbonamento → coda Redis reciproca (sesso × tag) → signaling WS → WebRTC P2P + TURN → report/ban.**

Quello che non si copia è Flingster. Quello che fa fallire i tentativi leciti non è il video: è Yoti+pagamenti+moderazione fatti sul serio, e abbastanza persone *verificate* del sesso che gli altri vogliono vedere.
