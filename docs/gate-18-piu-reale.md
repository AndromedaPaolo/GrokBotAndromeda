# Gate 18+: cosa è “reale” e cosa no

Requisito principale dichiarato: **controllare che siano 18+ realmente**. Sesso, tag, liveness da soli sono secondari.

Questo file è ricerca e piano, non un’implementazione e non è consulenza legale.

---

## Verdetto

**18+ reale = data di nascita su un documento d’identità autentico, più prova che chi è in camera è il titolare (liveness + face match).**

Tutto il resto è più debole, anche se i vendor lo chiamano “age verification”.

| Metodo | È 18+ *reale*? | Note |
|---|---|---|
| Checkbox “ho 18 anni” | No | Teatro. UK OSA e analoghi non lo accettano sui siti adult. |
| Stima età dal viso (Yoti Age Estimation, Didit Age Estimation $0.10) | No | Modello statistico. Un 16enne che sembra 23 passa; un 19enne baby-face fallisce. In Germania per i siti 18+ si usa spesso soglia stimata 23. Privacy alta, certezza bassa. |
| Carta di credito | No | Minore col conto dei genitori. Molti Paesi non la considerano prova d’età. |
| Numero di cellulare / DB operatore | Quasi no | Copertura a macchia. Non è un documento. |
| App Yoti che condivide `age_over:18` da **stima** in-app | No | Stesso tetto della stima viso. |
| App Yoti / Digital ID che condivide `age_over:18` da **documento** già verificato in app | Sì | Il sesso non ti serve; chiedi solo over 18 (+ remember me). |
| Scan documento (Didit ID, Yoti Doc Scan) + liveness + face match, poi `oggi - DoB >= 18` | Sì | Questa è la riga “realmente”. |

Se “realmente” è non negoziabile: **disattiva la stima del viso**. Lascia solo documento (o Digital ID ancorato a documento).

---

## Flusso minimo (solo età)

Non chiedere sesso, nome, indirizzo. GDPR: tieni `over18: true`, un id opaco, la data della verifica. Butta DoB e immagini appena hai il boolean.

```
landing (ToS 18+, privacy, chi è il provider)
    → sessione IDV
         documento autentico
         data di nascita
         selfie + liveness
         face match documento ↔ selfie
    → se DoB implica età < 18 o check FAIL: stop
    → cookie/account { providerUserId, over18: true, verifiedAt }
    → ricerca / matching
```

Senza `over18` il WebSocket di matching non accetta enqueue. Rivalidazione: non a ogni Next; sì se scade la sessione provider, ban, o prestito account sospetto.

---

## Chi usare, se il vincolo è 18+ reale e il costo

### 1. Didit — più vicino al “gratis per chi adotta”

[Help free plan](https://help.didit.me/getting-started/free-plan): 500/mese forever, senza carta, per **ID verification** (DoB sul documento) + **passive liveness** + **face match**. Poi ~$0.33 a sessione completa.

- **Usa** il modulo ID Verification. Da lì esce `date_of_birth`. Calcoli tu `età >= 18`.
- **Non usare** Age Estimation ($0.10, non è nel free, non è reale).
- Passive liveness è nel free; active no.
- White label fa pagare anche sotto i 500.
- Pagina [adult / social](https://didit.me/industries/identity-verification-social-apps/): confermare sul contratto il caso webcam.

Sotto 500 nuovi verificati al mese: 18+ documentale a $0. Sopra: listino pubblico.

### 2. Yoti Age Verification — pensato per i siti adult

[Docs](https://developers.yoti.com/age-verification): sessione `type: OVER`, `threshold: 18`.

Per **reale**, in create session:

- `doc_scan.allowed: true` (e/o `digital_id` **da documento**)
- `age_estimation.allowed: false` se non vuoi far passare chi “sembra” 18
- Non chiedere altro: ti basta `COMPLETE` sull’OVER, non la data di nascita in chiaro (Yoti può restituire solo over/under)

Paghi Yoti a sessione. L’utente non paga. Catalogo esplicito [adult content](https://www.yoti.com/adult-content-age-verification/).

Digital ID: l’utente ha già fatto il documento *una volta* in app; al sito condivide solo “over 18”. Frizione bassa dal secondo sito in poi. Vincola la policy alla fonte documento, non alla stima in-app.

### 3. Persona

500 ID+selfie/mese per 12 mesi (startup), poi a pagamento. Stesso principio: documento, non stima.

### 4. Self-host OCR + MiniFASNet

$0 di licenza. **Non** è 18+ reale: manca autenticità del documento. Un minore con la foto del passaporto del fratello passa. Usabile solo come prototipo a due tab.

---

## Stima viso: quando (non) usarla

Regolatori (UK, Francia, Germania) a volte accettano la *stima* come “age assurance” sui siti porn, con buffer. Non è la stessa cosa di “realmente 18+”.

Schema ibrido, se un giorno ti serve conversione e ti basta l’assurance:

1. Stima viso (soglia alta, es. stimato ≥ 23).
2. Se zona grigia → **step-up** a documento.

Finché il requisito è “realmente”, salta lo step 1. Un solo passaggio: documento.

---

## Cosa non fare

- Age Estimation Didit/Yoti come unico gate e chiamarlo “verificato”.
- Conservare passaporto, DoB, selfie “per ogni evenienza”.
- Campionare la videochat per rivedere l’età: stai registrando sesso.
- Prestare l’account: liveness + face match alla *verifica* riduce il prestito; in chat un minore può comunque sedersi dopo. Mitigazione: re-check periodico o a report, non a ogni Next.

---

## Collegamenti

- Piano prodotto: `docs/come-ricreare-un-sistema-tipo-flingster.md` (il gate è questo; sesso/tag restano sulla ricerca).
- Come fanno *davvero* Flingster/Chatroulette in live: `docs/come-i-siti-videochat-rilevano-minori.md` (spoiler: quasi non lo fanno).
- Liveness e quote free: `docs/ricerca-liveness-gratuito.md`.
- Classificatori sesso dal viso: irrilevanti per l’età. Vedi `docs/ricerca-app-rilevamento-sesso.md`.

## Sintesi

Per 18+ **reale**: documento + liveness + face match, boolean `over18`, stop.  
Strumento adopter-friendly: **Didit ID** (500/mese $0).  
Strumento adult-nativo: **Yoti OVER 18 con doc scan / Digital ID da documento, stima viso spenta.**  
Stima viso e checkbox non soddisfano “realmente”.
