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

1. [Importa il repo](https://vercel.com/new/import?s=https://github.com/AndromedaPaolo/GrokBotAndromeda)
2. **Project Name:** `fantasyempier` → `https://fantasyempier.vercel.app`
3. **Root Directory:** `web`
4. Framework Preset: Next.js
5. Env:
   - `OPS_PASSWORD` (obbligatoria per `/ops`)
   - `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET=fe-media` (quando il bucket esiste)
6. Production branch: `Fantasy-Empire` (o il branch del PR finché non mergi)

CLI, se hai un token:

```bash
cd web
npx vercel --name fantasyempier --yes --prod
```
