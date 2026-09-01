import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

function catalogRoot() {
  return path.join(process.cwd(), "data");
}

async function loadJsonDir(dir) {
  const abs = path.join(catalogRoot(), dir);
  let names = [];
  try {
    names = await readdir(abs);
  } catch {
    return [];
  }
  const out = [];
  for (const name of names) {
    if (!name.endsWith(".json")) continue;
    const raw = await readFile(path.join(abs, name), "utf8");
    const data = JSON.parse(raw);
    out.push({ id: name.replace(/\.json$/, ""), ...data });
  }
  return out.sort((a, b) => a.id.localeCompare(b.id));
}

export async function getCatalog() {
  const [characters, cards] = await Promise.all([
    loadJsonDir("characters"),
    loadJsonDir("cards"),
  ]);
  return { characters, cards };
}

export async function hasCatalogId(kind, id) {
  const catalog = await getCatalog();
  if (kind === "character") return catalog.characters.some((c) => c.id === id);
  if (kind === "card") return catalog.cards.some((c) => c.id === id);
  return true;
}
