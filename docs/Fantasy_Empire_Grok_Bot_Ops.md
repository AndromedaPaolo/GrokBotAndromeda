# Fantasy Empire — GrokBot (supporto, non il manutentore)

**Documento separato dalla proposta commerciale.**
**Riferimento prodotto:** `Fantasy_Empire_Proposta_Commerciale.md` (v2.1)
**Ops d'insieme:** `Fantasy_Empire_Ops_Cursor_GrokBot.md` (leggere prima)
**Versione:** 2.0 — 28 agosto 2026
**Video in-sito:** `Fantasy_Empire_Video_IA_Azioni.md`
**Stato di questo file:** specifica. Nessuna Routine, nessuna Automation, nessun post.

Hai già l'abbonamento. Questo file dice *a cosa serve* e *a cosa non serve*. Il git lo tiene **Cursor Pro+**. GrokBot entra a chiamata.

---

## 1. Mandato

Due strati, non uno.

**Da Fase 0, a chiamata.** Mail, analisi X/Twitter, ricerca legale, triage supporto. Output: messaggio mandato (se glielo dici), oppure memo. Non PR di combat.

**Dopo che *tu* hai acceso i pagamenti e c'è margine, ancora a chiamata, con approvazione.** Draft marketing, caption, calendario, report canali. Publish solo se esiste una regola scritta tua. Ads budget: mai da solo.

Non sostituisce Cursor. Se il memo dice "va cambiato il gate 18+", la patch la fa Cursor.

---

## 2. Quando gira, quando no

Non c'è uno switch "Fase C = bot acceso". C'è il tipo di lavoro.

| Tipo | Fase 0 | Fase B (pagamenti on) | Con profitto |
|---|---|---|---|
| Mail di supporto / waitlist | Sì, su ordine | Sì | Sì |
| Ricerca legale, policy Stripe, AGCOM | Sì | Sì, più spesso | Sì |
| Analisi X/Twitter (solo lettura) | Sì | Sì | Sì |
| Preavviso 30 giorni "arriveranno i pagamenti" | Solo se tu hai già deciso l'accensione e la checklist è verde | n/a (già partito) | n/a |
| Newsletter promo, patch notes marketing | No, salvo consenso e utilità del servizio | Con consenso | Con consenso |
| Post social live, ads | No | No, salvo ok tuo | Draft sì, live con ok |
| Upgrade piani infra, Price ID Stripe | No | No | Propone, non clicca |
| Dichiarare finita la Fase 0 | No | — | — |

Niente cron del tipo "tra 90 giorni accendi Stripe". Niente "è il 1 del mese, si paga".

---

## 3. Supporto: mail, X, legale

### 3.1 Mail

Usi: risposta a un giocatore, magic link di supporto, avviso posto in waitlist, e *solo quando tu l'hai chiesto* il preavviso di transizione.

Vincoli Fase 0: niente "compra a 14,99". Base GDPR come nel file Fase 0. Marketing checkbox a parte. Ogni invio di massa è un ordine tuo, non un loop.

Se GrokBot può mandare, manda. Se deve solo bozzare, bozza e aspetta.

### 3.2 Analisi Twitter/X

Usi: cosa si dice del gioco, dei card battler, di un competitor, di una polemica sui contenuti.

Output: memo (tono, citazioni, rischi reputazionali, *non* un piano ads). Zero like, zero reply, zero post.

### 3.3 Ricerca legale

Usi: delibere AGCOM, Garante cookie, AI Act art. 50, policy Stripe adult content, ToS Vercel Hobby, classificazione IARC/PEGI.

Output: memo con fonti e data. Scritto in cima: "non è un parere legale".

Se il memo sposta un box della checklist Fase B, apri (o chiedi a Cursor di aprire) una issue. Non "aggiusta" i T&C in produzione.

---

## 4. Prodotto e ricavi: solo proposta

Quando gli chiedi di pensare al gioco, può:

- Leggere metriche se gliele passi o se sono in una issue.
- Proporre patch di bilanciamento allineate al GDD SFW.
- Proporre backlog (season, carte, tetto video).
- Segnalare bug duplicati.

Non mergea su `main`. Non scrive pay-to-win. Le feature a pagamento restano accesso, slot, cosmetici, espansioni.

Stesso per lo stack: può dire "D1 è all'80%, valuta il piano". Il click sul billing è tuo.

---

## 5. Marketing live (non ora)

Resta il disegno vecchio, ma **non è un accendimento automatico al profitto**. È un permesso che dai tu, pezzo per pezzo, quando i pagamenti ci sono già e vuoi spingere.

Canali, riuso clip `cinematics`, caption, A/B landing: come prima. Approvazione umana su publish, ads, prezzi. Disclosure IA. Niente targeting minori. Niente offerte Founders con scadenza finta.

KPI da inseguire *solo se stai già vendendo*: conversion landing → checkout, chargeback, D7 paganti, ricavo netto, costo infra. In Fase 0 i KPI di ritenzione li guarda Cursor (issue) o tu. GrokBot può commentare un export.

---

## 6. Limiti

- Non sostituisce GitHub, Vercel, D1, Stripe, Cursor.
- Non mergea combat, auth, entitlement.
- Non accende `STRIPE_LIVE`.
- Non fissa una data di fine beta.
- Non è una difesa in AGCM/Garante: ciò che manda resta tuo.
- Non promette risultati di marketing.

---

## 7. Relazione con Cursor

Vedi `Fantasy_Empire_Ops_Cursor_GrokBot.md`.

Git e flag = Cursor. Inbox, X, gazzetta = GrokBot. Soldi = tu.

---

## 8. Deliverable di questo documento

Solo specifica. Nessuna Routine creata ora, nessun post, nessun upgrade di piano, nessuna data in calendario.
