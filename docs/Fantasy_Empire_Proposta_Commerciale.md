# Fantasy Empire — Proposta commerciale e tecnica

**Prodotto:** gioco manageriale 2D + dungeon crawler procedurale + battaglia a carte  
**Fonte design:** *Fantasy Empire – Game Design Document (SFW)* — **perimetro completo dal giorno uno**  
**Stack:** GitHub · Vercel · Cloudflare D1 · Stripe  
**Tipo documento:** proposta (nessun codice, nessun repo, nessun deploy)  
**Versione proposta:** 1.5 — 26 agosto 2026  
**Ops bot:** `Fantasy_Empire_Grok_Bot_Ops.md`  
**Video IA azioni (nel sito):** `Fantasy_Empire_Video_IA_Azioni.md`

**Vincoli del committente**

1. Il gioco, già al lancio, implementa i sistemi del GDD allegato (non una “v1 tagliata”).
2. **Zero costo fisso di infrastruttura** finché non c’è una base utenti. Si resta sui free tier.
3. **Si gioca solo se si è pagato.** Nessuna demo giocabile, nessun early access gratis, nessun guest in dungeon/città. Chi non ha `entitlements.active` vede solo la landing.
4. Sulla landing c’è un **video showcase** del gioco (trailer), non una sessione di gioco gratuita.

---

## 1. Sintesi

Fantasy Empire è un web game persistente: città e edifici, produzione/fusione carte, party di eroi e mostri, mappa e dungeon infiniti, combattimento a turni con SP, influenza, evocazioni, eventi.

Modello economico del **prodotto** (verso i giocatori): **pay-to-play obbligatorio**. Registrazione sì, partita no, finché Stripe non conferma l’acquisto. La landing mostra un video di presentazione: è l’unica anteprima pubblica.

Modello economico dell’**infrastruttura** (verso di te):

| Fase | Quando | Cosa paghi |
|---|---|---|
| **A — Zero burn** | 0 → soglia giocatori *paganti* | 0 € fissi + commissioni Stripe sulle vendite |
| **B — Prime vendite** | Checkout live, primi incassi, ancora free tier | Commissoni Stripe |
| **C — Profitto** | Entrate nette sopra la soglia che fissi tu | Piani a pagamento solo se i free tier non bastano più |

GitHub = codice. Vercel = UI/HTTPS. Cloudflare D1 = database partite. Stripe = soldi.  
GitHub **non** è il database. GitHub Secrets **non** sostituiscono D1.

---

## 2. Perimetro di gioco = GDD intero (dal lancio)

Non si rimanda a una “season 2” i pilastri del documento. Al go-live devono esistere, giocabili, tutti i sistemi sotto.

### 2.1 Loop

Gestione città/edifici → produzione e mix carte → party → mondo infinito e dungeon → combattimento carte+SP → risorse, carte, unità → nuove città e edifici più forti → ripetizione a scala maggiore.

### 2.2 Unità

- **Eroi:** Life = somma SP delle carte assegnate; Defence 4 zone (Head/Chest/Arms/Legs) = (n. carte di quella tipologia) ÷ 5; Attack = SP carta giocata + bonus.
- **Mostri** (nemici o in party): solo Life; possono applicare malus permanenti; stessa mano 6 carte + SP.

### 2.3 Carte e SP

- Pool illimitato per unità; a inizio turno si pescano **esattamente 6** carte a caso; niente replace in turno.
- Base Max SP = n. carte assegnate ÷ 6. Primo turno = Base Max. Poi: SP residuo + n. carte giocate il turno prima. Nessun cap. Costo carta = SP fisso.
- Categorie: Normal, Bond, Origin (mostri evocati), carte forti solo-mostro (edificio Combined Monster Attack).

### 2.4 Bond

Combo di qualsiasi lunghezza (H+H, H+M, H+H+M, …). Disponibili solo se **tutti** i membri sono in party. Max **1 Bond Card per turno di tutto il party**. Upgrade Bond **solo in dungeon**, mai in edificio.

### 2.5 Combattimento

- Ordine turno: SP attuale, SP più alto agisce dopo.
- Eroe: Manuale o Automatico; conferma → risoluzione + animazioni.
- Mostro: carte una a una, Continue per ciascuna.
- Targeting completamente random (anche la zona).
- Danno mostro→eroe: `SP carta + Malus – Defence + bonus condizionali`. Multi-zona: Defence = media delle zone colpite.
- Carte base senza extra; solo carte forti mostro hanno status/condizioni.
- Malus: fino a fine fight, non stackano.
- Win: tutti i mostri a 0 Life. Lose: tutti gli eroi a 0 Life.
- KO/capture eroe: animazione; fuori gioco per una durata legata alla **size** del mostro (formula sotto).
- Special Attack mostri: se ≥2 mostri; chance decrescente di join; carte mischiate; paga solo l’attivatore (costo = SP max tra le carte scelte); quelle carte escono dal pool solo per il resto della battaglia.
- Burst piena → +1 Hero Essence. Mostro a 0 Life → +1 materiale del suo tipo.

### 2.6 Dungeon

Griglia 2D, solo ortogonale, fog of war (shop può svelare 3 o 5 celle). Ogni cella ha contenuto: mostro, tesoro, restore/shop, bonding event, mixed (2 o tutti).  
Bonding event: crea Bond Card, possibile status/patto; **non** crea unità.  
Ogni 10 livelli: Special Monster; sconfitto → +1 skill card a **tutti** i mostri.  
Uscita: ritorno all’inizio, cella Special Monster, o tutti gli eroi KO.  
Ogni dungeon applica un malus permanente agli eroi che entrano.

### 2.7 Edifici

I 4 tipi del GDD, stanze e assegnazioni come da tabelle, tempi di produzione (mix = somma SP; normale = 4 turni; mostro = SP Origin). Risorse: Hero Essence + materiale mostro. Bond non si mixano in edificio.

### 2.8 Evocazione

Nuovo mostro: 5 carte normali + 1 Origin. Origin cresce da solo, +1 SP cost a ogni crescita. Rituale multi-tipo → possibile nuovo tipo random.

### 2.9 Città e mondo

- 1 città iniziale a struttura fissa.
- Nuove città da Founding Event (esplorazione / vittoria maggiore / rituale).
- Taglie: Tiny 3 / Small 10 / Medium 15 / Big 20 / Metropolis 50 edifici. Probabilità anche in funzione del n. eroi.
- Multi-città. Città senza fog. Ogni turno: edifici restano, eventi speciali si resettano.
- Sopra Medium: chance Invasione (edifici off, eroi assegnati persi).
- Sopra Big: Trial Shrine (boss → carte speciali; poi mai più in quella città).
- Solo Metropolis: Bonding event solo-eroi.
- Influenza per città: eventi +1; soglia → recluta/crea eroe; alla creazione: 0 eroi assegnati ⇒ Influence = 0; città piena di assegnati ⇒ Influence / 2.
- Eventi città: sparring, Night Patrol, Park/Plaza.
- Mondo a celle, fog fuori città, molte celle vuote, wild encounter con le stesse regole di combattimento.
- Movimento ortogonale. Nuova città ⇒ travel point tra tutte le città. Evento “New City” dopo almeno 50 celle in zone esterne.
- Zone esterne: founding, ingressi dungeon normali/speciali (malus dungeon).

### 2.10 Numeri GDD ancora TBD — chiusi per poter shippare

Il GDD lascia aperti formula KO, soglie Influence, liste carte complete, UI, save, balancing. Per un lancio “come il file” servono **valori di default** modificabili in config, non feature saltate.

| Voce TBD | Default di lancio (bilanciabile senza cambiare architettura) |
|---|---|
| Durata KO/capture | `clamp(2, size_mostro, 8)` turni mondo/città (size 1–8) |
| Soglia Influence nuovo eroe | Tiny 8 · Small 12 · Medium 18 · Big 24 · Metropolis 36 |
| Liste carte | Set GDD eroe + set esempio per Tentacle / Beast / Slime / Construct / Insect / Aquatic + carte edificio |
| Save | 1 slot Standard, 3 Founders; `revision` su D1 |
| Burst bar | si riempie di `SP speso nella battaglia / 10` (cap 1 Essence a fight) |

UI/UX: web desktop-first, playable su mobile browser. Nessun client Steam/mobile store in questa proposta.

---

## 3. Cosa si vende — si gioca solo dopo il pagamento

`PAYWALL=on` è il default di produzione. Non esiste un flag “gioca gratis”.

Flusso utente:

1. Arriva sulla landing (video + prezzo + CTA).
2. Crea account (email). L’account **non** apre il gioco.
3. Clicca Acquista → Stripe Checkout (3-D Secure se serve).
4. Webhook `checkout.session.completed` → `entitlements.status = active`.
5. Solo allora `/play` e le API città/dungeon/combat rispondono 200.
6. Senza entitlement: `/play` → redirect landing; API gioco → 402 Payment Required.
7. Rimborso / dispute → entitlement revocato → di nuovo solo landing + video.

| SKU | Prezzo indicativo | Sblocco |
|---|---|---|
| Standard | 14,99 € | Accesso GDD completo, 1 slot save |
| Founders | 24,99 € | 3 slot, tema UI, credits |
| Season / cosmetic | dopo il profitto | Solo contenuto o cosmetici, **niente pay-to-win** |

In sviluppo locale si usa Stripe **test mode** (carte di prova, 0 incassi). In produzione Stripe è **live** dal giorno uno: niente soft launch giocabile gratis.

Eccezione tecnica, non commerciale: un account `role=dev` sul tuo utente, in env, per QA. Non è in registrazione pubblica.

---

## 3.1 Landing + video showcase

La landing è l’unica pagina pubblica oltre a login, checkout, privacy e termini.

**Blocco pagina (ordine)**

1. Titolo + tagline (città, carte, dungeon infiniti).
2. **Player video** (mute autoplay off; play con click; sottotitoli).
3. Tre pill: Gestione città · Carte & Bond · Dungeon / mondo infinito.
4. Prezzo Standard / Founders.
5. CTA “Acquista e gioca” → Stripe (se già loggato) o registrazione + Checkout.
6. FAQ: cosa si compra, rimborsi, niente pay-to-win.
7. Footer legale.

**Video — specifica, non file media in questa proposta**

Finché il gioco non è buildato, il video non può essere un capture reale. Si produce in due passaggi:

| Passaggio | Quando | Cosa |
|---|---|---|
| Trailer 0 | Prima del codice / in parallelo | Animatic 45–75 s: mock UI, carte del GDD, voice-over o testo on-screen. Formato 1920×1080, H.264, < 20 MB per Vercel. |
| Trailer 1 | Quando esiste lo slice visivo | Stesso montaggio sostituito con capture reale (città, fight, dungeon fog). |

**Storyboard Trailer 0 (circa 60 s)**

| Sec | Inquadratura | Testo in overlay |
|---|---|---|
| 0–5 | Logo + mappa mondo con fog che si apre | Fantasy Empire |
| 5–15 | Città, eroi assegnati agli edifici, coda produzione carte | Costruisci. Produci carte. |
| 15–28 | Mano da 6 carte, SP, colpo su zona Head/Chest | Combatti a turni. |
| 28–40 | Mostro + Bond Card “Squad Link” | Eroi e mostri. Un solo Bond a turno. |
| 40–52 | Griglia dungeon, cella boss ogni 10 | Dungeon infiniti. |
| 52–60 | Prezzo + “Paga per giocare” | CTA |

Hosting video: file in `/public/trailer.mp4` su Vercel **oppure** Cloudflare Stream / R2 se pesa. Niente YouTube obbligatorio. Poster frame statico per LCP.

Il video **non** è il gioco: nessun input, nessuno stato server, nessuna carta sbloccata.

---

## 4. Stack e fase “non pago l’infra”

```
Browser
  → Vercel Hobby (Next.js, HTTPS su *.vercel.app)
      → Cloudflare Worker Free + D1 Free
  → Stripe (spento o test mode, poi live)
GitHub Free — repo privato, Actions free minutes
```

### 4.1 Cosa è davvero gratis

| Servizio | Piano partenza | Limite da monitorare (dashboard, a mano) |
|---|---|---|
| GitHub | Free, repo privato | minutes Actions |
| Vercel | Hobby | bandwidth / invocazioni; uso commerciale Hobby va letto nei ToS del momento |
| Cloudflare Pages/Workers | Free | ~100k richieste Worker/giorno; CPU 10 ms/request |
| D1 | Free | storage account / per-DB e tetti giornalieri read/write |
| Stripe | nessun canone | commissione solo se incassi |
| Dominio `*.vercel.app` + HTTPS | incluso | un `.com` si compra solo quando c’è profitto |

### 4.2 Cosa non fare per “risparmiare”

- Non mettere il `.sqlite` su GitHub.
- Non mettere save nel repo.
- Non mettere `STRIPE_SECRET` nel client.
- Non usare GitHub Pages come backend di partita.

### 4.3 Soglia utenti (proposta, la decidi tu)

Si esce dalla Fase A quando **uno** di questi è vero:

- ≥ **50** `entitlements.active` con save recente, **oppure**
- ≥ **25** checkout settled, **oppure**
- Worker/D1 sopra l’80% del tetto free per 3 giorni di fila.

Fino ad allora: nessun upgrade a pagamento.

---

## 5. Sicurezza in Fase A (gratis, sufficiente per l’avvio)

Anche a costo zero si fanno le basi. Non si compra WAF Enterprise.

- Repo privato.
- Secret solo in Vercel env + Cloudflare Worker secrets (GitHub Secrets solo per la CI).
- Password Argon2id o magic link; cookie httpOnly.
- Ogni save/combat/produzione: `user_id` controllato sul Worker.
- Combat, mix edifici, drop, Bond: **resolver sul server** (client ostile).
- Query D1 parametrizzate.
- Webhook Stripe firmati e idempotenti (quando live).
- Rate limit basilare sul Worker (login / save).
- Backup: export D1 periodico **manuale** (o Time Travel del piano free).

Protezione extra (WAF custom, piano D1 Paid, replica, alerting 24/7) = solo in **Fase C**, quando i free tier non bastano e ci sono incassi.

---

## 6. Schema D1 (stesso in tutte le fasi)

- `users`
- `entitlements` (senza riga `active` → vietato giocare)
- `saves` (payload JSON = città, mondo, dungeon, party, carte, risorse, revision)
- `audit_payments` (si popola in Fase B)
- `world_seeds` / `config` (soglie Influence, size mostri, feature flag)

Il JSON di save è voluto: il GDD è largo (combo bond, celle infinite, pool carte). Normalizzare tutto in tabelle relazionali si può fare in Fase C se serve analytics.

---

## 7. Piano di lavoro

Il perimetro GDD intero allunga i tempi rispetto a uno slice. Restare a costo infra zero **non** accorcia lo sviluppo: accorcia solo la bolletta.

| Fase prodotto | Contenuto | Infra |
|---|---|---|
| Build 1 — Fondamenta | Auth, D1 schema, landing + video, Stripe test | Free |
| Build 2 — Combat + carte + Bond | Resolver server, tipi mostro GDD, esempi carte | Free |
| Build 3 — Città + 4 edifici + economia | Produzione, assegnazioni, Essence/materiali | Free |
| Build 4 — Dungeon infinito + mondo + multi-città | Fog, founding, invasion, shrine, travel point | Free |
| Build 5 — Evocazione, Influence, eventi, KO size | Default §2.10 | Free |
| Lancio | Landing + video + Stripe live; gioco solo ai paganti | Free + fee Stripe |
| Fase B | Stesso paywall, più volume | Free + fee Stripe |
| Fase C | Upgrade piano solo se i free tier non bastano | Piani paid mirati |

Stima onesta per un solo sviluppatore: mesi, non settimane. Il GDD intero è un gioco di sistemi incrociati.

---

## 8. Flusso pagamento (produzione)

1. Landing (video) → registrazione → Checkout Stripe (`client_reference_id = user_id`, `mode=payment`).
2. Success URL: `/checkout/pending` finché il webhook non arriva (poll `/api/me`).
3. Webhook firmato, idempotente → `entitlements.active`.
4. `/play` e Worker gioco: se manca entitlement → 402 + redirect landing.
5. Customer Portal Stripe: ricevute; rimborso → entitlement `refunded`.

Niente `PAYWALL=off` in produzione. Stripe test mode solo in preview GitHub / locale.

---

## 9. Rischi

| Rischio | Nota |
|---|---|
| GDD completo al day-one | Alto sforzo. Nessun taglio feature; si tagliano solo polish/art. |
| Free tier | Un picco di combattimenti può finire in 429. Si sale di piano in Fase C, o prima se accetti il costo. |
| Hobby Vercel e uso commerciale | Rileggere i ToS al lancio a pagamento. |
| SQLite su git | Vietato. |
| Combat sul client | Vietato. |

---

## 10. Decisione richiesta (per procedere oltre questo file)

1. Soglia Fase A→B (default: 50 paganti attivi **o** 25 settled **o** 80% quota D1).
2. Prezzo Standard / Founders confermati?
3. Trailer 0 (animatic) subito o si aspetta il capture reale?
4. URL: `*.vercel.app` fino a quando i free tier bastano? (consigliato)

---

## 11. Deliverable

Questo file è la proposta di prodotto e stack.  
Il bot ops è in `Fantasy_Empire_Grok_Bot_Ops.md`.  
I video IA per ogni azione (player nel sito, cache se già generati) sono in `Fantasy_Empire_Video_IA_Azioni.md`.

Nessun repo, nessun Worker, nessun video renderizzato in questa fase.
