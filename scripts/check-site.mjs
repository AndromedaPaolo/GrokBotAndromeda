import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const hero = JSON.parse(
  readFileSync(path.join(root, "data/characters/hero_warrior_f.json"), "utf8"),
);
const card = JSON.parse(readFileSync(path.join(root, "data/cards/quick_slash.json"), "utf8"));

assert.equal(hero.id, "hero_warrior_f");
assert.equal(card.zone, "Chest");
assert.ok(existsSync(path.join(root, "app/page.js")));
assert.ok(existsSync(path.join(root, "app/ops/page.js")));
assert.ok(existsSync(path.join(root, "app/play/page.js")));
assert.ok(existsSync(path.join(root, "package.json")));

const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
assert.ok(pkg.dependencies.next, "package.json in root must list next for Vercel");

const landing = readFileSync(path.join(root, "app/page.js"), "utf8");
assert.match(landing, /Fantasy Empire/);
assert.doesNotMatch(landing, /9,99|14,99|Abbonati|Acquista e gioca/);
assert.match(landing, /Crea account e gioca/);

console.log("catalog + landing checks ok");
