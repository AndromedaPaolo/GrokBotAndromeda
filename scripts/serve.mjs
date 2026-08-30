import { createServer } from "node:http";
import { readFileSync, statSync, existsSync } from "node:fs";
import { extname, join, normalize, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "0.0.0.0";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function under(base, urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const rel = decoded.replace(/^\/+/, "");
  const abs = resolve(join(base, rel));
  const baseNorm = resolve(base) + "/";
  if (abs !== resolve(base) && !abs.startsWith(baseNorm)) return null;
  return abs;
}

function send(res, status, body, type) {
  res.writeHead(status, {
    "content-type": type || "text/plain; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(body);
}

function file(res, abs) {
  if (!abs || !existsSync(abs) || !statSync(abs).isFile()) {
    send(res, 404, "non trovato");
    return;
  }
  const type = TYPES[extname(abs)] || "application/octet-stream";
  send(res, 200, readFileSync(abs), type);
}

const server = createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  let path = url.pathname;
  if (path === "/") path = "/index.html";

  if (path.startsWith("/packs/")) {
    file(res, under(join(root, "packs"), path.slice("/packs".length)));
    return;
  }
  if (path.startsWith("/docs/")) {
    file(res, under(join(root, "docs"), path.slice("/docs".length)));
    return;
  }

  file(res, under(join(root, "sito"), path));
});

server.listen(port, host, () => {
  console.log(`laboratorio http://${host}:${port}/`);
});
