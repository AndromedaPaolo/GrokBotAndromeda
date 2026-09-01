# Fantasy Empire — GrokBot (supporto, non il manutentore)

**Documento separato dalla proposta commerciale.**
**Riferimento prodotto:** `Fantasy_Empire_Proposta_Commerciale.md` (v2.9)
**Squadra (nomi GrokBot):** `Fantasy_Empire_Squadra_Agenti.md`
**Video generazione:** `Fantasy_Empire_Video_Storage_Generazione.md`
**Ops d'insieme:** `Fantasy_Empire_Ops_Cursor_GrokBot.md` (leggere prima)
**Dashboard:** `Fantasy_Empire_Dashboard_Approvazioni.md`
**Versione:** 2.7 — 1 settembre 2026
**Video in-sito:** `Fantasy_Empire_Video_IA_Azioni.md`
**Stato di questo file:** specifica. Nessuna Routine, nessuna Automation, nessun post.

Hai già l'abbonamento. Questo file dice *a cosa serve* e *a cosa non serve*. I posti nominati (Inbox, Ascolto, Gazzetta, Corriere, e in panchina Sportello, Promo, Bacheca, Spesa) stanno in `Fantasy_Empire_Squadra_Agenti.md`. Imagine **non** è qui: è Cursor (C8). Il git lo tiene **Cursor Pro+**. GrokBot entra a chiamata. Tu non gli dici sì in chat per ogni cosa: metti Approva o Scarta in dashboard.

---

## 1. Mandato

Due strati, non uno.

**Da Fase 0, a chiamata, poi card in dashboard.** Mail, analisi X/Twitter, ricerca legale, triage supporto. Output: bozza in coda, non invio diretto. Tu Approvi o Scarti. Non PR di combat. Non job Imagine.

**Dopo che *tu* hai acceso i pagamenti e c'è margine, ancora card.** Draft marketing, caption, calendario, report canali. Publish = Approva su quella riga. Ads budget: mai da solo.

Non sostituisce Cursor. Se il memo dice "va cambiato il gate 18+", la patch la fa Cursor.

---

## 2. Quando gira, quando no

Non c'è uno switch "Fase C = bot acceso". C'è il tipo di lavoro.

| Tipo | Fase 0 | Fase B (pagamenti on) | Con profitto |
|---|---|---|---|
| Mail di supporto / waitlist | Bozza in dashboard | Bozza in dashboard | Bozza in dashboard |
| Ricerca legale, policy Stripe, AGCOM | Memo in dashboard | Memo in dashboard | Memo in dashboard |
| Analisi X/Twitter (solo lettura) | Memo in dashboard | Memo in dashboard | Memo in dashboard |
| Preavviso 30 giorni | Card, tasto spento se checklist rossa | n/a (già partito) | n/a |
| Newsletter promo, patch notes marketing | No, salvo consenso e utilità del servizio | Card `mail_massa` | Card `mail_massa` |
| Post social live, ads | Tipo spento | Tipo spento, salvo tu sblocchi | Draft in coda, live con Approva |
| Upgrade piani infra, Price ID Stripe | Card reminder, non paga | Card reminder | Card reminder |
| Dichiarare finita la Fase 0 | No | — | — |

Niente cron del tipo "tra 90 giorni accendi Stripe". Niente "è il 1 del mese, si paga".

---

## 3. Supporto: mail, X, legale

### 3.1 Mail

Usi: risposta a un giocatore, magic link di supporto, avviso posto in waitlist, e *solo con Approva sulla card* `preavviso_pagamenti` il preavviso di transizione.

Vincoli Fase 0: niente "compra a 14,99". Base GDPR come nel file Fase 0. Marketing checkbox a parte. Ogni invio di massa è una riga `mail_massa`. GrokBot bozza, non spara.

### 3.2 Analisi Twitter/X

Usi: cosa si dice del gioco, dei card battler, di un competitor, di una polemica sui contenuti.

Output: memo in dashboard (tipo `memo_twitter`). Approva = archivia. Zero like, zero reply, zero post. I post live sono un altro tipo (`post_x`), spento in Fase 0.

### 3.3 Ricerca legale

Usi: delibere AGCOM, Garante cookie, AI Act art. 50, policy Stripe adult content, ToS Vercel Hobby, classificazione IARC/PEGI.

Output: memo `memo_legale` in dashboard, con fonti e data. Scritto in cima: "non è un parere legale". Approva = Cursor apre un `git_pr`. Scarta = archivia. Non "aggiusta" i T&C in produzione da solo.

### 3.4 Clip di gioco

Non è GrokBot. Fase 0: banco tuo. Fase B Visioni: Worker + nostra API key, carica da solo. Tu Approvi in beta, Scarta/ban sempre. Dettaglio: `Fantasy_Empire_Video_Storage_Generazione.md`.

GrokBot, in Fase C se sblocchi Bacheca, **riusa** le clip già in cache. Non ne genera di nuove per un post.

---

## 4. Prodotto e ricavi: solo proposta

Quando gli chiedi di pensare al gioco, può:

- Leggere metriche se gliele passi o se sono in una issue.
- Proporre patch di bilanciamento allineate al GDD SFW.
- Proporre backlog (season, carte, tetto video).
- Segnalare bug duplicati.

Non mergea su `main`. Non scrive pay-to-win. Le feature a pagamento restano: Visioni (Santuario + tetto generazione), slot, cosmetici. Non "collega il tuo Grok".

Stesso per lo stack: può dire "D1 è all'80%, valuta il piano". Il click sul billing è tuo.

---

## 5. Marketing live (non ora)

Resta il disegno vecchio, ma **non è un accendimento automatico al profitto**. È un permesso che dai tu, pezzo per pezzo, quando i pagamenti ci sono già e vuoi spingere.

Canali, riuso clip `cinematics`, caption, A/B landing: come prima. Ogni publish è una card. Disclosure IA. Niente targeting minori. Niente offerte Founders con scadenza finta.

KPI da inseguire *solo se stai già vendendo*: conversion landing → checkout, chargeback, D7 paganti, ricavo netto, costo infra. In Fase 0 i KPI di ritenzione li guarda Cursor (issue) o tu. GrokBot può commentare un export.

---

## 6. Limiti

- Non sostituisce GitHub, Vercel, D1, Stripe, Cursor.
- Non mergea combat, auth, entitlement.
- Non accende `STRIPE_LIVE` (la card c'è, il tasto è tuo e può essere spento).
- Non fissa una data di fine beta.
- Non mergea. Il merge lo fa Cursor dopo il tuo Approva in dashboard.
- Non lancia Grok Imagine. Fase 0: C8 + tu. Fase B: Worker + `GEN_API`. GrokBot mai.
- Non è una difesa in AGCM/Garante: ciò che manda resta tuo.
- Non promette risultati di marketing.

---

## 7. Relazione con Cursor

Vedi `Fantasy_Empire_Ops_Cursor_GrokBot.md`.

Git, flag e tubo file = Cursor. Inbox, X, gazzetta = GrokBot. Coda = dashboard. Fase 0 video = banco. Fase B Visioni = API + upload automatico. Soldi = tu.

---

## 8. Deliverable di questo documento

Solo specifica. Nessuna Routine creata ora, nessun post, nessun upgrade di piano, nessuna data in calendario.
