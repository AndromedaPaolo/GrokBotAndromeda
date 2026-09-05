import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const hero = JSON.parse(
  readFileSync(path.join(root, "data/characters/hero_selene.json"), "utf8"),
);
assert.equal(hero.id, "hero_selene");
assert.equal(hero.name, "Selene");
assert.equal(hero.apparent_age, 27);

const starter = {
  slap: { sp: 1, text: "A sudden open-hand strike that snaps their focus." },
  kiss: { sp: 2, text: "A close kiss that steals their next breath." },
  grab: { sp: 2, text: "Seize them and hold their motion still." },
  tease: { sp: 1, text: "A lingering look that breaks their guard." },
  pin: { sp: 3, text: "Press in close and lock them down." },
  whisper: { sp: 2, text: "Soft words that make them miss a beat." },
};

for (const [id, expected] of Object.entries(starter)) {
  const card = JSON.parse(readFileSync(path.join(root, `data/cards/${id}.json`), "utf8"));
  assert.equal(card.id, id);
  assert.equal(card.sp, expected.sp);
  assert.equal(card.zone, null);
  assert.equal(card.character_archetype, "selene");
  assert.equal(card.text, expected.text);
  assert.match(card.notes, /No heroine/);
  assert.doesNotMatch(JSON.stringify(card), /Head|Chest|Arms|Legs/);
  const artPath = path.join(root, "public", card.public.art.replace(/^\//, ""));
  assert.ok(existsSync(artPath), `missing art ${artPath}`);
}
assert.ok(existsSync(path.join(root, "public/media/characters/hero_selene/body.webp")));

const monster = JSON.parse(
  readFileSync(path.join(root, "data/characters/monster_tentacle.json"), "utf8"),
);
assert.equal(monster.id, "monster_tentacle");
assert.equal(monster.kind, "monster");
assert.equal(monster.archetype, "tentacle");

const tentacleCards = {
  tentacle_lash: {
    kind: "monster_normal",
    sp: 3,
    text: "A whipping strike that knocks their stance wide.",
  },
  tentacle_coil: {
    kind: "monster_normal",
    sp: 2,
    text: "They wind tight and steal the next step.",
  },
  tentacle_slam: {
    kind: "monster_normal",
    sp: 3,
    text: "A heavy crash that rattles the stone.",
  },
  tentacle_grasp: {
    kind: "monster_normal",
    sp: 2,
    text: "They catch a limb and will not let go.",
  },
  tentacle_ink: {
    kind: "monster_normal",
    sp: 1,
    text: "A dark burst that blinds the next strike.",
  },
  tentacle_birth: {
    kind: "monster_origin",
    sp: 4,
    text: "A rift tears open and the tentacle takes form.",
  },
};

for (const [id, expected] of Object.entries(tentacleCards)) {
  const card = JSON.parse(readFileSync(path.join(root, `data/cards/${id}.json`), "utf8"));
  assert.equal(card.id, id);
  assert.equal(card.kind, expected.kind);
  assert.equal(card.sp, expected.sp);
  assert.equal(card.zone, null);
  assert.equal(card.character_archetype, "tentacle");
  assert.equal(card.text, expected.text);
  assert.doesNotMatch(JSON.stringify(card), /Head|Chest|Arms|Legs/);
  const artPath = path.join(root, "public", card.public.art.replace(/^\//, ""));
  assert.ok(existsSync(artPath), `missing art ${artPath}`);
}

const birth = JSON.parse(
  readFileSync(path.join(root, "data/cards/tentacle_birth.json"), "utf8"),
);
assert.equal(birth.name, "Birth");
assert.equal(birth.grows, true);
assert.ok(existsSync(path.join(root, "public/media/characters/monster_tentacle/body.webp")));

const landing = readFileSync(path.join(root, "app/page.js"), "utf8");
assert.match(landing, /Fantasy Empire/);
assert.doesNotMatch(landing, /9,99|14,99|Abbonati|Acquista e gioca/);

const { pathToFileURL } = await import("node:url");
const combat = await import(pathToFileURL(path.join(root, "lib/combat.js")).href);
const rng = combat.rngFromSeed(11);
const heroCards = Object.keys(starter).map((id) =>
  JSON.parse(readFileSync(path.join(root, `data/cards/${id}.json`), "utf8")),
);
const monsterCardIds = Object.keys(tentacleCards);
const monsterPool = monsterCardIds.map((id) =>
  JSON.parse(readFileSync(path.join(root, `data/cards/${id}.json`), "utf8")),
);
const drawn = combat.drawHand(monsterPool, 6, rng);
assert.equal(drawn.length, 6);
assert.equal(new Set(drawn.map((c) => c.id)).size, 6);

const fight0 = combat.createFight({
  hero,
  monster,
  heroCards,
  monsterCards: monsterPool,
  rng: combat.rngFromSeed(11),
  startingSp: 6,
});
assert.equal(fight0.units.find((u) => u.side === "enemy").hand.length, 6);
assert.equal(fight0.units.find((u) => u.side === "ally").hand.length, 6);
assert.equal(fight0.stage, null);

const fight1 = combat.continueFight(fight0, combat.rngFromSeed(11));
assert.ok(fight1.stage, "Continue must put an action on the stage");
assert.ok(fight1.stage.media?.src);
assert.equal(fight1.stage.hold, true);
const heldSrc = fight1.stage.media.src;
assert.equal(fight1.stage.media.src, heldSrc);

const fight2 = combat.continueFight(fight1, combat.rngFromSeed(11));
assert.ok(fight2.stage, "Continue must not clear the stage");
assert.ok(fight2.stage.media?.src);

const playUi = readFileSync(path.join(root, "app/play/CombatScreen.js"), "utf8");
assert.match(playUi, /data-testid="turn-bar"/);
assert.match(playUi, /data-testid="continue-btn"/);
assert.match(playUi, /data-testid="stage"/);
assert.match(playUi, /Auto combat/);
assert.doesNotMatch(playUi, /setTimeout|setInterval/);

console.log("catalog + landing checks ok");
