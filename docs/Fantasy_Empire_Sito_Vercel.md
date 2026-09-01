# Fantasy Empire — sito Vercel

**Hostname:** `https://fantasyempier.vercel.app`  
Il progetto Vercel si chiama `fantasyempier`. In pagina il titolo resta **Fantasy Empire**.

L’app Next.js sta **nella root del repo** (`package.json` con `"next"` accanto a `docs/` e `data/`). Non c’è più una cartella `web/`.

## Cosa c’è ora (Fase 0, slice)

| Percorso | Chi lo vede | Cosa fa |
|---|---|---|
| `/` | pubblico | Landing proposta §4.2: titolo, 18+, trailer placeholder, tre pill, banda beta, CTA, FAQ, footer legale. Niente prezzi. |
| `/play` | dopo il gate | Scheletro città/carte. Miss clip = 2D. Niente checkout. |
| `/privacy` `/cookie` `/termini` `/contatti` | pubblico | Bozze pre-P.IVA. |
| `/ops` | solo password | Upload personaggi / carte / video negli slot R2. **Non è in landing.** |

`GEN_API` resta spento. Stripe resta spento.

## Errore: *No Next.js version detected*

Vercel legge il `package.json` della **Root Directory** sul **branch di produzione**.

Due cause, spesso insieme:

1. **Branch sbagliato.** `main` e `Fantasy-Empire` sono ancora il commit vuoto (solo README). Lì non esiste `next`. Imposta Production Branch: `cursor/dashboard-clip-manuale-b7a8`.
2. **Root Directory sbagliata.** Deve restare **vuota** (`.`). Se in un tentativo precedente hai messo `web`, toglila: Settings → General → Root Directory → Edit → cancella `web` → Save → Redeploy.

## Come nasce `fantasyempier.vercel.app`

### 1. App GitHub Vercel

Account **AndromedaPaolo**: https://github.com/apps/vercel/installations/new  
Repo `GrokBotAndromeda`. Se già installata: https://github.com/settings/installations

Entra su Vercel con **Continue with GitHub**, stesso account.

### 2. Importa dalla lista

1. https://vercel.com/new
2. Cerca `GrokBotAndromeda` → **Import**
3. Project Name: `fantasyempier`
4. **Root Directory: non toccare** (vuota). Framework: Next.js (auto).
5. **Production Branch:** `cursor/dashboard-clip-manuale-b7a8`
6. Env: `OPS_PASSWORD` (per `/ops`)
7. **Deploy**

Se il progetto esiste già: Settings → General (Root Directory vuota) e Settings → Git (Production Branch come sopra) → Deployments → Redeploy, oppure un nuovo deploy dal branch giusto.

## Storage

Catalogo JSON: `data/` in git. Binari: R2 `fe-media`. Su Hobby senza R2 `/ops` non persiste tra le lambda.
