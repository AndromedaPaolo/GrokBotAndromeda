# Andromeda Packs — istruzioni per agenti su questo repo

Questo ramo è la **proposta** Andromeda Packs: istruzioni + memoria per agenti, prove su ruoli italiani. La vendita e il sito sono un altro giro, quando Paolo lo chiede.

Fantasy Empire vive su altri branch/PR. Non mescolare i due prodotti nello stesso commit.

## Due case

| Casa | Tocca | Non tocca |
|---|---|---|
| Cursor (questo git) | `packs/`, `docs/andromeda-packs/`, eval, PR | Inbox clienti, X, ads, invio mail, Stripe, pagine del sito |
| GrokBot | Ricerca ruoli/norme, bozze mail, demo fuori git | Merge, Price ID, pubblicare un pack `in-vendita` |

Tu (Paolo) sei il click. Approva o Scarta. Nessun auto-merge, anche se gli eval passano.

## Cosa si vende (quando si venderà)

Si vende un **pack versionato** (file), non un agente. Istruzioni + memoria + scenari di prova. L'agente del cliente lo gira lui, su Cursor o GrokBot.

Non si vende "sostituisco l'avvocato / il commercialista / il consulente del lavoro". Legge 132/2025: sulle professioni intellettuali l'IA è supporto, responsabilità umana. Vedi `docs/andromeda-packs/Quadro_Normativo.md`.

## Dove sta cosa

- Piano: `docs/andromeda-packs/`
- Pack: `packs/<id>/`
- Ricette Automation Cursor (da incollare, non accese): `squadra/automazioni/`
- Profili GrokBot (da incollare, non creati): `squadra/grok-bots/`

Niente cartella `sito/`. C4 Sito è in panchina.

## Qualità di un pack

Un pack è completo se ha `pack.json` valido, `ISTRUZIONI.md`, `memory/SEED.md`, `memory/VINCOLI.md`, almeno 3 scenari in `eval/scenari/`. Lo script `npm test` deve passare.

Lo stato `laboratorio` va bene senza punteggio. `in-vendita` no: serve eval e il tuo Approva.

## Lingua

Italiano. Tono da dossier, non da landing SaaS. Niente "rivoluziona il lavoro", niente countdown, niente "sostituisce il professionista iscritto all'Albo".
