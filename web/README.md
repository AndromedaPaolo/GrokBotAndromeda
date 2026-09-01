# Fantasy Empire (sito)

App Next.js 15. Hostname voluto: **https://fantasyempier.vercel.app**
(il nome progetto Vercel è `fantasyempier`; in pagina il titolo resta **Fantasy Empire**).

## Locale

```bash
cd web
cp .env.example .env.local
# OPS_PASSWORD=qualcosa
npm run dev
```

- Landing: http://localhost:3000
- Gioco (scheletro): http://localhost:3000/play
- Dashboard upload (non linkata dalla landing): http://localhost:3000/ops

Senza R2 gli upload restano in `web/.data/fe-media/`.

## Deploy Vercel (Hobby)

Prima installa l’app GitHub **Vercel** (senza quella, l’import da URL fallisce):

https://github.com/apps/vercel/installations/new

Account **AndromedaPaolo**, repo `GrokBotAndromeda`. Poi:

1. https://vercel.com/new — cerca `GrokBotAndromeda` nella lista, **Import**
2. **Project Name:** `fantasyempier` → `https://fantasyempier.vercel.app`
3. **Root Directory:** `web`
4. Framework Preset: Next.js
5. Production branch: `cursor/dashboard-clip-manuale-b7a8` finché non mergi
6. Env:
   - `OPS_PASSWORD` (obbligatoria per `/ops`)
   - `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET=fe-media` (quando il bucket esiste)

Dettaglio e errore *GitHub integration first*: `docs/Fantasy_Empire_Sito_Vercel.md`.

CLI, se hai un token:

```bash
cd web
npx vercel --name fantasyempier --yes --prod
```
