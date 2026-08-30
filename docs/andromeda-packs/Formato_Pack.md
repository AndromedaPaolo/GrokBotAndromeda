# Formato pack

**Tipo documento:** specifica. Il validatore `npm test` la applica.
**Versione:** 1.0 — 30 agosto 2026

Un pack è una cartella. È il prodotto. Se non sta in git in questa forma, non sta in vendita.

```
packs/<id>/
  pack.json              # metadati macchina (catalogo, validatore, sito)
  ISTRUZIONI.md          # mandato dell'agente di ruolo (AGENTS.md del pack)
  SKILL.md               # skill Cursor da copiare in .cursor/skills/<id>/
  GROK_BOT.md            # description + routine da incollare in un Grok Bot
  memory/
    SEED.md              # fatti stabili, template, orari. Finti in laboratorio
    GLOSSARIO.md         # termini italiani del mestiere
    VINCOLI.md           # cosa non fare. Firma umana. Professioni. GDPR
  eval/
    rubric.md            # come si dà il punteggio
    scenari/01-....md    # almeno 3
    risultati/.gitkeep   # li scrive C3 Eval, non a mano a caso
```

`<id>` è kebab-case, uguale a `pack.json` → `id`.

---

## pack.json

Campi obbligatori:

| Campo | Significato |
|---|---|
| `id` | Uguale al nome cartella |
| `nome` | Nome in catalogo |
| `versione` | semver |
| `stato` | `laboratorio` \| `prove` \| `in-vendita` \| `ritirato` |
| `istat` | Codice CP2021 se c'è, altrimenti `n/d` e nota |
| `classe_legale` | `ruolo-non-ordinistico` \| `assistente-di-studio` \| `ordinistico-vietato-vendita` |
| `prezzo_previsto_eur` | Numero. Non è un Price ID |
| `compiti` | Lista. Ogni compito: `id`, `nome`, `dimostrato` (bool), `firma_umana` (bool) |
| `vietato` | Lista di stringhe. Finisce anche in VINCOLI.md |

`classe_legale = ordinistico-vietato-vendita` non può avere `stato = in-vendita`. Il validatore rifiuta.

`stato = in-vendita` richiede almeno un compito con `dimostrato: true` e nessuno dei `vietato` contraddetto dalle ISTRUZIONI (controllo umano, C5).

---

## Istruzioni vs memoria

**Istruzioni:** restano vere se cambi azienda. Mandato, tono, stop.

**Memoria:** cambia se cambi azienda. Orari, nomi finti di laboratorio, template con `[RAGIONE_SOCIALE]`.

Se un fatto sta nelle istruzioni e vale solo per "Fiori di Lago Srl", è memoria. Spostalo.

---

## Eval

Ogni scenario:

- Input (mail, file, richiesta).
- Vincolo (tempo, lingua, cosa non deve fare).
- Esito atteso (rubrica).
- Firma umana sì/no.

Punteggio: percentuale di compiti `dimostrato` sul totale mappato. Si pubblica in catalogo solo se C3 ha scritto `eval/risultati/` e tu hai approvato la PR.

In laboratorio il punteggio può essere `null`. Il sito mostra "non ancora misurato", non "100%".

---

## Cosa compra il cliente (Fase vendita, non ora)

Uno zip della cartella a una versione taggata. Più un foglio "come si carica":

1. Cursor: copia `ISTRUZIONI.md` in `AGENTS.md` del suo repo (o skill in `.cursor/skills/<id>/`). Copia `memory/` in una cartella che l'agente legge. Non copiare i tuoi segreti nel pack.
2. GrokBot: incolla `GROK_BOT.md` nella description. Carica `memory/` sul computer condiviso in `/workspace/packs/<id>/`.
3. Automation: se il cliente ha Cursor Automations, usa la ricetta in fondo a `GROK_BOT.md` (webhook o cron) con **i suoi** trigger. Le nostre ricette in `squadra/automazioni/` sono della fabbrica, non del cliente.

Niente BYOK obbligatorio. Niente "collega il tuo Grok per far partire il nostro". Il pack è testo.
