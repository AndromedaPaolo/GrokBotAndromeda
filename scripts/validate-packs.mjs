import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packsRoot = join(root, "packs");

const STATI = new Set(["laboratorio", "prove", "in-vendita", "ritirato"]);
const CLASSI = new Set([
  "ruolo-non-ordinistico",
  "assistente-di-studio",
  "ordinistico-vietato-vendita",
]);

const REQUIRED_FILES = [
  "pack.json",
  "ISTRUZIONI.md",
  "SKILL.md",
  "GROK_BOT.md",
  "memory/SEED.md",
  "memory/GLOSSARIO.md",
  "memory/VINCOLI.md",
  "eval/rubric.md",
];

const errors = [];

function fail(path, msg) {
  errors.push(`${path}: ${msg}`);
}

function isSemver(v) {
  return /^\d+\.\d+\.\d+$/.test(v);
}

function isKebab(id) {
  return /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(id);
}

function loadPackDirs() {
  if (!existsSync(packsRoot)) {
    fail("packs/", "cartella assente");
    return [];
  }
  return readdirSync(packsRoot).filter((name) => {
    const p = join(packsRoot, name);
    return statSync(p).isDirectory() && existsSync(join(p, "pack.json"));
  });
}

function scenariCount(packDir) {
  const dir = join(packDir, "eval", "scenari");
  if (!existsSync(dir)) return 0;
  return readdirSync(dir).filter((f) => f.endsWith(".md")).length;
}

function validatePack(id) {
  const dir = join(packsRoot, id);
  const rel = `packs/${id}`;

  if (!isKebab(id)) fail(rel, "id cartella non kebab-case");

  for (const file of REQUIRED_FILES) {
    if (!existsSync(join(dir, file))) fail(`${rel}/${file}`, "manca");
  }

  let pack;
  try {
    pack = JSON.parse(readFileSync(join(dir, "pack.json"), "utf8"));
  } catch (err) {
    fail(`${rel}/pack.json`, `JSON illeggibile: ${err.message}`);
    return;
  }

  if (pack.id !== id) fail(`${rel}/pack.json`, `id "${pack.id}" ≠ cartella "${id}"`);
  if (typeof pack.nome !== "string" || pack.nome.length < 3) fail(`${rel}/pack.json`, "nome");
  if (!isSemver(pack.versione)) fail(`${rel}/pack.json`, "versione non semver");
  if (!STATI.has(pack.stato)) fail(`${rel}/pack.json`, `stato ${pack.stato}`);
  if (!CLASSI.has(pack.classe_legale)) fail(`${rel}/pack.json`, "classe_legale");
  if (typeof pack.prezzo_previsto_eur !== "number") fail(`${rel}/pack.json`, "prezzo_previsto_eur");
  if (!Array.isArray(pack.vietato) || pack.vietato.length < 1) fail(`${rel}/pack.json`, "vietato");
  if (!Array.isArray(pack.compiti) || pack.compiti.length < 3) fail(`${rel}/pack.json`, "compiti < 3");

  if (pack.classe_legale === "ordinistico-vietato-vendita" && pack.stato === "in-vendita") {
    fail(`${rel}/pack.json`, "ordinistico-vietato-vendita non può essere in-vendita");
  }

  if (pack.stato === "in-vendita") {
    const anyDemo = pack.compiti.some((c) => c && c.dimostrato === true);
    if (!anyDemo) fail(`${rel}/pack.json`, "in-vendita senza compiti dimostrati");
  }

  const seen = new Set();
  for (const [i, c] of pack.compiti.entries()) {
    const where = `${rel}/pack.json compiti[${i}]`;
    if (!c || typeof c !== "object") {
      fail(where, "non oggetto");
      continue;
    }
    if (!isKebab(c.id || "")) fail(where, `id "${c.id}"`);
    if (seen.has(c.id)) fail(where, `id duplicato ${c.id}`);
    seen.add(c.id);
    if (typeof c.nome !== "string") fail(where, "nome");
    if (typeof c.dimostrato !== "boolean") fail(where, "dimostrato");
    if (typeof c.firma_umana !== "boolean") fail(where, "firma_umana");
  }

  const nScenari = scenariCount(dir);
  if (nScenari < 3) fail(`${rel}/eval/scenari`, `servono ≥ 3 .md, ne ho ${nScenari}`);

  const istruzioni = existsSync(join(dir, "ISTRUZIONI.md"))
    ? readFileSync(join(dir, "ISTRUZIONI.md"), "utf8").toLowerCase()
    : "";
  const vietate = [
    "sostituisce il commercialista",
    "sostituisce l'avvocato",
    "sostituisce il consulente del lavoro",
  ];
  for (const frase of vietate) {
    if (istruzioni.includes(frase)) fail(`${rel}/ISTRUZIONI.md`, `frase vietata: ${frase}`);
  }
}

const ids = loadPackDirs();
if (ids.length < 1) fail("packs/", "nessun pack");
for (const id of ids) validatePack(id);

if (errors.length) {
  console.error(`FAIL ${errors.length}`);
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}

console.log(`OK ${ids.length} pack: ${ids.join(", ")}`);
