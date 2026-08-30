# Come i siti di videochat random sanno (o non sanno) se chi è collegato è minorenne

Domanda: in una random videochat, come controllano se la persona **in chiamata** è minorenne.

Risposta corta: **nella stragrande maggioranza dei casi non lo sanno.** Non c’è un radar sul viso in live che certifichi l’età. Funzionano a strati deboli in ingresso, a report durante, e a ban dopo. Un 18+ *reale* (documento) è l’eccezione recente, non lo standard Flingster/Chatroulette/Omegle.

Niente di questo è un manuale per eludere i gate né per classificare minori. È come lavora il settore, e perché il tuo requisito “18+ realmente” è più stretto di quello che fanno loro.

---

## Due problemi diversi

| | Ingresso (prima di Start) | In chiamata (peer già collegato) |
|---|---|---|
| Domanda | Questo *account* ha 18+? | Questa *faccia davanti alla webcam adesso* ha 18+? |
| Cosa fanno i siti classici | Checkbox “ho 18 anni” + ToS | Quasi niente di automatico |
| Cosa può fare un gate serio | Documento + liveness + face match | Molto poco, se il video è P2P |

Il caso che i checkbox non coprono: un maggiorenne verifica (o clicca 18+), poi si alza e ci si mette un minore. Nessun sito di random chat chiude questo al 100%.

---

## Cosa fanno davvero i siti “tipo Flingster”

### 1. Non guardano il video

Architettura standard: **WebRTC P2P**. Il filmato va da browser A a browser B. Il server vede signaling (SDP, “next”, “report”), non i pixel. Senza SFU, TURN con tap, o un client che invia frame, **non possono** “vedere se è minorenne” in diretta.

Per ispezionare la live dovresti far passare il media da te: costo TURN, e stai trattando (spesso registrando) sesso. Quasi nessuno dei cloni Omegle lo fa su tutte le chiamate.

### 2. Checkbox e fede

Chatroulette, Flingster e analoghi: overlay “18+”, accetti i ToS, Start. Nessun documento. Recensioni 2026 di Chatroulette: confermi l’età, dai la camera, sei dentro. **Candid mode** di Chatroulette è “c’è un viso in camera?”, non “quanti anni ha”. Serve a ridurre i flash, non a certificare l’età.

Omegle è morto anche per questo: anonimato + minori + CSAM, senza gate vero.

Uno studio accademico vecchio su Chatroulette (SafeVchat, 2011) stimava visivamente una fetta alta di minori in fascia serale: il sito *non* li bloccava in ingresso.

### 3. Report dell’altro utente

È il controllo principale **in chiamata**:

- Bottone report / skip
- A volte uno snapshot (se il ToS lo prevede) verso una coda
- Ban di IP, cookie, device fingerprint

Non è “il sito ha capito l’età”. È “qualcuno ha detto che c’era un minore / abuso”. Falsi report e mancati report sono la norma.

### 4. Moderatori umani su segnalazioni (non su tutto il traffico)

Chatroulette ha dichiarato team di moderazione su stream *flaggati*, ordine di ~100 persone, non su ogni match. Su NSFW live 24/7 non scala: bruci i moderator e, se campioni a caso, stai guardando sesso senza un report.

Policy seria (es. writeup pubblici di app di videochat): se il modello o un utente dice **possible minor**, **mai auto-ban**. Coda umana. Auto-ban su “sembra minore” distrugge adulti baby-face e non ferma i 17enni che sembrano 22.

### 5. Stima età su frame (pochi, e non è “reale”)

Vendor di moderazione (Lasso, filtri “age detection” su live) vendono: ogni N secondi un frame → fascia under-13 / 13–17 / 18+.

Limiti, gli stessi della stima in ingresso:

- Errore alto vicino ai 18 anni (proprio dove serve)
- Trucco, luce, maschere AR, angolo
- Il client può non mandare i frame veri (injection, camera virtuale)
- Per averli il server deve vederli: P2P puro non basta

I siti adult regolati (UK OSA) stanno mettendo **age assurance in ingresso** (stima viso, ID, a volte carta). Non è “durante ogni Next controlliamo il peer”. Ofcom: i bambini non devono *incontrare* il porno; il controllo è **prima** di entrare, metodi deboli (solo dichiarazione) non bastano *in UK*. Molti siti extra-UK restano al checkbox.

### 6. CSAM, non “età”

Obbligo vero, diverso dall’age gate: se hai motivo di credere che ci sia materiale di abuso su minore, è un reato da segnalare (NCMEC in USA, autorità locali in UE), non un “Next”. Hash tipo PhotoDNA sul *materiale conservato o segnalato*. Campionare tutte le live “per vedere se è un bambino” senza base legale è un altro problema (stai registrando).

---

## Cosa *non* sanno fare

- Leggere l’età anagrafica dal WebRTC.
- Distinguere con certezza 17 vs 19 dal viso in 2 secondi di match.
- Impedire che dopo un IDV fatto da un adulto si sieda un minore (prestito account). Mitigazioni parziali: liveness alla verifica, re-check a report, non a ogni Next.
- Usare il classificatore sesso/età sul volto come prova in tribunale.

---

## Come si traduce sul prodotto che stai descrivendo

Se il requisito è **18+ realmente**, fai quello che **loro non fanno**:

1. **Ingresso:** documento + liveness + face match (`docs/gate-18-piu-reale.md`). Didit o Yoti doc, stima viso spenta.
2. **In chiamata:** resti P2P. Non fingere di “vedere” l’età. Report evidente, priorità assoluta se la segnalazione è “minore”, coda umana, ban su id provider + device + IP. **Niente auto-ban da modello viso.**
3. **Prestito account:** non risolvibile al 100%. ToS + re-verifica su report, non uno scanner continuo della chat.
4. **Non** registrare le chiamate per “controllare i minori”. Conserva solo ciò che un report + avvocato ti dicono di tenere.

I siti random sopravvivono (o sopravvivevano) perché **non** certificano l’età del peer collegato. Certificano, nel migliore dei casi, che *qualcuno ha cliccato 18+* o, dal 2025 in certi Paesi, che *un viso o un documento ha passato un gate in ingresso*. Il resto è skip e segnalazione.
