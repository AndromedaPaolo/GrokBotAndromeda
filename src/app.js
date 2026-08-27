import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getReply, isConfigured } from "./grok.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.static(PUBLIC_DIR));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", mode: isConfigured() ? "grok" : "local" });
  });

  app.post("/api/chat", async (req, res) => {
    const { message } = req.body ?? {};
    try {
      const { reply, source } = await getReply(message);
      res.json({ reply, source });
    } catch (err) {
      const status = err.statusCode ?? 500;
      res.status(status).json({ error: err.message });
    }
  });

  return app;
}
