# Fantasy Empire — Bot Grok (dopo il profitto)

**Documento separato dalla proposta commerciale.**
**Riferimento prodotto:** `Fantasy_Empire_Proposta_Commerciale.md` (v2.0)
**Versione:** 1.3 — 28 agosto 2026
**Video in-sito:** `Fantasy_Empire_Video_IA_Azioni.md`
**Stato:** spento fino al profitto. Non creare Automation ora.

Questo file descrive **solo** il bot. Non fa parte del perimetro di lancio, né della Fase 0 gratuita.

---

## 1. Mandato

Dopo il profitto il bot non si limita agli upgrade di piano.

Compito: **migliorare, potenziare, aggiungere funzionalità** e rendere **sempre più profittevole** il gioco e tutti i servizi legati (hosting, database, pagamenti, landing, video, account, supporto).

Tre linee, in parallelo:

1. **Prodotto** — nuove feature, bilanciamento, qualità, ritenzione.
2. **Piattaforma** — stack GitHub / Vercel / Cloudflare D1 / Stripe più solido e più protetto.
3. **Ricavi** — marketing, social, landing, offerte, season/cosmetic (niente pay-to-win).

---

## 2. Quando si accende

Il bot **non** gira in Fase 0 né in Fase B.

Si accende in **Fase C**, quando c'è profitto.

```
profitto_netto_30gg =
    incassi Stripe settled
  − commissioni Stripe
  − chargeback
  − costi infra già attivi (all'inizio = 0)

Fase C se profitto_netto_30gg ≥ soglia
(es. 100 € per 2 mesi di fila, cifra tua)
```

Prima di quella riga: nessuna Automation, nessuno script di marketing, nessuno upgrade di piano.

In Fase 0 gli incassi sono zero per costruzione. Il bot non ha niente da ottimizzare sui ricavi. Le metriche di gioco (D1/D7, drop tutorial) le leggi tu, a mano o con query D1.

---

## 3. Prodotto — migliorare e aggiungere

A cadenza (es. settimanale) il bot:

- Legge metriche di gioco se esposte (winrate, drop-off tutorial, tempo alla prima vittoria, rimborsi, ticket).
- Propone **patch di bilanciamento** (SP, Essence, Influence, drop) allineate al GDD SFW.
- Propone **nuove funzionalità** in backlog prioritizzato per profitto e ritenzione, esempi:
  - season / biomes dungeon
  - nuovi tipi mostro e carte
  - eventi città a tempo
  - slot save extra come SKU
  - trailer 1 aggiornato con capture reale
- Prepara spec / issue GitHub (testo), non mergea da solo su `main`.
- Segnala bug ricorrenti e duplicati.

Regola fissa: **niente carte o stat più forti vendute a parte.** Le feature a pagamento sono accesso, slot, cosmetici, espansioni di contenuto.

Le patch su un gioco già venduto toccano la conformità del contenuto digitale (quadro normativo §5.4 e §10). I giocatori vanno informati. Il bot propone il testo della patch note, non la pubblica da solo.

---

## 4. Servizi legati — potenziare lo stack

Stesso perimetro della proposta, potenziato quando i numeri lo giustificano:

- Cloudflare Workers / D1: tetti, backup, Time Travel più lungo, rate limit.
- Vercel: piano, preview, analytics landing.
- GitHub: branch protection, secret scanning, CODEOWNERS.
- Stripe: Radar, portal, nuovi SKU, lotta chargeback.
- Dominio custom + HTTPS quando il volume lo paga.
- Email transazionale (ricevute, "il tuo acquisto è attivo").
- Status / runbook (`OPS.md` nel repo, se autorizzato).

**Non paga i piani da solo.** Propone: costo, motivo, urgenza. Il click sul billing resta tuo.

---

## 5. Profitto — marketing e social

Obiettivo: più acquisti Standard/Founders e più ritenzione, senza sconti che bruciano il margine.

### 5.1 Canali

- Landing: headline, FAQ, prezzo, poster del trailer, CTA.
- Video in-game: le clip IA già generate e in cache sul sito (`Fantasy_Empire_Video_IA_Azioni.md`) vengono **riusate e caricate** sui canali del progetto.
- Social: X, Instagram, TikTok, YouTube, Discord, Reddit (community di gestione / card battler / city builder).
- SEO on-page e testi store-like sulla landing.
- Newsletter / email (solo se c'è consenso): patch notes, season.
- Partnership / creator: brief e lista target, non contratti firmati dal bot.
- Ads a pagamento (Meta, X, Google): **solo dopo approvazione budget** e account collegati. Il bot prepara copy e targeting, non brucia carta di credito in autonomia. Il targeting non deve raggiungere minori.

### 5.2 Distribuzione clip IA (solo Fase C)

Le clip nascono per il **sito** (overlay azioni). Quando il bot è acceso:

1. Seleziona da `cinematics` gli asset `ready`, non `banned`, più usati o più "hook".
2. Esporta tagli 15 s / 30 s / 9:16 dove serve.
3. Prepara caption + hashtag + link alla landing (paywall: il video social non fa giocare).
4. Carica sui canali del progetto (X, Instagram/Reels, TikTok, YouTube Shorts, Discord, eventuale newsletter).
5. Non pubblica materiale che fallisce la policy SFW sexy **né** le ToS della singola piattaforma (spesso più strette della legge).
6. Niente upload automatico prima del profitto e niente publish senza la regola di approvazione (§5.4).
7. Disclosure IA visibile.

Non si rigenera da zero per ogni social se la clip esiste già in cache: si **ripubblica** l'asset del sito.

### 5.3 Cosa produce il bot

| Output | Esempio |
|---|---|
| Calendario editoriale | 4 post/settimana + 1 clip |
| Copy | thread X, caption IG, titolo YouTube |
| Hook video | primi 3 secondi dello storyboard |
| A/B landing | 2 headline da testare |
| Report | CAC vs LTV grezzo, conversion landing→Stripe, canale che converte |
| Offerte | Founders a tempo *solo se* non erode il full price e la scadenza è reale |

Lingua: italiano + inglese per reach.

### 5.4 Cosa non pubblica da solo

Niente post live, niente ads live, niente cambio prezzo Stripe senza un **ok** tuo (o una regola scritta dopo, tipo "pubblica su X i draft già approvati").

Se il bot parla con persone (supporto, Discord), va dichiarato che è un'IA. In Fase 0/B non parla con nessuno perché è spento.

---

## 6. Ciclo settimanale (Fase C)

1. Raccoglie metriche prodotto + infra + Stripe + canali.
2. Scrive report: cosa ha reso, cosa no, rischi 429/D1, idee feature, idee content.
3. Aggiorna backlog (`ROADMAP.md` / issue GitHub) e `OPS.md`.
4. Prepara draft marketing della settimana successiva.
5. Aspetta approvazione sui pezzi che spendono soldi o toccano `main`.

---

## 7. KPI che deve inseguire

- Conversion landing → checkout → `entitlements.active`
- Chargeback e rimborsi
- Retention D1 / D7 dei *paganti*
- Ricavo netto 30 giorni (definizione §2)
- Costo infra / ricavo (deve restare basso)
- Engagement social solo se correlato ad acquisti, non vanity follower

Se un canale porta click e zero pagamenti, il bot lo deprioritizza.

In Fase 0 gli stessi KPI di ritenzione si guardano sui `beta_active`. Non è lavoro del bot.

---

## 8. Limiti

- Non sostituisce GitHub, Vercel, D1, Stripe.
- Non mergea codice di combat in produzione senza review.
- Non inventa pay-to-win.
- Non tocca billing né ads budget da solo.
- Non accende sé stesso prima del profitto.
- Non promette risultati di marketing garantiti.
- Non è una difesa: ciò che pubblica resta tuo.

---

## 9. Relazione con le fasi

| Fase | Bot Grok |
|---|---|
| 0 — Beta legale, gratis | Spento |
| B — Prime vendite | Spento |
| C — Profitto | Acceso: prodotto + stack + marketing/social + report profitto |

Il paywall, la landing e il video **non** dipendono da questo file: sono nella proposta.

---

## 10. Deliverable di questo documento

Solo specifica. Nessuna Automation creata ora, nessun post, nessun upgrade di piano.
