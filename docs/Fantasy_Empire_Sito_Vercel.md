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

Vercel crea `*.vercel.app` dal **nome progetto**. Senza account Vercel collegato a questo agente il dominio non può essere emesso da qui.

Import: https://vercel.com/new/import?s=https://github.com/AndromedaPaolo/GrokBotAndromeda

- Project Name: `fantasyempier`
- Root Directory: `web`
- Env: `OPS_PASSWORD`, poi le chiavi R2 quando il bucket `fe-media` esiste

## Storage

Catalogo JSON: `data/` in git. Binari: R2 `fe-media` (`characters/`, `cards/`, `videos/`). Su Hobby senza R2 `/ops` scrive in locale e **non persiste** tra le lambda.
