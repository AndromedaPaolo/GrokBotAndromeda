# Fantasy Empire — Quadro normativo per realizzare il progetto

**Documento separato dalla proposta commerciale.**
**Riferimenti:** `Fantasy_Empire_Proposta_Commerciale.md` (v2.10) · `Fantasy_Empire_Squadra_Agenti.md` · `Fantasy_Empire_Ops_Cursor_GrokBot.md` · `Fantasy_Empire_Dashboard_Approvazioni.md` · `Fantasy_Empire_Fase_0_Accesso_Gratuito.md` · `Fantasy_Empire_Video_IA_Azioni.md` · `Fantasy_Empire_Video_Storage_Generazione.md` · `Fantasy_Empire_Grok_Bot_Ops.md` · `Fantasy_Empire_Asset_Dove.md`
**Versione:** 1.5 — 1 settembre 2026
**Oggetto:** tutte le norme che l'idea descritta nei file di proposta deve rispettare per esistere legalmente.
**Ipotesi di base:** titolare stabilito in Italia, *poi* vendita a consumatori (B2C), gioco web, stack GitHub · Vercel · Cloudflare D1/R2 · Stripe, video generati da IA con tono "SFW sexy", bot ops post-profitto.

**Fase 0 (agosto 2026):** il go-live è un accesso gratuito **senza data di fine**. Stripe live è spento. Automantenimento sul git: Cursor Pro+. GrokBot a chiamata (mail, X, ricerca legale). Questo file resta la mappa *completa*, scritta anche per il momento in cui si venderà. Cosa si applica già a zero euro, e cosa resta inerte, sta in `Fantasy_Empire_Fase_0_Accesso_Gratuito.md`. Non cancellare le sezioni su recesso, IVA e pulsante 54-bis: servono il giorno in cui `STRIPE_LIVE` passa a on. Quel giorno non è in calendario.

> **Non è un parere legale.** È una mappa normativa per sapere *cosa* si applica, *quando* scatta e *cosa* va prodotto. Le scelte fiscali (regime, ATECO, SCIA) vanno confermate da un commercialista; i testi legali (T&C, privacy, EULA) da un avvocato. Norme aggiornate al 28 agosto 2026: alcune sono entrate in vigore da poche settimane (AI Act art. 50 dal 2 agosto 2026, pulsante di recesso dal 19 giugno 2026) e altre stanno cambiando (ADR, Digital Fairness Act).

---

## 1. Sintesi: i dieci vincoli che toccano il progetto per come è scritto

| # | Vincolo | Da dove viene | Impatto sul progetto |
|---|---|---|---|
| 1 | Stripe **vieta** contenuti per adulti "designed for the purpose of sexual gratification", incluso quello generato da IA | Stripe Prohibited & Restricted Businesses (contratto, non legge) | Il video "SFW sexy" usato come leva di vendita può far chiudere l'account e congelare gli incassi. È il rischio più grave e non si risolve con un avvocato: si risolve con art direction o con un PSP diverso. Vedi §7.1 |
| 2 | Un videogioco distribuito in Italia **deve** essere classificato per età e descrittori | D.lgs. 203/2017 art. 10 + AGCOM delibera 74/19/CONS | Serve classificazione (PEGI/IARC è equipollente) ed esposizione dei pittogrammi. Sanzioni richiamate: 25.000–350.000 € |
| 3 | Se il contenuto scivola in "pornografico", scatta la **verifica dell'età certificata** (non l'autodichiarazione) | Art. 13-bis d.l. 123/2023 + AGCOM delibera 96/25/CONS, obbligo dal 12 novembre 2025 per operatori stabiliti in Italia | Il confine "sexy SFW / porno" diventa una scelta di compliance, non di gusto. Vedi §7.2 |
| 4 | Gli obblighi di trasparenza sull'IA sono **già operativi** | Reg. (UE) 2024/1689 (AI Act) art. 50, applicabile dal 2 agosto 2026 | Marcatura machine-readable dei contenuti sintetici e informativa all'utente. Sanzioni fino a 15 mln € o 3% (per le PMI si applica il minore) |
| 5 | Pornografia virtuale: rilevanza penale anche **senza minori reali** | Art. 600-quater.1 c.p. | La regola "adulti apparenti 25+, nessun look minorenne" del file video non è prudenza: è l'unica posizione difendibile. Serve moderazione documentata, non una riga di prompt |
| 6 | Il modello "si gioca solo se si è pagato" **non elimina** il diritto di recesso: lo si perde solo con un'architettura di consenso precisa | Codice del consumo art. 59 co. 1 lett. o) | Checkbox non preselezionata + conferma su supporto durevole. Se manca: recesso per 12 mesi e 14 giorni |
| 7 | Dal 19 giugno 2026 serve il **pulsante di recesso** nell'interfaccia | Codice del consumo art. 54-bis (d.lgs. 209/2025) | È un requisito tecnico del sito, da mettere in `/account` accanto agli ordini |
| 8 | Chi vende contenuto digitale deve **mantenerlo conforme** e fornire gli aggiornamenti | Codice del consumo artt. 135-octies e ss. (d.lgs. 173/2021) | Un gioco venduto una volta e poi abbandonato genera diritto a riduzione di prezzo o risoluzione. Impatta la roadmap, non solo il contratto |
| 9 | I minori di 14 anni non possono accedere a tecnologie IA senza consenso genitoriale | L. 132/2025 art. 4 co. 4 | Con overlay video IA + contenuto sexy, l'unica scelta pulita è gate 18+ dichiarato in T&C e coerente con la classificazione |
| 10 | "Zero costo fisso di infrastruttura" **non** significa zero costo di conformità | Tutto il resto di questo file | Classificazione, testi legali, eventuale age assurance: costi di Fase 0. P.IVA, ADR a pagamento, commercialista completo: prima di Fase B. Non di Fase C |

Nota fuori perimetro legale ma dello stesso peso: **Vercel Hobby non è un piano per uso commerciale**. Il file proposta lo segnala già come "da rileggere nei ToS": dal momento in cui Stripe è live, il piano Hobby è inadempimento contrattuale, non un risparmio.

---

## 2. Come si qualifica giuridicamente il progetto

Ogni obbligo dipende da una qualificazione. Queste sono le sei che contano.

| Qualificazione | Perché | Conseguenza principale |
|---|---|---|
| **Professionista** (art. 3 Codice del consumo) | Vendita abituale a consumatori | Tutto il Codice del consumo: informazioni precontrattuali, recesso, conformità, clausole, pratiche commerciali |
| **Prestatore di servizi della società dell'informazione** | Sito, a distanza, per via elettronica, su richiesta | D.lgs. 70/2003: dati identificativi sul sito, conclusione del contratto, conferma dell'ordine |
| **Fornitore di contenuto/servizio digitale** | Il gioco è contenuto digitale a pagamento | Capo I-bis Codice del consumo: conformità, aggiornamenti, rimedi |
| **Titolare del trattamento** | Account, save, pagamenti, telemetria | GDPR pieno: basi giuridiche, informativa, registro, sicurezza, DPA con i fornitori |
| **Deployer di sistemi di IA** (e potenzialmente *provider*) | Usa un sistema IA generativo per i video | AI Act artt. 4, 50. Diventa *provider* se immette sul mercato un sistema col proprio nome o lo modifica in modo sostanziale |
| **Prestatore di hosting** (in senso DSA), non "piattaforma online" | Memorizza save su richiesta dell'utente, ma non diffonde al pubblico contenuti degli utenti | Obblighi base DSA (artt. 11-16). Non gli obblighi della Sezione 3, sia perché manca la diffusione al pubblico sia per l'esenzione micro/piccole imprese |

Due qualificazioni che **non** si vogliono: emittente di moneta elettronica / prestatore di servizi di pagamento (si evita non vendendo valuta virtuale ricaricabile e lasciando l'incasso a Stripe) e operatore di gioco d'azzardo (si evita non introducendo loot box a pagamento né premi in denaro).

---

## 3. Impresa, fisco, IVA

| Adempimento | Norma | Quando | Nota per il progetto |
|---|---|---|---|
| Partita IVA (mod. AA9/12 o ComUnica) | D.P.R. 633/1972; d.l. 78/2010 | Prima del primo incasso | L'attività è abituale per definizione: un paywall live non è vendita occasionale |
| Codice ATECO 2025 | Classificazione ATECO 2025 (in uso dal 2025) | All'apertura | **Scelta da decidere col commercialista:** editoria/sviluppo di giochi elettronici (si vende un'opera propria) *oppure* commercio al dettaglio via internet. Da questa scelta dipendono coefficiente di redditività, gestione INPS e necessità di SCIA |
| Iscrizione Registro Imprese/REA, INPS, INAIL | Legge 580/1993; normativa previdenziale | All'avvio, se attività d'impresa | Il numero REA va poi pubblicato sul sito (§4) |
| SCIA al SUAP | D.lgs. 114/1998 (Bersani), disciplina comunale | Prima dell'avvio, **se** l'attività è qualificata come commercio al dettaglio | Per la vendita di software/gioco proprio la qualificazione come commercio al dettaglio è discutibile: farla confermare, non darla per scontata. Se dovuta, va indicato il dominio del sito |
| IVA sulla vendita del gioco | Art. 7-octies D.P.R. 633/1972; Reg. UE 282/2011 | Da subito | Servizio elettronico: IVA nel Paese del consumatore. Aliquota italiana ordinaria 22% |
| Soglia unica UE 10.000 € e regime **OSS** | Art. 41 d.l. 331/1993; direttiva 2017/2455 | Al superamento, o per opzione | Sotto soglia: IVA italiana. Sopra: IVA del Paese cliente, dichiarazione trimestrale OSS. Dal 1° gennaio 2027 cambia il computo della soglia |
| Prova della localizzazione del cliente | Reg. UE 282/2011 artt. 24b/24f | Per ogni vendita | Conservare Paese di fatturazione, Paese emittente della carta (da Stripe), IP. Va progettato nel checkout, non ricostruito a posteriori |
| Certificazione dei corrispettivi | Art. 22 co. 1 n. 6-ter D.P.R. 633/1972; D.M. 10 maggio 2019 | Da subito | E-commerce diretto B2C: **esonero** da fattura e da scontrino elettronico, salvo richiesta del cliente al momento dell'operazione. Annotazione nel registro dei corrispettivi (art. 24 D.P.R. 633/1972) |
| Fattura elettronica | D.lgs. 127/2015 | Su richiesta o verso soggetti passivi | Obbligatoria verso operatori economici; verso privati solo se richiesta |
| Documentazione OSS | Art. 369-duodecies dir. 2006/112/CE; art. 63-quater Reg. 282/2011 | Se in OSS | Registro elettronico dettagliato, conservazione **10 anni** |

Non applicabile: DAC7 (obbligo delle piattaforme che intermediano venditori terzi; qui si vende in proprio).

---

## 4. E-commerce: cosa deve stare scritto sul sito

Base: **D.lgs. 70/2003** (attuazione direttiva 2000/31/CE).

- Art. 7 — accessibili in modo facile, diretto e permanente: denominazione, sede, e-mail **e telefono**, numero REA, partita IVA e codice fiscale, eventuali autorizzazioni, codici di condotta adottati.
- Artt. 12-13 — informazioni sulle fasi tecniche di conclusione del contratto, archiviazione e correzione degli errori di inserimento, **conferma dell'ordine** senza indebito ritardo per via elettronica.
- Prezzo chiaro, IVA inclusa (art. 13 e ss. Codice del consumo). I 9,99 €/mese (Visioni) e, se li tieni, i 14,99 € / 24,99 € vanno esposti come prezzi finali al consumatore. Periodicità e disdetta dell'abbonamento: visibili prima del click.

Nel piano pagina della landing descritto in `Fantasy_Empire_Proposta_Commerciale.md` mancano oggi: footer legale con i dati dell'art. 7, link a T&C / privacy / cookie, e il riferimento all'organismo ADR (§5.6).

---

## 5. Diritto dei consumatori

### 5.1 Informazioni precontrattuali — art. 49 Codice del consumo

Prima del pagamento vanno date, in modo chiaro e comprensibile: caratteristiche del gioco, identità e contatti, prezzo totale, modalità di pagamento, durata del contratto, **esistenza o esclusione del diritto di recesso** e come si esercita, garanzia legale di conformità, requisiti tecnici (browser, connessione), interoperabilità, eventuali misure tecniche di protezione, assistenza post-vendita.

Requisito specifico del progetto: va detto **prima** dell'acquisto che il GDD si gioca anche senza pagare, che Visioni sblocca il Santuario e alza il tetto di generazione (non carte più forti), che senza abbonamento il tetto è 7 job/settimana, che il gioco richiede connessione permanente e che i video sono generati da IA. Se un giorno chiudi il GDD dietro paywall, quella frase va riscritta.

### 5.2 Recesso e sua esclusione — artt. 52, 53, 59

- Regola: 14 giorni senza motivazione.
- Eccezione applicabile qui: art. 59 co. 1 lett. o) — contenuto digitale su supporto non materiale, se l'esecuzione è iniziata **e** (1) il consumatore ha dato **previo consenso espresso** all'avvio durante il periodo di recesso, (2) ha **riconosciuto di perdere** il recesso, (3) il professionista ha fornito la **conferma** su supporto durevole.
- Attuazione: checkbox **non preselezionata** al checkout con testo esplicito, log del consenso, e-mail di conferma che riporta consenso e rinuncia.
- Se manca uno dei tre elementi, o se l'informativa precontrattuale è incompleta: il termine diventa **12 mesi e 14 giorni** (art. 53). Su un gioco già giocato è un rimborso pieno.

### 5.3 Pulsante di recesso — art. 54-bis (d.lgs. 209/2025, applicabile dal 19 giugno 2026)

Requisiti: funzione visibile e accessibile per tutto il periodo utile, etichettata "recedere dal contratto qui"; form con nome, identificazione del contratto, mezzo elettronico per la conferma; comando finale "conferma recesso"; **avviso di ricevimento su supporto durevole con testo, data e ora**.

Nel progetto convive con l'esclusione dell'art. 59: il pulsante serve per gli acquisti in cui il recesso non è ancora decaduto (checkout completato, accesso non ancora avviato) e per il **primo periodo** dell'abbonamento Visioni. Va gestito per singolo prodotto, non a livello di sito. La disdetta del rinnovo (Customer Portal + `/account`) è un altro tasto: ferma i periodi successivi, non è il recesso dei 14 giorni.

### 5.4 Conformità del contenuto digitale — artt. 135-octies e ss. (d.lgs. 173/2021)

- Il gioco deve essere conforme al contratto e alla descrizione, **e** ai requisiti oggettivi di conformità.
- Art. 135-undecies: obbligo di informare e fornire gli **aggiornamenti**, anche di sicurezza, necessari a mantenere la conformità, per la durata del contratto o per il periodo che il consumatore può ragionevolmente attendersi.
- Se una caratteristica si discosta dallo standard atteso, va dichiarata e **accettata espressamente e separatamente** al momento dell'acquisto. Qui serve per: tetto settimanale di generazione video (7 / 40), fallback all'animazione 2D, Santuario chiuso senza Visioni, dipendenza dai free tier.
- Rimedi in caso di difetto: ripristino, riduzione del prezzo, risoluzione con rimborso.

Conseguenza pratica sul piano di lavoro: un abbonamento a 9,99 €/mese "Santuario + generazione a nostro carico" implica un impegno di manutenzione *per i periodi pagati*. Va scritto cosa succede a disdetta (Santuario si chiude, tetto torna a 7, save esportabile). Un acquisto una-tantum a 14,99 €, se lo tieni, implica un impegno più lungo: va scritto per quanto, altrimenti lo decide un giudice.

### 5.5 Pratiche commerciali, clausole, dark pattern

- Artt. 20-26 Codice del consumo (pratiche scorrette): il trailer non deve promettere ciò che il gioco non fa. Sanzioni AGCM fino a **10 milioni di euro** (art. 27).
- Artt. 33-38: clausole vessatorie nulle. Attenzione a limitazioni di responsabilità, foro esclusivo, modifica unilaterale del gioco, cancellazione dell'account.
- DSA art. 25 e UCPD: interfacce che non ingannano né manipolano. L'overlay video con Skip dopo 0,4 s e l'opzione "non mostrare per questa sessione" sono già nella direzione giusta.
- **CPC Network, Key Principles on In-Game Virtual Currencies (21 marzo 2025):** non vincolanti ma sono la griglia con cui le autorità leggono i giochi. Prezzi anche in valuta reale, nessun offuscamento del costo, nessun obbligo di acquistare valuta in eccesso, recesso rispettato. Se le season/cosmetic della Fase C non introducono valuta virtuale acquistabile, questa partita si evita in radice: è una decisione di design con effetti legali.

### 5.6 ADR — la piattaforma ODR non esiste più

Il Reg. (UE) 524/2013 è abrogato dal Reg. (UE) 2024/3228: **piattaforma ODR dismessa dal 20 luglio 2025**. Non va inserito il link (errore frequente nei template di T&C circolanti). Resta l'obbligo di informare sulla possibilità di ricorso extragiudiziale e di indicare l'organismo ADR eventualmente adottato (artt. 141-sexies e ss. Codice del consumo). Da monitorare: direttiva (UE) 2025/2647, che riforma l'ADR e introduce termini di risposta agli organismi.

### 5.7 Geo-blocking

Reg. (UE) 2018/302: il divieto di condizioni di accesso differenziate (art. 4) **non** si applica ai servizi che consistono principalmente nell'accesso a opere protette dal diritto d'autore — i videogiochi rientrano nell'esclusione. Restano applicabili l'art. 3 (non bloccare o reindirizzare l'accesso all'interfaccia senza consenso) e l'art. 5 (non discriminare in base al Paese di emissione della carta). Tradotto: si può limitare la vendita per territorio, non si può reindirizzare a forza né rifiutare una carta perché estera.

---

## 6. Dati personali

| Tema | Norma | Cosa serve |
|---|---|---|
| Basi giuridiche | GDPR art. 6 | Contratto per account/save/entitlement; obbligo legale per fisco; interesse legittimo per antifrode e rate limit; **consenso** per marketing e tracciamento non tecnico |
| Informativa | GDPR artt. 12-14 | Privacy policy che includa: video IA, telemetria di gioco, moderazione dei contenuti, fornitori USA |
| Registro dei trattamenti | GDPR art. 30 | Sì. Anche piccoli: il trattamento non è occasionale |
| Sicurezza | GDPR art. 32 | Coerente con §5 della proposta: Argon2id/magic link, cookie httpOnly, query parametrizzate, rate limit, resolver server-side |
| Data breach | GDPR art. 33 | Notifica al Garante entro **72 ore**. Serve una procedura scritta prima del lancio, non dopo |
| Responsabili | GDPR art. 28 | DPA con Vercel, Cloudflare, Stripe e il provider video IA. Elenco sub-responsabili aggiornato |
| Trasferimenti extra-UE | GDPR capo V | EU-US Data Privacy Framework: Cloudflare, Vercel e Stripe risultano certificati. Verificare l'iscrizione su `dataprivacyframework.gov` e che copra il trattamento specifico; per fornitori non certificati servono le SCC + transfer impact assessment. **Il provider del video IA va verificato uno per uno** |
| Minori | GDPR art. 8; art. 2-quinquies d.lgs. 196/2003 | In Italia consenso digitale a **14 anni**. Con contenuto 18+ il tema si sposta sull'age gate (§7) |
| Cookie e tracciamento | Art. 122 d.lgs. 196/2003; Linee guida Garante 231/2021 | Banner conforme (no scroll come consenso, no cookie wall, rifiuto facile come l'accettazione). Tecnici: solo informativa |
| DPIA | GDPR art. 35 | Non automaticamente obbligatoria, ma va fatta e **verbalizzata** una valutazione preliminare: contenuto sessualmente suggestivo + generazione IA + profilazione dei paganti è un combinato che un'autorità guarderà |
| Marketing | Art. 130 d.lgs. 196/2003 | Consenso preventivo per newsletter; soft spam (co. 4) solo verso chi ha acquistato, per servizi analoghi, con opt-out in ogni messaggio |
| Chiave della cache video | Scelta di design | La `video_key` **esclude** `user_id`: ottima scelta anche in ottica minimizzazione (art. 5). Va scritto nella privacy policy come garanzia, non lasciato implicito |

Sanzioni GDPR: fino a 20 milioni di euro o 4% del fatturato mondiale.

---

## 7. Il punto critico: contenuto "SFW sexy" generato da IA

Qui si concentra quasi tutto il rischio del progetto. Le regole vengono da cinque fonti diverse che non coincidono tra loro.

### 7.1 Il vincolo contrattuale che viene prima della legge — Stripe

La lista Prohibited & Restricted Businesses di Stripe include "pornography and other mature audience content (including literature, imagery and other media) designed for the purpose of sexual gratification" e, esplicitamente, **"any artificial-intelligence generated content that meets the above criteria"**. Stripe non pubblica una soglia numerica: valuta caso per caso, e nel 2025-2026 la linea si è spostata più volte (Steam, itch.io, Kickstarter hanno ristretto i contenuti su pressione dei processori).

Il file `Fantasy_Empire_Video_IA_Azioni.md` descrive "vestiti aderenti / armature fan service", "scollo, corazza, controluce", mostri con "contatto suggestivo", carte "Tentacle Embrace" / "Full Bind". Non è pornografia; è però esattamente la zona grigia in cui un revisore di Stripe può leggere "mature content designed for sexual gratification" — tanto più che il video è presentato come *leva di vendita*.

Opzioni, in ordine di sicurezza decrescente:

1. Abbassare il tono a "fantasy adventure" senza fan service, tenere PEGI 12/16 e conservare Stripe. Costa una feature di marketing, salva l'incasso.
2. Tenere il tono, chiedere **preventivamente** a Stripe una valutazione documentata (screenshot, prompt di sistema, policy di moderazione) e mettere per iscritto la risposta.
3. Tenere il tono e prevedere un PSP alternativo per contenuti mature, con costi e commissioni più alti, e un piano di migrazione.

Non scegliere è la peggiore delle tre: significa scoprire la risposta a incassi già avviati, con i fondi trattenuti.

### 7.2 Verifica dell'età

- **Italia:** art. 13-bis d.l. 123/2023 ("decreto Caivano") + AGCOM delibera 96/25/CONS. Obbligo di age assurance efficace (l'autodichiarazione non basta; sistema che provi solo il superamento della soglia, separando prova d'età e identità) dal **12 novembre 2025** per i soggetti stabiliti in Italia. L'estensione ai soggetti stabiliti in altri Stati UE è stata **annullata dal TAR Lazio il 7 aprile 2026** per vizio procedurale (mancata interlocuzione con lo Stato d'origine ex art. 3 par. 4 dir. 2000/31/CE): il divieto non è caduto, la procedura va rifatta. Un operatore italiano non ha questo scudo. Sanzioni fino a 250.000 €.
- L'obbligo si aggancia ai **contenuti pornografici**. Se il gioco resta "sexy non esplicito", non ricade nel perimetro; ma l'auto-qualificazione va documentata (policy, esempi, criteri di scarto), perché in caso di contestazione il metro non è il nome scelto internamente.
- **Regno Unito:** Online Safety Act 2023, "highly effective age assurance" per i servizi che ospitano pornografia, in vigore dal 25 luglio 2025 (Part 5 dal 17 gennaio 2025). Si applica per *UK link*, non per sede legale. Sanzioni fino a 18 mln £ o 10% del fatturato mondiale.
- **USA:** dopo *Free Speech Coalition v. Paxton* (giugno 2025) circa metà degli Stati impone verifica dell'età per materiale sessuale. Nessuna esenzione per operatori esteri.
- Conseguenza operativa: se si tiene il tono attuale, **vendere fuori dall'UE va deciso, non subìto**. Un paywall globale espone a UK e USA; un paywall geograficamente limitato è lecito per contenuti protetti da diritto d'autore (§5.7).

### 7.3 Limiti penali non negoziabili

| Norma | Contenuto | Cosa comporta nel progetto |
|---|---|---|
| **Art. 600-quater.1 c.p.** (pornografia virtuale) | Estende gli artt. 600-ter/600-quater alle immagini virtuali la cui qualità di rappresentazione fa apparire vere situazioni non reali. La Cassazione l'ha applicato a disegni e fumetti | La regola "adulti apparenti 25+, nessun look minorenne, nessuna school uniform" è il minimo. Servono: prompt negativi versionati, classificatore automatico sull'output, coda `banned` con revisione umana, log delle decisioni, cancellazione immediata degli scarti |
| **Art. 528 c.p.** (pubblicazioni oscene) | Distribuzione di materiale osceno | Rileva sul confine "sexy / esplicito" e sull'accessibilità pubblica dei materiali promozionali |
| **Art. 612-quater c.p.** (dal 10 ottobre 2025, L. 132/2025) | Illecita diffusione di contenuti generati o alterati con IA idonei a ingannare sulla genuinità, che causino danno ingiusto. Reclusione 1-5 anni | I personaggi devono essere **inventati**. Nessuna somiglianza con persone reali, nessun riferimento a volti/voci esistenti nei prompt, nessun asset di training riconducibile a persone identificabili |
| **Art. 61 n. 11-decies c.p.** (L. 132/2025) | Aggravante comune per reati commessi con IA | Alza la posta su tutto il resto di questa tabella |

### 7.4 AI Act — obblighi già in vigore

| Articolo | Dal | Cosa impone | Nel progetto |
|---|---|---|---|
| Art. 5 (pratiche vietate) | 2 febbraio 2025 | Divieti assoluti (manipolazione, sfruttamento di vulnerabilità) | Nessuna meccanica che sfrutti vulnerabilità dei giocatori per indurre acquisti |
| Art. 4 (alfabetizzazione IA) | 2 febbraio 2025 | Livello adeguato di competenza di chi sviluppa e usa i sistemi | Formazione documentata, anche minima, di chi gestisce la pipeline video e il bot ops |
| **Art. 50** | **2 agosto 2026** | *Provider* di sistemi generativi: output marcati in formato **leggibile meccanicamente** e rilevabili come artificiali, con soluzioni efficaci e interoperabili. *Deployer*: informare quando si usa un chatbot; etichettare i deepfake | Se si usa un provider esterno via API, la marcatura tocca a lui: va **verificato per contratto** che lo faccia. Se si fa fine-tuning o si immette un sistema col proprio nome, si diventa provider e l'obbligo è proprio |
| Regime transitorio | fino al 2 dicembre 2026 | Solo per la marcatura tecnica, e solo per sistemi già sul mercato prima del 2 agosto 2026 | Non copre il progetto se il sistema viene adottato adesso |
| Codice di condotta sulla trasparenza | riconosciuto 2026 | Adesione volontaria come mezzo per dimostrare conformità | Via più economica della prova tecnica autonoma |

Precisazione utile: i video di Fantasy Empire **non sono deepfake** ai sensi dell'AI Act (non assomigliano a persone o eventi reali), quindi l'obbligo di etichettatura del deployer sui deepfake non scatta. Resta la marcatura lato provider e resta la scelta — raccomandata — di dichiarare comunque in modo visibile che le clip sono generate da IA: è ciò che l'utente si aspetta e riduce l'attrito con le policy dei social in Fase C.

Sanzioni: fino a 15 mln € o 3% del fatturato mondiale; per le PMI si applica l'importo *minore* tra i due.

### 7.5 Minori e IA — L. 132/2025 art. 4 co. 4

L'accesso a tecnologie di IA da parte di **minori di 14 anni** richiede il consenso di chi esercita la responsabilità genitoriale. Sopra i 14 anni il minore può consentire al trattamento, purché le informazioni siano accessibili e comprensibili.

Dato che il gioco ha overlay IA su ogni azione e contenuto suggestivo, la posizione coerente è: **18+ dichiarato**, age gate all'accesso, coerenza con la classificazione del §8 e con i T&C. Una fascia PEGI 16 con contenuto "fan service" e generazione IA è una posizione fragile.

### 7.6 Classificazione obbligatoria del videogioco

- **D.lgs. 203/2017 art. 10** e **AGCOM delibera 74/19/CONS** (linee guida delibera 359/19/CONS): classificazione per classi d'età e descrittori tematici (tra cui *sesso*, *violenza*, *acquisti nel videogioco*), obbligatoria a prescindere dal canale, fisico o digitale.
- I giochi già sottoposti a **PEGI** si considerano conformi per equipollenza. **IARC** consente l'autocertificazione tramite questionario, gratuita, per giochi digitali e browser.
- Vanno esposti pittogrammi e descrittori secondo le linee guida.
- Sanzioni richiamate: quelle dell'art. 35 co. 2 del previgente TUSMAR, **25.000-350.000 €**, con sospensione nei casi più gravi.

Va aggiunto al piano di lavoro come attività di Fase 0: la classificazione descrive anche gli "acquisti nel videogioco", quindi va rifatta in Fase B se cambiano gli SKU.

### 7.7 Diritto d'autore sugli output IA

- **L. 132/2025 art. 25** ha modificato l'art. 1 l. 633/1941: sono protette le opere dell'ingegno **umano**, anche se create con l'ausilio di strumenti di IA, *purché* risultato del lavoro intellettuale dell'autore. Un output puramente generato non è protetto: le clip in cache potrebbero non essere tutelabili come opere autonome, mentre il gioco, il GDD, il codice e l'art direction lo sono.
- Nuovo **art. 70-septies** l.d.a.: il text and data mining con sistemi IA è lecito alle condizioni degli artt. 70-ter e 70-quater (accesso legittimo, rispetto dell'opt-out dei titolari). L'art. 171 lett. a-ter) l.d.a. ne sanziona penalmente la violazione.
- Conseguenza sulla scelta del provider video: servono garanzie contrattuali su liceità del training, titolarità/licenza d'uso commerciale degli output, manleva. Un provider che non le dà è un rischio trasferito sul progetto.
- Da fare comunque: verifica di anteriorità e deposito del marchio "Fantasy Empire" (EUIPO), registrazione del dominio, licenze di font/musica/SFX, inventario delle dipendenze open source e delle rispettive licenze.

---

## 8. DSA e responsabilità per i contenuti

Reg. (UE) 2022/2065. Assumendo prudenzialmente la qualifica di prestatore di hosting:

- Art. 11-12: **punto di contatto unico** per le autorità e per i destinatari del servizio, pubblicato e mantenuto aggiornato (in Italia la comunicazione ad AGCOM avviene via `dsa@agcom.it`).
- Art. 14: nelle condizioni generali, informazioni chiare su restrizioni d'uso, policy di moderazione e strumenti automatizzati utilizzati.
- Art. 16-17: meccanismo di **notice and action** e motivazione delle decisioni di rimozione/sospensione.
- Art. 15: relazioni di trasparenza — **esenti** micro e piccole imprese.
- Sezione 3 (piattaforme online): non applicabile, sia per assenza di diffusione al pubblico dei contenuti degli utenti sia per l'esenzione dimensionale. Se in futuro si aggiunge chat pubblica o condivisione di contenuti tra giocatori, la qualificazione va rifatta.

---

## 9. Pagamenti

| Tema | Norma | Nota |
|---|---|---|
| Autenticazione forte (SCA) | PSD2; d.lgs. 11/2010; Reg. delegato 2018/389 | 3-D Secure quando richiesto: già previsto nel flusso della proposta |
| Ruoli | d.lgs. 11/2010 | Stripe è il PSP. Non si detengono fondi di terzi, non si emette moneta elettronica: nessuna licenza necessaria **finché** non si vende valuta virtuale ricaricabile |
| Antiriciclaggio | d.lgs. 231/2007 | Obblighi in capo a Stripe; lato progetto si subiscono le verifiche KYC |
| Webhook e idempotenza | Buona prassi + art. 32 GDPR | Firma verificata e idempotenza: già in proposta. È anche presidio antifrode |
| Rimborsi e dispute | Codice del consumo; regole schemi carte | La revoca dell'entitlement su rimborso è legittima. Su **dispute non ancora decisa** la sospensione va prevista nei T&C in modo trasparente, altrimenti è una clausola contestabile |

---

## 10. Bot ops e marketing (Fase C)

Il file `Fantasy_Empire_Grok_Bot_Ops.md` prevede già approvazione umana per ciò che spende o pubblica. Le norme confermano quella scelta e ne aggiungono alcune.

| Attività del bot | Norma | Vincolo |
|---|---|---|
| Newsletter / patch notes | Art. 130 d.lgs. 196/2003 | Consenso preventivo; soft spam solo verso acquirenti, per servizi analoghi, con opt-out sempre presente |
| Pubblicazione clip IA sui social | AI Act art. 50; ToS delle piattaforme; policy contenuti sessualmente suggestivi | Le piattaforme hanno soglie **più severe** della legge. Un contenuto lecito può far chiudere l'account: la moderazione va fatta per piattaforma, non una volta per tutte |
| Copy e claim di marketing | Artt. 20-26 Codice del consumo | Nessun claim di risultato non verificabile; le offerte "Founders a tempo" devono avere scadenza reale (art. 21 e prezzi di riferimento) |
| Creator e partnership | Linee guida AGCOM sugli influencer; UCPD | Contenuto sponsorizzato riconoscibile |
| Ads a pagamento | Policy delle piattaforme + UCPD | Il targeting non deve raggiungere minori, dato il contenuto |
| Interazione conversazionale con utenti | AI Act art. 50 par. 1 | Se il bot parla con persone (supporto, Discord), va dichiarato che è un'IA |
| Modifiche al gioco decise dal bot | Art. 135-undecies e ss. Codice del consumo | Le patch di bilanciamento incidono su un prodotto già venduto: le modifiche non concordate hanno limiti, e i giocatori vanno informati |

Regola trasversale: la responsabilità di ciò che il bot pubblica resta interamente del titolare. "L'ha fatto l'automazione" non è una difesa in nessuna delle norme citate.

---

## 11. Accessibilità

**Direttiva (UE) 2019/882 (EAA) — d.lgs. 82/2022**, applicabile ai servizi forniti dal **28 giugno 2025**. Il *commercio elettronico* è nel perimetro: la parte di sito che porta alla conclusione del contratto (landing, registrazione, checkout, area account) deve essere accessibile.

- **Esenzione:** le microimprese che forniscono servizi (meno di 10 occupati **e** fatturato o bilancio annuo non superiore a 2 mln €) sono esonerate dai requisiti. All'avvio il progetto rientra nell'esenzione.
- L'esenzione vale finché si resta sotto **entrambe** le soglie. Crescendo, l'obbligo scatta: conviene non costruire un checkout che poi va riscritto.
- Il gioco in sé non è "commercio elettronico": l'obbligo, quando scatterà, riguarda il percorso d'acquisto. Le scelte già previste (`prefers-reduced-motion`, sottotitoli nel trailer, mute di default) vanno nella direzione corretta.

---

## 12. Sicurezza e infrastruttura: cosa non si applica

Utile sapere cosa **escludere**, per non pagare conformità inutile.

| Norma | Applicabile? | Perché |
|---|---|---|
| **NIS2** — dir. (UE) 2022/2555, d.lgs. 138/2024 | No | Soggetti e settori individuati per dimensione e criticità: un gioco indie non rientra |
| **Cyber Resilience Act** — Reg. (UE) 2024/2847 | No, in via ordinaria | Il SaaS puro è fuori ambito (rientra nel CRA solo il servizio cloud indispensabile al funzionamento di un prodotto con elementi digitali del fabbricante). Nota: gli obblighi di segnalazione ex art. 14 decorrono dall'11 settembre 2026 e la piena applicazione dall'11 dicembre 2027; se in futuro si distribuisce un client installabile, la valutazione va rifatta |
| **GPSR** — Reg. (UE) 2023/988 | No | Sicurezza dei prodotti, non dei servizi digitali |
| **Whistleblowing** — d.lgs. 24/2023 | No | Soglie dimensionali non raggiunte |
| **Normativa gioco d'azzardo** (ADM) | No, per come è disegnato | Nessuna puntata in denaro, nessun premio monetario, nessuna loot box a pagamento. Va mantenuto: introdurre casse a pagamento con contenuto casuale riapre il tema |
| **Data Act** — Reg. (UE) 2023/2854 | Indirettamente, come cliente | Diritti di portabilità e switching verso i fornitori cloud: utile in caso di uscita da Cloudflare/Vercel |
| **Digital Fairness Act** | Da monitorare | Iniziativa UE su dark pattern, personalizzazione e acquisti in-game: se approvata, tocca direttamente il modello |

---

## 13. Matrice: feature del progetto → norma → cosa fare

| Feature (dai tre file) | Norme coinvolte | Adempimento concreto |
|---|---|---|
| Landing pubblica con trailer | D.lgs. 70/2003 art. 7; cookie; T&C beta | Footer legale, T&C, privacy, cookie banner. In Fase 0 **niente** prezzi come offerta. Nessuna clip-azione per i visitatori |
| GDD giocabile senza pagare | Contratto gratuito; pratiche commerciali | Non promettere "gratis per sempre". Preavviso 30 giorni prima di *qualsiasi* SKU |
| Abbonamento Visioni (Fase B) | Artt. 49, 52–54-bis, 59; IVA/OSS; IARC "acquisti nel videogioco" | Prezzo 9,99 € IVA incl., durata, disdetta, recesso sul primo periodo, tetto 7 vs 40 dichiarato, niente pay-to-win |
| `PAYWALL=on` sul GDD (SKU opzionale, non il default) | Artt. 49, 59 lett. o) | Informazione precontrattuale esplicita + doppia checkbox + e-mail di conferma |
| Account senza Visioni | GDPR art. 6 | Base contrattuale del servizio gratuito; chiaro che il Santuario è chiuso |
| Webhook Stripe → `entitlements.visions` | PSD2; GDPR art. 32 | Firma, idempotenza, log, retention definita. Cancel → dal periodo successivo tetto 7 |
| Rimborso → entitlement revocato | Codice del consumo; T&C | Clausola trasparente su rimborsi, dispute e sospensione. Visioni: Santuario si chiude, tetto torna a 7 |
| Overlay video IA sulle azioni | AI Act art. 50; L. 132/2025; artt. 600-quater.1, 612-quater c.p.; classificazione | Marcatura/dichiarazione IA, prompt policy versionata, moderazione con coda `banned`, gate 18+, classificazione con descrittore *sesso* |
| Cache `cinematics` su D1 + R2, URL firmati | GDPR artt. 5, 32 | Nessun `user_id` nella chiave (già così), URL a scadenza breve, bucket non listabile, retention degli scarti = zero |
| Tetto settimanale di generazione, fallback 2D | Art. 135-undecies co. 4 | Dichiarare lo scostamento (7 / 40) e, in Fase B, farlo accettare al checkout Visioni |
| 1 slot save in beta / 3 Founders se lo tieni | Artt. 49, 135-octies e ss. | Dichiarato; export/portabilità dei save su richiesta (GDPR art. 20) |
| Patch di bilanciamento continue | Artt. 135-undecies e ss. | Policy di aggiornamento e di modifica del servizio nei T&C, con informazione ai giocatori |
| Season / cosmetic (Fase C) | CPC Key Principles; art. 54-bis; art. 59 | Prezzo in valuta reale, nessuna valuta virtuale intermedia, recesso gestito per SKU |
| Bot che pubblica sui social | Art. 130 privacy; UCPD; AI Act art. 50; ToS piattaforme | Approvazione umana (già prevista), disclosure IA, moderazione per piattaforma |
| Upgrade infra in Fase C | Data Act; GDPR art. 28 | DPA aggiornati, sub-responsabili, piano di uscita |

---

## 14. Checklist per fase

Allineata alla proposta v2.10. Il dettaglio operativo della beta gratuita è in `Fantasy_Empire_Fase_0_Accesso_Gratuito.md`. Ops: `Fantasy_Empire_Ops_Cursor_GrokBot.md`. Squadra: `Fantasy_Empire_Squadra_Agenti.md`. Coda sì/no: `Fantasy_Empire_Dashboard_Approvazioni.md`.

### Fase 0 — go-live pubblico senza pagamenti

Blocchi che impediscono di aprire la beta se mancanti:

- [ ] T&C della beta (servizio gratuito, revocabile, preavviso 30 giorni prima dei pagamenti)
- [ ] Privacy policy, cookie (solo tecnici), registro dei trattamenti
- [ ] DPA con Vercel, Cloudflare e provider video IA; verifica DPF
- [ ] Gate 18+ e classificazione PEGI o IARC con pittogrammi (§7.6)
- [ ] Footer art. 7 d.lgs. 70/2003 (identità, sede, email, telefono; P.IVA quando esiste)
- [ ] Cancellazione account + export save
- [ ] Valutazione preliminare DPIA verbalizzata; procedura data breach 72h
- [ ] Punto di contatto DSA
- [ ] Pipeline video con coda `banned`, revisione umana, log; marcatura AI Act art. 50
- [ ] Territorio di accesso deciso (default: UE, no UK/USA)
- [ ] Cap / invite; Stripe assente dal frontend; nessun CTA Abbonati
- [ ] Tetto settimanale generazione dichiarato in T&C beta (default 7 job, cache hit esclusi)
- [ ] Nessuna frase "gratis per sempre" in landing o T&C

### Fase B — prima di rendere Stripe live

Blocchi che impediscono di accendere i pagamenti se mancanti (in più rispetto alla Fase 0):

- [ ] Posizione fiscale aperta, ATECO e SCIA chiariti col commercialista
- [ ] Decisione documentata su tono dei contenuti **e** conferma della compatibilità con Stripe (§7.1)
- [ ] T&C / EULA a pagamento, refund policy
- [ ] Architettura del consenso art. 59 lett. o) implementata e loggata
- [ ] Pulsante di recesso art. 54-bis attivo con ricevuta su supporto durevole
- [ ] Footer aggiornato con P.IVA e REA; nessun riferimento alla piattaforma ODR; organismo ADR indicato
- [ ] DPA Stripe; privacy aggiornata
- [ ] Piano fiscale: registro dei corrispettivi, prova di localizzazione del cliente, monitoraggio soglia 10.000 €
- [ ] Preavviso 30 giorni già inviato e scaduto
- [ ] ToS Vercel riletti (Hobby vs uso commerciale)
- [ ] T&C Visioni: rinnovo, disdetta, tetto 7 vs 40, Santuario, art. 54-bis sul primo periodo
- [ ] Customer Portal Stripe o equivalente in `/account` per disdire il rinnovo

### Fase B — prime vendite (a pagamenti già accesi)

- [ ] Monitoraggio soglia OSS e iscrizione al superamento
- [ ] Rimborsi e recessi tracciati con tempi di legge
- [ ] Aggiornamento delle informative se cambiano SKU, fornitori o descrittori di contenuto
- [ ] Riclassificazione se cambiano gli acquisti in-game
- [ ] Verifica periodica delle certificazioni DPF dei fornitori

### Quando (se) c'è profitto — marketing live, social

Non è una data. È il momento in cui stai già vendendo e *tu* sblocchi i publish. GrokBot resta a chiamata. Cursor resta sul git. Checklist extra sulle PR che toccano prezzo, entitlement, T&C.

- [ ] Verifica soglie EAA (10 occupati / 2 mln €) prima di superarle
- [ ] Policy di pubblicazione del bot con approvazione umana e disclosure IA
- [ ] Consensi marketing raccolti correttamente prima della prima newsletter
- [ ] Se si introducono valute virtuali: applicare integralmente i CPC Key Principles
- [ ] Rivalutare DSA se si aggiungono chat pubbliche o contenuti caricati dai giocatori
- [ ] Rivalutare CRA se si distribuisce un client installabile

---

## 15. Sanzioni: cosa si rischia

| Area | Sanzione massima |
|---|---|
| Pratiche commerciali scorrette (AGCM) | 10.000.000 € |
| GDPR | 20.000.000 € o 4% del fatturato mondiale |
| AI Act (obblighi di trasparenza) | 15.000.000 € o 3% del fatturato mondiale (per le PMI si applica il minore) |
| Classificazione videogiochi (AGCOM) | 25.000-350.000 € + sospensione nei casi gravi |
| Age verification contenuti pornografici (AGCOM) | 250.000 € |
| UK Online Safety Act (Ofcom) | 18 mln £ o 10% del fatturato mondiale |
| Informativa recesso incompleta | Recesso esercitabile per 12 mesi e 14 giorni (rimborso pieno) |
| Art. 612-quater c.p. | Reclusione 1-5 anni |
| Art. 600-quater.1 c.p. | Pene degli artt. 600-ter/600-quater ridotte di un terzo |
| Violazione policy Stripe | Sospensione dell'account e trattenuta dei fondi |

---

## 16. Decisioni richieste per procedere

1. **Tono dei contenuti**: si tiene il "SFW sexy" accettando il rischio Stripe e la fascia 18+, oppure si abbassa a fantasy adventure e si conserva il canale di pagamento? È la decisione che condiziona tutte le altre.
2. **Territori di vendita**: solo UE, oppure anche UK e USA con i rispettivi obblighi di age assurance?
3. **Classificazione**: PEGI o autocertificazione IARC?
4. **Durata dell'impegno di aggiornamento** da dichiarare nei T&C per la conformità del contenuto digitale.
5. **Valuta virtuale**: si esclude per sempre (raccomandato) o si prevede per le season?
6. **Provider video IA**: con quali garanzie contrattuali su marcatura art. 50, liceità del training e licenza commerciale degli output?
7. **Piano di pagamento**: quando si esce da Vercel Hobby, dato che l'uso commerciale non è coperto?

---

## 17. Fonti principali

**UE** — Reg. (UE) 2024/1689 (AI Act, art. 50 dal 2 agosto 2026; linee guida Commissione 20 luglio 2026); Reg. (UE) 2022/2065 (DSA); Reg. (UE) 2016/679 (GDPR); dir. (UE) 2019/770 e 2019/771; dir. (UE) 2023/2673 (recesso online); dir. (UE) 2019/882 (EAA); Reg. (UE) 2018/302 (geo-blocking); Reg. (UE) 2024/3228 (dismissione ODR dal 20 luglio 2025); dir. (UE) 2025/2647 (nuovo ADR); Reg. (UE) 2024/2847 (CRA); Reg. (UE) 2023/2854 (Data Act); Reg. UE 282/2011 e dir. 2006/112/CE (IVA/OSS); CPC Network, *Key Principles on In-Game Virtual Currencies*, 21 marzo 2025; EDPB, FAQ e nota informativa sul EU-US Data Privacy Framework.

**Italia** — D.lgs. 206/2005 (Codice del consumo, artt. 49, 52-59, **54-bis**, 135-octies e ss.); d.lgs. 209/2025; d.lgs. 173/2021; d.lgs. 70/2003; d.lgs. 196/2003 (artt. 2-quinquies, 122, 130); L. 23 settembre 2025 n. 132 (IA: artt. 4, 25, 26 — artt. 61 n. 11-decies, 612-quater c.p., 70-septies l.d.a.); artt. 528, 600-ter, 600-quater, 600-quater.1 c.p.; d.lgs. 203/2017 art. 10 e AGCOM delibere 74/19/CONS e 359/19/CONS; art. 13-bis d.l. 123/2023 e AGCOM delibera 96/25/CONS (TAR Lazio, sentenze 7 aprile 2026); d.lgs. 82/2022; d.lgs. 11/2010; d.lgs. 231/2007; D.P.R. 633/1972 (artt. 7-octies, 22 co. 1 n. 6-ter, 24); d.l. 331/1993 art. 41; D.M. 10 maggio 2019; Garante privacy, Linee guida cookie 231/2021.

**Extra-UE** — UK Online Safety Act 2023 e guidance Ofcom sull'age assurance; *Free Speech Coalition v. Paxton* (US Supreme Court, giugno 2025) e leggi statali sull'age verification.

**Fonti contrattuali** — Stripe *Prohibited & Restricted Businesses*; ToS di Vercel, Cloudflare, GitHub; policy dei social usati in Fase C.

---

## 18. Fuori scope di questo documento

Nessun testo legale redatto (T&C, privacy policy, EULA, DPA), nessuna pratica presentata, nessuna classificazione richiesta, nessun contratto firmato. Questo file dice *quali* norme si applicano, *da quando* e *cosa* va prodotto; la redazione dei documenti e le scelte fiscali richiedono avvocato e commercialista.
