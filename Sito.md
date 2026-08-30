# Sito

**Tipo documento:** proposta di struttura. Nessuna pagina costruita, nessuna cartella `sito/`.
**Versione:** 1.0 — 30 agosto 2026

Il sito non è un chatbot. È la **vetrina delle prove**. Chi arriva deve vedere un pack: compiti mappati, cosa è vietato, esito eval, come si carica su Cursor o GrokBot. Chi compra (più avanti) scarica file. Non “l’agente sostituisce la segretaria / il commercialista”.

C4 Sito, in `Squadra.md`, è in panchina. Questo foglio è il contratto delle pagine per quando lo sblocchi.

---

## Cosa vende, quando si venderà

Un pack: istruzioni + memoria + scenari, versionato. Non un abbonamento a una chat. Non un sostituto di un iscritto all’Albo (L. 132/2025: IA di supporto, responsabilità umana, informativa al cliente).

Prezzo in pagina, finché non c’è checkout, è **previsto**, non un’offerta al pubblico. Niente pulsante paga.

---

## Tre strati, non tre date

| Strato | Cosa c’è in pagina | Soldi |
|---|---|---|
| **Laboratorio** | Tesi, elenco pack, dossier, disclaimer, eval se esiste | Zero |
| **Prove** | Stesso + registrazione di uno scenario (G3, se tu Approvi) | Lista d’attesa, consenso, niente carta |
| **Vendita** | Download zip, fattura, account | Stripe, P.IVA, T&C. Altro giro, altro Approva |

Niente countdown. Niente “lanciamo a ottobre”. Si cambia strato con il tuo click, non con un cron.

---

## Mappa delle pagine

```
/                    tesi in una schermata + elenco pack
/pack/<id>           dossier di un pack
/come-si-usa         come si carica su Cursor e su GrokBot
/prove               registrazioni eval (vuota finché non ci sono)
/avvertenze          L. 132, dati finti, “non è un parere”
/lista               panchina: email per avvisare quando si vende
/account             panchina: download, fatture
/cassa               panchina: checkout
```

Quattro pagine vere in Laboratorio: `/`, `/pack/<id>`, `/come-si-usa`, `/avvertenze`. Il resto sono tasti morti o non esistono.

---

## `/` Home

Dossier, non hero SaaS.

1. Protocollo: laboratorio, vendita no.
2. Tesi in 8–10 righe: un agente nudo non fa il ruolo; istruzioni + memoria + prove sì.
3. Elenco pack. Ogni riga: nome, stato (`laboratorio` / `prove` / `in vendita`), compiti mappati, compiti dimostrati, prezzo *previsto* o “non in vendita”.
4. Una **busta aperta**: uno scenario vero (testo in, comportamento atteso). Così si capisce cos’è una prova senza un video.
5. Link a `/avvertenze`. Niente “sostituisce”.

Lingua: italiano. Tono da cartella, non da startup.

---

## `/pack/<id>` Dossier

Una pagina = un pack.

- Nome, versione, classe legale (`ruolo-non-ordinistico` o `assistente-di-studio`).
- Sommario. Lista compiti, ognuno: mappato / dimostrato, firma umana sì/no.
- Vietato (dal file vincoli).
- Eval: data, scenari, punteggio o “non misurato”. Mai un 100% inventato.
- Come si usa: tre file da copiare (istruzioni, memoria, vincoli) e link a `/come-si-usa`.
- Download: tasto morto in Laboratorio. In Vendita: zip della versione taggata, dopo il pagamento.

Se la classe è `ordinistico-vietato-vendita`, questa pagina non ha prezzo e non ha download. Meglio non pubblicarla.

---

## `/come-si-usa`

Due colonne, stesso pack.

**Cursor.** Copia istruzioni in `AGENTS.md` o in una skill. Copia la memoria in una cartella che l’agente legge. Non copiare i segreti del cliente nel pack.

**GrokBot.** Incolla il profilo del *pack* nella description del Bot. Memoria sul computer in una cartella del pack. Inbox dell’agente, non la Gmail del titolare.

Niente “collega il tuo Grok al nostro cloud”. Il prodotto è testo.

---

## `/prove`

Galleria di artifact (G3). Una card: pack, scenario, data, esito, video o testo. Pubblica solo ciò che hai approvato. Vuota è meglio di una demo finta.

---

## `/avvertenze`

Foglio unico, in chiaro:

- Non è un parere legale, fiscale, del lavoro.
- Professioni intellettuali: l’IA è supporto; firma e responsabilità restano umane.
- Memoria di laboratorio: dati finti.
- Se un giorno c’è una chat live, si dice che è un agente.

---

## Panchina (non disegnare ora)

`/lista` — un campo email, consenso, niente newsletter di prodotto finché non vendi.

`/account` — zip già pagati, versione, export, disdetta.

`/cassa` — Stripe, fattura, recesso sul digitale. C4 la costruisce in preview, spenta, solo quando lo chiedi. Live = altro Approva, dopo P.IVA e avvocato.

---

## Cosa non entra in struttura

- Un playground in home che “fa l’avvocato”.
- Loghi ISTAT / Agenzia Entrate.
- Claim di sostituzione occupazionale.
- Auto-publish delle demo di G3.
- Tre CTA uguali (“Inizia”, “Scopri”, “Unisciti”).
- Fantasy Empire. Altro prodotto, altri PR.

---

## Chi tocca il sito

Solo **C4**, quando esce dalla panchina. Copy che tocca norme: prima memo **G2**, poi **C5** nel git, poi C4 in pagina. Merge = tu.
