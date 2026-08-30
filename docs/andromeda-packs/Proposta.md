# Andromeda Packs — proposta

**Tipo documento:** proposta di sviluppo. Le Automation Cursor e i GrokBot non sono accesi da questo file.
**Versione:** 1.0 — 30 agosto 2026
**Branch:** `GrokBotWork`
**Repo:** GrokBotAndromeda

Hai Cursor Pro+ e GrokBot. Non se ne compra un terzo. Questa è la formazione del **laboratorio che scrive, prova e poi vende** istruzioni + memoria.

Tu non sei un agent. Sei il click.

---

## 1. Tesi

Un agente nudo non fa la segretaria di una PMI di Brescia. Fa la segretaria se gli dai:

1. **Istruzioni** — mandato, tono, cosa può firmare, cosa deve fermarsi.
2. **Memoria** — PEC, orari, festività, template, fornitori, "come si dice da noi".
3. **Prove** — scenari italiani, eval, registrazione. Non uno screenshot di chat.

Quello si vende. Non l'abbonamento a un chatbot generico. Un pack. File. Versione. Punteggio di copertura compiti.

Il sito non promette. Mostra la cartella del pack e il risultato dell'eval. Chi compra prende i file e li carica sul proprio agente (Cursor Cloud, GrokBot, o entrambi).

---

## 2. Due prodotti nello stesso GitHub, due vite

| Prodotto | Dove sta oggi | Cosa è |
|---|---|---|
| **Andromeda Packs** | questo branch | Laboratorio + catalogo + (poi) vendita di pack |
| **Fantasy Empire** | PR #2 e branch `cursor/fantasy-empire-*` | Gioco. Non si tocca da qui |
| **Chatbot scaffold** | PR #1 | Chat Grok di prova. Si potrà riusare come "prova un pack" dopo il merge. Non è il catalogo |

Finché i PR non sono mergiati, questo ramo parte da `main` vuoto. Va bene: i pack sono markdown e json. Il sito laboratorio è statico. Non aspettiamo il chatbot per dimostrare il formato.

Quando (se) mergi PR #1, la chat diventa il banco di prova live di un pack, non la vetrina.

---

## 3. Cosa *non* stiamo dicendo

"Gli agenti sostituiscono varie categorie di lavoro italiano" è la domanda di ricerca. Non è la frase in homepage.

La frase vera, dimostrabile:

> Su questo ruolo abbiamo mappato N compiti. L'agente con questo pack ne chiude M in eval, con firma umana su questi K. Ecco i file e la registrazione.

Copertura. Non sostituzione. Sostituzione intera di un CCNL è marketing e, sulle professioni ordinistiche, è anche illecito (L. 132/2025 art. 13: IA strumentale e di supporto, prevalenza del lavoro intellettuale, informativa al cliente).

I ruoli del catalogo v0 sono **non ordinistici** o esplicitamente **assistente di studio** (il professionista resta il dominus). Dettaglio: `Quadro_Normativo.md` e `Catalogo_Ruoli.md`.

---

## 4. Unità vendibile

Cartella `packs/<id>/` a una versione semver. Contenuto minimo in `Formato_Pack.md`.

Prezzo previsto (non live, non Stripe):

| Pack | Prezzo indicato in catalogo | Perché quel numero |
|---|---|---|
| Segreteria PMI | 149 € una tantum | Un mese di part-time di segreteria, una volta |
| Customer care e-commerce | 149 € | Stesso taglio |
| Assistente di studio | 249 € | Più vincoli, più memoria normativa, più firma umana |

Panchina: abbonamento "aggiornamenti pack" (scadenze fiscali, festività, CCNL). Non si accende in Fase laboratorio. Nessuna data.

---

## 5. Fasi. Non un calendario

| Fase | Sito | Pack | Soldi |
|---|---|---|---|
| **Laboratorio** (ora) | Catalogo, dossier, eval a vista, disclaimer | Stato `laboratorio`. Primo pack scritto | Zero checkout |
| **Prove pubbliche** | Stesso sito + registrazioni eval | Punteggio su almeno 1 pack | Lista d'attesa, niente carta |
| **Vendita** | Checkout, download zip firmato, fattura | Stato `in-vendita` dopo il tuo Approva | Stripe, P.IVA, T&C. Altro giro |

Niente countdown. Niente "lanciamo a ottobre". Laboratorio dura finché un pack ha prove e tu dici sì alla vendita.

---

## 6. Come si sviluppa (ciclo)

```
G1 Analista mappa un ruolo (ISTAT, CCNL, compiti)
  → memo in issue
  → tu Approvi il ruolo

C1 Autore scrive ISTRUZIONI.md + SKILL.md
C2 Memoria scrive SEED + VINCOLI + glossario
C3 Eval scrive scenari e gira le prove
C4 Sito aggiorna il catalogo
  → git_pr
  → tu Approvi

G2 Gazzetta, se il pack tocca un Ordine o dati personali
  → memo_legale
  → tu Approvi
  → C5 Verbale mette il vincolo nel pack

G3 Demo (quando lo chiedi) gira uno scenario con computer
  → artifact in dashboard
  → tu Approvi la pubblicazione sul sito
```

Automation Cursor proposte (spente): `squadra/automazioni/`.
Profili GrokBot (non creati): `squadra/grok-bots/`.
Nomi e stati: `Squadra.md`.

---

## 7. Prima settimana di lavoro vero, quando lo chiederai

Non "accendiamo tutti". Tre cose:

1. **C4 Sito** già in questo PR: catalogo laboratorio.
2. **Pack `segreteria-pmi`** già in questo PR: istruzioni + memoria + 3 scenari. Eval ancora a mano.
3. **Una Automation** `pack-review` su PR che toccano `packs/`. Una. Poi si vede.

GrokBot: accendi **G1 Analista** e **G2 Gazzetta** a chiamata. Inbox clienti (G4) panchina fino alla vendita.

---

## 8. Fuori scope di questa proposta

- Stripe, Price ID, fattura elettronica di vendita.
- Merge automatico.
- Claim "sostituisce il commercialista".
- Agent che parla con l'Agenzia delle Entrate.
- Mescolare Fantasy Empire in questi file.
- Accendere le Automation da questo markdown.
