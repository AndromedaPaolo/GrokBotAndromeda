# Andromeda Packs — squadra

**Tipo documento:** proposta. Nessun agent creato, nessuna Automation, nessuna Routine GrokBot.
**Versione:** 1.0 — 30 agosto 2026
**Ops:** stesso principio di Fantasy Empire. Git = Cursor. Fuori git = GrokBot. Sì/no = tu.

---

## 1. Stati

| Stato | Significa |
|---|---|
| **acceso** | Può girare a chiamata o da issue. Output in PR o memo. |
| **preview** | Può scrivere codice/pack ora. In produzione il pezzo è spento (niente vendita, niente mail clienti). |
| **panchina** | Il posto ha nome e mandato. Nessuna Routine. Tasto morto. |

---

## 2. Roster

**Cinque su Cursor, quattro su GrokBot.** Corto di proposito. Un intern con le chiavi non entra.

### Cursor (git)

| Id | Nome | Stato | Output | Mandato |
|---|---|---|---|---|
| C1 | Autore | acceso | `git_pr` su `packs/` | Istruzioni, skill, profilo GrokBot del *pack* (non della squadra) |
| C2 | Memoria | acceso | `git_pr` su `packs/*/memory/` | SEED, glossario, vincoli. Niente dati veri di clienti |
| C3 | Eval | acceso | `git_pr` su `eval/` + `copertura` in `pack.json` | Scenari, rubrica, punteggio. Non alza lo stato a `in-vendita` |
| C4 | Sito | panchina | `git_pr` (tipo spento) | Catalogo e pagine. Non esiste finché non lo chiedi. Niente CTA "compra" |
| C5 | Verbale | acceso | `git_pr` su docs/vincoli | Traduce un `memo_legale` approvato in testo nel pack. Non "diventa legge" |

### GrokBot (fuori dal git)

| Id | Nome | Stato | Output | Mandato |
|---|---|---|---|---|
| G1 | Analista | acceso | `memo_ruolo` | ISTAT, CCNL, compiti reali di un ruolo italiano. Fonti e data |
| G2 | Gazzetta | acceso | `memo_legale` | L. 132/2025, AI Act, Codice consumo, GDPR sul pack in vendita. In cima: "non è un parere" |
| G3 | Demo | preview | artifact / registrazione | Gira uno scenario del pack sul computer. Non pubblica da solo |
| G4 | Sportello | panchina | `mail` tag `pack` | Dopo la vendita: "ho pagato, dov'è lo zip". Bozza. Non tocca i fondi |

---

## 3. Chi gira già, chi sta seduto

**Accesi o in preview, laboratorio.** Autore, Memoria, Eval, Verbale, Analista, Gazzetta, Demo (solo se glielo chiedi, niente publish).

**Panchina.** Sito (C4). Sportello. Checkout (è un pezzo di C4 che si sblocca in Fase vendita, altro giro).

---

## 4. Vietato a tutti

- Dichiarare un pack `in-vendita`.
- Copy da vetrina: "sostituisce [professione ordinistica]".
- Mettere in `memory/SEED.md` dati personali veri (usa sempre finti, laboratorio).
- Merge su `main`.
- Accendere Stripe.
- Un agent ibrido "fa l'Analista e poi mergea il pack".
- Aprire una cartella `sito/` in questo giro.

---

## 5. Come si accende un posto (quando lo chiederai)

1. Cursor: Automation o Cloud Agent, stesso nome della tabella, output `git_pr`. Merge = tu.
2. GrokBot: Bot con la description in `squadra/grok-bots/<id>.md`. Invio mail / publish = tu.
3. Panchina: non creare la Routine. Il file del mandato basta.

Niente "accendiamoli tutti sabato". Autore + Memoria bastano per il primo pack. Eval la settimana in cui vuoi un numero. Gazzetta prima di qualsiasi frase su commercialisti o avvocati. Sito: panchina.
