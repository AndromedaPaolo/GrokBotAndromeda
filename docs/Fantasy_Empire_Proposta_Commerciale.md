# Fantasy Empire — Proposta commerciale e tecnica

**Prodotto:** gioco manageriale 2D + dungeon crawler procedurale + battaglia a carte
**Fonte design:** *Fantasy Empire – Game Design Document (SFW)* — perimetro completo dal giorno uno
**Stack:** GitHub · Vercel · Cloudflare D1 · Stripe (spento in Fase 0)
**Tipo documento:** proposta (nessun codice, nessun deploy)
**Versione proposta:** 2.5 — 28 agosto 2026
**Ops (Cursor + GrokBot):** `Fantasy_Empire_Ops_Cursor_GrokBot.md`
**Squadra agenti (nomi, panchina inclusa):** `Fantasy_Empire_Squadra_Agenti.md`
**Dashboard sì/no:** `Fantasy_Empire_Dashboard_Approvazioni.md`
**GrokBot, dettaglio:** `Fantasy_Empire_Grok_Bot_Ops.md`
**Video IA azioni (nel sito):** `Fantasy_Empire_Video_IA_Azioni.md`
**Video, dove si generano e dove stanno:** `Fantasy_Empire_Video_Storage_Generazione.md`
**Quadro normativo:** `Fantasy_Empire_Quadro_Normativo.md`
**Fase 0 (gratis, Italia):** `Fantasy_Empire_Fase_0_Accesso_Gratuito.md`
**Decisioni da confermare con te:** `Fantasy_Empire_Decisioni_Aperte.md`

> Non è un parere legale. I testi T&C/privacy e le scelte fiscali vanno chiusi con avvocato e commercialista. Questa proposta dice *cosa si costruisce*, *come si cresce*, e *cosa resta spento* finché non si può far pagare.

---

## Vincoli aggiornati

1. Il gioco, già al primo go-live pubblico, implementa i sistemi del GDD (non una v1 tagliata).
2. Zero costo fisso di infrastruttura finché i free tier bastano.
3. **Fase 0.** La gente gioca senza pagare. Stripe live è spento. Nessun checkout, nessuna carta, nessun SKU venduto.
4. Sulla landing c'è un video showcase (trailer). Chi ha un account beta entra in `/play`. Chi non è loggato vede solo landing + pagine legali.
5. Tutto ciò che la legge italiana e l'UE chiedono *anche a un servizio gratuito* va messo in Fase 0. Quello che scatta *solo con i soldi* (recesso, IVA, OSS, pulsante 54-bis, KYC Stripe) resta preparato ma inerte.
6. **Automantenimento su Cursor Pro+.** Il git, i test, i flag, le bozze di pagine. GrokBot (abbonamento già attivo) entra a chiamata: mail, analisi X/Twitter, ricerca legale. Il sì/no non sta su GitHub: sta su una dashboard. Approva = esegue (push incluso). Scarta = elimina. Stesso schema per mail, post, preavviso, flag, video, invite. Nessuno accende i pagamenti da solo. Dettaglio: `Fantasy_Empire_Ops_Cursor_GrokBot.md`, `Fantasy_Empire_Dashboard_Approvazioni.md`.
7. **Nessuna data di fine beta.** Il passaggio a pagamento è un evento (Approva su `preavviso_pagamenti` + checklist legale verde + 30 giorni). Non un giorno in calendario, non un cron, non "tra 90 giorni".

Il punto 3 è il cambio rispetto alla v1.5. Lì `PAYWALL=on` era il default di produzione. Qui il default di produzione, finché non lo cambi tu, è `PAYWALL=off` + `STRIPE_LIVE=off` + `BETA_ACCESS=on`.

---

## 1. Sintesi

Fantasy Empire è un web game persistente: città e edifici, produzione/fusione carte, party di eroi e mostri, mappa e dungeon infiniti, combattimento a turni con SP, influenza, evocazioni, eventi.

**Verso i giocatori, adesso.** Accesso gratuito con account, gate 18+, cap di posti. Si gioca il GDD intero. Non si compra nulla. Non si chiede un metodo di pagamento "per dopo".

**Verso i giocatori, dopo.** Non c'è un "dopo" in agenda. Se e quando tu vuoi vendere, *e* P.IVA / T&C a pagamento / Stripe sono pronti, *e* è partito e scaduto il preavviso di 30 giorni, si vende l'abbonamento **Visioni**: sezione extra + generazione a nostro carico. Il GDD resta giocabile senza pagare. Standard e Founders restano SKU opzionali se un giorno chiudi *tutto* il gioco. Niente pay-to-win, mai. Se quelle cose non succedono, si resta in Fase 0. Il profitto alza il rischio legale: non si entra in quel rischio per una scadenza.

**Verso di te (infra e ops).**

| Fase | Quando | Cosa paghi tu | Cosa paga il giocatore | Chi tiene in vita |
|---|---|---|---|---|
| **0 — Beta legale, gratis** | Go-live, senza data di fine | 0 € fissi (free tier) + i piani che hai già (Cursor Pro+, GrokBot) | 0 € | Cursor sul git. GrokBot a chiamata. Sì/no in dashboard |
| **B — Prime vendite** | Evento: Approva preavviso + checklist verde + 30 giorni | Commissioni Stripe + credito xAI dei video | Abbonamento Visioni (e, se li tieni, Standard / Founders) | Uguale. Più checklist su ogni card che tocca soldi |
| **C — C'è margine** | Entrate nette sopra una soglia che *osservi*, non un trigger | Piani paid solo se i free tier non bastano | Stessi SKU + season/cosmetic | Uguale. Ogni publish è una card |

La vecchia "Fase A — Zero burn con paywall" non esiste più come lancio. Lo zero burn resta. Il paywall slitta.

GitHub = codice. Vercel = UI/HTTPS. Cloudflare D1 = database partite. Stripe = soldi, **solo da Fase B**. GitHub non è il database.

---

## 2. Perché questa Fase 0 fa crescere il progetto

Un paywall a 14,99 € su un titolo senza community, senza capture reale e senza classificazione è un muro. Una beta gratuita con il gioco vero produce tre cose che i soldi non comprano all'inizio:

1. **Prove di ritenzione.** D1/D7, tempo alla prima vittoria, drop-off tutorial. Servono per bilanciare e per decidere se il prezzo tiene.
2. **Asset.** Clip IA in cache, trailer 1 da capture reale, bug veri. La landing smette di vendere un animatic.
3. **Lista Founders.** Chi ha giocato è il primo acquirente. Non un lead freddo.

Il rischio da evitare è dire "è gratis" e poi far pagare come se nulla fosse. In Italia quello è una pratica commerciale. L'altro rischio è scrivere una data di fine beta e doverla o rispettare a checklist rossa, o slittare in pubblico. La landing e i T&C dicono: *accesso gratuito senza data di fine, non è una promessa di gratis per sempre, se attiveremo i pagamenti ti avvisiamo con almeno 30 giorni, il save non si cancella in silenzio*.

---

## 3. Perimetro di gioco = GDD intero (dal primo go-live)

Non si rimanda a una "season 2" i pilastri. Al go-live di Fase 0 devono esistere, giocabili, tutti i sistemi sotto.

### 3.1 Loop

Gestione città/edifici → produzione e mix carte → party → mondo infinito e dungeon → combattimento carte+SP → risorse, carte, unità → nuove città e edifici più forti → ripetizione a scala maggiore.

### 3.2 Unità

- **Eroi:** Life = somma SP delle carte assegnate; Defence 4 zone (Head/Chest/Arms/Legs) = (n. carte di quella tipologia) ÷ 5; Attack = SP carta giocata + bonus.
- **Mostri** (nemici o in party): solo Life; possono applicare malus permanenti; stessa mano 6 carte + SP.

### 3.3 Carte e SP

- Pool illimitato per unità; a inizio turno si pescano esattamente 6 carte a caso; niente replace in turno.
- Base Max SP = n. carte assegnate ÷ 6. Primo turno = Base Max. Poi: SP residuo + n. carte giocate il turno prima. Nessun cap. Costo carta = SP fisso.
- Categorie: Normal, Bond, Origin (mostri evocati), carte forti solo-mostro (edificio Combined Monster Attack).

### 3.4 Bond

Combo di qualsiasi lunghezza (H+H, H+M, H+H+M, …). Disponibili solo se tutti i membri sono in party. Max 1 Bond Card per turno di tutto il party. Upgrade Bond solo in dungeon, mai in edificio.

### 3.5 Combattimento

- Ordine turno: SP attuale, SP più alto agisce dopo.
- Eroe: Manuale o Automatico; conferma → risoluzione + animazioni.
- Mostro: carte una a una, Continue per ciascuna.
- Targeting completamente random (anche la zona).
- Danno mostro→eroe: `SP carta + Malus – Defence + bonus condizionali`. Multi-zona: Defence = media delle zone colpite.
- Carte base senza extra; solo carte forti mostro hanno status/condizioni.
- Malus: fino a fine fight, non stackano.
- Win: tutti i mostri a 0 Life. Lose: tutti gli eroi a 0 Life.
- KO/capture eroe: animazione; fuori gioco per una durata legata alla size del mostro.
- Special Attack mostri: se ≥2 mostri; chance decrescente di join; carte mischiate; paga solo l'attivatore (costo = SP max tra le carte scelte); quelle carte escono dal pool solo per il resto della battaglia.
- Burst piena → +1 Hero Essence. Mostro a 0 Life → +1 materiale del suo tipo.

### 3.6 Dungeon

Griglia 2D, solo ortogonale, fog of war (shop può svelare 3 o 5 celle). Ogni cella ha contenuto: mostro, tesoro, restore/shop, bonding event, mixed (2 o tutti).
Bonding event: crea Bond Card, possibile status/patto; non crea unità.
Ogni 10 livelli: Special Monster; sconfitto → +1 skill card a tutti i mostri.
Uscita: ritorno all'inizio, cella Special Monster, o tutti gli eroi KO.
Ogni dungeon applica un malus permanente agli eroi che entrano.

### 3.7 Edifici

I 4 tipi del GDD, stanze e assegnazioni come da tabelle, tempi di produzione (mix = somma SP; normale = 4 turni; mostro = SP Origin). Risorse: Hero Essence + materiale mostro. Bond non si mixano in edificio.

### 3.8 Evocazione

Nuovo mostro: 5 carte normali + 1 Origin. Origin cresce da solo, +1 SP cost a ogni crescita. Rituale multi-tipo → possibile nuovo tipo random.

### 3.9 Città e mondo

- 1 città iniziale a struttura fissa.
- Nuove città da Founding Event (esplorazione / vittoria maggiore / rituale).
- Taglie: Tiny 3 / Small 10 / Medium 15 / Big 20 / Metropolis 50 edifici.
- Multi-città. Città senza fog. Ogni turno: edifici restano, eventi speciali si resettano.
- Sopra Medium: chance Invasione. Sopra Big: Trial Shrine. Solo Metropolis: Bonding event solo-eroi.
- Influenza per città, eventi (sparring, Night Patrol, Park/Plaza), mondo a celle con fog, wild encounter, travel point tra città.

### 3.10 Numeri GDD ancora TBD — chiusi per shippare

| Voce TBD | Default di lancio (bilanciabile in config) |
|---|---|
| Durata KO/capture | `clamp(2, size_mostro, 8)` turni mondo/città (size 1–8) |
| Soglia Influence nuovo eroe | Tiny 8 · Small 12 · Medium 18 · Big 24 · Metropolis 36 |
| Liste carte | Set GDD eroe + set esempio per Tentacle / Beast / Slime / Construct / Insect / Aquatic + carte edificio |
| Save | 1 slot in Fase 0 per tutti; 3 slot restano lo SKU Founders, non si regalano in beta |
| Burst bar | si riempie di `SP speso nella battaglia / 10` (cap 1 Essence a fight) |

### 3.11 Santuario delle Visioni

Zona extra (palazzo in città o dungeon dedicato). Stesso combat, niente carte più forti. In Fase 0 è in mappa come **chiusa**. Si apre solo con l'abbonamento Visioni, in Fase B.

UI/UX: web desktop-first, playable su mobile browser. Nessun client Steam/mobile store in questa proposta.

---

## 4. Cosa si "vende" in Fase 0: niente. Cosa si sblocca: il gioco

`PAYWALL=off` e `STRIPE_LIVE=off` sono il default di produzione **finché non li cambi tu**.

Flusso utente in Fase 0:

1. Arriva sulla landing (trailer + avviso beta gratuita senza data di fine).
2. Gate 18+: autodichiarazione + T&C. Sotto i 18, stop.
3. Crea account (email). Consenso privacy. Consenso marketing **separato e spento di default**.
4. Se c'è posto nel cap (o ha un invite): `entitlements.status = beta_active`.
5. `/play` e le API città/dungeon/combat rispondono 200.
6. Overlay video IA: sì, con **limite settimanale** di *nuove* generazioni (default 7). Cache hit non conta. Oltre il tetto: animazione 2D, il gioco continua.
7. Se il cap di posti è pieno: waitlist, niente gioco. Niente "lascia la carta, ti avvisiamo e addebitiamo".

| SKU | Prezzo | Quando esiste | Cosa sblocca |
|---|---|---|---|
| Beta | 0 € | Fase 0. Grant server, non Stripe | GDD, 1 slot, video IA fino al tetto settimanale |
| **Visioni** (abbonamento) | 9,99 € / mese IVA incl. (indicativo) | Fase B, Stripe `mode=subscription` | Sezione speciale Santuario + i costi di generazione (tetto di sicurezza 40 job/settimana, a carico nostro) |
| Standard | 14,99 € una tantum IVA incl. | Fase B, solo se chiudi il gioco dietro paywall | Accesso GDD, 1 slot. **Non** è il primo SKU: il gioco in questa proposta resta giocabile gratis |
| Founders | 24,99 € una tantum IVA incl. | Fase B, opzionale | 3 slot, tema UI, credits |
| Season / cosmetic | dopo il profitto | Solo contenuto o cosmetici. Niente pay-to-win | |

L'abbonamento **Visioni** è lo SKU a pagamento di questa proposta. Non si collegano le API Grok dei giocatori: genera sempre la nostra chiave, i soldi dell'abbonato coprono il credito xAI. Senza abbonamento il tetto settimanale è fisso, visibile, non "circa".

Niente pay-to-win: il Santuario non vende carte più forti né SP extra. Stesso combat. Contenuto e cinematics in più, e generazione pagata da noi.

In locale e in preview: Stripe **test mode** per costruire il checkout *senza* esporlo. In produzione Fase 0: Stripe **assente dal frontend**. Nessun pulsante Abbonati. Nessun Price ID live.

Eccezione tecnica: un account `role=dev` sul tuo utente, in env, per QA. Non è in registrazione pubblica.

---

## 4.1 Abbonamento Visioni e tetto settimanale

Due strati, sempre.

**Senza abbonamento (Fase 0, e in Fase B chi non paga).** Ogni account ha un contatore `gen_jobs` per settimana solare, fuso `Europe/Rome`, reset lunedì 00:00. Default: **7** job. Un job è una chiamata Imagine che produce un file nuovo (cache miss). Rivedere un MP4 già in R2 **non** scala il contatore. A 7/7: overlay 2D, testo in UI "Limite settimanale. Si rinnova lunedì." Il GDD resta intero. Il Santuario è visibile in mappa come chiuso, non inesistente.

**Con abbonamento Visioni (solo Fase B, Stripe live).** `entitlements.status = visions`. Entra nel **Santuario delle Visioni**: zona extra (palazzo in città o dungeon dedicato), eventi e clip sue, stesse regole di combattimento. I job Imagine di quel giocatore li paghi tu sul credito xAI. Tetto di sicurezza **40** job/settimana così un solo account non svuota il credito. Disdetta: dal periodo successivo torna il tetto da 7 e il Santuario si chiude. Save del Santuario resta esportabile.

Il numero 7 e il 40 stanno in `config`. Non si "aggiusta in silenzio". Se li cambi, lo dici in-game e in T&C.

Recurring: disdetta in `/account` (e Customer Portal Stripe). Pulsante recesso art. 54-bis sul primo periodo. Prezzo IVA inclusa. Classificazione: descrittore acquisti in-game da aggiornare in Fase B.

Dettaglio file e R2: `Fantasy_Empire_Video_Storage_Generazione.md`.

---

## 4.2 Landing in Fase 0

Pagine pubbliche: landing, login/registrazione, privacy, cookie, termini, contatti, (poi) classificazione.

**Blocco pagina (ordine)**

1. Titolo + tagline (città, carte, dungeon infiniti).
2. Pittogramma classificazione età (quando c'è IARC/PEGI) e dicitura 18+.
3. Player video (mute autoplay off; play con click; sottotitoli).
4. Tre pill: Gestione città · Carte & Bond · Dungeon / mondo infinito.
5. Banda beta: "Accesso gratuito, senza una data di fine. Non si paga. Se attiveremo i pagamenti te lo diciamo almeno 30 giorni prima. Il tuo save resta."
6. CTA "Crea account e gioca" → registrazione, **non** Checkout.
7. FAQ: è davvero gratis? c'è una data di fine? (no.) quante clip IA a settimana? (7 nuove. Le già generate si rivedono sempre.) se un giorno ci sarà un abbonamento? (Santuario + generazione a nostro carico, te lo diciamo 30 giorni prima.) niente pay-to-win; i video sono generati da IA.
8. Footer legale (dati art. 7 d.lgs. 70/2003, per quanto disponibili prima della P.IVA).

**Cosa non stare sulla landing in Fase 0**

- Prezzo 9,99 / 14,99 / 24,99 come offerta acquistabile.
- "Abbonati" / "Acquista e gioca".
- Clip-azione live per i visitatori. Eventuale reel di 3 clip precache con watermark "in-game", se la policy contenuti lo regge.

I prezzi indicativi possono stare in una pagina "Dopo la beta", scritta come **intenzione**, non come offerta al pubblico. Se li metti in homepage con un bottone spento, sembri un negozio chiuso. Meglio non farlo.

**Video trailer**

| Passaggio | Quando | Cosa |
|---|---|---|
| Trailer 0 | Prima del codice / in parallelo | Animatic 45–75 s: mock UI, carte del GDD. 1920×1080, H.264, < 20 MB |
| Trailer 1 | Quando esiste lo slice visivo | Stesso montaggio con capture reale |

Storyboard Trailer 0: come in v1.5, ultimi 8 secondi cambiati. Non "Paga per giocare". Testo: "Beta gratuita. Maggiorenni. Senza data di fine."

Hosting: `/public/trailer.mp4` su Vercel oppure R2. Poster statico per LCP. Il video non è il gioco.

---

## 5. Stack e "non pago l'infra"

```
Browser
  → Vercel Hobby (Next.js, HTTPS su *.vercel.app)
      → Cloudflare Worker Free + D1 Free
  → Stripe assente in produzione (presente solo in preview/test)
GitHub Free — repo privato, Actions free minutes
```

### 5.1 Cosa è davvero gratis

| Servizio | Piano partenza | Limite da monitorare |
|---|---|---|
| GitHub | Free, repo privato | minutes Actions |
| Vercel | Hobby | bandwidth / invocazioni. Hobby **non** copre uso commerciale: va bene in Fase 0 se non vendi. Prima di Fase B si rileggono i ToS e si sale di piano se serve |
| Cloudflare Workers | Free | ~100k richieste/giorno; CPU 10 ms/request |
| D1 | Free | storage e tetti read/write |
| Stripe | spento | 0 commissioni perché 0 incassi |
| Dominio `*.vercel.app` + HTTPS | incluso | un `.it` / `.com` si compra quando c'è P.IVA e si vuole uscire dal sottodominio |

### 5.2 Cosa non fare per "risparmiare"

- Non mettere il `.sqlite` su GitHub.
- Non mettere save nel repo.
- Non mettere chiavi nel client.
- Non usare GitHub Pages come backend di partita.
- Non accendere analytics di terze parti senza cookie banner (in Fase 0 si sta sui log tecnici).

### 5.3 Cap utenti (proposta, la decidi tu)

La Fase 0 è **invite o cap**, non open world. Motivo doppio: free tier e controllo della community 18+.

Si mette in waitlist (o si chiude le iscrizioni) quando **uno** di questi è vero:

- ≥ **40** account `beta_active` con save recente, **oppure**
- Worker/D1 sopra l'80% del tetto free per 3 giorni di fila, **oppure**
- coda moderazione video in arretrato.

Fino ad allora: nessun upgrade a pagamento dell'infra.

---

## 6. Sicurezza in Fase 0 (gratis, comunque dovuta)

GDPR art. 32 non aspetta Stripe.

- Repo privato.
- Secret solo in Vercel env + Cloudflare Worker secrets.
- Password Argon2id o magic link; cookie httpOnly.
- Ogni save/combat/produzione: `user_id` controllato sul Worker.
- Combat, mix edifici, drop, Bond: resolver sul server.
- Query D1 parametrizzate.
- Rate limit su login / save / generazione video.
- Backup: export D1 periodico manuale (o Time Travel del piano free).
- Cancellazione account: endpoint che cancella utente, save, consensi. Obbligo GDPR, utile anche in beta.
- Export save su richiesta (art. 20).

---

## 7. Schema D1 (stesso scheletro in tutte le fasi)

- `users`
- `entitlements` (`beta_active` | `active` | `visions` | `revoked` | `refunded`). In Fase 0 esiste solo `beta_active`.
- `gen_quota` (user_id, week_id, jobs_used)
- `saves`
- `audit_payments` (vuota in Fase 0)
- `consents` (età, T&C, privacy, marketing)
- `world_seeds` / `config` (soglie Influence, size mostri, `PAYWALL`, `STRIPE_LIVE`, cap)
- `cinematics` (vedi file video)
- `approvals` (coda dashboard: type, preview, stato pending/done/discarded/error, log del click)

Il JSON di save resta: il GDD è largo. Normalizzare tabelle si può fare in Fase C se serve analytics.

---

## 8. Piano di lavoro

Restare a costo infra zero non accorcia lo sviluppo. Accorcia la bolletta. La Fase 0 **allunga** di poco il lancio perché aggiunge pagine legali, gate 18+, cap, cancellazione account. Non aggiunge Stripe live.

| Fase prodotto | Contenuto | Infra | Pagamenti |
|---|---|---|---|
| Build 1 — Fondamenta | Auth, D1, landing + video, flag `PAYWALL`, pagine legali, gate 18+, tabella `approvals` + pagina `/ops` (dashboard tua, non dei giocatori) | Free | Stripe test solo in preview |
| Build 2 — Combat + carte + Bond | Resolver server, tipi mostro GDD | Free | — |
| Build 3 — Città + 4 edifici + economia | Produzione, Essence/materiali | Free | — |
| Build 4 — Dungeon + mondo + multi-città | Fog, founding, invasion, shrine | Free | — |
| Build 5 — Evocazione, Influence, eventi, KO | Default §3.10 | Free | — |
| **Go-live Fase 0** | Gioco ai beta, Stripe assente dal frontend | Free | 0 € |
| Fase B | Stesso GDD gratis. Stripe live, checkout Visioni. **Nessuna data in questo piano.** | Free + fee + credito xAI | Visioni (e SKU opzionali) |
| C'è margine | Upgrade piano se i tetti saltano | Piani paid mirati | SKU + cosmetic |

Stima onesta per un solo sviluppatore: mesi, non settimane. Cursor Pro+ accorcia le PR, non il perimetro GDD.

---

## 9. Come si passa da gratis a pagato (se succede)

Non c'è una riga "il GG/MM si paga" in questo file. Il profitto fa scattare obblighi pesanti. Quindi si entra lì solo per una decisione tua, a checklist verde.

Ordine obbligato, quando (se) lo vuoi:

1. Checklist Fase B verde. P.IVA, T&C a pagamento, privacy, recesso art. 59 lett. o), pulsante art. 54-bis, DPA Stripe, decisione tono vs policy Stripe, ToS Vercel. Se un box è rosso, in dashboard il tasto Approva su `preavviso_pagamenti` e su `stripe_live` è morto. GrokBot può fare ricerca. Cursor può preparare le pagine. Il flag no.
2. Tu premi Approva sulla card `preavviso_pagamenti`. Non basta un KPI. Non basta una chat.
3. Preavviso **≥ 30 giorni** a tutti i `beta_active`. I 30 giorni partono da quell'invio.
4. Banner in-game e landing, stesso contenuto. Niente countdown messi mesi prima. Niente "ultimi giorni" se non è vero.
5. Checkout on solo a preavviso scaduto. Default di questa proposta: si vende **Visioni**. `/play` resta aperto a chi non abbona. Cambia il tetto generazione e si apre il Santuario. Se un giorno scegli il paywall sul GDD intero (SKU Standard/Founders), allora sì: chi non compra esce da `/play`, save esportabile. Quella è una seconda decisione, non il default.
6. I `beta_active` non diventano `visions` in silenzio. Serve webhook Stripe.

Dettaglio: `Fantasy_Empire_Fase_0_Accesso_Gratuito.md` §8. Ops: `Fantasy_Empire_Ops_Cursor_GrokBot.md` §6.

---

## 10. Video IA, Cursor, GrokBot

- I video sulle azioni restano una feature del **sito**, per chi ha entitlement (`beta_active` o `visions`). Policy SFW, adulti 25+, coda `banned`: file video, invariati nel merito.
- In Fase 0: Grok Imagine (precache), file su R2 privato, miss = 2D + coda. GIF non è il master. Clip nuove in dashboard `video_new`. Dettaglio: `Fantasy_Empire_Video_Storage_Generazione.md`.
- **Cursor Pro+** tiene il prodotto: Patcher, Sito, Numeri, Bandiere, Verbale. Checkout e Santuario in preview, spenti in prod. Non mergea da solo.
- **GrokBot** è a chiamata: Inbox, Ascolto, Gazzetta, Imagine, Corriere (preavviso con tasto morto se checklist rossa). Sportello, Promo, Bacheca, Spesa sono in panchina da subito, tipi dashboard già previsti e spenti.
- **Dashboard.** Una coda. Approva o Scarta. Non apri git. Specifica: `Fantasy_Empire_Dashboard_Approvazioni.md`.
- Roster nominato: `Fantasy_Empire_Squadra_Agenti.md`.

Specifica di principio: `Fantasy_Empire_Ops_Cursor_GrokBot.md`.

---

## 11. Rischi

| Rischio | Nota |
|---|---|
| GDD completo al day-one | Alto sforzo. Si taglia polish/art, non i sistemi. |
| Free tier con giocatori veri | Un picco di combat fa 429. Per questo c'è il cap. |
| "Gratis per sempre" | Non dirlo. Mai. |
| Data di fine beta in landing | Non scriverla. Ti costringe a pagare a checklist rossa o a smentirti. |
| Tono SFW sexy + Stripe futuro | In Fase 0 Stripe non ti chiude l'account perché non c'è. Prima di Fase B la decisione §7.1 del quadro normativo è obbligatoria. |
| Hobby Vercel | Tollerabile in beta non commerciale. Prima di incassare, ToS. |
| Contenuto vs classificazione | Senza IARC/PEGI un gioco pubblico in Italia è scoperto. Va fatto in Fase 0, non in Fase B. |
| Approva a occhi chiusi | La dashboard toglie git dalla faccia, non toglie il cervello. Test fail = tasto spento. Soldi/legale = box verdi o tasto spento. |
| Visioni a 9,99 € vs 40 job a 0,25 $ | Senza precache un abbonato brucia il margine. Il tetto 40 e il catalogo 80–150 chiavi esistono per questo. |

---

## 12. Cosa chiedo a te adesso

Le alternative sono in `Fantasy_Empire_Decisioni_Aperte.md`. I default di questa v2.5, se non mi dici il contrario:

1. Fase 0 invite + cap 40, non open registration.
2. 18+ dichiarato. Territorio: Italia + UE. Niente UK/USA in beta.
3. Tono SFW sexy tenuto in beta. Prima di Stripe, si rivede.
4. Classificazione IARC (gratis, browser) in Fase 0.
5. Preavviso 30 giorni *quando tu Approvi quella card*. Default: si vende Visioni, `/play` resta. Nessuna data oggi.
6. Trailer 0 subito. Trailer 1 quando c'è lo slice.
7. URL `*.vercel.app` fino a P.IVA + dominio.
8. 1 slot save in beta. I 3 slot restano Founders.
9. Cursor sul git. GrokBot su mail / X / legale / Imagine, a chiamata. I posti a pagamento (Checkout preview, Santuario locked, Sportello, Promo, Bacheca, Spesa, Stagione) stanno in formazione da subito, in panchina o preview.
10. Dashboard unica Approva/Scarta per git e per tutte le cose come questa. Non apri GitHub per il push.
11. Video: Grok Imagine → R2. Master MP4, non GIF.
12. Abbonamento Visioni 9,99 €/mese: Santuario + generazione a nostro carico (40 job/sett.). Senza: 7 job/sett. fissi. Niente chiavi Grok dei giocatori.
13. Squadra: i 17 posti di `Fantasy_Empire_Squadra_Agenti.md`. Non un mega-agent.

Rispondi puntando ai numeri. Cambio il file e rialzo la versione.
