# Registro carte e personaggi

JSON = id e regole. I file veri (webp/mp4) stanno su R2, vedi `docs/Fantasy_Empire_Asset_Dove.md`.

- `characters/{id}.json` → `r2://fe-media/characters/{id}/`
- `cards/{id}.json` → `r2://fe-media/cards/{id}/`

Carte eroe: campo `zone` di solito `Head` | `Chest` | `Arms` | `Legs`.
Le 6 carte starter di Selene (`slap`, `kiss`, `grab`, `tease`, `pin`, `whisper`) hanno `zone: null`: l’azione non mira a una parte del corpo. L’arte mostra solo l’azione (mano, bacio, catene…), non l’eroina.
Carte mostro / Bond / Origin: `zone` = `null`.
Il primo mostro Tentacle ha 5 carte normali (`tentacle_lash`, `tentacle_coil`, `tentacle_slam`, `tentacle_grasp`, `tentacle_ink`) e 1 Origin: `tentacle_birth` (carta Birth, `kind: monster_origin`, cresce +1 SP). L’arte mostra l’azione o l’evocazione, non una ragazza.

Combattimento: una carta a turno (o passa). Gli AP non spesi restano e al round nuovo si somma `carte/6`. Una carta può avere `recoverAp` per restituire AP dopo il costo.
Categoria (`category`): `normal` (starter, effetto 20%), `fusion` (20% se entrambi i genitori sono Normal, altrimenti la % più alta dei genitori), `bond` / `special` / `origin` (80%), `unique` (100%, solo super boss delle invasioni). Special solo ai boss. Origin = nascita mostro. Bond = eventi speciali.
`bound` (salta il turno) solo su Bond (15%) e Unique (100%). Normal, Fusion di Normal, Special e Origin non saltano il turno.
Il costo (`sp`) è il danno. Status e `drainAp` tirano la % della categoria; non stackano. `blind` fa mancare la prossima azione, `dazed` agisce per ultimo, `wound` è +1 danno subito. Blind e Bound si consumano; Dazed e Wound restano fino a fine scontro.
