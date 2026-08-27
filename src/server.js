import { createApp } from "./app.js";
import { isConfigured } from "./grok.js";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = createApp();

app.listen(PORT, HOST, () => {
  const mode = isConfigured() ? "Grok (xAI API)" : "local fallback";
  console.log(`GrokBot Andromeda listening on http://${HOST}:${PORT} [mode: ${mode}]`);
});
