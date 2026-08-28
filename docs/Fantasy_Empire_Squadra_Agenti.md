# Fantasy Empire — Squadra agenti

**Tipo documento:** proposta. Nessun agent creato, nessuna Automation, nessuna Routine.
**Versione:** 1.1 — 28 agosto 2026
**Proposta:** `Fantasy_Empire_Proposta_Commerciale.md` v2.6
**Ops (principio):** `Fantasy_Empire_Ops_Cursor_GrokBot.md`
**Dashboard:** `Fantasy_Empire_Dashboard_Approvazioni.md`
**GrokBot, mandato:** `Fantasy_Empire_Grok_Bot_Ops.md`

Hai Cursor Pro+ e GrokBot. Non se ne compra un terzo. Questa è la **formazione**, non un organigramma da startup. I posti della fase a pagamento stanno qui **da subito**, in panchina. Così il giorno in cui vendi Visioni non inventi ruoli nuovi sotto pressione.

Tu non sei un agent. Sei il click. Approva o Scarta. Fine.

---

## 1. Due case, non una

| Casa | Cosa può toccare | Cosa non può |
|---|---|---|
| **Cursor** | Repo, PR, test, flag, pagine, schema D1, checkout in preview, job Imagine (Worker + xAI) | Inbox giocatori, X, ads, invio mail |
| **GrokBot** | Mail, X, ricerca web/norme, bozze social | Merge, combat, Price ID, `STRIPE_LIVE`, job Imagine, file in R2 |

Se un lavoro sta a cavallo, si spezza. Gazzetta (GrokBot) scrive un memo. Verbale (Cursor) lo traduce in PR. Tu Approvi due volte, due card diverse. Costa un click in più. Evita che GrokBot patchi lo SP in combattimento perché "l'ha letto su una delibera".

Niente agent ibrido "fa un po' tutto". Quello è un intern con le chiavi.

---

## 2. Stati. Non fasi di calendario

Ogni posto ha uno stato. Non una data.

| Stato | Significa |
|---|---|
| **acceso** | Può girare già in Fase 0, a chiamata o da issue. Output in dashboard. |
| **preview** | Cursor può scrivere il codice *ora* (checkout, Santuario chiuso). In produzione il pezzo è spento. |
| **panchina** | Il posto esiste, ha un nome, ha i tipi dashboard già previsti. Nessuna Routine. Tasto Approva su quel tipo è morto finché non lo sblocchi tu. |

Panchina ≠ "lo pensiamo dopo". Panchina = il contratto del ruolo è scritto. Manca solo il permesso.

Nessuno di questi posti accende i pagamenti da solo. Nessuno fissa una data.

---

## 3. Roster corto

**Nove su Cursor, otto su GrokBot.** Imagine sta sul git, non sulla inbox. Ads (G8) non sta dentro Bacheca.

### Cursor (git)

| Id | Nome | Stato oggi | Output in dashboard | Mandato in una riga |
|---|---|---|---|---|
| C1 | Patcher | acceso | `git_pr` | Bug, GDD, combat, edifici, dungeon. Test nella stessa PR. |
| C2 | Sito | acceso | `git_pr` | Landing, auth, `/play` chrome, pagine legali *bozza*. |
| C3 | Numeri | acceso | `git_pr`, `quota_week`, `cap` | Config, tetto 7/40, cap beta, bilanciamento se glielo chiedi. |
| C4 | Checkout | preview | `git_pr`, poi `prezzo` | Stripe test, Visioni, webhook `visions`, 54-bis, portal. Live solo dopo `stripe_live`. |
| C5 | Santuario | preview | `git_pr` | Zona extra locked in Fase 0. Si apre con `entitlements.status = visions`. Stesso combat. |
| C6 | Bandiere | acceso | `stripe_live` (tasto morto se checklist rossa), flag nel repo | `PAYWALL`, `STRIPE_LIVE`, `BETA_ACCESS`. Mai un cron. |
| C7 | Verbale | acceso | `git_pr` da `memo_legale` | Checklist Fase B nel repo. Box rossi/verdi. Non li mette verdi perché "è passato un po'". |
| C8 | Imagine | acceso | `video_new` | Still + I2V via Worker. Chiave xAI nei secret del Worker. Precache e miss. |
| C9 | Stagione | panchina | `git_pr` (tipo spento) | Season e cosmetic. Niente pay-to-win. Si siede quando c'è margine *e* tu sblocchi. |

### GrokBot (fuori dal git)

| Id | Nome | Stato oggi | Output in dashboard | Mandato in una riga |
|---|---|---|---|---|
| G1 | Inbox | acceso | `mail` | Risposta a un giocatore, magic link, posto in waitlist. |
| G2 | Ascolto | acceso | `memo_twitter` | X/Twitter sola lettura. Zero like, zero reply, zero post. |
| G3 | Gazzetta | acceso | `memo_legale` | AGCOM, Garante, AI Act, policy Stripe, ToS Vercel. In cima: "non è un parere". |
| G4 | Corriere | acceso, tasto condizionato | `preavviso_pagamenti`, poi mail transazionali Visioni | Preavviso 30 giorni. In Fase B: "abbonamento attivo / disdetto / pagamento fallito". |
| G5 | Sportello | panchina | `mail` tag `soldi` | "Ho pagato e il Santuario è chiuso", chargeback, rimborso. Bozza. Non tocca i fondi. |
| G6 | Promo | panchina | `mail_massa` | Newsletter e patch notes marketing. Solo consenso. Niente in Fase 0. |
| G7 | Bacheca | panchina | `post_x` / `post_ig` / `post_altro` | Publish social. Disclosure IA. Riusa cache `cinematics`. |
| G8 | Spesa | panchina | `ads` | Copy e budget. Il click sulla carta ads resta tuo. Mai in Fase 0. |

---

## 4. Chi gira già, chi sta seduto

**Accesi o in preview, Fase 0.** Patcher, Sito, Numeri, Checkout, Santuario, Bandiere, Verbale, Imagine, Inbox, Ascolto, Gazzetta, Corriere (il preavviso: card sì, Approva spento se la checklist è rossa).

**Panchina, scritti adesso.** Stagione, Sportello, Promo, Bacheca, Spesa.

Il giorno in cui Approvi `stripe_live` non nasce uno "staff ricavi". Si alzano i tasti di Checkout (live), Santuario (unlock), Corriere (mail Visioni), Sportello. Promo / Bacheca / Spesa restano panchina finché non sblocchi *quei* tipi, uno alla volta. Profitto ≠ permesso ads.

---

## 5. Cursor, i posti in dettaglio

### C1 Patcher

Il manutentore. Issue o chat → riproduce → patch → test → `git_pr`. Non mergea.

Vietato: mail, X, flag soldi, Price ID, "è ora di far pagare".

Se la PR tocca combat, auth, entitlement, il tag rischio è grosso. Approva resta tuo. Test fail = tasto spento.

### C2 Sito

Pagine. Landing Fase 0 senza CTA Abbonati. Gate 18+. `/account` cancellazione e export. Bozze privacy/T&C: PR, non "ufficiali" senza avvocato.

In preview può già costruire `/account` Visioni (disdetta, 54-bis) *spento in prod*. Così Fase B non è una riscrittura.

### C3 Numeri

Tetti, cap, bilanciamento. Una volta a settimana solo se glielo chiedi. Legge D1 se esposto, apre card. Non pusha `7` → `10` in silenzio.

`quota_week` e `cap` sono tipi suoi. Cambio tetto = disclosure in-game, non solo un merge.

### C4 Checkout

Esiste da subito perché il checkout si sbaglia se lo inventi a luci accese.

Scrive: Stripe test mode, Price ID Visioni in env di preview, webhook `entitlements.status = visions`, cancel → dal periodo dopo tetto 7 e Santuario chiuso, pulsante 54-bis, link Customer Portal.

In produzione Fase 0: Stripe assente dal frontend. Questo agent **non** è un permesso a vendere. È un permesso a *costruire il tubo* in preview.

Vietato: Price ID live, addebiti, cambiare 9,99 senza card `prezzo`.

### C5 Santuario

La zona extra. In Fase 0 è in mappa, locked. Stesso resolver di combat. Niente carte più forti, niente SP extra.

Senza Visioni: UI "chiuso". Con Visioni: entra. Save del Santuario resta esportabile a disdetta.

Non è un dungeon pay-to-win. Se una patch lo rende più forte del resto del GDD, Scarta.

### C6 Bandiere

Unico che propone `STRIPE_LIVE=on`, e solo su card con box verdi + preavviso scaduto. Altrimenti il tasto è morto e dice quale box è rosso.

Non propone una data. Non propone "i 40 beta sono contenti, si paga".

### C7 Verbale

 Tiene l'issue/checklist Fase B. Quando Gazzetta lascia un memo e tu Approvi, Verbale apre il `git_pr` di `docs/` o delle pagine. Non "diventa legge".

Non mette un box verde perché è agosto.

### C8 Imagine

Still e video. Stessa casa del git perché il tubo è codice: Worker, secret, coda, R2.

`XAI_API_KEY` sta nei secret del Worker. Non in GrokBot. Non nel browser. Non in una chat.

Due modi, stesso codice:

1. Precache. L'agent Cursor accoda 80–150 chiavi, tetto tipo 20/giorno. Ogni clip finita → R2 → `video_new`.
2. Miss in `/play`. Il Worker enqueue da solo, 2D adesso, job dopo. GrokBot non entra.

Mai una chiave del giocatore. `gen_quota` la scala il Worker. Combat non aspetta. Approva = `ready`. Scarta = delete.

Se il player in `/play` è rotto, è Patcher. Imagine non tocca lo SP.

### C9 Stagione

Panchina. Season pass, temi, credits. Contenuto o cosmetici. Se qualcuno gli chiede loot box a pagamento, rifiuta. Quello riapre l'azzardo.

---

## 6. GrokBot, i posti in dettaglio

### G1 Inbox

Supporto. Bozza in dashboard. Tu mandi. In Fase 0 niente "compra a 9,99". GDPR: transazionale del servizio, o consenso.

### G2 Ascolto

Memo su X. Approva = archivia. Se dal memo esce "il tutorial droppa al dungeon", non patcha lui: apre il discorso a Patcher, via issue / card `git_pr` di Cursor. Due case.

### G3 Gazzetta

Fonti e data. "non è un parere legale" in cima. Approva = Verbale (Cursor) apre PR. Scarta = archivia. Non riscrive i T&C in produzione.

### G4 Corriere

Due vite, stesso posto.

Oggi: card `preavviso_pagamenti`. Tasto morto se Verbale è rosso. Approva = manda i 30 giorni. **Non** accende Stripe.

Da Fase B: mail transazionali Visioni (attivo, disdetto, pagamento fallito). Non è Promo. È il servizio che l'abbonato usa.

### G5 Sportello

Panchina fino a `STRIPE_LIVE`. Poi: gente che ha pagato e non entra, chargeback, "voglio il rimborso". Bozza `mail` con tag `soldi`. Rimborso vero: tu su Stripe, poi Checkout (Cursor) riallinea l'entitlement.

### G6 Promo

Panchina. `mail_massa` solo con consenso filtrato. In Fase 0 il tipo è spento, punto. Soft spam art. 130 co. 4 vale per chi ha *acquistato*: quindi non prima di Fase B, e nemmeno subito dopo se non hanno comprato.

### G7 Bacheca

Panchina. Post live. Clip dalla cache, non un Imagine nuovo per ogni social. Disclosure IA. Niente targeting minori. Niente "ultimi giorni" se non è vero.

Default Fase 0: tipo spento. Lo sblocchi tu, pezzo per pezzo, quando stai già vendendo e vuoi spingere. Non quando D7 è bello.

### G8 Spesa

Panchina. Ads. Preview copy + budget + targeting. Approva qui non paga da solo: ti lascia il link al billing ads. Il click sulla carta è tuo, come Vercel.

---

## 7. Passaggi di mano (i soli leciti)

```
giocatore scrive
  → G1 Inbox  → card mail → tu Approvi → parte la mail

Gazzetta trova una delibera
  → G3 memo_legale → tu Approvi
  → C7 Verbale apre git_pr → tu Approvi di nuovo → merge

Ascolto vede un pattern
  → G2 memo_twitter → tu archivi
  → se è prodotto: issue → C1 Patcher

Imagine (C8) finisce una clip
  → Worker R2 → video_new → tu Approvi/Scarti
  → GrokBot non c'entra. Patcher solo se il player è rotto

tu vuoi i pagamenti
  → C7 Verbale verde
  → G4 Corriere manda i 30 giorni (Approva tuo)
  → 30 giorni
  → C6 Bandiere, card stripe_live (Approva tuo)
  → C4 Checkout live, C5 Santuario si apre per gli abbonati
  → G5 Sportello esce dalla panchina
```

Vietato il salto: GrokBot che mergea. GrokBot che chiama xAI. Cursor che manda mail. Un agent che fa il giro Gazzetta+PR+merge da solo. Un cron "è il 1, si paga".

---

## 8. Cosa non entra in squadra

- Un agent giocabile in `/play` (NPC, dungeon master). Non è questo file. Se lo vuoi, è prodotto, GDD, un'altra proposta.
- Un agent "strategia" che decide il prezzo. Il prezzo è card `prezzo` e il click è tuo.
- Un agent che parla con AGCOM o con Stripe support al posto tuo.
- Un agent che paga Vercel, R2, xAI, ads.
- BYOK, "collega il tuo Grok". Scartato.
- Auto-Approva se i test passano.

Due umani restano fuori tabella e sopra: tu, e l'avvocato/commercialista quando i testi o il fisco sono veri.

---

## 9. Come si accende un posto (quando lo chiederai)

Questo file non crea nulla. Il giorno in cui vorrai il primo agent vero:

1. Cursor: Cloud Agent / Automation sul repo, un posto alla volta, stesso nome della tabella. Output solo `git_pr` (o il tipo suo). Merge = dashboard.
2. GrokBot: Routine o inbox sul posto, stesso nome. Output solo il tipo suo. Invio/publish = dashboard.
3. Panchina: si crea il tipo dashboard *già spento*. Così Sportello esiste come tasto morto, non come sorpresa a primo chargeback.

Niente "accendiamoli tutti sabato". Patcher e Inbox bastano per la prima settimana di codice. Checkout e Santuario in preview quando esiste `/play`. I panchina, come tipi morti, sì da subito nella dashboard: costa poco e ti abitua a vederli spenti.

---

## 10. Fuori scope

Nessun agent creato qui. Nessuna Automation Cursor. Nessuna Routine GrokBot. Nessun webhook. Nessun Price ID. Nessuna data in cui Bacheca o Spesa si svegliano da sole.
