# Registro carte e personaggi

JSON = id e regole. I file veri (webp/mp4) stanno su R2, vedi `docs/Fantasy_Empire_Asset_Dove.md`.

- `characters/{id}.json` → `r2://fe-media/characters/{id}/`
- `cards/{id}.json` → `r2://fe-media/cards/{id}/`

Carte eroe: campo `zone` di solito `Head` | `Chest` | `Arms` | `Legs`.
Le 6 carte starter di Selene (`slap`, `kiss`, `grab`, `tease`, `pin`, `whisper`) hanno `zone: null`: l’azione non mira a una parte del corpo. L’arte mostra solo l’azione (mano, bacio, catene…), non l’eroina.
Carte mostro / Bond / Origin: `zone` = `null`.
