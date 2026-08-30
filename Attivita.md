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

Stessa griglia sulle attività successive, quando le numeri.

Paolo Approves su ogni accensione.
