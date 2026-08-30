# Automazioni Cursor — ricette da incollare

**Tipo documento:** ricette. Non crea Automation. Si incollano a [cursor.com/automations](https://cursor.com/automations) quando lo chiedi.
**Versione:** 1.0 — 30 agosto 2026
**Repo:** `AndromedaPaolo/GrokBotAndromeda`
**Environment:** quello già collegato a questo repo.

Io (cloud agent) posso *leggere* un'automation per UUID. Non posso crearla da qui. Il click è tuo.

Memorie delle Automation: tool Memories di Cursor (`MEMORIES.md` per automation). È memoria **di fabbrica**, non il prodotto. Il prodotto sta in `packs/*/memory/`. Se Eval impara una cosa utile a tutti i clienti, C2 la copia nel SEED con PR. Non si vende il `MEMORIES.md` privato della tua automation.

---

## A1 — `pack-review` (la prima da accendere)

| Campo | Valore |
|---|---|
| Trigger | Pull request opened + Pull request pushed |
| Filtro utile | path sotto `packs/` (se l'UI lo consente; altrimenti il prompt dice di uscire se il diff non tocca `packs/`) |
| Repo | questo, single repository |
| Model | quello che usi già per i cloud agent |
| Tools | PR comments, Memories on, Computer use off, PR creation off |
| Permessi | Private |

Prompt da incollare:

```
Sei C3 Eval in revisione, non l'autore.

Se il diff di questa PR non tocca packs/, commenta una riga "fuori perimetro pack" e ferma.

Altrimenti:
1. Leggi docs/andromeda-packs/Formato_Pack.md e AGENTS.md.
2. Gira `npm test` (valida pack.json e file obbligatori).
3. Controlla VINCOLI.md vs ISTRUZIONI.md: l'istruzione non deve ordinare ciò che VINCOLI vieta.
4. Controlla classe_legale: se ordinistico-vietato-vendita, stato non può essere in-vendita.
5. Cerca nel copy del pack le frasi "sostituisce" + professione ordinistica. Se le trovi, request changes.

Commenta sulla PR: pass/fail, lista file mancanti, alcun merge.
Non aprire un'altra PR. Non mergiare. Non toccare Fantasy Empire.
```

---

## A2 — `eval-notturno` (dopo che esistono risultati da rigirare)

| Campo | Valore |
|---|---|
| Trigger | Scheduled, cron `0 4 * * *` (04:00 UTC) |
| Repo | questo |
| Tools | PR creation **on**, Memories on, Computer use **on** solo se gli scenari lo chiedono |
| Permessi | Private |

Prompt:

```
Sei C3 Eval. Branch nuovo da main, nome eval/notturno-YYYYMMDD.

Per ogni pack in packs/ con stato laboratorio o prove:
1. Leggi eval/scenari e rubric.md.
2. Esegui gli scenari che si possono chiudere in testo (mail da redigere, triage). Non inventare API esterne.
3. Scrivi eval/risultati/YYYYMMDD.md con pass/fail per scenario e aggiorna compiti[].dimostrato in pack.json solo se l'esito è chiaro.
4. npm test.

Se nulla è cambiato, non aprire PR.
Se qualcosa è cambiato, apri PR verso GrokBotWork (o main, se quello è il ramo di lavoro). Titolo: "Eval notturno YYYY-MM-DD".
Non passare uno stato a in-vendita. Non mergiare.
```

---

## A3 — `gazzetta-settimanale` (memo, non patch silenziosa)

G2 è un GrokBot, non un cloud agent. Due strade:

**Opzione corta (consigliata in laboratorio):** niente Automation. Tu scrivi a G2 una volta a settimana.

**Opzione Cursor:** Automation scheduled settimanale, no GrokBot. Cloud agent che cerca fonti e apre PR su `docs/andromeda-packs/Quadro_Normativo.md` con "non è un parere" in testa. Tools: PR creation on. Prompt: solo docs, nessun pack `in-vendita` da solo.

---

## A4 — `demo-webhook` (panchina, dopo il sito)

Non accendere. Non c'è un sito. Quando (se) Paolo chiede il catalogo pubblico, si ricopia questa ricetta: webhook, body `{ "packId", "scenarioId", "action" }`, `action=ping` si ignora, niente mail, niente publish.

---

## Ordine di accensione

1. A1 pack-review  
2. A2 eval-notturno, quando hai girato a mano almeno una volta i 3 scenari di segreteria  
3. A3 solo se non usi G2 a voce  
4. A4 solo dopo che esiste un sito (non ora)
