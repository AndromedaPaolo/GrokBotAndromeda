# Ricerca: app e API gratuite che “capiscono il sesso”

Data: 2026-08-30. Solo ricerca, nessuna integrazione in questo repo.

Requisito principale del prodotto: **18+ reale** (`docs/gate-18-piu-reale.md`). Questo file resta sulla domanda collaterale del sesso.

Domanda: esistono app gratuite che riconoscono il sesso di una persona, da usare al posto (o accanto) a Yoti nel prodotto tipo Flingster.

**Risposta corta:** no, non nel senso che ti serve. Esistono tre famiglie diverse. Solo una legge un sesso *scritto*. Le altre indovinano un aspetto. Nessuna app da Play Store/App Store è un backend di verifica. Quello che è gratis o non verifica il documento, o non è il sesso, o non è commerciale.

---

## Tre cose diverse, tre esiti

| Metodo | Cosa restituisce | È il sesso? | Gratis per te | Spoofing | Uso sul matching |
|---|---|---|---|---|---|
| Documento (MRZ / Yoti / CIE) | `M` / `F` / a volte `X` stampato sul titolo | Sesso anagrafico sul documento | OCR sì; autenticità + faccia=documento **no** (Yoti si paga) | Foto del passaporto di un altro, senza liveness | Sì, è l’unico segnale allineato a “chi sei” |
| Classificatore sul volto | `male` / `female` da trucco, barba, ossa, capelli | No: *aspetto percepito* | Sì (self-host o demo) | Filtro AR, wig, replay, seconda persona in frame | No come verità; al massimo segnale debole anti-spoof |
| Nome (Genderize ecc.) | probabilità da “Marco” / “Giulia” | No | Quota free | Nickname inventato | Inutile in chat anonima |

Yoti Digital ID / IDV sta nella riga 1, con liveness e autenticità. Non è gratis per l’operatore. È gratis *per l’utente* (scarica l’app, non paga Yoti).

Microsoft ha **ritirato** genere/età/emozioni da Azure Face (2022–2023): stereotipi, discriminazione, decisioni su singoli. AWS Rekognition ha ancora `GENDER` e scrive esplicitamente: previsione binaria dall’aspetto, **non** identità di genere, **non** per diritti/accesso del singolo; al massimo statistiche aggregate.

---

## App consumer (Play / iOS) — non usabili

Sono giocattoli. Non espongono un’API che tu controlli, mandano volti a server sconosciuti, accuracy da marketing, ToS da “divertimento”.

Esempi tipici:

- **Age & Gender Camera** (Atmecode) — scatti, stima età/genere. Privacy “non conserviamo le foto” da store, non verificabile. Zero SDK per un sito.
- **Face Analysis / Face Analyzer** e cloni — bellezza, età, genere stimato. Stesso problema.
- **FaceApp** e gender-swap — **non** riconoscono il sesso: lo *cambiano* nell’immagine. Privacy storicamente discussa. Irrilevante per il matching.

Non integrare queste app. Non chiedere all’utente di installarle “per verificare”. Non hai il risultato firmato, non hai liveness, non hai un contratto.

---

## Classificatori sul volto (gratis da self-hostare o trial)

Stimano se il viso *sembra* uomo o donna. Benchmark da vendor ~93–97% su dataset cis, foto frontali pulite. Su webcam random, trucco, maschere AR, persone trans: crolla. Uno studio su CNN addestrate cis: ~92% su cis, ~69% su trans, precisione pessima sui trans men.

### Self-host / open source (il software è gratis; la GPU/CPU no)

| Nome | Cosa fa | Licenza da controllare | Nota |
|---|---|---|---|
| [face-api.js](https://github.com/justadudewhohacks/face-api.js) | Browser, TensorFlow.js, `ageGenderNet` ~420 KB. Claim: ~95% gender sui loro split UTK/IMDB/… | MIT (codice) | Gira **nel client**: l’utente può bypassare. Adatto a un badge “sembra donna” sul *proprio* preview, non a una verità server. |
| [DeepFace](https://github.com/serengil/deepface) | Python, `DeepFace.analyze(..., actions=['gender'])`. Claim tutorial ~97% | MIT sul wrapper; i pesi dei backend variano | Server-side. Devi spedire frame: GDPR biometrico + stai campionando una chat sessuale. |
| [Exadel CompreFace](https://github.com/exadel-inc/CompreFace) | Docker, REST, plugin age + gender | Apache-2.0 | Più “prodotto” degli script. Resta classificazione viso. |
| [OpenBiometrics](https://github.com/openbm/openbiometrics) | REST, modello ViT GenderAge (claim ~94% gender) | MIT sul codice; verifica i pesi | Giovane. Self-host “forever free” sul sito. |
| InsightFace `genderage` | Spesso il più citato in ricerca | **Codice MIT, modelli pretrained in genere non commerciali** senza licenza InsightFace | Non copiare i `.onnx` buffalo/antelope in un sito adult a pagamento (o con ads) senza contratto. |

MediaPipe **non** classifica il sesso. Serve landmark/mesh, non `M/F`.

### API cloud con piano free / trial (non “app”, non gratis a volume)

| Nome | Genere dal viso | Free | Adatto al tuo sito |
|---|---|---|---|
| Face++ (Megvii) | Sì, attributi detect | Signup free, poi pay-as-you-go | Megvii è in Entity List USA. Dati viso in Cina/cloud terzo. Per UE è un pasticcio di trasferimento. |
| AWS Rekognition `DetectFaces` + `GENDER` | Sì | Free tier AWS limitato | Loro stessi: non usarlo per accesso individuale. Costo dopo il free tier. |
| Azure Face | **Ritirato** | — | Non esiste più come feature. |
| Google Cloud Vision | Non espone gender come attributo viso standard | — | Non è la strada. |

Nessuna di queste è un’“app gratuita”. Sono API. Il piano free finisce al primo migliaio di Next.

---

## Documento d’identità (sesso vero da stampare, verifica no se è gratis)

Passaporto e CIE italiane hanno **SESSO / SEX = M o F**. ICAO 9303: nella MRZ il sesso è un carattere (`M`, `F`, `<` o `X` a seconda del Paese).

OCR **gratis** che *legge* quel campo da una foto:

- [PassportEye](https://github.com/konstantint/passporteye) (Tesseract)
- [FastMRZ](https://github.com/13krub/fastmrz)
- [OmniMRZ](https://github.com/AzwadFawadHasan/OmniMRZ)
- [mrz-scanner](https://github.com/alsenet-labs/mrz-scanner) (browser, ONNX)

Questo **non** è Yoti. Manca:

1. il documento è autentico (non uno screenshot, non un Photoshop);
2. il viso in camera è la stessa persona della foto sul documento (face match);
3. liveness (non un video registrato, non una maschera).

Senza 1–3 un uomo carica il passaporto della ragazza e il tuo OCR scrive `F`. Per quello Yoti (o Veriff, Onfido, Jumio) costa.

La CIE ha il sesso anche nel chip; leggerlo davvero richiede CAN/MRZ + stack CIE (developers.italia.it), non un’app “gender detector”. Non è un flusso da videochat random.

Siti web “passport OCR gratis, carica qui”: non usarli. Stai mandando passaporti a un terzo sconosciuto.

---

## Nomi

[Genderize.io](https://genderize.io/): 2 500 nomi/mese free. “Andrea” → probabilità. In una chat senza nome vero è rumore.

---

## Cosa implica per il prodotto Flingster-like

1. **Per *chi sei* (anti-spoof uomo-che-si-dice-donna):** resta un **IDV** (Yoti Digital ID / IDV, o analogo). Non esiste un’app Play Store gratuita che lo sostituisca. L’OCR MRZ self-host è un prototipo, non un gate.

2. **Per *chi cerchi*:** già deciso: lo seleziona l’utente in ricerca. Nessun classificatore.

3. **Classificatore viso in più, opzionale e debole:** puoi far girare `face-api.js` **on-device** sul preview locale e, se `sexDocumento=female` ma il modello dice male con confidence alta per N frame, mettere un flag “da revisionare” o un friction (captcha, skip-rate). Non bannare in automatico: falsi positivi su trans, androgini, cattiva luce, maschere AR del prodotto stesso. Consenso esplicito, art. 9 GDPR (biometrico + vita sessuale), DPIA. Non inviare i frame a Face++.

4. **InsightFace pretrained** sul sito in produzione: rischio licenza. Evita o paga la commercial license.

5. **Non** “l’utente installa Age & Gender Camera e ci manda uno screenshot”. Inutile e ridicolo.

---

## Verdetto operativo

| Obiettivo | Strumento gratis che basta | Cosa serve davvero |
|---|---|---|
| 18+ | Stima viso Yoti Age (tu paghi Yoti, utente no) | Yoti / equivalente |
| Sesso anagrafico | Nessuno, se vuoi autenticità | Yoti IDV / Digital ID `gender` |
| Spoof grossolano in live | face-api.js on-device come segnale | Report + skip-rate + documento |
| Gay / trans | Nessuna app | Tag dichiarati |

Non c’è un’app gratuita che “capisce il sesso”. C’è software gratis che **indovina l’aspetto**, e software gratis che **legge la MRZ senza sapere se il documento è vero**. Per assegnare il sesso in ingresso come nel piano del prodotto, Yoti (o un IDV pagato) resta la riga che chiude; il resto è ricerca o prototipo.

Liveness (persona viva, non foto) con piano free per chi adotta: `docs/ricerca-liveness-gratuito.md`. In sintesi Didit 500 sessioni/mese forever (ID + liveness passive + face match), oppure MiniFASNet self-host Apache. La liveness da sola non dà il sesso.
