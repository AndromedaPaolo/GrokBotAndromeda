# Fantasy Empire — Decisioni aperte (da chiudere con te)

**Versione:** 1.2 — 28 agosto 2026
**Come si usa:** rispondi con il numero e la lettera. Aggiorno la proposta e alzo la versione. Se non rispondi, resto sui **default** già scritti in `Fantasy_Empire_Proposta_Commerciale.md` v2.2.

I default non sono "la verità". Sono la scelta più prudente per una Fase 0 gratuita in Italia, con Cursor Pro+ sul git, GrokBot a chiamata, dashboard Approva/Scarta, e **nessuna data** da gratis a pagato.

---

## 1. Chi entra in beta

- **A (default).** Invite + cap 40 account con save recente. Waitlist per gli altri.
- **B.** Registrazione aperta, stesso cap: i primi 40, poi waitlist.
- **C.** Solo tu e tester nominati. Zero pubblico.

A è più lenta. Tiene i free tier e i minori fuori dalla porta principale. B cresce prima e si sporca prima. C è QA, non un prodotto.

---

## 2. Fascia d'età

- **A (default).** 18+ dichiarato, gate all'ingresso, classificazione coerente.
- **B.** PEGI/IARC 16 e si taglia il fan service.
- **C.** 18+ *e* age assurance forte (SPID / IT Wallet / fornitore terzo).

A regge se il contenuto resta sexy non pornografico. C costa e tratta dati biometrici/identità: eccessiva per una beta a zero ricavo, obbligatoria se il tono scivola in porno. B è la via Stripe-friendly.

---

## 3. Tono visivo

- **A (default in beta).** SFW sexy come nei file video. Stripe si affronta **prima** di Fase B.
- **B.** Fantasy adventure, niente scollo come leva. Stripe più semplice, marketing più debole rispetto all'idea originale.
- **C.** Si tiene A e si cerca un PSP "mature" già ora, anche se i pagamenti sono spenti. Serve solo a sapere se quel PSP ti accetta.

Non scegliere è scegliere A senza piano B. Prima di incassare serve una riga scritta.

---

## 4. Territori

- **A (default).** Italia + UE.
- **B.** Solo Italia.
- **C.** Mondo, con UK/USA esclusi.
- **D.** Mondo intero.

D è la scelta più cara in compliance. A è il minimo per un titolare italiano. B è più stretto del dovuto, ma più semplice da spiegare in T&C.

---

## 5. Classificazione

- **A (default).** IARC, questionario, gratis, browser.
- **B.** PEGI (più lento, più riconoscibile).

Senza una delle due, il go-live pubblico in Italia è scoperto. Non è rinviabile a Fase B.

---

## 6. Cosa succede quando si accendono i pagamenti

- **A (default).** Preavviso 30 giorni **quando tu decidi**, non da una data scritta oggi. Offerta Founders a prezzo bloccato per chi ha save recente. Chi non compra: save in sola lettura 60 giorni + export.
- **B.** I beta ricevono Standard in omaggio (1 slot) e pagano solo se vogliono Founders.
- **C.** Wipe dei save beta, si riparte da zero sul paywall. Pulito tecnicamente, brutta fede verso chi ha giocato.

B è generoso e può andarti stretto se i beta sono 40 e poi diventano 400. C va detto **da subito** in T&C, altrimenti è una pratica scorretta. A è il compromesso. I 30 giorni sono la durata del preavviso, non la fine della beta.

---

## 7. Slot save in beta

- **A (default).** 1 slot, come Standard. I 3 slot restano lo SKU Founders.
- **B.** 3 slot già in beta, per far provare il "pro".
- **C.** Slot illimitati in beta, poi si taglia.

C è un taglio di feature al momento del pagamento. Va dichiarato. Meglio non farlo. B indebolisce Founders.

---

## 8. Trailer

- **A (default).** Trailer 0 (animatic) al go-live Fase 0. Trailer 1 quando c'è capture.
- **B.** Si aspetta il capture reale. Landing senza video finché non c'è.
- **C.** Solo reel di 3 clip IA precache, niente trailer montato.

---

## 9. URL

- **A (default).** `*.vercel.app` in Fase 0. Dominio proprio quando c'è P.IVA.
- **B.** Dominio `.it` subito (costo piccolo, più credibile, footer più pulito).

---

## 10. Prezzi visibili in Fase 0

- **A (default).** Non in homepage. Pagina "Dopo la beta" con prezzi *indicativi*, scritti come intenzione.
- **B.** Homepage con i due prezzi, CTA spento. Sembra un negozio chiuso.
- **C.** Nessun numero in pubblico fino al preavviso dei 30 giorni.

A evita di fare un'offerta al pubblico e lascia comunque una direzione. C è la più pulita legalmente, la più opaca per i Founders.

---

## 11. Newsletter

- **A (default).** Solo consenso espresso, checkbox a parte. Patch notes di beta via email transazionale ("il servizio che usi") se i T&C lo dicono.
- **B.** Niente email oltre magic link e preavviso Fase B.
- **C.** Soft spam. **No** in Fase 0: non hanno acquistato.

---

## 12. Chat / Discord / UGC

- **A (default).** Niente. Supporto via email.
- **B.** Discord ufficiale, regole 18+, moderazione tua.
- **C.** Chat in-game.

B e C riqualificano il servizio verso "piattaforma online" DSA. In Fase 0 è peso inutile. Se un giorno c'è profitto e lo vuoi, si riparla.

---

## 13. Tetto video IA in beta

- **A (default).** Precache 80–150 chiavi. Live generate con tetto basso. Fallback 2D.
- **B.** Solo libreria precotta. Zero generate live.
- **C.** Generate live senza tetto.

C brucia il free tier e, se il provider è a consumo, brucia te. B è più sicuro, meno "wow".

---

## 14. Soglia per *poter* accendere Stripe (oltre al legale)

Il legale è un **blocco**. Questa è solo una soglia *di prodotto* da guardare. **Non accende nulla da sola.** Non è una data.

- **A (default).** D7 sopra una soglia che fissi tu (proposta: 20%) **e** almeno 25 save recenti. Anche se i numeri sono verdi, serve ancora la tua frase esplicita + checklist legale.
- **B.** ~~Data fissa~~ **Scartata.** Una data prefissata è quello che non vuoi: o paghi a checklist rossa, o smenti il calendario in pubblico.
- **C.** Non si guarda nemmeno D7. Solo checklist legale + tuo sì.

A usa la beta per quello che serve. C è più pulita se i numeri non ti interessano. B non si prende.

---

## 15. Chi fa cosa

- **A (default).** Cursor Pro+ tiene il git (branch, test, flag). GrokBot a chiamata: mail, analisi X/Twitter, ricerca legale. Il sì/no sta in dashboard, non su GitHub. `STRIPE_LIVE` è una card con tasto spento se la checklist è rossa. Vedi `Fantasy_Empire_Ops_Cursor_GrokBot.md` e `Fantasy_Empire_Dashboard_Approvazioni.md`.
- **B.** GrokBot fa anche le PR di prodotto. Sconsigliato: il git è di Cursor.
- **C.** Solo Cursor, GrokBot spento. Perdi mail e analisi X senza un giro manuale tuo.

---

## 16. Dove clicchi sì/no

- **A (default).** Una dashboard. Approva = esegue (push, invio, publish). Scarta = elimina (chiude PR, butta bozza). Tutte le cose come questa nella stessa coda. Non apri git.
- **B.** Restare su GitHub per il merge e chat per le mail. È quello che non vuoi.
- **C.** Auto-merge se i test passano. No. Toglie il click, che è il punto.

---

## Come ti rispondo io

Mandami un elenco tipo:

```
1A 2A 3A 4A 5A 6A 7A 8A 9A 10A 11A 12A 13A 14A 15A 16A
```

oppure mescola (`3B 6B 9B`). Aggiorno i file di proposta, alzo le versioni, e ti dico cosa cambia in landing, D1 e checklist. Niente codice finché non lo chiedi.
