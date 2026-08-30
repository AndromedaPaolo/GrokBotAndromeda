# Ricerca: liveness gratuito per chi lo adotta

Data: 2026-08-30. Solo ricerca, nessuna integrazione.

Domanda: esiste un servizio di **liveness** (la persona in camera è viva, non una foto/video/maschera) **gratis per chi lo integra** nel prodotto.

**Risposta corta:** sì, a pezzi. Nessun vendor certificato ti dà liveness illimitato a $0 in produzione. Hai tre strade: quota free mensile (Didit, Persona), self-host Apache (MiniFASNet: $0 di licenza, paghi il server, più debole), trial da 30 giorni. La liveness **non** dà l’età. Per 18+ reale va col documento: `docs/gate-18-piu-reale.md`.

Il blog di Didit scrive “unlimited free KYC”. La [help ufficiale](https://help.didit.me/getting-started/free-plan) dice **500/mese**. Qui si usa la help.

---

## Cosa fa la liveness (e cosa no)

| Fa | Non fa |
|---|---|
| Distingue un viso vivo da stampa, schermo, a volte maschera 3D | Leggere sesso, età, nome |
| Passive: nessuna azione (più UX, più attaccabile) | Fermare da sola una virtual cam / injection da browser (serve il vendor) |
| Active: gira la testa, lampeggia, sorridi | Sostituire Yoti/Didit sul documento |

Per il gate Flingster-like: **documento autentico + face match + liveness**. La sola liveness dice “c’è un umano vivo”, non “è una donna sul documento”.

Due attacchi diversi:

- **Presentation attack:** foto/video/maschera *davanti* alla camera. MiniFASNet e i PAD iBeta Level 1 coprono soprattutto questo.
- **Injection attack:** stream deepfake *dentro* il browser, camera virtuale. I modelli self-host del 2020 non sono pensati per questo. iProov / FaceTec / AWS Face Liveness vendono proprio quello, a pagamento.

---

## Servizi cloud: quanto è gratis per chi adotta

### Didit — l’unico “free forever” pubblicamente tariffato

Pagine: [pricing](https://didit.me/pricing/), [free KYC](https://didit.me/products/free-kyc/), [help free plan](https://help.didit.me/getting-started/free-plan).

Ogni organizzazione, ogni mese, **per sempre**, senza carta:

| Modulo | Free / mese | Poi |
|---|---|---|
| ID verification (documento, 220+ Paesi) | 500 | $0.15 |
| Passive liveness (iBeta PAD Level 1) | 500 | $0.10 |
| Face match 1:1 (selfie vs foto documento) | 500 | $0.05 |
| Device / IP | 500 | $0.03 |
| **Flusso completo ID+liveness+match+IP** | **500 sessioni** | **$0.33** |

I 500 **non** sono un unico pool: ogni modulo ha i suoi 500. Un workflow con i quattro moduli gira 500 volte prima di pagare.

**Non** è nel free:

- Active liveness ($0.15) — se passi da passive ad active perdi il free sulla liveness
- Age estimation da selfie ($0.10) — non è l’ID
- White label ($0.20 extra) — il branding custom fa scattare i crediti anche sotto i 500
- Chiamate API *standalone* fuori dai workflow: non pescano il free

Hanno una pagina [age-gate adult / social apps](https://didit.me/industries/identity-verification-social-apps/) e certificazione tedesca FSM Jugendschutz sull’età. Conferma comunque sul contratto che webcam sessuale random è accettata: marketing ≠ ToS.

Per un MVP sotto 500 nuovi utenti verificati al mese: **ID + sesso dal documento + liveness passive + face match a $0**. Sopra: ~$0.33 a testa. È l’offerta più vicina a “gratis per chi lo adotta”.

### Persona

[Starter / Startup Program](https://withpersona.com/startups/): 500 verifiche/mese (Government ID + selfie/liveness opzionale) per **12 mesi**, poi piano a pagamento o account spento. Carta richiesta in applicazione. Pensato per startup incorporate, non per un hobby eterno. Dopo l’anno non è più free.

### FaceTec

Liveness 3D a pagamento, **minimo mensile**. In compenso clienti/partner: **OCR documento illimitato gratis** se paghi la liveness. Demo e account developer gratis per POC, non per produzione. Invertito rispetto a Didit: paghi la liveness, il documento è omaggio.

### Yoti

Liveness Static (passive) e Zoom (active) **dentro** Identity Verification. Non c’è un listino “liveness free se adotti Yoti”: paghi la sessione IDV. Utile se resti su Yoti per Digital ID; non è un piano adopter $0.

### AWS Rekognition Face Liveness

~$0.015 a check (primi 500k/mese, us-east-1). Free tier Rekognition è altro (immagini DetectFaces, 12 mesi). **Face Liveness in produzione non è gratis.** Non estrae il sesso dal documento.

### Veriff, Onfido/Entrust, Jumio, iProov, Sumsub

Trial (Veriff: 15 giorni / ~50 sessioni) o contratto enterprise. Nessun “adotta e la liveness è free forever”.

### BioID

[API trial 30 giorni](https://www.bioid.com/api-trial/) su BWS (liveness + face + PhotoVerify). Poi pay-per-use. Dati in Azure UE: punto a favore GDPR. Non è un piano permanente.

---

## Self-host: $0 di licenza, per sempre, per chi adotta il codice

Questo è l’unico “gratis illimitato”. Paghi CPU/GPU e ti mangi i falsi negativi.

| Progetto | Licenza | Cosa copre | Limite |
|---|---|---|---|
| [Silent-Face-Anti-Spoofing / MiniFASNet](https://github.com/minivision-ai/Silent-Face-Anti-Spoofing) (Minivision) | Apache 2.0 | Passive PAD: stampa, schermo. APK demo. Claim OSS ~TPR 97.8% a FPR 1e-5; il modello “high precision” è **privato** | Vecchio (repo poco mosso). Debole su injection/deepfake. Nessun iBeta sulla *tua* deploy |
| [Facex](https://github.com/facex-engine/facex) | Apache 2.0 (anti-spoof = MiniFASNet) | Engine + MiniFASNet ensemble | Stesso tetto MiniFASNet |
| [OpenBiometrics](https://github.com/openbm/openbiometrics) | MIT sul codice; MiniFASNet Apache | Passive liveness in REST | Piattaforma giovane |
| MediaPipe blink / head pose | Apache | Challenge “lampeggi / gira” | Active casalingo: un video pre-registrato di qualcuno che lampeggia passa spesso |

Si può mettere MiniFASNet **on-device** (come face-api.js): l’utente malizioso bypassa. Per un gate va **server-side**, frame firmati o challenge dal server.

Self-host **non** legge il sesso. Resta l’OCR MRZ senza autenticità, oppure Didit/Yoti sul documento.

---

## Come si combina col prodotto

Ordine onesto, dal più “gratis per l’adottante” al più solido:

1. **Didit workflow** (ID + passive liveness + face match), 500/mese $0, poi $0.33. Estrae i campi documento (sesso incluso, se il titolo ce l’ha). Pagina adult/social esistente. Prima scelta per un MVP.
2. **Yoti** se vuoi Digital ID (app utente, remember me, adult age verification già nel loro catalogo). Liveness inclusa nella sessione, non free.
3. **MiniFASNet self-host** in più, sui frame della *verifica* (non sulla chat live), come filtro antistampa. Non sostituisce 1 o 2. Non campionare la videochat: è registrare sesso.
4. **Persona** solo se sei una startup e ti basta un anno a 500/mese.

Cosa non fare:

- Active liveness Didit nel workflow “free” (esce dal free).
- White label Didit se vuoi restare a $0.
- Fidarti del blog “unlimited free”.
- Usare MiniFASNet come unica difesa su un sito dove conviene iniettare uno stream.

---

## Verdetto

| Obiettivo | Gratis per chi adotta? |
|---|---|
| Liveness illimitata certificata | No |
| Liveness + documento + face match sotto 500 nuovi utenti/mese | **Sì: Didit**, per sempre, senza carta |
| Liveness illimitata senza vendor | **Sì: MiniFASNet Apache**, più debole, costi server tuoi |
| Liveness + sesso documento a volume alto | No, paghi (~$0.33 Didit o sessione Yoti) |
| Solo liveness AWS/iProov/FaceTec | No (FaceTec: paghi liveness, OCR omaggio) |

Liveness gratis **esiste**. Illimitata e da vendor, no. Per il gate del sito: Didit copre liveness *e* documento (quindi il sesso anagrafico) a zero finché stai nella quota; oltre, è il listino pubblico più basso tra quelli che abbiamo trovato. MiniFASNet è il piano B senza fattura, non il sostituto di un PAD certificato.
