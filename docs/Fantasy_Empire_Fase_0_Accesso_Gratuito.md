# Fantasy Empire — Fase 0: accesso gratuito, legge italiana

**Documento operativo.** Completa la proposta v2.4. Non sostituisce `Fantasy_Empire_Quadro_Normativo.md`.
**Versione:** 1.2 — 28 agosto 2026
**Ops:** `Fantasy_Empire_Ops_Cursor_GrokBot.md`
**Ipotesi:** titolare persona fisica in Italia, servizio web, nessun incasso, giocatori consumatori, contenuto 18+ SFW sexy, video IA. Cursor Pro+ e GrokBot già in abbonamento.

> Non è un parere legale. Serve a non accendere Stripe "perché tanto è presto" (o "perché è scaduto il trimestre") e a non lasciare scoperti gli obblighi che esistono **anche a zero euro**.

---

## 1. Idea

Si pubblica il gioco intero. La gente gioca. Non paga. Le norme sul *vendere* restano spente. Le norme sul *mettere in rete un servizio a persone*, sui *dati*, sui *minori*, sull'*IA* e sulla *classificazione dei videogiochi* sono accese dal primo utente.

Gratis non è una zona franca. È un contratto senza prezzo.

---

## 2. Cosa si applica comunque (Fase 0)

| Tema | Norma | Cosa fare in Fase 0 |
|---|---|---|
| Identità sul sito | D.lgs. 70/2003 art. 7 | Nome e cognome (o ragione sociale), sede, email, telefono. Se non c'è ancora P.IVA, non inventarla. Quando c'è, si aggiunge. |
| Termini di uso | Contratto + DSA art. 14 | T&C della beta: servizio gratuito, revocabile, 18+, divieti, moderazione, preavviso prima dei pagamenti |
| Privacy | GDPR; d.lgs. 196/2003 | Informativa, basi giuridiche, registro trattamenti, DPA Vercel/Cloudflare/provider video, cancellazione, export save |
| Cookie | Art. 122 d.lgs. 196/2003; LG Garante 231/2021 | In Fase 0 solo cookie tecnici (sessione, preferenze video, scelta banner). Niente tracker. Banner minimo: informativa, non un muro |
| Minori / età | GDPR art. 8; L. 132/2025 art. 4; d.lgs. 203/2017 | Gate 18+ all'ingresso. Coerente con classificazione e T&C. Autodichiarazione + blocco se dichiara <18. Non è l'age assurance "pornografica" del decreto Caivano, **purché** il contenuto resti non pornografico (vedi quadro §7.2) |
| Classificazione videogioco | D.lgs. 203/2017 art. 10; AGCOM 74/19/CONS | Obbligo a prescindere dal prezzo. IARC o PEGI **prima** del go-live pubblico. Pittogrammi in landing e in `/play` |
| IA | AI Act art. 50 (dal 2 agosto 2026); L. 132/2025 | Dichiarare che i video sono sintetici. Contratto col provider sulla marcatura machine-readable. Prompt policy, coda `banned`, log. Personaggi inventati, adulti 25+. Tetto settimanale di *nuove* clip (default 7). Cache hit non conta |
| Penale contenuti | Artt. 600-quater.1, 612-quater, 528 c.p. | Invariato rispetto al quadro. Il fatto che sia gratis non abbassa la soglia |
| DSA (hosting) | Artt. 11-16 | Punto di contatto, notice-and-action anche se i "contenuti utente" sono solo i save. Comunicazione AGCOM quando il servizio è pubblico |
| Sicurezza dati | GDPR art. 32, 33 | Stesse basi della proposta. Procedura breach 72h scritta prima del go-live |
| Accessibilità e-commerce | EAA / d.lgs. 82/2022 | In Fase 0 **non** c'è percorso d'acquisto. L'obbligo del checkout non scatta. Conviene comunque non fare un form di registrazione inaccessibile |

Sanzioni GDPR, AI Act, classificazione, penale: le stesse del quadro. Il fatto che nessuno abbia pagato non è una difesa.

---

## 3. Cosa non scatta finché nessuno paga

| Tema | Perché è inerte | Cosa si prepara comunque |
|---|---|---|
| Partita IVA, OSS, registro corrispettivi | Non c'è cessione a titolo oneroso | Colloquio col commercialista **prima** di Fase B, non il giorno del primo checkout |
| Abbonamento Visioni | Non si vende. Nessun CTA Abbonati | Checkout in preview/test. Tetto 7 già attivo in beta, così il passaggio non è un taglio a sorpresa |
| Codice del consumo su recesso, art. 59 lett. o), pulsante 54-bis | Non c'è contratto a titolo oneroso | Codice del checkout già scritto in preview, spento in prod |
| Prezzo IVA inclusa, conferma d'ordine, fattura | Non c'è ordine | — |
| PSD2 / SCA / webhook live | Stripe assente | Webhook in test mode |
| Soft spam art. 130 co. 4 | Vale per chi ha *acquistato* | In Fase 0 la newsletter esiste solo con consenso espresso |
| Hobby Vercel vs uso commerciale | Non stai vendendo | Rileggere i ToS il giorno prima di Stripe live |

Attenzione: se in landing scrivi "compra a 14,99 €" con bottone che non funziona, stai già facendo un'offerta al pubblico. In Fase 0 i prezzi non sono un CTA.

---

## 4. Come si qualifica la beta

Testo da usare, in italiano chiaro, in T&C e in landing:

> Fantasy Empire è in accesso gratuito (beta), senza una data di fine. Non è un abbonamento. Non è una promessa di "gratis per sempre". Non stiamo vendendo il gioco né una sezione extra. Ogni account ha un limite settimanale di clip IA *nuove*; le già generate si rivedono. Se decideremo di attivare i pagamenti, te lo comunicheremo per email con almeno 30 giorni di preavviso. Potrai continuare a giocare il GDD senza pagare, oppure abbonarti. Finché sei in beta, il servizio può essere sospeso o chiuso. I 30 giorni partono da quell'email, non da oggi.

Quello che **non** si scrive:

- "early access a pagamento incluso"
- "lifetime"
- "posto Founders già pagato"
- "beta fino al GG/MM/AAAA"
- "90 giorni di prova"
- "collega il tuo Grok / la tua API key"
- qualsiasi frase che faccia credere che il gioco resti gratis dopo una data X, o che i pagamenti partano in una data X già nota

Una beta **invite-only** è più facile da difendere di un open server: meno minori casuali, meno tetti D1, community tracciabile. È il default della proposta.

---

## 5. Account, consensi, dati

Flusso minimo, in ordine. Niente skip.

1. Avviso 18+ e classificazione.
2. Informativa privacy (link) **prima** dell'invio email.
3. Checkbox T&C, non preselezionata.
4. Checkbox "ho 18 anni o più", non preselezionata.
5. Checkbox marketing, non preselezionata, **opzionale**.
6. Creazione account.
7. Grant `beta_active` se c'è posto / invite valido.

Basi GDPR:

- Account, save, entitlement, sessioni: **contratto** (esecuzione del servizio gratuito richiesto).
- Sicurezza, rate limit, antifrode, log tecnici: **interesse legittimo**.
- Marketing, cookie non tecnici: **consenso**.
- Classificazione / obblighi di legge: **obbligo legale** dove c'è.

Retention proposta (da confermare):

- Account inattivo 24 mesi → avviso, poi cancellazione.
- Save: finché l'account esiste, poi 30 giorni in backup, poi via.
- Clip `cinematics`: cache globale, **senza** `user_id`. Resta. Non è un dato del giocatore.
- Clip `banned` e scarti del provider: cancellazione immediata.
- Log consensi: 10 anni (prova).

Cancellazione: un bottone in `/account`. Cascata su users, entitlements, saves, consensi marketing. Email di conferma.

---

## 6. Territorio

Default: **Italia e resto UE**. Motivo: un operatore italiano con contenuto suggestivo che apre UK o USA si porta dietro Online Safety Act e leggi statali sull'età. In Fase 0 non c'è ricavo che giustifichi quel rischio.

Implementazione: bloccare registrazione se IP / locale è UK o US, con pagina "non disponibile in questo Paese". Non reindirizzare di soppiatto (geo-blocking art. 3: niente redirect forzato senza consenso; qui stiamo *rifiutando* il servizio, lecito per un'opera protetta).

---

## 7. Contenuto, classificazione, Stripe (il rinvio utile)

In Fase 0 Stripe non c'è. Il rischio §7.1 del quadro (account Stripe chiuso) è **rinviato**, non risolto.

Cosa si fa adesso:

1. Tenere il tono SFW sexy se vuoi testare se la gente ci resta. Documentare prompt, scarti, esempi "pass / banned".
2. Classificare il gioco per quello che è. Se IARC/PEGI ti spingono su descrittori sesso + 18, la landing lo dice. Non si classifica 12 e si mostra lo scollo.
3. **Prima** di Fase B: tre strade del quadro, una scelta scritta. Altrimenti i primi 25 pagamenti stanno su un binario che Stripe può spegnere.

Se in beta il tono risulta più esplicito del previsto, si stringe **prima** di chiedere i soldi. Costa meno che migrare PSP a incassi avviati.

---

## 8. Transizione a Fase B (pagamenti), se e quando

Non c'è una data in questo paragrafo. C'è un blocco. `STRIPE_LIVE` resta off finché **tutti** i box sotto sono verdi **e** tu hai detto di partire **e** i 30 giorni di preavviso sono scaduti.

Checklist che **blocca** l'accensione:

- [ ] P.IVA, ATECO, eventuale SCIA: commercialista
- [ ] T&C aggiornati: prezzo, recesso, conformità, durata aggiornamenti, rimborsi
- [ ] Privacy aggiornata: Stripe come responsabile, localizzazione cliente
- [ ] Architettura art. 59 lett. o) (checkbox + log + email)
- [ ] Pulsante "recedere dal contratto qui" art. 54-bis
- [ ] Footer art. 7 completo (P.IVA, REA)
- [ ] Decisione documentata tono vs Stripe
- [ ] DPA Stripe, verifica DPF
- [ ] Prezzi IVA inclusa, prova Paese cliente
- [ ] Email di preavviso 30 giorni già partita, periodo scaduto
- [ ] Tua conferma esplicita: Approva sulla card `preavviso_pagamenti` in dashboard. Non un KPI e non una data in agenda
- [ ] Piano Hobby Vercel riletto / upgrade se i ToS lo chiedono
- [ ] Riclassificazione se gli "acquisti nel videogioco" cambiano i descrittori
- [ ] T&C Visioni: prezzo 9,99 € IVA incl., disdetta, tetto 7 vs 40, Santuario non è pay-to-win, art. 54-bis sul primo periodo

Cosa succede al giocatore che **non** si abbona, default v2.4:

- `/play` resta. Il GDD resta. Tetto generazione resta 7 job/settimana.
- Il Santuario resta chiuso.
- Niente addebito automatico. Niente carta "già in archivio": in Fase 0 non l'abbiamo chiesta.

Se un giorno scegli il paywall sul GDD intero (SKU Standard/Founders, non il default):

- `/play` → 402 + pagina "esporta il save / acquista".
- Save in sola lettura per 60 giorni, poi solo export a richiesta per altri 30, poi cancellazione con preavviso.

---

## 9. Crescita senza ads, con Cursor e GrokBot

In Fase 0 la crescita è lenta e voluta. Cursor tiene il git (bug, cap, tetti). GrokBot, se glielo chiedi, manda una mail di waitlist o fa un memo su X. Niente post automatici.

| Leva | Come | Chi | Limite |
|---|---|---|---|
| Invite | Ogni `beta_active` ha 0 invite all'inizio. Tu ne dai a mano | tu | Niente viralità incontrollata |
| Waitlist | Email + consenso. Quando si libera un posto, magic link | GrokBot bozza, tu Approvi in dashboard | Non è una newsletter di prodotto se non hanno spuntato marketing |
| Capture reale / patch gioco | Sostituisce Trailer 0, sistema drop-off | Cursor, PR | Resta SFW |
| Metriche interne | D1: D1/D7, drop tutorial, 429, tetto video settimanale | Cursor in issue | Niente GA/Meta pixel in Fase 0 |
| Ricerca legale / policy | Memo con fonti | GrokBot | Non è un parere; non accende Stripe |
| Discord / chat pubblica | **No** in Fase 0 | — | Altrimenti scatta la riqualificazione DSA "piattaforma online" |

KPI da inseguire (non vanity):

- D1 / D7 dei `beta_active`
- Tempo alla prima vittoria
- % sessioni che toccano dungeon
- Tasso di scarto video (`banned` / generate)
- % waitlist → posto accettato

Se D7 è morto, alzare un paywall non lo resuscita. Si patcha il gioco.

---

## 10. Fuori scope

Nessun testo legale pronto da copiare-incollare sul sito (va redatto). Nessuna pratica IARC compilata. Nessuna Automation Cursor. Nessuna Routine GrokBot. Nessun account Stripe live. Nessuna data di lancio commerciale.
