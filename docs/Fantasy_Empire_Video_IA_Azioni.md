# Fantasy Empire — Video IA sulle azioni (sito)

**Documento separato dalla proposta commerciale.**  
**Riferimento:** `Fantasy_Empire_Proposta_Commerciale.md`  
**Versione:** 1.1 — 26 agosto 2026  
**Dove si vede subito:** nel **sito** (overlay `/play` + clip vetrina in landing).  
**Dopo il profitto:** le stesse clip in cache vengono caricate dal bot sui **canali del progetto** (`Fantasy_Empire_Grok_Bot_Ops.md`).

Nessun codice in questo file. Specifica di prodotto + cache + policy.

---

## 1. Hook

Ogni volta che un giocatore **pagante** compie un’azione di gioco, nel sito compare un **video breve generato da IA**.

- Tono: **SFW ma sexy** — suggestivo, fantasy, camera vicina, vestiti aderenti / armature “fan service”, niente nudo esplicito, niente sesso, niente minori.
- Se quella azione (stessa chiave, vedi §4) ha **già** un video, **non si rigenera**: si riproduce il file in cache.
- Prima generazione: loading nel player del sito, poi playback. Le volte dopo: playback immediato.

Obiettivo: differenziare il titolo e vendere l’acquisto. Il combat resolver resta sul server; il video è **presentazione**, non regola.

---

## 2. Dove compare nel sito

| Superficie | Comportamento |
|---|---|
| `/play` — combattimento | Dopo la conferma carte / ogni carta mostro (Continue): overlay 16:9 sopra lo stage, skippabile dopo 0,4 s |
| `/play` — città | Assegnazione stanza, fine produzione carta, evento (sparring, patrol, plaza), evocazione, founding |
| `/play` — dungeon / mondo | Entrata cella, bonding event, boss ogni 10, invasione, shrine |
| Landing pubblica | Solo **trailer** + eventuali 3 clip precache “vetrina”. Nessun video-azione live per chi non ha pagato |

Controlli player (sito): play/pausa, skip, “non mostrare per questa sessione”, mute default on con click-to-unmute (autoplay policy browser).

Chi non ha `entitlements.active` **non** chiama l’API video-azioni.

---

## 3. Catalogo azioni → video

Non si genera un filmato per *ogni pixel*. Si mappa l’intent di gioco su un **tipo azione**.

Esempi:

| Tipo azione | Esempio chiave visiva |
|---|---|
| `hero_play_card` | Eroe + nome carta + zone colpite |
| `hero_auto_turn` | Montaggio rapido delle carte auto |
| `monster_play_card` | Mostro + carta (Tentacle Lash, Bite, …) |
| `monster_special` | Special Attack multi-mostro |
| `bond_play` | Party presente + Bond Card |
| `ko_capture` | Eroe a 0 Life, tone drammatico non pornografico |
| `burst_essence` | Burst piena, Essence |
| `building_assign` | Eroe/mostro in stanza |
| `card_produced` | Carta che esce dall’edificio |
| `dungeon_cell` | Tipo cella (mostro / tesoro / shop / bond / mixed) |
| `world_wild` | Encounter esterno |
| `city_event` | sparring / patrol / plaza |
| `summon` | Origin Card + tipo mostro |
| `invasion` / `shrine` | Eventi città grandi |

Animazione di attacco del GDD e video IA possono convivere: prima flash UI, poi overlay video (o in parallelo se skip).

---

## 4. Cache — “se già generato, solo play”

Chiave deterministica:

```
video_key = hash(
  action_type
  + card_id|event_id
  + unit_archetype      // non lo user_id
  + target_zones
  + mood                // "sfw_sexy_v1"
  + locale              // it|en
)
```

**Non** entrare `user_id` nella chiave: lo stesso “Quick Slash + eroe guerriera + Chest” è un asset condiviso. Meno costi, più hit cache.

Flusso sito:

```
azione confermata (server ok)
  → GET /api/cinematics/:video_key
      hit  → URL firmato R2/Stream → <video> nel DOM
      miss → 202 + job_id → polling
           → worker genera clip
           → salva R2 + riga D1 `cinematics`
           → stesso player
```

TTL: permanente finché non cambia `mood` o il prompt version. Rigenera solo se:

- patch art direction (`sfw_sexy_v2`)
- asset flaggato (policy)
- clip corrotta

---

## 5. Generazione (prima volta)

Clip: **3–6 secondi**, 16:9 o 9:16 (sito usa 16:9 in overlay; 9:16 eventualmente per social *dopo* il profitto, file bot).

Prompt di sistema (vincoli, non sceneggiatura esplicita):

- Fantasy 2D / 2.5D, stesso tone adventure del GDD.
- Adulti apparenti 25+.
- Sexy SFW: pose, respiro, scollo, corazza, controluce. Niente genitali, niente atti sessuali, niente bondage esplicito anche se esiste la carta “Bind” — si mostra un laccio / aura, non un filmato fetish.
- Mostri (slime, tentacle-type, beast): minaccia / contatto *suggestivo* da creature fantasy, non pornografia.
- Nessun minore, nessuno “young”, no school uniform.

Provider (scelta in implementazione, non in lancio gratis illimitato):

- coda su Worker + provider video IA esterno, **oppure**
- libreria precotta (centinaia di clip) e generazione live solo per chiavi nuove rare.

**Costo:** la generazione video IA **non** sta nel free tier. In Fase A si consiglia:

1. **Precache** delle ~80–150 chiavi più frequenti (carte GDD, 4–6 archetipi, eventi città).
2. Live generate **solo** per chiavi nuove, con tetto giornaliero.
3. Se il tetto è pieno: fallback animazione 2D del sito, niente attesa infinita.

Senza questo tetto una serata di dungeon brucia il margine del prezzo 14,99 €.

---

## 6. Dati (D1 + object storage)

D1 tabella `cinematics`:

- `video_key` (unique)
- `action_type`, `prompt_version`
- `storage_url`, `poster_url`
- `duration_ms`, `status` (`ready` / `failed` / `banned`)
- `created_at`

File: Cloudflare R2 o Stream. Il browser del sito riceve URL firmati a scadenza breve, non un bucket pubblico listabile.

GitHub: **zero** mp4 di azione nel repo (peso + moderazione).

---

## 7. UX nel sito

- Overlay centrato, scuro sotto, tasto Skip.
- Se `prefers-reduced-motion` o setting “meno video”: solo poster + SFX.
- Primo miss: skeleton 2 s + testo “Prima visione di questa azione”.
- Fail generate: silenzioso, si gioca lo stesso (il video non è gameplay).
- Volume persistito in `localStorage` del sito.

Landing: player trailer (§3.1 proposta). Opzionale reel di 3 clip precache sotto il fold, watermark “in-game”.

---

## 8. Policy e store

Allineato al GDD: *No explicit sexual content.*

- Sexy ≠ NSFW esplicito.
- Moderazione: coda `banned` se un clip sfora; il bot ops (file separato, solo post-profitto) può flaggare, non pubblicare pornografia.
- Personaggi: adulti. Vietato qualsiasi look minorenne.
- Carta “Tentacle Embrace” / “Full Bind”: direzione “magia / costrizione fantasy”, non atto sessuale.

Se un provider IA restituisce output esplicito: scarto automatico + retry con prompt più stretto, poi fallback 2D.

---

## 9. Relazione con paywall e infra

- Solo utenti `entitlements.active`.
- Fase A: precache + tetto generate, storage R2 free finché entra.
- Fase C (profitto): alzare tetto, eventuale Stream. Il bot **riusa la cache del sito** e carica le clip sui canali del progetto (X, Instagram, TikTok, YouTube Shorts, Discord, newsletter). Non si rigenera un video nuovo per ogni social. Il video social non sblocca il gioco.

Il resolver di danno/SP **ignora** il video. Cheat sul client non sblocca clip nuove senza l’azione validata dal Worker.

---

## 10. Fuori scope di questo file

Nessun mp4 allegato, nessun job IA lanciato, nessun bucket creato.  
Implementazione: quando si costruisce il sito, player in `/play` + tabella `cinematics` + coda miss.
