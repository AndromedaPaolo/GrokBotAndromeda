# Fantasy Empire — Ops: Cursor prima, GrokBot a supporto

**Tipo documento:** proposta. Nessun codice, nessuna Automation, nessuna Routine creata.
**Versione:** 1.6 — 1 settembre 2026
**Riferimenti:** `Fantasy_Empire_Proposta_Commerciale.md` v2.8 · `Fantasy_Empire_Squadra_Agenti.md` · `Fantasy_Empire_Dashboard_Approvazioni.md` · `Fantasy_Empire_Grok_Bot_Ops.md` · `Fantasy_Empire_Fase_0_Accesso_Gratuito.md`
**Cosa hai già:** Cursor Pro+ su questo repo. Abbonamento GrokBot. Si usano tutti e due. Non se ne compra un terzo.

---

## 1. Principio

Il gioco si **automantiene su Cursor**. Issue, patch, PR, test, flag, testi del sito, checklist legale nel repo.

Tu **non** apri GitHub per mergeare. Approvi o scarti da una dashboard. Approva sul git = merge + push su `main`. Scarta = chiude la PR e cancella il branch. Lo stesso schema vale per mail, post, flag, preavviso, ban video, invite: se è un sì/no che oggi faresti su un altro sito, sta in quella coda. Specifica: `Fantasy_Empire_Dashboard_Approvazioni.md`.

GrokBot **non** tiene in vita il prodotto. Entra quando Cursor non arriva: mandare una mail, leggere X/Twitter, fare una ricerca normativa, un memo su AGCOM/Stripe, un giro di supporto. Poi, se serve una modifica al gioco, torna Cursor e apre una riga `git_pr` in dashboard.

Nessuno dei due accende Stripe da solo. Nessuno dei due fissa una data in cui la gente inizia a pagare. Stripe e il preavviso 30 giorni sono due righe in coda, con il tasto Approva **spento** finché la checklist è rossa.

---

## 2. Perché questo taglio

Cursor Pro+ vive nel git. Vede il codice, apre PR, gira i test, non ha la tua inbox e non ha un account X. Se gli chiedi "mandala tu la mail ai beta" o "dimmi cosa dicono su Twitter di ieri" fa il giro largo, o sbaglia.

GrokBot (questo repo, MCP mail / web / search) fa quelle cose. Non dovrebbe mergeare combat su `main` né toccare i Price ID.

Il profitto alza il rischio legale (recesso, IVA, policy Stripe, classificazione con "acquisti nel videogioco"). Quindi il passaggio gratis → pagato è un **evento**, non un giorno sul calendario. Se lo metti in agenda ("dal 1 marzo si paga") ti ritrovi a incassare con la checklist ancora rossa, o a dover slittare in pubblico. Meglio: la Fase 0 dura finché durano le condizioni. Quando le condizioni ci sono *e* tu dici sì, parte il preavviso di 30 giorni. I 30 giorni sono un preavviso, non la data di lancio scritta oggi.

---

## 3. Chi fa cosa

| Lavoro | Chi | Come | Vietato |
|---|---|---|---|
| Bug, bilanciamento, feature GDD, schema D1, flag `PAYWALL` / `STRIPE_LIVE` | **Cursor** | Cloud Agent / chat sul repo → PR | Merge su `main` senza di te |
| Pagine privacy, T&C *bozza*, landing, pittogrammi | **Cursor** | PR sul sito | Pubblicare testi "ufficiali" senza avvocato dove serve |
| Test, 429, tetti D1, cap beta | **Cursor** | PR + report in issue | Alzare i piani a pagamento da solo |
| Checklist Fase B (P.IVA, Stripe, recesso) tenuta aggiornata nel repo | **Cursor** | Issue permanente, box rossi/verdi | Mettere un box verde perché "è passato abbastanza tempo" |
| Tradurre un memo legale in patch del repo | **Cursor** | PR che cita il memo | Inventarsi norme |
| Banco clip (still + upload tuo) | **tu + Cursor** | Card `video_req`: manca X, Genera/Carica still, Carica MP4. Poi `video_new` per la qualità | Generare in combattimento. GrokBot con la chiave. Auto-ready. Space/free tier nel Worker |
| Mail a un giocatore, magic link di supporto, preavviso (il giorno in cui *tu* lo chiedi) | **GrokBot** | Inbox / AgentMail / Gmail, su tuo ordine | Newsletter a raffica, soft spam in Fase 0 |
| Analisi X/Twitter, thread, sentiment, account da non citare | **GrokBot** | Ricerca + memo in chat o issue | Post live, ads, reply automatiche |
| Ricerca legale (AGCOM, Garante, AI Act, policy Stripe, ToS Vercel) | **GrokBot** | Memo con fonti. Non è un parere | Cambiare i T&C in produzione da solo |
| Upgrade Vercel / D1 / dominio | nessuno in autonomia | Proposta in issue, click billing tuo | — |
| Accensione `STRIPE_LIVE` | **tu, da dashboard** | Riga in coda. Approva solo se checklist verde + preavviso scaduto | Automazione, cron, "è ora" |

Regola corta: **git e tubo file = Cursor. Mondo fuori dal git (mail, X, legale) = GrokBot. Sì/no = dashboard. Video = still in dashboard, MP4 lo fai tu. Soldi sul billing dei fornitori = tu.** I nomi dei posti: `Fantasy_Empire_Squadra_Agenti.md`.

---

## 4. Cosa fa Cursor da solo (automantenimento)

Niente daemon magico. Automantenimento qui significa: il repo è lo stato, gli agent ci lavorano, tu vedi una card.

Ciclo proposto, **già in Fase 0**, a consumo Pro+:

1. Issue aperte dal gioco (bug, 429, tetto video, drop tutorial) o da te in chat.
2. Agent Cursor: riproduce, patcha, test, PR sul branch. Scrive una riga `git_pr` in dashboard. Non mergea.
3. Tu apri la dashboard. Approva = merge + push. Scarta = PR chiusa, branch cancellato. Non apri git.
4. Una volta a settimana, se lo chiedi: agent che legge D1/log (se esposti) e apre una card di bilanciamento. I numeri in config non si pushano senza Approva.
5. Quando GrokBot lascia un memo legale in coda: Approva sul memo = Cursor apre un `git_pr`. Non è "diventa legge".

Niente merge automatico, nemmeno se i test passano. Il click è il punto.

Cosa Cursor **non** fa, anche con Pro+:

- Non spedisce email ai giocatori.
- Non apre Chrome su X per farti il report social.
- Non parla con AGCOM.
- Non tiene i fondi.
- Non decide che "ora si paga".
- Non mergea da solo.
- Non pubblica una clip `ready` senza il tuo Approva su `video_new`.

Il review resta. Si è solo spostato: dalla pagina GitHub alla dashboard. Pro+ non è un permesso a skippare il click.

---

## 5. Cosa fa GrokBot, quando serve

GrokBot è acceso **da Fase 0**, ma a chiamata. Non è il bot marketing della vecchia Fase C.

Esempi che hai già nominato:

- **Mail.** Risposta a un beta, avviso waitlist, e il giorno (non calendarizzato oggi) in cui partirà il preavviso dei 30 giorni. Consenso e base GDPR come in `Fantasy_Empire_Fase_0_Accesso_Gratuito.md`. In Fase 0 niente promo "compra".
- **Analisi Twitter/X.** Cosa si dice del titolo, dei competitor, di un hashtag. Output: memo. Zero post.
- **Ricerca legale.** "È cambiata la delibera AGCOM sulla classificazione?", "Stripe ha toccato adult content?", "il Garante ha nuovo parere cookie?". Output: memo con link. Se il memo dice che la checklist Fase B è più rossa, Cursor aggiorna l'issue. Non si accende un checkout.

Altri usi leciti, stessa regola (tu chiedi, lui esegue, niente publish):

- Triage inbox di supporto.
- Bozza di risposta, che mandi tu o che mandi lui solo se glielo dici su quel thread.
- Scan periodico *chiesto da te* delle fonti del quadro normativo.

Cosa GrokBot **non** fa:

- Automation di marketing in loop.
- Ads.
- Cambio prezzo.
- `STRIPE_LIVE=on`.
- Dichiarare chiusa la Fase 0 perché "è passato un trimestre".

Il file `Fantasy_Empire_Grok_Bot_Ops.md` resta la specifica di dettaglio. La vecchia idea "spento fino al profitto" è morta: spento è solo il pezzo *ricavi/social live*. Il pezzo *supporto e ricerca* è usabile ora.

---

## 6. Nessuna data. Solo condizioni.

La Fase 0 non ha una fine scritta. Non "90 giorni". Non "lancio a Natale". Non un cron che accende Stripe.

L'unico cron ammesso, e solo se tu Approvi `imagine_batch`, è l'I2V API 1×/giorno. Default: spento. Genera e carica. Non pubblica. Non tocca i pagamenti.

Si *può* parlare di pagamenti solo se **tutte** queste cose sono vere insieme:

1. Tu lo vuoi, con Approva sulla riga `preavviso_pagamenti` in dashboard (non basta un KPI verde, non basta una chat).
2. Checklist Fase B verde: P.IVA, T&C a pagamento, recesso, pulsante 54-bis, DPA Stripe, decisione tono vs Stripe, ToS Vercel, riclassificazione se servono gli acquisti in-game. Vedi `Fantasy_Empire_Fase_0_Accesso_Gratuito.md` §8 e quadro §14.
3. Preavviso già inviato ai `beta_active` e 30 giorni solari scaduti. I 30 giorni partono *da quell'invio*, non da oggi.

Se il punto 2 è rosso, GrokBot può fare ricerca e Cursor può preparare le pagine, ma il flag resta `STRIPE_LIVE=off`. Se il punto 1 manca, i KPI possono essere bellissimi e si resta gratis. È il punto. Il profitto alza il rischio: non si entra in quel rischio per una scadenza.

Landing e T&C, formula:

> Accesso gratuito, senza una data di fine. Non è una promessa di gratis per sempre. Ogni account può chiedere un numero limitato di clip IA a settimana. Compare in gioco quando il titolo la pubblica, non in combattimento. Se attiveremo i pagamenti, lo comunicheremo per email con almeno 30 giorni di preavviso. Potrai continuare a giocare, abbonarti, o esportare il save.

Vietato in landing: "beta fino al GG/MM/AAAA", countdown, "ultimi giorni".

---

## 7. Cosa succede quando (se) arriva il profitto

Non cambia chi è il primario. Cursor continua a tenere il git. GrokBot continua a fare mail, social *analysis*, ricerca.

Cambia il **perimetro del rischio**. Da quel momento esistono recesso, IVA, chargeback, policy Stripe, obblighi di conformità sul contenuto già venduto. Quindi:

- Ogni PR che tocca prezzo, entitlement, video policy, age gate, T&C ha una checklist extra (quadro normativo).
- GrokBot, prima di una campagna o di una mail di massa, fa un giro di ricerca "è ancora lecito" e si ferma se la risposta è no o dubbia.
- Il pezzo marketing/social *live* del file bot si può accendere, con una card in dashboard per ogni publish. Non prima. Non da GitHub. Non da X.

Non si accende da solo perché `profitto_netto_30gg ≥ 100`. Quel numero, se lo vuoi, è un *allarme* in una issue ("guarda, stiamo incassando"), non un trigger.

---

## 8. Fuori scope di questo file

Nessuna Automation Cursor creata. Nessuna Routine GrokBot. Nessun webhook. Nessun cron. Questa è la mappa di principio. I **nomi** dei posti, panchina inclusa: `Fantasy_Empire_Squadra_Agenti.md`. L'accensione, pezzo per pezzo, è un altro giro, e solo se lo chiedi.
