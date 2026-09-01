# Fantasy Empire — Dove stanno carte, personaggi, video

**Tipo documento:** decisione chiusa. Nessun bucket creato, nessun upload.
**Versione:** 1.0 — 1 settembre 2026
**Proposta:** `Fantasy_Empire_Proposta_Commerciale.md` v2.10
**Video (come si genera):** `Fantasy_Empire_Video_Storage_Generazione.md`
**In gioco (regole):** GDD + proposta §3

Due piani, non uno. **Disco** = file. **Partita** = dove li assegni nel gioco. Non si mischiano.

---

## 1. Disco: un bucket, tre prefissi

**Cloudflare R2, bucket privato `fe-media`.** Worker, URL firmati. Non GitHub, non `/public` Vercel (salvo trailer 0), non un link di grok.com / Kling.

```
r2://fe-media/
  characters/{character_id}/
    portrait.webp     # viso, lista party / UI
    body.webp         # figura, città e combat 2D
    ref.webp          # still di riferimento per I2V (stesso volto)
  cards/{card_id}/
    art.webp          # faccia carta, 3:4, max lato 1024, < 250 KB
    icon.webp         # opzionale, mano da 6
  videos/{video_key}/
    poster.jpg        # still / primo frame
    master.mp4        # overlay /play, 3–5 s, 16:9, 720p, muto
    loop.webp         # opzionale
  trailer/
    trailer.mp4       # landing. In Fase 0 può stare anche in /public/trailer.mp4
```

Git **non** tiene i binari (niente JPG/PNG/MP4 di catalogo). Git tiene solo il **registro**:

```
data/characters/{character_id}.json
data/cards/{card_id}.json
```

D1 è l'indice runtime (`characters`, `cards`, `cinematics`) più i **save** (chi ha cosa in partita). Il browser non vede il bucket.

Tu carichi i file dalla dashboard sulla riga giusta. Il path lo decide l'id. Non scegli una cartella a mano.

| Cosa | Path R2 | Registro git | Indice D1 |
|---|---|---|---|
| Personaggio | `characters/{id}/…` | `data/characters/{id}.json` | `characters` |
| Carta | `cards/{id}/art.webp` | `data/cards/{id}.json` | `cards` |
| Video azione | `videos/{video_key}/master.mp4` | nessuno (chiave in D1) | `cinematics` |
| Trailer | `trailer/trailer.mp4` | no | no |

`video_key` resta l'hash già definito (tipo azione + carta + archetipo + zona + mood + locale). **Senza** `user_id`.

Still per un video: se esiste `cards/{card_id}/art.webp` o `characters/{id}/ref.webp`, si **riusa**. Non si rigenera un volto nuovo.

---

## 2. Come li metti tu (Fase 0)

Stessa dashboard. Tre tipi di riga, stessi tasti di senso.

| Tipo dashboard | Cosa carichi | Dove finisce |
|---|---|---|
| `char_new` | portrait / body / ref | `characters/{id}/` poi Approva = in catalogo |
| `card_new` | art (icon opzionale) | `cards/{id}/` poi Approva |
| `video_req` → `video_new` | still se manca, poi MP4 | `videos/{video_key}/` come già deciso |

JSON: lo apri in git (`data/…`) **prima** o insieme al primo upload. Senza riga JSON l'id non esiste, l'upload è rifiutato.

Fase B: i **video** Visioni li scrive il Worker da solo sullo stesso path `videos/…`. Carte e personaggi restano upload tuoi (catalogo, non job a 0,25 $).

---

## 3. Partita: dove si *assegnano*

I file stanno su R2. In `/play` si **agganciano** così.

### Personaggi

| Dove | Cosa |
|---|---|
| Party (città / dungeon) | slot eroe o mostro. Max party come da GDD |
| Stanza di edificio | 1 unità assegnata, produce |
| Mondo / travel | party attivo |
| Santuario | stesso party, zona locked in Fase 0 |

Un personaggio = un `character_id`. Adulto 25+, inventato, niente volto reale. Mostri: tipo Tentacle / Beast / Slime / Construct / Insect / Aquatic.

### Carte

| Tipo carta | Dove si mette | Zona corpo |
|---|---|---|
| Eroe, Normal | sul **eroe**, pool dell'unità | **obbligatoria:** `Head` \| `Chest` \| `Arms` \| `Legs` |
| Bond | sul **party**, non su una zona | nessuna. Max 1 Bond giocata a turno di party. Upgrade solo in dungeon |
| Origin | sul **mostro evocato** | nessuna. Cresce +1 SP da sola |
| Mostro, Normal / forti | sul **mostro**, pool | nessuna (i mostri non hanno Defence a zone) |
| Edificio (produzione) | esce dalla **stanza**, poi va nel pool di un'unità | se è carta eroe, nasce già con la zona |

Defence eroe: `(n. carte di quella zona) ÷ 5`. Life eroe = somma SP delle carte assegnate. Mano: 6 a caso dal pool, ogni turno.

Non si mettono carte "sul file del personaggio". Si mettono nel **save**: `saves.loadout[unit_id] = [card_id, …]` più `zone` per le carte eroe.

### Video

Non si assegnano a un personaggio. Si **riproducono** sull'azione.

| Superficie | Quando |
|---|---|
| `/play` combat | dopo conferma carte / Continue mostro |
| `/play` città | stanza, produzione, evento, summon, founding |
| `/play` dungeon | cella, bond, boss, invasione, shrine |
| Landing | solo trailer (+ 3 clip vetrina se `ready`) |

Miss = 2D. Hit `ready` = `<video>` da `videos/{video_key}/master.mp4`.

---

## 4. Cosa non fare

- MP4 o foto catalogo su GitHub / `/public` (il trailer 0 è l'unica eccezione voluta).
- Bucket pubblico listabile.
- Un personaggio-foto di una persona reale.
- Carte eroe senza zona Head/Chest/Arms/Legs.
- Bond in edificio (mix). Origin sul pool eroe.
- Video in combattimento come attesa. Miss = 2D.
- Tre bucket. Uno: `fe-media`.
- Far scegliere a te la cartella al momento dell'upload. L'id *è* il path.

---

## 5. Fuori scope

Nessun file caricato qui. Gli JSON di esempio in `data/` sono lo **scheletro** degli id. I webp/mp4 arrivano dalla dashboard, dopo, se lo chiedi.
