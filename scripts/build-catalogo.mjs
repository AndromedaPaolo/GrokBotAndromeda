import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packsRoot = join(root, "packs");
const outDir = join(root, "sito");
const outFile = join(outDir, "catalogo.json");

function packIds() {
  return readdirSync(packsRoot).filter((name) => {
    const p = join(packsRoot, name);
    return statSync(p).isDirectory() && existsSync(join(p, "pack.json"));
  });
}

const packs = packIds().map((id) => {
  const pack = JSON.parse(readFileSync(join(packsRoot, id, "pack.json"), "utf8"));
  const total = pack.compiti.length;
  const dimostrati = pack.compiti.filter((c) => c.dimostrato).length;
  const nScenari = readdirSync(join(packsRoot, id, "eval", "scenari")).filter((f) =>
    f.endsWith(".md"),
  ).length;
  return {
    id: pack.id,
    nome: pack.nome,
    versione: pack.versione,
    stato: pack.stato,
    istat: pack.istat,
    classe_legale: pack.classe_legale,
    prezzo_previsto_eur: pack.prezzo_previsto_eur,
    sommario: pack.sommario,
    compiti_totali: total,
    compiti_dimostrati: dimostrati,
    punteggio: dimostrati === 0 ? null : Math.round((dimostrati / total) * 100),
    scenari: nScenari,
    vietato: pack.vietato,
    compiti: pack.compiti,
  };
});

packs.sort((a, b) => a.nome.localeCompare(b.nome, "it"));

const catalogo = {
  prodotto: "Andromeda Packs",
  generato: new Date().toISOString(),
  fase: "laboratorio",
  vendita: false,
  packs,
};

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, `${JSON.stringify(catalogo, null, 2)}\n`);
console.log(`catalogo ${packs.length} pack → sito/catalogo.json`);
