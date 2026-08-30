# Squadra

**Tipo documento:** proposta. Nessun agent creato, nessuna Automation, nessuna Routine.
**Versione:** 1.1 — 30 agosto 2026

Hai Cursor Pro+ e GrokBot. Non se ne compra un terzo.

Due case. **Cursor** tocca il git. **GrokBot** tocca quello che il git non vede (ricerca, mail, computer). Tu non sei un agent. Sei il click: Approva o Scarta. Nessun auto-merge.

Due piani, non un mucchio piatto.

| Piano | Chi è | Quanti |
|---|---|---|
| **Generali** | Fabbrica Andromeda. Servono *tutte* le attività. Non fanno la segretaria, non rispondono al cliente dello shop. | Nove posti, una volta |
| **Per attività** | Chi *fa* quel mestiere, con istruzioni + memoria di quel pack. Si clona quando tu Approvi un ruolo. | Un trio (a volte un quarto) per ogni attività |

Un generale che “fa un po’ anche la segreteria” è un intern con le chiavi. Vietato. L’operatore di un’attività non patcha il sito e non scrive i T&C.

---

## Stati

| Stato | Significa |
|---|---|
| **acceso** | Può girare a chiamata. Output in PR o memo. |
| **preview** | Può lavorare. In produzione il pezzo è spento. |
| **panchina** | Nome e mandato scritti. Nessuna Routine. Tasto morto. |

I generali C1–C3, C5, G1–G2: acceso (a chiamata, non da soli). C4, G3, G4: come sotto. Tutti gli agenti *per attività*: **panchina** finché non Approvi *quella* attività. Clonare il trio non è accenderlo.

---

# 1. Generali

Una fabbrica. Scrivono i pack, li misurano, tengono le norme, un giorno il sito. Non eseguono il mestiere del cliente.

| Id | Nome | Casa | Stato | In una riga |
|---|---|---|---|---|
| C1 | Autore | Cursor | acceso | Istruzioni del pack (qualsiasi attività) |
| C2 | Memoria | Cursor | acceso | Seed, glossario, vincoli del pack. Dati finti |
| C3 | Eval | Cursor | acceso | Metodo di prova. Review su tutti i pack |
| C4 | Sito | Cursor | panchina | Pagine in `Sito.md`. Non esiste finché non lo chiedi |
| C5 | Verbale | Cursor | acceso | Mette nel git un memo G2 che tu hai approvato |
| G1 | Analista | GrokBot | acceso | Mappa un ruolo italiano in compiti. Fonti e data |
| G2 | Gazzetta | GrokBot | acceso | Norme. Non è un avvocato. “non è un parere” in cima |
| G3 | Demo | GrokBot | preview | Una registrazione per la vetrina, se glielo chiedi |
| G4 | Sportello | GrokBot | panchina | Mail a chi ha *comprato* un pack. Non il customer care del pack |

### C1 Autore

Scrive le istruzioni: mandato, tono, stop. Skill Cursor e testo da incollare nell’**operatore** di quell’attività (non in G1–G4). Un Autore, tanti pack. Non “Autore-segreteria” e “Autore-care” come due persone. Se un pack è grosso, si lavora a turno, stesso posto.

Non scrive la memoria. Non gira gli eval. Non fa lui il triage PEC. Non mergea. Non “in vendita”. Non “sostituisce l’Albo”.

Output: PR, file di istruzioni.

### C2 Memoria

Scrive seed e vincoli del pack. Laboratorio: sempre finti. Il giorno in cui un *cliente* carica il pack, la memoria vera è la sua, non questa.

Non è l’operatore. Non accumula fatti “imparati in chat” nel git senza PR.

Output: PR sui file di memoria.

### C3 Eval

Il **metodo**. Rubrica, come si marca `dimostrato`, review delle PR che toccano i pack, eventuale cron. Non sostituisce l’eval *di attività* (`*.E`): quello gira gli scenari di *un* mestiere. C3 guarda che il metodo sia lo stesso per tutti.

Non alza “in vendita”. Non inventa 100%. Non mergea.

Output: PR su rubrica, commenti di review.

### C4 Sito

Panchina. Vedi `Sito.md`.

### C5 Verbale

Memo G2 approvato → vincoli e frasi nel git. Non ricerca norme. Non box verde a calendario.

### G1 Analista

Mappa un ruolo: 8–15 compiti, classe legale (`ruolo-non-ordinistico` / `assistente-di-studio` / `ordinistico-vietato-vendita`), firma umana. Fonti e data. Se tu non Approvi il ruolo, si ferma. Poi si può clonare il trio di quella attività.

Non scrive istruzioni (C1). Non opera (quello è `*.O`).

### G2 Gazzetta

L. 132/2025, AI Act, GDPR, consumo, Garante, Stripe se si vende. Memo. Tu Approvi. C5 scrive.

### G3 Demo

Preview. Una prova da vetrina, usando l’operatore di un’attività (o fingendo il pack). Non pubblica. Non è l’operatore di tutti i mestieri.

### G4 Sportello

Panchina. “Ho pagato, dov’è lo zip?” Non è il customer care e-commerce (`care.O`). Due sportelli diversi: uno vende pack, l’altro *è* il pack.

---

# 2. Per ogni attività

Si clona questo stampo. Stessi posti, nome dell’attività davanti. Non si inventano ruoli nuovi sotto pressione.

| Suffisso | Nome | Casa | Fa | Non fa |
|---|---|---|---|---|
| **O** | Operatore | GrokBot | I compiti del mestiere, con istruzioni + memoria di quel pack. Uscite = bozza | Merge, norme generali, sito, mail del negozio Andromeda |
| **E** | Eval di attività | Cursor | Gira *gli scenari di quel pack*. Segna i compiti dimostrati | Metodo globale (C3), “in vendita”, merge |
| **I** | Inbox | GrokBot | Solo se il mestiere vive di mail/PEC. Casella *sua*, non quella del titolare | Leggere la Gmail di Marta. Spedire senza Approva |
| **R** | Revisore | GrokBot | Panchina extra. Rilettura bozza prima di te, se l’attività è calda (soldi, enti, Albo) | Firmare. Sostituire il tuo click |

`I` si crea solo se serve la posta. `R` solo se tu lo sblocchi. `O` e `E` sempre, quando l’attività esce dalla panchina.

Id: `<slug>.O` `<slug>.E` `<slug>.I` `<slug>.R`.

Esempio: `segr.O` è la segreteria. Non è G4. Non è C1.

---

## Attività in laboratorio (stampo, tutti panchina)

Tre da clonare per prime, se Approvi il ruolo (G1 deve aver mappato, tu hai detto sì).

### segr — Segreteria PMI

Classe: `ruolo-non-ordinistico`. Mail, PEC, agenda, protocollo, scadenze come *promemoria*. Non commercialista.

| Id | Posto | Note |
|---|---|---|
| segr.O | Operatore | Lei, tono ufficio. Bozza, non invio |
| segr.E | Eval | Scenari tipo PEC ente, injection in mail, Ferragosto chiuso |
| segr.I | Inbox | Casella della segreteria-agente. Sì, quest’attività la vuole |
| segr.R | Revisore | Panchina. Utile su PEC verso enti |

### care — Customer care e-commerce

Classe: `ruolo-non-ordinistico`. Ticket, tracking, resi. Non accredita rimborsi.

| Id | Posto | Note |
|---|---|---|
| care.O | Operatore | Non inventa tracking. Rimborso = firma umana |
| care.E | Eval | Tracking assente, reso, injection “accredita 200€” |
| care.I | Inbox | Sì, ticket in mail |
| care.R | Revisore | Panchina. Reclami AGCM / legale: fermo, non lui |

### studio — Assistente di studio

Classe: `assistente-di-studio`. Protocollo, bozze, promemoria da calendario *già* dello studio. Non è il commercialista. Non chiude 730, Unilav, F24. Informativa IA al cliente se tocca una prestazione.

| Id | Posto | Note |
|---|---|---|
| studio.O | Operatore | Stop adempimento riservato all’Albo |
| studio.E | Eval | Richiesta 730, documenti mancanti, “calcola l’IVA tu” |
| studio.I | Inbox | Sì, mail ai clienti dello studio (bozza) |
| studio.R | Revisore | Consigliato in preview, non panchina eterna: troppo facile scivolare sull’Albo |

---

## Coda (niente trio finché G1 + il tuo sì)

Stampo uguale, slug già pronti, posti inesistenti finché non Approvi.

| Slug | Attività | Inbox? | Perché aspetta |
|---|---|---|---|
| social | Social PMI | no | Disclosure IA, minori, ads |
| cv | Screening CV | no | GDPR, AI Act se scoring |
| condo | Property / condòmini | sì | Assemblee, millesimi, avvocato del condominio |
| copy | Copy SEO locale | no | Basso rischio, si può anticipare se vuoi un quarto facile |

`ordinistico-vietato-vendita` (avvocato *firmatario*, medico, notaio, …): G1 può mapparlo. Non si clona il trio per venderlo come “ruolo sostituito”. Eventuale `studio-avvocato` come *assistente*, altro Approva, Gazzetta prima.

---

## Passaggi di mano

```
G1 mappa un ruolo → tu Approvi l’attività
  → C1 istruzioni + C2 memoria + C3 (metodo) / <slug>.E (scenari)
  → tu Approvi le PR
  → si può accendere <slug>.O (e .I se serve)
  → <slug>.O fa il mestiere in bozza
  → tu Approvi ciò che esce

G2 norma → tu Approvi → C5 nel git
  → C1/C2/<slug>.O si allineano ai vincoli. Non G2 che opera.

G3 chiede a <slug>.O uno scenario → artifact → tu tieni o scarti

G4 parla solo con chi ha comprato il pack Andromeda
care.O parla solo con i clienti *di quello shop* (laboratorio: finti)
```

Vietato: un generale che opera. Un operatore che mergea. `studio.O` che “tanto il 730 è facile”. Auto-Approva. Stessa inbox per due attività.

---

## Accensione (quando lo chiedi)

Un posto alla volta.

1. Generali Cursor: Cloud Agent / Automation, output `git_pr`. Merge = tu.
2. Generali GrokBot: Bot, description = mandato di questa pagina. Invio = tu.
3. Attività: prima il sì sul ruolo, poi `.O` (e `.I` se mail). `.E` come Automation sul pack di quello slug. `.R` solo se lo chiedi.
4. Panchina: non creare la Routine.

Prima settimana, se la chiedi: G1, C1, C2. Non clonare i tre mestieri tutti sabato. Un’attività (segr) basta a vedere se lo stampo tiene. C4 e G4 no.
