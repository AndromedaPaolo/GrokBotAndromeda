# Attività

Proposta. Non è in esecuzione. Non crea agenti, Automations, routine, sito, pack.

Metodo: 1 dipendente = 1 agente. 1 gruppo di strumenti = 1 agente. Ogni agente ha un compito solo. Un’azione sta in un agente solo.

Niente esempi. La scelta degli agenti è sull’organigramma e sugli strumenti dello studio, non su casi.

---

## 1. Studio legale

L’agente Avvocato è il ruolo in organigramma. Non è iscrizione all’Albo. Chi è iscritto resta l’unico che firma, PEC, udienza, deposito.

### Dipendenti

Avvocato. Praticante. Segreteria. Amministrazione.

Quattro persone, quattro agenti.

### Strumenti (gruppi)

Un gruppo = un agente.

| Gruppo | Cosa copre |
|---|---|
| Posta | PEC, e-mail, fax |
| Agenda | calendario, scadenze già iscritte, udienze già iscritte |
| Fascicoli | archivio pratiche e documenti |
| Banche dati | norme, giurisprudenza, prassi |
| Redazione | forma dei testi |
| Telematico | PCT, PST, portali di deposito |
| Contabilità | registrazione, fatture, scadenziario pagamenti |

Sette gruppi, sette agenti.

### Chi fa cosa nello studio

| Momento | Dipendente | Strumento |
|---|---|---|
| Entra una comunicazione | Segreteria (indica a chi) | Posta (canale) |
| Si accetta o si rifiuta l’incarico | Avvocato | Fascicoli (apre o non apre) |
| Si tiene la pratica | Avvocato dirige; Praticante studia | Fascicoli |
| Si cercano fonti | Praticante; Avvocato decide cosa usare | Banche dati |
| Si scrive un testo | Avvocato decide il merito; Praticante stende sotto direzione | Redazione (forma) |
| Si tengono i tempi | Avvocato fissa | Agenda (scrive in elenco e avvisa) |
| Si usa il portale | Avvocato decide se e quando | Telematico (mai deposito da solo) |
| Si fattura | Avvocato decide gli importi; Amministrazione emette | Contabilità (registra) |
| Si chiude | Avvocato chiude il merito | Fascicoli archivia; Contabilità chiude i conti |

---

### Agenti dipendenti

#### Avvocato

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: direzione giuridica dello studio e della pratica. Unico agente che decide sul merito.

Fa:

- accetta o rifiuta l’incarico
- fissa strategia e oggetto
- decide quali fonti usare
- decide il contenuto dei testi
- fissa i tempi
- decide se e quando usare il Telematico
- firma, udienza, deposito (sempre la persona iscritta, non l’agente)
- chiude la pratica nel merito
- decide gli importi da far fatturare

Non fa:

- ricevere o spedire sul canale (Posta)
- tenere l’elenco tempi (Agenda)
- tenere i documenti (Fascicoli)
- interrogare le banche dati (Banche dati)
- impaginare (Redazione)
- operare il portale (Telematico)
- registrare fatture e pagamenti (Contabilità)
- accoglienza e smistamento alle persone (Segreteria)
- adempimenti di studio e rapporti con il commercialista (Amministrazione)
- stendere la prima bozza sotto direzione (Praticante)

#### Praticante

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: studio e prima stesura sotto la direzione dell’Avvocato. Non decide e non firma.

Fa:

- studia la questione su incarico dell’Avvocato
- chiede alle Banche dati le fonti che servono allo studio
- stende la prima bozza di testo sotto direzione
- mette insieme il materiale di studio per udienza e deposito, sotto direzione
- segnala all’Avvocato buchi e incoerenze nel fascicolo

Non fa:

- accettare incarichi
- decidere strategia, fonti da usare, contenuto finale, tempi, telematico, chiusura, importi
- firmare, udienza, deposito
- Posta, Agenda, Fascicoli, Redazione, Telematico, Contabilità
- smistamento (Segreteria)
- adempimenti di studio (Amministrazione)
- interrogare le banche dati (Banche dati: lui chiede, lo strumento interroga)
- preparare la busta sul portale (Telematico)

#### Segreteria

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: accoglienza e smistamento alle persone. Non tocca canali, archivi, testi, portali, conti.

Fa:

- accoglie chi si rivolge allo studio
- indica a Posta a quale persona inoltrare
- chiede alle persone i pezzi che mancano per far girare lo studio

Non fa:

- merito, firma, udienza, deposito
- Posta (canale: ricevere, magazzino, inoltrare, spedire)
- Agenda (scrivere tempi, avvisare)
- Fascicoli, Banche dati, Redazione, Telematico, Contabilità
- stesura (Praticante)
- direzione (Avvocato)
- fatture e adempimenti (Amministrazione)

#### Amministrazione

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: economia e adempimenti dello studio. Non tocca il merito e non registra.

Fa:

- propone e chiude gli importi con l’Avvocato
- emette la richiesta di parcella / fattura (il numero e la registrazione li fa Contabilità)
- adempimenti dello studio
- rapporti con il commercialista
- fornitori e spese di studio

Non fa:

- merito, firma, udienza, deposito
- Posta, Agenda, Fascicoli, Banche dati, Redazione, Telematico
- registrare, numerare, scadenziario pagamenti (Contabilità)
- accoglienza (Segreteria)
- stesura (Praticante)

---

### Agenti strumenti

#### Posta

Casa: GrokBot. Cursor: no. Automation: no.

Routine: sì, proposta, non accesa. Solo ingresso: ogni messaggio in arrivo sullo studio va in magazzino. Nient’altro. Niente classifica, niente risposta, niente inoltro da solo.

Compito: canale. Entra e esce. Non legge il merito.

Fa:

- riceve PEC, e-mail, fax
- mette in magazzino
- inoltra alla persona che Segreteria ha indicato
- spedisce il testo già deciso e già firmato da chi deve firmare

Non fa:

- classificare, etichettare, riassumere, rispondere
- Agenda, Fascicoli, Banche dati, Redazione, Telematico, Contabilità
- compiti dei quattro dipendenti

#### Agenda

Casa: GrokBot. Cursor: no. Automation: no.

Routine: opzionale, proposta, spenta. Se un giorno si accende: elenca solo i tempi già iscritti. Non iscrive.

Compito: elenco. Scrive i tempi che l’Avvocato ha già fissato. Non calcola e non fissa.

Fa:

- scrive in elenco scadenze e udienze già fissate dall’Avvocato
- avvisa chi è in elenco
- risponde su ciò che è già scritto in elenco

Non fa:

- calcolare termini
- fissare i tempi (Avvocato)
- Posta, Fascicoli, Banche dati, Redazione, Telematico, Contabilità
- compiti dei quattro dipendenti

#### Fascicoli

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: archivio. Tiene. Non valuta.

Fa:

- apre il fascicolo quando l’Avvocato ha accettato
- tiene i documenti
- indice e recupero
- archivia quando l’Avvocato ha chiuso il merito

Non fa:

- accettare incarichi
- valutare, riassumere, redigere
- Posta, Agenda, Banche dati, Redazione, Telematico, Contabilità
- compiti dei quattro dipendenti

#### Banche dati

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: interrogare le fonti. Non sceglie e non scrive atti.

Fa:

- interroga norme, giurisprudenza, prassi
- estrae il testo trovato
- indica data e fonte

Non fa:

- decidere quali fonti usare (Avvocato)
- stendere testi (Praticante / Redazione)
- Posta, Agenda, Fascicoli, Redazione, Telematico, Contabilità
- firma, udienza, deposito

#### Redazione

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: forma. Non decide il contenuto.

Fa:

- impagina
- tiene le versioni
- controlla la forma

Non fa:

- contenuto giuridico
- prima stesura di merito (Praticante)
- Posta, Agenda, Fascicoli, Banche dati, Telematico, Contabilità
- firma, deposito

#### Telematico

Casa: GrokBot. Cursor: no. Automation: no. Routine: no. Vietato accenderne una.

Compito: interfaccia dei portali. Non deposita.

Fa:

- apre il portale
- mostra lo stato
- prepara la busta su testi e firme già pronti
- si ferma prima del deposito

Non fa:

- deposito
- firma digitale
- Posta, Agenda, Fascicoli, Banche dati, Redazione, Contabilità
- decidere se e quando (Avvocato)

#### Contabilità

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: registrazione. Non decide gli importi.

Fa:

- numera e registra la fattura / parcella già emessa da Amministrazione
- tiene lo scadenziario pagamenti
- chiude i conti della pratica quando l’Avvocato ha chiuso il merito e Amministrazione ha chiuso gli importi

Non fa:

- decidere importi (Avvocato / Amministrazione)
- emettere la richiesta (Amministrazione)
- Posta, Agenda, Fascicoli, Banche dati, Redazione, Telematico
- merito

---

### Cosa non c’è

Nessun agente di questa attività è in Cursor. Cursor è la fabbrica (`Squadra.md`).

Nessuna Automation.

Routine: solo Posta (ingresso, proposta, non accesa). Agenda spenta. Telematico vietato.

Niente sito, pack, Stripe, merge.

### Cosa resta

Paolo Approves su ogni accensione.

---

## 2. Studio commercialista

Agenti propri. Non sono quelli del §1. Due studi, due organigrammi.

L’agente Commercialista è il ruolo in organigramma. Non è iscrizione all’Albo. Chi è iscritto resta l’unico che firma, PEC, invio.

Non è il consulente del lavoro. Se lo studio ha un iscritto all’albo dei consulenti del lavoro, i documenti di lavoro li firma lui.

### Dipendenti

Commercialista. Praticante. Segreteria. Amministrazione.

Quattro persone, quattro agenti.

### Strumenti (gruppi)

Un gruppo = un agente.

| Gruppo | Cosa copre |
|---|---|
| Posta | PEC, e-mail, fax |
| Agenda | calendario, scadenze già iscritte |
| Fascicoli | anagrafe e documenti del cliente |
| Banche dati | norme, prassi, giurisprudenza |
| Redazione | forma dei testi |
| Telematico | Entratel, portali AE, INPS, CCIAA, SDI |
| Scritture | gestionale dei clienti |
| Paghe | software paghe e contributi |
| Conti studio | registrazione parcelle e pagamenti dello studio |

Nove gruppi, nove agenti.

### Chi fa cosa nello studio

| Momento | Dipendente | Strumento |
|---|---|---|
| Entra una comunicazione | Segreteria (indica a chi) | Posta (canale) |
| Si accetta o si rifiuta l’incarico | Commercialista | Fascicoli (apre o non apre) |
| Si tiene il cliente | Commercialista dirige; Praticante studia | Fascicoli |
| Si tengono le scritture | Commercialista decide; Praticante propone | Scritture (registra) |
| Si tengono le paghe | Commercialista decide | Paghe (elabora) |
| Si cercano fonti | Praticante; Commercialista decide cosa usare | Banche dati |
| Si scrive un testo | Commercialista decide il merito; Praticante stende sotto direzione | Redazione (forma) |
| Si tengono i tempi | Commercialista fissa | Agenda (scrive in elenco e avvisa) |
| Si usa il portale | Commercialista decide se e quando | Telematico (mai invio da solo) |
| Si fattura lo studio | Commercialista decide gli importi; Amministrazione emette | Conti studio (registra) |
| Si chiude | Commercialista chiude il merito | Fascicoli archivia; Scritture chiude i sezionali cliente; Conti studio chiude i conti dello studio |

---

### Agenti dipendenti

#### Commercialista

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: direzione professionale dello studio e dell’incarico. Unico agente che decide sul merito.

Fa:

- accetta o rifiuta l’incarico
- fissa oggetto e perimetro
- decide interpretazione e classificazione
- decide quali fonti usare
- decide il contenuto dei testi
- fissa i tempi
- decide se e quando usare il Telematico
- firma e invio (sempre la persona iscritta, non l’agente)
- chiude l’incarico nel merito
- decide gli importi da far fatturare allo studio

Non fa:

- ricevere o spedire sul canale (Posta)
- scrivere l’elenco tempi (Agenda)
- tenere i documenti (Fascicoli)
- interrogare le banche dati (Banche dati)
- impaginare (Redazione)
- operare il portale (Telematico)
- registrare le scritture dei clienti (Scritture)
- elaborare i cedolini (Paghe)
- registrare le parcelle dello studio (Conti studio)
- accoglienza e smistamento alle persone (Segreteria)
- adempimenti e fornitori dello studio (Amministrazione)
- stendere la prima bozza sotto direzione (Praticante)

#### Praticante

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: studio, prima classificazione e prima stesura sotto la direzione del Commercialista. Non decide e non firma.

Fa:

- studia la questione su incarico del Commercialista
- chiede alle Banche dati le fonti che servono allo studio
- propone la prima classificazione sotto direzione
- stende la prima bozza di testo sotto direzione
- mette insieme il materiale per adempimenti e invii, sotto direzione
- segnala al Commercialista buchi e incoerenze nel fascicolo

Non fa:

- accettare incarichi
- decidere interpretazione, classificazione finale, fonti da usare, contenuto finale, tempi, telematico, chiusura, importi, cosa va in Scritture e in Paghe
- firmare, inviare
- Posta, Agenda, Fascicoli, Redazione, Telematico, Scritture, Paghe, Conti studio
- smistamento (Segreteria)
- adempimenti di studio (Amministrazione)
- interrogare le banche dati (Banche dati: lui chiede, lo strumento interroga)
- preparare il file sul portale (Telematico)
- registrare (Scritture)
- elaborare i cedolini (Paghe)

#### Segreteria

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: accoglienza e smistamento alle persone. Non tocca canali, archivi, testi, portali, gestionali, conti.

Fa:

- accoglie chi si rivolge allo studio
- indica a Posta a quale persona inoltrare
- chiede alle persone i pezzi che mancano per far girare lo studio

Non fa:

- merito, firma, invio
- Posta (canale: ricevere, magazzino, inoltrare, spedire)
- Agenda (scrivere tempi, avvisare)
- Fascicoli, Banche dati, Redazione, Telematico, Scritture, Paghe, Conti studio
- stesura (Praticante)
- direzione (Commercialista)
- fatture e adempimenti dello studio (Amministrazione)

#### Amministrazione

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: economia e adempimenti dello studio. Non tocca il merito dei clienti e non registra.

Fa:

- propone e chiude gli importi con il Commercialista
- emette la richiesta di parcella / fattura dello studio (il numero e la registrazione li fa Conti studio)
- adempimenti dello studio
- fornitori e spese di studio

Non fa:

- merito, firma, invio
- Posta, Agenda, Fascicoli, Banche dati, Redazione, Telematico, Scritture, Paghe
- registrare, numerare, scadenziario pagamenti dello studio (Conti studio)
- scritture dei clienti (Scritture)
- cedolini (Paghe)
- accoglienza (Segreteria)
- stesura (Praticante)

---

### Agenti strumenti

#### Posta

Casa: GrokBot. Cursor: no. Automation: no.

Routine: sì, proposta, non accesa. Solo ingresso: ogni messaggio in arrivo sullo studio va in magazzino. Nient’altro. Niente classifica, niente risposta, niente inoltro da solo.

Compito: canale. Entra e esce. Non legge il merito.

Fa:

- riceve PEC, e-mail, fax
- mette in magazzino
- inoltra alla persona che Segreteria ha indicato
- spedisce il testo già deciso e già firmato da chi deve firmare

Non fa:

- classificare, etichettare, riassumere, rispondere
- Agenda, Fascicoli, Banche dati, Redazione, Telematico, Scritture, Paghe, Conti studio
- compiti dei quattro dipendenti

#### Agenda

Casa: GrokBot. Cursor: no. Automation: no.

Routine: opzionale, proposta, spenta. Se un giorno si accende: elenca solo i tempi già iscritti. Non iscrive.

Compito: elenco. Scrive i tempi che il Commercialista ha già fissato. Non calcola e non fissa.

Fa:

- scrive in elenco le scadenze già fissate dal Commercialista
- avvisa chi è in elenco
- risponde su ciò che è già scritto in elenco

Non fa:

- calcolare termini
- fissare i tempi (Commercialista)
- Posta, Fascicoli, Banche dati, Redazione, Telematico, Scritture, Paghe, Conti studio
- compiti dei quattro dipendenti

#### Fascicoli

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: archivio. Tiene. Non valuta.

Fa:

- apre il fascicolo quando il Commercialista ha accettato
- tiene anagrafe e documenti del cliente
- indice e recupero
- archivia quando il Commercialista ha chiuso il merito

Non fa:

- accettare incarichi
- valutare, riassumere, redigere, classificare
- Posta, Agenda, Banche dati, Redazione, Telematico, Scritture, Paghe, Conti studio
- compiti dei quattro dipendenti

#### Banche dati

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: interrogare le fonti. Non sceglie e non scrive.

Fa:

- interroga norme, prassi, giurisprudenza
- estrae il testo trovato
- indica data e fonte

Non fa:

- decidere quali fonti usare (Commercialista)
- stendere testi (Praticante / Redazione)
- Posta, Agenda, Fascicoli, Redazione, Telematico, Scritture, Paghe, Conti studio
- firma, invio

#### Redazione

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: forma. Non decide il contenuto.

Fa:

- impagina
- tiene le versioni
- controlla la forma

Non fa:

- contenuto professionale
- prima stesura di merito (Praticante)
- Posta, Agenda, Fascicoli, Banche dati, Telematico, Scritture, Paghe, Conti studio
- firma, invio

#### Telematico

Casa: GrokBot. Cursor: no. Automation: no. Routine: no. Vietato accenderne una.

Compito: interfaccia dei portali. Non invia.

Fa:

- apre il portale
- mostra lo stato
- prepara il file su dati e firme già pronti
- si ferma prima dell’invio

Non fa:

- invio
- firma digitale
- Posta, Agenda, Fascicoli, Banche dati, Redazione, Scritture, Paghe, Conti studio
- decidere se e quando (Commercialista)
- registrare (Scritture)
- elaborare i cedolini (Paghe)

#### Scritture

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: gestionale dei clienti. Registra. Non classifica e non invia.

Fa:

- registra le scritture già decise dal Commercialista
- tiene i sezionali del gestionale
- produce i prospetti calcolati dal gestionale
- chiude i sezionali del cliente quando il Commercialista ha chiuso il merito

Non fa:

- classificare, interpretare (Commercialista)
- prima proposta di classificazione (Praticante)
- elaborare i cedolini (Paghe)
- registrare le parcelle dello studio (Conti studio)
- invio (Telematico)
- Posta, Agenda, Fascicoli, Banche dati, Redazione
- compiti dei quattro dipendenti

#### Paghe

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: software paghe. Elabora. Non assume, non decide la retribuzione, non invia.

Fa:

- elabora cedolini e contributi su dati e scelte già decisi dal Commercialista
- tiene l’anagrafe dei lavoratori nel software paghe
- produce i prospetti di paga calcolati dal software

Non fa:

- decidere assunzioni, cessazioni, retribuzioni (Commercialista)
- invio (Telematico)
- registrare le scritture dei clienti (Scritture)
- registrare le parcelle dello studio (Conti studio)
- Posta, Agenda, Fascicoli, Banche dati, Redazione
- compiti dei quattro dipendenti

#### Conti studio

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: registrazione dello studio. Non tocca i clienti.

Fa:

- numera e registra la fattura / parcella già emessa da Amministrazione
- tiene lo scadenziario pagamenti dello studio
- chiude i conti dello studio sull’incarico quando il Commercialista ha chiuso il merito e Amministrazione ha chiuso gli importi

Non fa:

- decidere importi (Commercialista / Amministrazione)
- emettere la richiesta (Amministrazione)
- scritture dei clienti (Scritture)
- cedolini (Paghe)
- Posta, Agenda, Fascicoli, Banche dati, Redazione, Telematico
- merito

---

### Cosa non c’è

Nessun agente di questa attività è in Cursor. Cursor è la fabbrica (`Squadra.md`).

Nessuna Automation.

Routine: solo Posta (ingresso, proposta, non accesa). Agenda spenta. Telematico vietato.

Niente sito, pack, Stripe, merge.

### Cosa resta

Stessa griglia sulle attività successive, quando le numeri.

Paolo Approves su ogni accensione.
