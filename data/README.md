# Registro carte e personaggi

JSON = id e regole. I file veri (webp/mp4) stanno su R2, vedi `docs/Fantasy_Empire_Asset_Dove.md`.

- `characters/{id}.json` → `r2://fe-media/characters/{id}/`
- `cards/{id}.json` → `r2://fe-media/cards/{id}/`

Carte eroe: campo `zone` obbligatorio (`Head` | `Chest` | `Arms` | `Legs`).
Carte mostro / Bond / Origin: `zone` = `null`.
