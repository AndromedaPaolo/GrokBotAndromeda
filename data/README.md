# Card and character registry

JSON = ids and rules. The actual files (webp/mp4) live on R2; see `docs/Fantasy_Empire_Asset_Dove.md`.

- `characters/{id}.json` → `r2://fe-media/characters/{id}/`
- `cards/{id}.json` → `r2://fe-media/cards/{id}/`

Hero cards: `zone` is usually `Head` | `Chest` | `Arms` | `Legs`.
Selene’s 6 starter cards (`slap`, `kiss`, `grab`, `tease`, `pin`, `whisper`) have `zone: null`: the action does not target a body part. Art shows the action only (hand, kiss, chains…), not the heroine.
Monster / Bond / Origin cards: `zone` = `null`.
The first Tentacle monster has 5 Normal cards (`tentacle_lash`, `tentacle_coil`, `tentacle_slam`, `tentacle_grasp`, `tentacle_ink`) and 1 Origin: `tentacle_birth` (Birth card, `kind: monster_origin`, grows +1 SP). Art shows the action or the summon, not a girl.

Combat: one card per turn (or pass). Unspent AP stays, and a new round adds `cards/6`. A card may have `recoverAp` to give AP back after the cost.
Category (`category`): `normal` (starter, 20% effect), `fusion` (20% if both parents are Normal, otherwise the higher parent %), `bond` / `special` / `origin` (80%), `unique` (100%, invasion super-bosses only). Special is bosses only. Origin = monster birth. Bond = special events.
The 12 catalog cards do not use Bound. The text states the effect, what it does, and the %.
Cost (`sp`) is the damage. Statuses and `drainAp` roll the category %; they do not stack. `blind` makes the next action miss, `dazed` acts last, `wound` is +1 damage taken, `drainAp` removes AP. Blind is consumed; Dazed and Wound last until the fight ends.
