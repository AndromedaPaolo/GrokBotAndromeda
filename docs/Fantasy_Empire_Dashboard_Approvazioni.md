# Fantasy Empire — Dashboard approvazioni

**Tipo documento:** proposta. Nessun codice, nessuna pagina, nessun webhook creato.
**Versione:** 1.7 — 1 settembre 2026
**Perché esiste:** non devi aprire GitHub, Gmail o X per ogni ok. Una coda. Due tasti. Vale per il push e per **tutte le cose dello stesso tipo**: mail, post, flag, preavviso, ban video, invite. I buchi video ("manca X") stanno qui, non in una seconda app.

**Riferimenti:** `Fantasy_Empire_Ops_Cursor_GrokBot.md` · `Fantasy_Empire_Squadra_Agenti.md` · `Fantasy_Empire_Grok_Bot_Ops.md` · `Fantasy_Empire_Proposta_Commerciale.md` v2.10 · `Fantasy_Empire_Video_Storage_Generazione.md` · `Fantasy_Empire_Asset_Dove.md`

---

## 1. Cosa vedi, cosa premi

Una pagina **tua**, non dei giocatori. Login solo tu. In Fase 0 può vivere su Tailscale o su un path `/ops` dietro auth, non linkato dalla landing.

Ogni riga è una cosa in attesa. Due tasti, sempre gli stessi:

- **Approva.** Esegue. Per il git: merge su `main` (push incluso). Per una mail: la manda. Per un post: lo pubblica. Per uno scarto: vedi sotto.
- **Scarta.** Non esegue. Per il git: chiude la PR e cancella il branch. Per una mail: butta la bozza. Per un post: non esce. Per un flag: resta com'è.

Niente terzo tasto "magari dopo" come default. Se ti serve parcheggiare, **Tieni**. Non è Approva.

Non apri git. Non fai push a mano. Il click *è* il push, o l'invio, o la pubblicazione.

Eccezione utile, stesso pannello: le card `video_req` hanno anche **Genera/Carica still** e **Carica MP4**. Approva resta sul `video_new`, quando il file c'è. Specifica in §2.1.

---

## 2. Cosa entra in coda (tutte le cose come questa)

Regola: se oggi dovresti andare su un sito a cliccare, domani sta qui.

| Tipo | Cosa vedi in preview | Approva fa | Scarta fa |
|---|---|---|---|
| `git_pr` | Titolo, file toccati, diff corto, test ok/ko, tag di rischio (combat, auth, entitlement, legale) | Merge + push su `main`. Deploy se già agganciato a `main` | Chiude PR, cancella branch |
| `mail` | Destinatario, oggetto, corpo, base GDPR (transazionale / consenso) | Invia | Elimina bozza |
| `mail_massa` | Conteggio destinatari, oggetto, corpo, consenso filtrato | Invia a quel set. Tipo panchina (G6 Promo) in Fase 0 salvo transazionale | Elimina bozza |
| `preavviso_pagamenti` | Testo email 30 giorni, numero `beta_active`, checklist Fase B (deve essere verde) | Manda il preavviso. **Non** accende Stripe | Elimina. Fase 0 resta |
| `mail_visioni` | Destinatario, oggetto, corpo (abbonamento attivo / disdetto / pagamento fallito) | Invia. Tipo **spento** in Fase 0 (G4 Corriere, seconda vita) | Elimina |
| `stripe_live` | Checklist Fase B, data invio preavviso, giorni scaduti, box `GEN_API` (I2V Visioni) | `STRIPE_LIVE=on` e `GEN_API=on` solo se i box sono verdi. Altrimenti il tasto è morto e spiega perché | Lascia off. Banco Fase 0 resta |
| `prezzo` | Vecchio / nuovo, SKU (Visioni 9,99 o altro) | Patch + push del prezzo | Niente |
| `quota_week` | Vecchio / nuovo tetto 7 o 40 | Patch `config` + disclosure in-game | Niente |
| `post_x` / `post_ig` / `post_altro` | Testo, clip, disclosure IA | Pubblica. Tipo panchina (G7 Bacheca) in Fase 0 | Elimina bozza |
| `ads` | Copy, budget, targeting | Tipo panchina (G8 Spesa). Anche dopo, Approva qui non paga da solo | Elimina |
| `memo_legale` | Fonti, cosa cambierebbe | Non pubblica legge. Apre/accoda un `git_pr` con la patch di `docs/` o delle pagine | Archivia il memo |
| `memo_twitter` | Riassunto sola lettura | Archivia (non c'è niente da pubblicare) | Archivia |
| `char_new` | Portrait / body / ref, `character_id` | Catalogo: file su `characters/{id}/` | Cancella oggetti, id fuori catalogo |
| `card_new` | Art carta, `card_id`, zona se eroe | Catalogo: file su `cards/{id}/` | Cancella oggetti, id fuori catalogo |
| `video_req` | **Manca video X** (Fase 0) oppure **In generazione API** (Fase B Visioni). Dove si vede, prompt, n. richieste, still | Fase 0: Genera/Carica still, Scarica still, Carica MP4 → `video_new`. Fase B Visioni: niente upload, il Worker carica da solo | Scarta la richiesta / il buco |
| `video_new` | Player, `video_key`, prompt, still. Fase 0: da pubblicare. Fase B: **già live** | Fase 0: `ready`. Fase B: no-op sul play (è già `ready`); resta per audit | Cancella oggetti R2, riga `banned` |
| `imagine_batch` | ~~Lotto 1×/giorno in beta~~ | **Non si usa.** Il pagato è per-richiesta (`GEN_API` sulla card `stripe_live`) | — |
| `video_ban` / `video_unban` | `video_key`, motivo, frame | Segna `banned` / `ready` | Lascia com'è |
| `invite` / `cap` | Email o nuovo cap | Grant o cambio cap | Niente |
| `upgrade_piano` | Servizio, costo, perché | Non paga da solo. Ti lascia un reminder e un link al billing. Il click sulla carta resta tuo | Archivia |
| `cancellazione_account` (se non è self-serve già fatto) | User id | Esegue la cascade GDPR | Niente |

Se manca un tipo in tabella ma è "devo andare da qualche parte a dire sì o no", è un tipo nuovo della stessa coda. Non un secondo pannello.

Le card `video_req` hanno tasti in più rispetto ad Approva/Scarta: sono il banco di lavoro (still + upload). Approva resta solo su `video_new`, quando il file c'è.

### 2.1 Banco video: "manca X" → still → tu → upload

Una card, una chiave, uno slot. Non una cartella da scegliere.

Cosa vedi sopra i tasti:

- Titolo in italiano: "Manca video: Quick Slash · guerriera · Chest".
- Dove si vede: combat overlay / città / dungeon. È la "sezione in cui serve".
- Prompt da usare (versione `sfw_sexy_v1`), n. giocatori che l'hanno chiesta.
- Still: buco, oppure preview del `poster.jpg`.

Tasti, in ordine:

1. **Genera still** se manca (API image) **o Carica still** (JPG tuo).
2. **Scarica still** quando c'è. Fuori dalla dashboard: image-to-video con quel file e quel prompt.
3. **Carica MP4**. Il Worker lo mette in `videos/{video_key}/master.mp4`. Fine: è già nella sezione giusta.
4. Compare `video_new` col player. **Approva** = `ready`. **Scarta** = via.

Richieste giocatore in cima. Sotto, buchi di catalogo senza `ready`.

In **Fase B**, se `GEN_API=on` e la richiesta è Visioni, la stessa card dice "In generazione API": niente Carica MP4. Il Worker scrive R2 da solo. `video_new` compare già `ready`.

---

## 3. Cosa non passa dalla dashboard

- Giocare. Quello è `/play`.
- Registrazione giocatori, cookie, trailer.
- Lettura in diretta dei log server (può esserci un link, non un tasto Approva).
- Pagare Vercel/Cloudflare: la dashboard propone, tu paghi sul loro sito.
- Pareri dell'avvocato: il memo entra, la firma dell'avvocato no.

Analisi Twitter e ricerca legale **entrano** come memo. Approva su un memo legale significa "trasforma in PR", non "è legge".

---

## 4. Chi esegue dopo il click

Il browser non ha chiavi. Il browser parla col server della dashboard. Il server tiene il sender key e sveglia chi deve.

| Tipo | Chi esegue dopo Approva |
|---|---|
| `git_pr`, `prezzo`, patch da memo, flag nel repo | **Cursor** (merge/push sul repo). La dashboard non sostituisce git, nasconde git a te |
| `mail`, `mail_massa`, `mail_visioni`, `preavviso_pagamenti`, `post_*` | **GrokBot** |
| `stripe_live` | Cursor cambia i flag **solo** se i vincoli sono verdi. Accende anche `GEN_API` (I2V Visioni, upload automatico). GrokBot non lo tocca |
| `char_new`, `card_new` | Worker su R2 + D1. Path `characters/{id}/` o `cards/{id}/`. GrokBot non c'entra |
| `video_req` (Fase 0 still / upload) | Worker su R2 + D1. Still da API image, da carta/personaggio già in catalogo, o da te. MP4 da te. GrokBot non c'entra |
| `video_new`, `video_ban` / `video_unban` | Worker su R2 + D1. Fase 0: file dal tuo upload. Fase B: file già messo dal job API |

Un click, un job. Se il job fallisce, la riga resta in coda con errore visibile. Non si ritenta in loop.

Scarta sul git: GrokBot o un piccolo worker chiude la PR (API GitHub) e cancella il branch. Non serve che tu apra GitHub nemmeno per dire no.

---

## 5. Come arriva una riga (senza che tu apra git)

1. Cursor finisce una PR. Invece di scriverti "guarda GitHub", scrive una riga `git_pr` in coda (tabella `approvals` su D1, o equivalente). Stato: `pending`.
2. GrokBot finisce una bozza mail o un memo. Stessa tabella, altro `type`.
3. La dashboard fa poll o riceve un ping. Compare la card.
4. Tu Approva o Scarta.
5. Lo stato diventa `done` / `discarded` / `error`. Resta lo storico.

Tu non "vai a vedere se c'è una PR". Apri la dashboard quando vuoi, o ricevi una mail tua (una, transazionale, a te) "c'è 1 cosa in coda". Non una per file.

---

## 6. Card: cosa deve stare sopra i tasti

Senza questo torni su git per capire.

- Tipo e titolo in italiano ("Patch combat SP", "Mail waitlist a 3 persone").
- Rischio: `basso` / `combat` / `auth` / `soldi` / `legale` / `contenuti`.
- Preview: diff (max N file, il resto "altri K file"), oppure corpo mail, oppure testo post.
- Test: pass / fail / non previsti. Se fail, **Approva è spento** sul `git_pr`.
- Per `stripe_live` e `preavviso_pagamenti`: i box della checklist Fase B, uno a uno. Tasto morto se uno è rosso.
- Chi l'ha proposta (Cursor / GrokBot) e quando.

Niente dump JSON in faccia. Il JSON sta nel job, non in UI.

---

## 7. Vincoli che il tasto non può saltare

La dashboard è comoda. Non è un bypass.

- `STRIPE_LIVE` e prezzi: stessi blocchi della Fase 0 / quadro normativo. Tasto spento, non "Approva e poi vediamo". `GEN_API` parte **con** quel click, non prima.
- `mail_massa` in Fase 0: solo se c'è consenso o è transazionale del servizio (waitlist, magic link, preavviso). Altrimenti tasto spento.
- `post_*` in Fase 0: default **coda spenta** per il live. I memo Twitter sì, i post no, finché non sblocchi tu il tipo.
- Combat / auth / entitlement: Approva consentito (altrimenti non shippi), ma il tag `rischio` è grosso. Non auto-approva.
- Clip Visioni in Fase B: upload e `ready` automatici dopo policy. Non è un auto-merge git. Scarta/ban resta tuo.
- Niente auto-Approva sul git. Niente "se i test passano, merge da solo".

Un click su Scarta è definitivo per quella riga. Se Cursor deve rifare, apre una riga nuova.

---

## 8. Sicurezza (anche in proposta)

- Non è sulla landing. Non è indicizzata. Auth solo il tuo utente `role=dev` / allowlist email.
- Sessioni corte, cookie httpOnly. Rate limit sui POST Approva/Scarta.
- Il sender key del webhook **non** sta nel browser. Sta sul server (stesso schema della UI GrokBot: POST locale → webhook).
- Log di chi ha cliccato cosa, quando. Serve il giorno in cui un post o una mail fanno danno: la responsabilità è tua, la traccia anche.
- Tailscale in Fase 0 è la via più corta: la pagina non è pubblica. Quando (se) il gioco ha un dominio, `/ops` resta fuori dal sito giocatori.

GDPR: la dashboard tratta account dei giocatori (mail, cancellazioni). Stesso titolare, stessa informativa interna. Non è uno strumento di marketing verso terzi.

---

## 9. Fuori scope di questo file

Nessuna pagina HTML, nessun webhook, nessuna Routine, nessun merge reale. Questa è la mappa della coda. Costruirla è un giro dopo, se lo chiedi.
