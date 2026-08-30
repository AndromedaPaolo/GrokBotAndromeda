# GrokBot Andromeda — Andromeda Packs

Laboratorio: **istruzioni + memoria** per agenti, su ruoli di lavoro italiani. Poi, se le prove reggono, si vendono i file sul sito.

Branch di questo lavoro: `GrokBotWork`.

Non è Fantasy Empire (quello sta su altri PR). Non è ancora un negozio.

## Parti da qui

1. Tesi e fasi: [`docs/andromeda-packs/Proposta.md`](docs/andromeda-packs/Proposta.md)
2. Squadra Cursor / GrokBot: [`docs/andromeda-packs/Squadra.md`](docs/andromeda-packs/Squadra.md)
3. Formato del prodotto: [`docs/andromeda-packs/Formato_Pack.md`](docs/andromeda-packs/Formato_Pack.md)
4. Quadro normativo (non è un parere): [`docs/andromeda-packs/Quadro_Normativo.md`](docs/andromeda-packs/Quadro_Normativo.md)

## Sito laboratorio

```bash
npm test
npm start
```

Apri http://localhost:4173 — catalogo generato dai `pack.json`. Niente checkout.

## Pack in repo

| id | Stato | Eval |
|---|---|---|
| `segreteria-pmi` | laboratorio | 3 scenari, punteggio non ancora misurato con un agente |
| `customer-care-ecommerce` | laboratorio | stub |
| `assistente-studio` | laboratorio | stub, classe `assistente-di-studio` |

`npm test` valida il formato e gira una prova a tavolino (injection IBAN + chiusura Ferragosto) senza LLM.

## Automation e GrokBot

Ricette spente, da incollare quando lo chiedi:

- Cursor: [`docs/andromeda-packs/Automazioni.md`](docs/andromeda-packs/Automazioni.md)
- Profili: [`squadra/grok-bots/`](squadra/grok-bots/)

Tu Approvi. Nessun auto-merge.
