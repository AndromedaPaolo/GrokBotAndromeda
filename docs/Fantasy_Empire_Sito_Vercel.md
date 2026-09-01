# Fantasy Empire — sito Vercel

**Hostname:** `https://fantasyempier.vercel.app`  
Il progetto Vercel si chiama `fantasyempier` (grafia chiesta). Il prodotto in UI è **Fantasy Empire**.

Codice: cartella `web/` (Next.js 15, App Router, italiano, 18+).

## Cosa c’è ora (Fase 0, slice)

| Percorso | Chi lo vede | Cosa fa |
|---|---|---|
| `/` | pubblico | Landing proposta §4.2: titolo, 18+, trailer placeholder, tre pill, banda beta, CTA, FAQ, footer legale. Niente prezzi. |
| `/play` | dopo il gate | Scheletro città/carte. Miss clip = 2D. Niente checkout. |
| `/privacy` `/cookie` `/termini` `/contatti` | pubblico | Bozze pre-P.IVA. |
| `/ops` | solo password | Upload personaggi / carte / video negli slot R2. **Non è in landing.** |

`GEN_API` resta spento. Stripe resta spento.

## Come nasce `fantasyempier.vercel.app`

Vercel crea `*.vercel.app` dal **nome progetto**. Prima di importare il repo va installata l’app GitHub **Vercel** sull’account che **possiede** il repository (`AndromedaPaolo`). Un collaboratore o un login Vercel fatto solo con Google/email non basta.

Non usare `vercel.com/new/import?s=https://github.com/...` al primo giro: quello è l’import “third-party” e risponde *To link a GitHub repository, you need to install the GitHub integration first.*

### 1. Installa l’integrazione GitHub

1. Entra su Vercel con **Continue with GitHub**, account **AndromedaPaolo**.
2. Apri l’installazione app: https://github.com/apps/vercel/installations/new
3. Scegli l’account personale **AndromedaPaolo** (non un’org a caso).
4. Repository access: *Only select repositories* → `GrokBotAndromeda`, oppure *All repositories*.
5. **Install**.

Se l’app c’è già ma il repo non compare: GitHub → Settings → Applications → Installed GitHub Apps → **Vercel** → Configure → aggiungi `GrokBotAndromeda`. Stessa schermata: https://github.com/settings/installations

### 2. Crea il progetto dalla lista, non da URL

1. https://vercel.com/new
2. Nel dropdown Git, account **AndromedaPaolo**.
3. Cerca `GrokBotAndromeda` → **Import**.
4. Project Name: `fantasyempier` → `https://fantasyempier.vercel.app`
5. Root Directory: **Edit** → `web`
6. Framework Preset: Next.js
7. Production Branch: `cursor/dashboard-clip-manuale-b7a8` (su `main` non c’è ancora `web/`)
8. Env: `OPS_PASSWORD` (obbligatoria per `/ops`). R2 dopo, quando esiste `fe-media`.
9. **Deploy**

### Alternativa senza GitHub App

Token da https://vercel.com/account/tokens, poi dalla cartella `web/`:

```bash
npx vercel --name fantasyempier --yes --prod --token "$VERCEL_TOKEN"
```

## Storage

Catalogo JSON: `data/` in git. Binari: R2 `fe-media` (`characters/`, `cards/`, `videos/`). Su Hobby senza R2 `/ops` scrive in locale e **non persiste** tra le lambda.
