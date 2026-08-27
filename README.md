# GrokBot Andromeda

A minimal Grok-powered chatbot web app. It talks to the [xAI Grok API](https://docs.x.ai/)
when an API key is configured, and falls back to a self-contained local responder so it
always runs end-to-end without any external secret.

## Tech stack

- Node.js (>= 20) with the built-in `fetch` and test runner
- [Express](https://expressjs.com/) for the HTTP server and static hosting
- Vanilla HTML/CSS/JS frontend (no build step)

## Getting started

```bash
npm install
npm start
```

Then open http://localhost:3000 and start chatting.

By default the app runs in **local mode** (deterministic offline replies). To enable real
Grok responses, provide an xAI API key:

```bash
cp .env.example .env   # then set XAI_API_KEY, or just export it
export XAI_API_KEY=xai-...
npm start
```

The header badge shows whether the app is in `Grok` or `local` mode.

## Configuration

| Variable      | Default                                    | Purpose                              |
| ------------- | ------------------------------------------ | ------------------------------------ |
| `XAI_API_KEY` | _(unset)_                                  | Enables real Grok responses          |
| `XAI_MODEL`   | `grok-2-latest`                            | Model used for xAI requests          |
| `XAI_API_URL` | `https://api.x.ai/v1/chat/completions`     | xAI chat completions endpoint        |
| `PORT`        | `3000`                                      | HTTP port                            |
| `HOST`        | `0.0.0.0`                                   | Bind address                         |

## API

- `GET /api/health` → `{ "status": "ok", "mode": "grok" | "local" }`
- `POST /api/chat` with `{ "message": "..." }` → `{ "reply": "...", "source": "grok" | "local" }`

## Scripts

```bash
npm start   # run the server
npm run dev # run with --watch for auto-reload
npm test    # run the automated test suite
```

## Project layout

```
src/
  app.js      # Express app factory (routes + static hosting)
  server.js   # entry point that starts the server
  grok.js     # chat logic: xAI Grok call with local fallback
public/       # chat UI (index.html, style.css, app.js)
test/         # node:test suites for the API and chat logic
```
