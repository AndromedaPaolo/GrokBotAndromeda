# Fantasy Empire — Decisioni aperte (da chiudere con te)

**Versione:** 1.7 — 28 agosto 2026
**Come si usa:** rispondi con il numero e la lettera. Aggiorno la proposta e alzo la versione. Se non rispondi, resto sui **default** già scritti in `Fantasy_Empire_Proposta_Commerciale.md` v2.7.

I default non sono "la verità". Sono la scelta più prudente per una Fase 0 gratuita in Italia, con Cursor Pro+ sul git, GrokBot a chiamata, dashboard Approva/Scarta, tetto settimanale sulle clip nuove, e **nessuna data** da gratis a pagato. Niente chiavi Grok dei giocatori.

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

- **A (default).** Preavviso 30 giorni **quando tu decidi**. Si vende Visioni. Chi non abbona: `/play` resta, tetto 7, Santuario chiuso. Save intatto.
- **B.** Come A, più Founders a prezzo bloccato per chi ha save recente (3 slot), scadenza reale di *quell'offerta*.
- **C.** Paywall sul GDD intero: chi non compra esce da `/play`, save in sola lettura 60 giorni + export. Non è il default.
- **D.** Wipe dei save beta. Pulito tecnicamente, brutta fede. Va detto da subito in T&C.

A è il modello di questa proposta. C era il vecchio "si paga per giocare". D non si prende se non l'hai scritto in beta. I 30 giorni sono la durata del preavviso, non la fine della beta.

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

## 13. Tetto e modo dei video in beta

- **A (default).** Il giocatore chiede. Miss = 2D. Lotto: prima a mano tua, poi agent Cursor 1×/giorno. Tu Approvi. Tetto settimanale (decisione 20). Master MP4 su R2.
- **B.** Solo libreria 2D / poster. Zero video IA.
- **C.** Generate live in combattimento, anche con tetto. No. Le clip escono storte e il turno non aspetta.
- **D.** Precache 80–150 chiavi a tuo carico, più le richieste. Opzionale, non il default.

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

## 17. Chi genera i video

- **A (default).** xAI Grok Imagine (image poi image-to-video). Casa Cursor. Lotto su richiesta, non in fight. ~0,25 $ a clip da 5 s. Copia subito su R2. GrokBot non tiene la chiave.
- **B.** Solo still + animazione 2D. Zero video IA.
- **C.** fal/Kling (o altro) al posto di Grok, stesso R2, stessa casa Cursor, stesso lotto.
- **D.** Asset fatti a mano / commissionati.
- **E.** ~~GrokBot lancia Imagine~~ **Scartata.**
- **F.** ~~Miss in combat → coda job~~ **Scartata.** Le clip escono storte. Si chiede, si lotta, si Approva.

---

## 18. Dove stanno i file

- **A (default).** Cloudflare R2 privato. Worker, URL firmati. 10 GB free, egress 0. Path `{video_key}/master.mp4`.
- **B.** R2 + Cloudflare Stream per il delivery. Ha senso con volume, non con 40 beta.
- **C.** File in `/public` su Vercel o su GitHub. No. Peso e bucket di fatto pubblico.
- **D.** Lasciare i file su `vidgen.x.ai`. No. Scadono.

Dettaglio: `Fantasy_Empire_Video_Storage_Generazione.md`.

---

## 19. Abbonamento Visioni

- **A (default).** 9,99 €/mese IVA inclusa. Stripe `mode=subscription`. Solo Fase B. Sblocca il Santuario delle Visioni e alza il tetto di generazione. I job restano sulla *nostra* chiave xAI. I soldi coprono il credito.
- **B.** Altro prezzo, o annuale.
- **C.** Niente abbonamento. Solo tetto settimanale per tutti.

A è lo SKU a pagamento di questa proposta. Il GDD resta gratis. C tiene i costi bassi e toglie la sezione speciale. B lo scrivi tu.

Non si chiede al giocatore di collegare Grok, Imagine, o una API key. Quella idea è scartata.

---

## 20. Quanti job Imagine a settimana

Settimana solare, fuso `Europe/Rome`, reset lunedì 00:00. Conta la *richiesta accettata* di una chiave nuova. Cache hit e "già in coda" non contano.

- **A (default).** 7 senza abbonamento. 40 con Visioni (tetto di sicurezza, così un account non svuota il credito).
- **B.** 3 / 20. Più stretto, meno burn, overlay 2D prima.
- **C.** 10 / illimitato. No: illimitato su una chiave tua è un buco.

I numeri stanno in `config`. Se li cambi, lo dici in-game e in T&C. Non "circa sette".

---

## 21. Squadra agenti

- **A (default).** I 17 posti di `Fantasy_Empire_Squadra_Agenti.md`. Cursor (9): Patcher, Sito, Numeri, Checkout, Santuario, Bandiere, Verbale, Imagine, Stagione. GrokBot (8): Inbox, Ascolto, Gazzetta, Corriere, Sportello, Promo, Bacheca, Spesa. Imagine è Cursor. I ruoli a pagamento stanno in panchina o preview da subito.
- **B.** Solo i posti accesi di Fase 0. I panchina li nominiamo il giorno in cui vendi. Sconsigliato: li inventi sotto chargeback.
- **C.** Meno posti, un agent "fa tutto" per casa. No. È come non avere dashboard.

A è più nomi da ricordare. Costa zero finché non li accendi. B ti fa scrivere Sportello a caldo. C è il mega-agent che abbiamo detto di non fare.

---

## 22. Da mano tua al lotto giornaliero

- **A (default).** All'inizio generi tu dalla lista `video_req`. L'agent C8 1×/giorno parte solo se Approvi `imagine_batch`. Anche allora tu Approvi ogni clip (`video_new`). Le clip escono storte.
- **B.** Agent giornaliero acceso dal primo go-live. Tu resti solo su Approva/Scarta. Meno lavoro, stesso tasto qualità.
- **C.** Sempre a mano. Niente agent. Tiene se i beta sono pochi. Si rompe a 40 persone × 7 richieste.

A è la rampa. B salta il "lo faccio io". C è onesto per una settimana, non per un mese.

---

## Come ti rispondo io

Mandami un elenco tipo:

```
1A 2A 3A 4A 5A 6A 7A 8A 9A 10A 11A 12A 13A 14A 15A 16A 17A 18A 19A 20A 21A 22A
```

oppure mescola (`3B 13A 22B`). Aggiorno i file di proposta, alzo le versioni, e ti dico cosa cambia. Niente codice finché non lo chiedi.
