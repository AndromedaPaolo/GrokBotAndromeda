# Attività

Proposta. Non è in esecuzione. Non crea agenti, Automations, routine, sito, pack.

Metodo: 1 dipendente = 1 agente. 1 gruppo di strumenti = 1 agente. Ogni agente ha un compito solo. Un’azione sta in un agente solo.

Niente esempi. La scelta degli agenti è sull’organigramma e sugli strumenti, non su casi.

Filtro: solo mestieri dove l’agente può fare il lavoro per intero o in parte. L’uscita resta bozza. Tu Approvi. L’IA è di supporto. Responsabilità tua.

Due misure.

| Misura | Significa | Non significa |
|---|---|---|
| Intera | Il mestiere non ha atti riservati all’Albo. L’agente fa tutti i compiti del ruolo | Invio da solo. Merge da solo. Soldi da solo. Pubblicare da solo |
| Parte | Un pezzo resta della persona: Albo, firma, presenza, soldi, decisione su persone. L’agente fa il resto | Che l’agente è l’iscritto |

Casa. GrokBot: mail, PEC, calendario, computer, ricerca. Cursor: git. Come [`Squadra.md`](Squadra.md). L’operatore del mestiere è GrokBot. Se lo strumento è un archivio nel git, quello strumento è Cursor. Non due capi.

Classe, da `Squadra.md`: `ruolo-non-ordinistico` / `assistente-di-studio`. `ordinistico-vietato-vendita` non sta in questo foglio.

Slug: allineati a `Squadra.md` quando lo slug c’è già. Nuovi slug in coda lì, non clonati.

Il sito non dice «sostituisce». Questo foglio dice se il mestiere si può fare con agenti, in bozza.

---

## Fuori

Studio legale. Studio commercialista. Erano §1 e §2. Organigramma di Albo. Firma, PEC, udienza, deposito, invio, 730, F24, Unilav restano dell’iscritto. Non sono mestieri da sostituire. Non si clona il trio per venderli come ruolo sostituito. G1 può mapparli. Gazzetta prima. Altro Approva, classe `assistente-di-studio`, non questo filtro.

`StudioLegale.md` è spento con loro.

---

## 1. Segreteria PMI

Slug: `segr`. Classe: `ruolo-non-ordinistico`. Sostituzione: **intera**. Inbox: sì.

Casa operatore: GrokBot. Cursor: no. Automation: no.

Routine: sì, proposta, non accesa. Solo ingresso: ogni messaggio in arrivo va in magazzino. Nient’altro. Niente classifica, niente risposta, niente inoltro da solo.

Il titolare dell’impresa non è un agente. È il click.

### Dipendenti

Segreteria.

Una persona, un agente.

### Strumenti (gruppi)

| Gruppo | Cosa copre |
|---|---|
| Posta | PEC, e-mail, fax, messaggi dello studio/ufficio |
| Protocollo | numero, data, mittente, destinatario |
| Agenda | calendario e scadenze già iscritte dal titolare |
| Anagrafe | identità e recapiti di chi si rivolge |
| Redazione | forma dei testi già decisi dal titolare |

Cinque gruppi, cinque agenti.

### Chi fa cosa

| Momento | Dipendente | Strumento |
|---|---|---|
| Entra una comunicazione | Segreteria (indica a chi) | Posta (canale) |
| Si numera | Segreteria chiede | Protocollo |
| Si annota chi è | Segreteria chiede | Anagrafe |
| Si tiene un tempo già detto | Titolare fissa | Agenda (scrive e avvisa) |
| Si mette in forma un testo già deciso | Titolare decide il contenuto | Redazione (forma) |
| Si spedisce | Titolare ha già deciso e tu hai Approvato | Posta (spedisce) |

### Agenti dipendenti

#### Segreteria

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: accoglienza e smistamento. Non decide. Non spedisce da sola.

Fa:

- accoglie chi si rivolge
- indica a Posta a quale persona inoltrare
- chiede i pezzi che mancano per far girare l’ufficio
- fa annotare Protocollo e Anagrafe
- chiede a Redazione la forma di un testo già deciso dal titolare
- prepara la bozza di risposta. Non la spedisce

Non fa:

- fissare i tempi (titolare)
- contenuto dei testi (titolare)
- Posta (canale), Protocollo (numero), Agenda (elenco), Anagrafe (schede), Redazione (forma)
- soldi, contratti, iscrizioni, cancellazioni

### Agenti strumenti

#### Posta

Casa: GrokBot. Cursor: no. Automation: no.

Routine: sì, proposta, non accesa. Solo ingresso.

Compito: canale. Entra e esce. Non legge il merito.

Fa: riceve, magazzino grezzo, inoltra a chi Segreteria ha indicato, spedisce il testo già deciso dopo la tua approvazione.

Non fa: classificare, riassumere, rispondere, scegliere a chi inoltrare, numerare.

#### Protocollo

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: registro. Numero, data, mittente, destinatario.

Fa: numera, annota, collega all’anagrafe se la scheda esiste.

Non fa: ricevere, tenere il file, classificare il merito.

#### Agenda

Casa: GrokBot. Cursor: no. Automation: no.

Routine: opzionale, proposta, spenta. Se un giorno si accende: elenca solo i tempi già iscritti. Non iscrive.

Compito: elenco dei tempi già fissati dal titolare. Avvisa.

Non fa: calcolare, fissare, inventare scadenze.

#### Anagrafe

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: identità e recapiti. Non i documenti di merito.

Fa: apre e aggiorna schede, risponde chi è e come si raggiunge.

Non fa: accogliere, decidere se è un incarico.

#### Redazione

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: forma. Non il contenuto.

Fa: impagina, versioni, controllo forma. Restituisce identico nel merito.

Non fa: scrivere il contenuto, spedire.

### Cosa non c’è

Nessuna Automation. Telematico no. Contabilità no. Banche dati no. Niente sito, pack, Stripe, merge.

### Cosa resta

Paolo Approves su ogni accensione e su ogni uscita.

---

## 2. Copy SEO locale

Slug: `copy`. Classe: `ruolo-non-ordinistico`. Sostituzione: **intera** sulla bozza. Inbox: no.

Casa operatore: GrokBot. Cursor: sì, se il testo sta nel git. Automation: no. Routine: no.

Il titolare decide cosa si pubblica. L’agente non pubblica.

### Dipendenti

Copy.

Una persona, un agente.

### Strumenti (gruppi)

| Gruppo | Cosa copre |
|---|---|
| Fonti | ricerca web, pagine già pubbliche, materiali già dati dal titolare |
| Pagine | archivio dei testi nel git o nella cartella del pack |
| Redazione | forma, titolo, meta, versioni |

Tre gruppi, tre agenti.

### Chi fa cosa

| Momento | Dipendente | Strumento |
|---|---|---|
| Si raccolgono materiali già pubblici o già dati | Copy chiede | Fonti (estrae) |
| Si stende la bozza | Copy | Pagine (tiene le versioni) |
| Si mette in forma | Copy consegna | Redazione |
| Si pubblica | Titolare. Tu Approvi | nessuno di questi |

### Agenti dipendenti

#### Copy

Casa: GrokBot. Cursor: sì, se scrive nel git. Automation: no. Routine: no.

Compito: bozza dei testi locali. Non pubblica. Non compra ads.

Fa:

- chiede a Fonti i materiali
- stende titolo, corpo, meta
- consegna a Redazione
- tiene le versioni in Pagine
- segnala se manca un fatto già dato. Non lo inventa

Non fa:

- pubblicare
- ads, tracking, pixel
- inventare recensioni, premi, numeri
- Posta verso il cliente finale
- soldi, contratti

### Agenti strumenti

#### Fonti

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: interrogare materiali già pubblici o già consegnati. Non sceglie la linea.

Fa: estrae, indica data e fonte, tiene traccia di cosa è stato chiesto.

Non fa: stendere, pubblicare, decidere la linea.

#### Pagine

Casa: Cursor. GrokBot: no, se il testo è git. Automation: no. Routine: no.

Compito: archivio dei testi. Tiene. Non valuta.

Fa: mette il file, indice, versioni, recupero.

Non fa: merge, publish, copiare segreti del cliente nel pack di laboratorio.

#### Redazione

Casa: GrokBot. Cursor: sì, se la forma sta nel git. Automation: no. Routine: no.

Compito: forma. Non il contenuto commerciale.

Fa: impagina, meta complete, versioni in forma.

Non fa: inventare fatti, pubblicare.

### Cosa non c’è

Inbox no. Routine no. Ads no. Niente Stripe, merge da solo.

### Cosa resta

Pubblicazione e merge: tu.

---

## 3. Catalogo e-commerce

Slug: `cat`. Classe: `ruolo-non-ordinistico`. Sostituzione: **intera** sulle schede. Inbox: no.

Casa operatore: GrokBot. Cursor: sì, se il catalogo è nel git. Automation: no. Routine: no.

Prezzo, stock vero, messa in vendita: titolare.

### Dipendenti

Catalogo.

Una persona, un agente.

### Strumenti (gruppi)

| Gruppo | Cosa copre |
|---|---|
| Schede | testi, attributi, varianti già detti |
| Magazzino | giacenze già scritte da altri |
| Canale | vetrina, marketplace. Non pubblica da solo |
| Redazione | forma della scheda |

Quattro gruppi, quattro agenti.

### Chi fa cosa

| Momento | Dipendente | Strumento |
|---|---|---|
| Arrivano dati prodotto già decisi | Catalogo | Schede (tiene) |
| Si legge lo stock già scritto | Catalogo legge | Magazzino |
| Si mette in forma la scheda | Catalogo consegna | Redazione |
| Si mette in vendita | Titolare | Canale (prepara, non preme) |

### Agenti dipendenti

#### Catalogo

Casa: GrokBot. Cursor: sì, se le schede sono git. Automation: no. Routine: no.

Compito: schede prodotto. Non vende. Non compra.

Fa:

- stende la scheda su dati già dati
- allinea attributi e varianti già detti
- legge Magazzino. Non lo cambia
- consegna a Redazione
- prepara il pezzo per Canale. Non pubblica

Non fa:

- prezzo finale, sconto, messa in vendita
- inventare certificazioni, materiali, recensioni
- pagare, spedire, rimborsare
- Posta al cliente

### Agenti strumenti

#### Schede

Casa: Cursor, se git. Altrimenti GrokBot. Automation: no. Routine: no.

Compito: archivio schede. Tiene.

Non fa: pubblicare, cambiare il prezzo.

#### Magazzino

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: leggere giacenze già scritte. Non movimenta.

Non fa: inventare stock, ordinare merce, fare inventario fisico.

#### Canale

Casa: GrokBot. Cursor: no. Automation: no. Routine: no. Vietato accenderne una che pubblichi da sola.

Compito: preparare la messa in vetrina. Non preme.

Non fa: pubblicare, ads, cambiare prezzo live.

#### Redazione

Casa: GrokBot. Cursor: sì se git. Automation: no. Routine: no.

Compito: forma della scheda. Non i fatti.

### Cosa non c’è

Inbox no. Pagamenti no. Spedizioni no.

### Cosa resta

Prezzo, stock, publish: tu.

---

## 4. Verbali e protocollo

Slug: `verb`. Classe: `ruolo-non-ordinistico`. Sostituzione: **intera** sul verbale in bozza. Inbox: sì.

Casa operatore: GrokBot. Cursor: no. Automation: no.

Routine: Posta ingresso, proposta, non accesa.

Non è il presidente. Non è il notaio. Non è l’amministratore di condominio iscritto.

### Dipendenti

Segretario.

Una persona, un agente.

### Strumenti (gruppi)

| Gruppo | Cosa copre |
|---|---|
| Posta | convocate e messaggi già firmati da chi deve |
| Protocollo | numero, data, mittente, destinatario |
| Agenda | date già fissate |
| Archivio | delibere e verbali già approvati |
| Redazione | forma del verbale |

Cinque gruppi, cinque agenti.

### Chi fa cosa

| Momento | Dipendente | Strumento |
|---|---|---|
| Entra una comunicazione | Segretario indica | Posta |
| Si numera | Segretario chiede | Protocollo |
| Si tiene la data già fissata | Chi presiede fissa | Agenda |
| Si stende il verbale | Segretario | Redazione (forma) |
| Si archivia | Dopo che chi presiede ha approvato | Archivio |
| Si spedisce la convocata | Testo già deciso e firmato, tu Approvi | Posta |

### Agenti dipendenti

#### Segretario

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: protocollo e bozza di verbale. Non delibera. Non vota.

Fa:

- indica a Posta a chi inoltrare
- fa numerare
- stende la bozza di verbale su quanto già detto in seduta o già messo a verbale dal presidente
- consegna a Redazione
- fa archiviare dopo l’approvazione di chi presiede
- prepara la convocata sul testo già deciso. Non la spedisce da solo

Non fa:

- votare, presiedere, firmare
- inventare delibere
- millesimi, riparti, spese (quello è `condo`, altro organigramma)
- soldi, contratti, PEC di merito al posto di chi deve firmare

### Agenti strumenti

#### Posta

Casa: GrokBot. Cursor: no. Automation: no. Routine: ingresso, proposta, spenta.

Compito: canale. Non classifica.

#### Protocollo

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: registro.

#### Agenda

Casa: GrokBot. Cursor: no. Automation: no. Routine: opzionale, spenta.

Compito: elenco date già fissate. Non fissa.

#### Archivio

Casa: GrokBot. Cursor: sì, se i verbali stanno nel git. Automation: no. Routine: no.

Compito: tiene i verbali già approvati. Non valuta.

#### Redazione

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: forma del verbale. Non il voto.

### Cosa non c’è

Notaio no. Amministratore condominiale iscritto no. Cassa no.

### Cosa resta

Firma di chi presiede. Tua approvazione sull’invio.

---

## 5. Customer care e-commerce

Slug: `care`. Classe: `ruolo-non-ordinistico`. Sostituzione: **parte**. Inbox: sì.

Intera sul ticket: legge, classifica, bozza, tracking già vero. Parte su rimborso, reso economico, accredito.

Casa operatore: GrokBot. Cursor: no. Automation: no.

Routine: Posta ingresso, proposta, non accesa.

### Dipendenti

Care.

Una persona, un agente.

### Strumenti (gruppi)

| Gruppo | Cosa copre |
|---|---|
| Posta | ticket in mail |
| Ordini | stato ordine già scritto dal gestionale |
| Tracking | spedizione già scritta dal corriere |
| Magazzino | reso merce già registrato |
| Redazione | forma della risposta |

Cinque gruppi, cinque agenti.

### Chi fa cosa

| Momento | Dipendente | Strumento |
|---|---|---|
| Entra un ticket | Care | Posta |
| Si legge l’ordine | Care chiede | Ordini |
| Si legge la spedizione | Care chiede | Tracking |
| Si risponde | Care stende, tu Approvi | Redazione, poi Posta |
| Si rimborsa | Titolare | nessuno di questi |

### Agenti dipendenti

#### Care

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: ticket. Non accredita.

Fa:

- legge il ticket
- chiede a Ordini e Tracking lo stato già scritto
- stende la bozza. Non inventa il tracking
- consegna a Redazione
- chiede a Posta di spedire dopo la tua approvazione
- ferma e passa al titolare: rimborso, accredito, minaccia legale, AGCM

Non fa:

- accreditare, rimborsare, scontare da solo
- inventare tracking o giacenza
- cambiare l’ordine
- Posta (canale), Ordini (registro), Tracking (corriere)

### Agenti strumenti

#### Posta

Casa: GrokBot. Cursor: no. Automation: no. Routine: ingresso, proposta, spenta.

Compito: canale del ticket. Casella dell’agente, non la Gmail del titolare.

Non fa: rispondere da sola.

#### Ordini

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: leggere lo stato ordine già scritto. Non lo cambia.

#### Tracking

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: leggere il tracking già vero. Non lo inventa. Se manca, dice che manca.

#### Magazzino

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: leggere se il reso merce è già registrato. Non movimenta.

#### Redazione

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: forma della risposta. Non i fatti.

### Cosa non c’è

Cassa no. Stripe no. Routine di invio no.

### Cosa resta

Rimborso, accredito, variazione ordine, invio: tu.

---

## 6. Helpdesk IT L1

Slug: `desk`. Classe: `ruolo-non-ordinistico`. Sostituzione: **parte**. Inbox: sì.

Intera sul runbook già scritto: legge il ticket, trova la scheda, stende i passi. Parte su accessi, password, produzione, acquisti.

Casa operatore: GrokBot. Cursor: sì, se il runbook è git. Automation: no.

Routine: Posta ingresso, proposta, non accesa.

### Dipendenti

Helpdesk.

Una persona, un agente.

### Strumenti (gruppi)

| Gruppo | Cosa copre |
|---|---|
| Posta | ticket |
| Runbook | procedure già scritte nel git |
| Inventario | elenco asset già registrati |
| Redazione | forma della risposta |

Quattro gruppi, quattro agenti.

### Chi fa cosa

| Momento | Dipendente | Strumento |
|---|---|---|
| Entra un ticket | Helpdesk | Posta |
| Si cerca la procedura già scritta | Helpdesk chiede | Runbook |
| Si vede se l’asset è in elenco | Helpdesk chiede | Inventario |
| Si risponde | Helpdesk stende, tu Approvi | Redazione, Posta |
| Si crea un accesso o si tocca la produzione | Persona titolata | nessuno di questi |

### Agenti dipendenti

#### Helpdesk

Casa: GrokBot. Cursor: no sull’invio. Automation: no. Routine: no.

Compito: L1 su runbook già scritto. Non è l’amministratore di sistema.

Fa:

- legge il ticket
- chiede a Runbook la scheda già scritta
- stende i passi così come stanno
- se il runbook non copre, ferma e passa
- non inventa comandi

Non fa:

- creare account, reset password, sbloccare MFA
- cambiare produzione, DNS, backup, fatturazione cloud
- copiare segreti nel ticket
- scrivere un runbook nuovo (quello è fabbrica, `Squadra.md` C1, altro Approva)

### Agenti strumenti

#### Posta

Casa: GrokBot. Cursor: no. Automation: no. Routine: ingresso, proposta, spenta.

Compito: canale ticket.

#### Runbook

Casa: Cursor. GrokBot: legge, non mergea. Automation: no. Routine: no.

Compito: archivio procedure già scritte. Tiene. Non valuta se la procedura è giusta.

Non fa: eseguire i comandi. Merge.

#### Inventario

Casa: GrokBot. Cursor: sì se l’elenco è git. Automation: no. Routine: no.

Compito: elenco asset già registrati. Non compra. Non dismette.

#### Redazione

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: forma della risposta.

### Cosa non c’è

Accessi da solo. Produzione da sola. Routine che esegue comandi: vietata.

### Cosa resta

Credenziali, produzione, acquisti, merge del runbook: tu.

---

## 7. Back-office ordini

Slug: `ordini`. Classe: `ruolo-non-ordinistico`. Sostituzione: **parte**. Inbox: sì.

Intera su conferma, elenco, tracking già vero, documenti già emessi. Parte su prezzo, sconto, acquisto merce, reso soldi.

Casa operatore: GrokBot. Cursor: no. Automation: no.

Routine: Posta ingresso, proposta, non accesa.

### Dipendenti

Back-office.

Una persona, un agente.

### Strumenti (gruppi)

| Gruppo | Cosa copre |
|---|---|
| Posta | conferme, DDT, reclami di consegna |
| Ordini | registro ordini già accettati dal titolare |
| Tracking | spedizione già scritta |
| Magazzino | giacenza già scritta |
| Anagrafe | clienti già in anagrafe |
| Redazione | forma di conferma e solleciti documentali |

Sei gruppi, sei agenti.

### Chi fa cosa

| Momento | Dipendente | Strumento |
|---|---|---|
| Entra un ordine o una domanda di stato | Back-office indica | Posta |
| Si registra l’ordine già accettato | Titolare accetta | Ordini |
| Si legge stock e spedizione | Back-office chiede | Magazzino, Tracking |
| Si conferma | Testo già deciso, tu Approvi | Redazione, Posta |
| Si cambia il prezzo o si rimborsa | Titolare | nessuno di questi |

### Agenti dipendenti

#### Back-office

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: far girare l’ordine già accettato. Non vende. Non compra.

Fa:

- indica a Posta a chi inoltrare
- chiede a Ordini, Magazzino, Tracking, Anagrafe ciò che è già scritto
- stende conferma e aggiornamento di stato su dati già veri
- segnala al titolare se stock o tracking mancano
- ferma: sconto, extra, reso soldi, ordine nuovo da accettare

Non fa:

- accettare l’ordine
- prezzo, sconto, resa
- ordinare merce
- emettere fattura (altro mestiere, altro organigramma)
- inventare giacenza o tracking

### Agenti strumenti

#### Posta

Casa: GrokBot. Cursor: no. Automation: no. Routine: ingresso, proposta, spenta.

#### Ordini

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: registro degli ordini già accettati. Non accetta.

#### Tracking

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: leggere la spedizione già vera.

#### Magazzino

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: leggere la giacenza già scritta. Non movimenta.

#### Anagrafe

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: clienti già in scheda. Non decide il credito.

#### Redazione

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: forma. Non i prezzi.

### Cosa non c’è

Listino. Cassa. Fattura elettronica. Magazziniere fisico.

### Cosa resta

Accettazione ordine, prezzo, soldi, fattura: tu.

---

## 8. Assistente di studio

Slug: `studio`. Classe: `assistente-di-studio`. Sostituzione: **parte**. Inbox: sì.

Non è il commercialista. Non è il consulente del lavoro. Non è l’avvocato. Informativa IA al cliente se tocca una prestazione.

Casa operatore: GrokBot. Cursor: no. Automation: no.

Routine: Posta ingresso, proposta, non accesa. Telematico: vietato accenderne una.

### Dipendenti

Assistente.

Una persona, un agente. L’iscritto non è un agente di questo foglio. Resta la persona.

### Strumenti (gruppi)

| Gruppo | Cosa copre |
|---|---|
| Posta | PEC, e-mail. Casella dell’assistente, non quella dell’iscritto |
| Protocollo | numero, data, mittente, destinatario |
| Agenda | scadenze già iscritte dall’iscritto |
| Fascicoli | documenti del cliente già in archivio |
| Anagrafe | identità e recapiti |
| Redazione | forma delle bozze |

Sei gruppi, sei agenti.

### Chi fa cosa

| Momento | Dipendente | Strumento |
|---|---|---|
| Entra una comunicazione | Assistente indica | Posta |
| Si numera | Assistente chiede | Protocollo |
| Si tiene il documento | Assistente chiede | Fascicoli |
| Si stende una bozza sotto direzione | Assistente | Redazione |
| Si fissa una scadenza | Iscritto | Agenda (scrive) |
| Si firma, si invia, si chiude un adempimento riservato | Iscritto | nessuno di questi |

### Agenti dipendenti

#### Assistente

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: protocollo, bozze, promemoria da calendario già dello studio. Non chiude adempimenti riservati.

Fa:

- indica a Posta a chi inoltrare
- fa numerare
- recupera da Fascicoli
- stende la prima bozza sotto direzione dell’iscritto
- avvisa su scadenze già iscritte
- segnala all’iscritto i pezzi che mancano
- si ferma su 730, Unilav, F24, dichiarazione, visto, firma, invio, deposito

Non fa:

- interpretare norme
- calcolare imposte, contributi, IVA da chiudere
- firmare, PEC di merito, invio portali
- sostituire l’Albo

### Agenti strumenti

#### Posta

Casa: GrokBot. Cursor: no. Automation: no. Routine: ingresso, proposta, spenta.

Non fa: spedire senza Approva. Non è la PEC dell’iscritto.

#### Protocollo

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

#### Agenda

Casa: GrokBot. Cursor: no. Automation: no. Routine: opzionale, spenta. Elenca. Non iscrive. Non calcola termini.

#### Fascicoli

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: archivio. Non valuta.

#### Anagrafe

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

#### Redazione

Casa: GrokBot. Cursor: no. Automation: no. Routine: no.

Compito: forma. Non il merito professionale.

### Cosa non c’è

Banche dati di merito. Telematico. Scritture. Paghe. Conti studio. Avvocato. Commercialista.

### Cosa resta

Ogni adempimento riservato. Firma. Invio. Tua approvazione. Informativa IA.

---

## Coda

Stampo uguale. Non aperti. Niente trio finché G1 + il tuo sì. Slug già in `Squadra.md` o da metterci.

| Slug | Attività | Sostituzione | Inbox | Casa operatore | Perché aspetta / dove si ferma |
|---|---|---|---|---|---|
| social | Social PMI | parte | no | GrokBot | Disclosure IA, minori, ads. Bozza sì. Publish no |
| cv | Screening CV | parte | no | GrokBot | GDPR. Elenco e confronto su criteri già scritti. Niente scoring, niente assunzione |
| condo | Property / condòmini | parte | sì | GrokBot | Protocollo e convocate sì. Millesimi, assemblea, avvocato del condominio no |
| docs | Documentazione software | intera sul testo | no | Cursor | Changelog, README, istruzioni nel git. Merge = tu |
| prenota | Prenotazioni | intera sull’agenda | sì | GrokBot | B&B, ristorante, ambulatorio non medico. Agenda e conferma. Pagamento e cartella clinica no |
| nota | Prima nota | parte | no | GrokBot | Registra su classificazione già detta. F24, bilancio, IVA da chiudere = iscritto |
| scuola | Segreteria scolastica | parte | sì | GrokBot | Circolari, assenze già registrate. Minori, pagelle, Albo docente no |
| iso | Registro documenti già approvati | intera sul registro | no | Cursor | Versiona procedure già firmate. Non certifica |

---

## Cosa non c’è

Nessun agente di questo foglio è acceso. Cursor fabbrica resta `Squadra.md`. Nessuna Automation. Routine: solo Posta ingresso, proposta, non accesa. Agenda spenta. Vietato accendere routine che inviino, pubblichino, paghino, eseguano comandi, segnalino.

Niente sito, pack, Stripe, merge.

Niente organigramma di Albo da vendere sostituito.

## Cosa resta

G1 mappa. Tu Approvi il ruolo. Poi C1/C2 e lo slug. Un’attività alla volta. `segr` prima, se la chiedi.

Paolo Approves su ogni accensione.
