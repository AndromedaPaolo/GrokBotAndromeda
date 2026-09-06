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
  slap: {
    sp: 1,
    flavor: "A sudden open-hand strike that snaps their focus",
    status: "dazed",
    category: "normal",
  },
  kiss: {
    sp: 2,
    flavor: "A close kiss that steals their next breath",
    drainAp: 1,
    category: "normal",
  },
  grab: {
    sp: 2,
    flavor: "Seize them and hold their motion still",
    status: "dazed",
    category: "normal",
  },
  tease: {
    sp: 1,
    flavor: "A lingering look that breaks their guard",
    status: "wound",
    category: "normal",
  },
  pin: {
    sp: 3,
    flavor: "Press in close and lock them down",
    status: "wound",
    category: "normal",
  },
  whisper: {
    sp: 2,
    flavor: "Soft words that make them miss a beat",
    status: "blind",
    category: "normal",
  },
};

for (const [id, expected] of Object.entries(starter)) {
  const card = JSON.parse(readFileSync(path.join(root, `data/cards/${id}.json`), "utf8"));
  assert.equal(card.id, id);
  assert.equal(card.sp, expected.sp);
  assert.equal(card.zone, null);
  assert.equal(card.character_archetype, "selene");
  assert.equal(card.flavor, expected.flavor);
  assert.equal(card.status ?? null, expected.status ?? null);
  assert.equal(card.drainAp ?? 0, expected.drainAp ?? 0);
  assert.equal(card.category, expected.category ?? "normal");
  assert.equal(card.deal, undefined);
  assert.match(card.notes, /No heroine/);
  assert.doesNotMatch(JSON.stringify(card), /Head|Chest|Arms|Legs/);
  assert.doesNotMatch(JSON.stringify(card), /\bbound\b/i);
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
    flavor: "A whipping strike that knocks their stance wide",
    status: "wound",
    category: "normal",
  },
  tentacle_coil: {
    kind: "monster_normal",
    sp: 2,
    flavor: "They wind tight and steal the next step",
    drainAp: 1,
    category: "normal",
  },
  tentacle_slam: {
    kind: "monster_normal",
    sp: 3,
    flavor: "A heavy crash that rattles the stone",
    status: "dazed",
    category: "normal",
  },
  tentacle_grasp: {
    kind: "monster_normal",
    sp: 2,
    flavor: "They catch a limb and will not let go",
    drainAp: 1,
    category: "normal",
  },
  tentacle_ink: {
    kind: "monster_normal",
    sp: 1,
    flavor: "A dark burst that blinds the next strike",
    status: "blind",
    category: "normal",
  },
  tentacle_birth: {
    kind: "monster_origin",
    sp: 4,
    flavor: "A rift tears open and the tentacle takes form",
    status: "dazed",
    category: "origin",
  },
};

for (const [id, expected] of Object.entries(tentacleCards)) {
  const card = JSON.parse(readFileSync(path.join(root, `data/cards/${id}.json`), "utf8"));
  assert.equal(card.id, id);
  assert.equal(card.kind, expected.kind);
  assert.equal(card.sp, expected.sp);
  assert.equal(card.zone, null);
  assert.equal(card.character_archetype, "tentacle");
  assert.equal(card.flavor, expected.flavor);
  assert.equal(card.status ?? null, expected.status ?? null);
  assert.equal(card.drainAp ?? 0, expected.drainAp ?? 0);
  assert.equal(card.category, expected.category ?? "normal");
  assert.equal(card.deal, undefined);
  assert.doesNotMatch(JSON.stringify(card), /Head|Chest|Arms|Legs/);
  assert.doesNotMatch(JSON.stringify(card), /\bbound\b/i);
  const artPath = path.join(root, "public", card.public.art.replace(/^\//, ""));
  assert.ok(existsSync(artPath), `missing art ${artPath}`);
}

const birth = JSON.parse(
  readFileSync(path.join(root, "data/cards/tentacle_birth.json"), "utf8"),
);
assert.equal(birth.name, "Birth");
assert.equal(birth.grows, true);
assert.equal(birth.status, "dazed");
assert.equal(birth.category, "origin");
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

const allCards = [...heroCards, ...monsterPool];
assert.equal(combat.cardCategory(heroCards[0]), "normal");
assert.equal(combat.cardCategory({ kind: "monster_origin" }), "origin");
assert.equal(combat.effectChance({ category: "normal" }), 0.2);
assert.equal(combat.effectChance({ category: "fusion", fusionOf: ["slap", "kiss"] }, allCards), 0.2);
assert.equal(combat.effectChance({ category: "fusion", fusionOf: ["tentacle_birth", "slap"] }, allCards), 0.8);
assert.equal(
  combat.effectChance({ category: "fusion", fusionOf: [{ category: "unique" }, { category: "normal" }] }),
  1,
);
assert.equal(combat.effectChance({ category: "bond" }), 0.8);
assert.equal(combat.effectChance({ category: "special" }), 0.8);
assert.equal(combat.effectChance({ category: "origin" }), 0.8);
assert.equal(combat.effectChance({ category: "unique" }), 1);
assert.equal(combat.effectChanceLabel(0.2), "20%");
assert.equal(combat.skipChance({ category: "normal", status: "bound" }), 0);
assert.equal(combat.skipChance({ category: "origin", status: "bound" }), 0);
assert.equal(combat.skipChance({ category: "special", status: "bound" }), 0);
assert.equal(combat.skipChance({ category: "bond", status: "bound" }), 0.15);
assert.equal(combat.skipChance({ category: "unique", status: "bound" }), 1);
assert.equal(combat.skipChance({ category: "fusion", fusionOf: ["slap", "kiss"] }, allCards), 0);
assert.equal(
  combat.skipChance({ category: "fusion", fusionOf: [{ category: "unique" }, { category: "normal" }] }),
  1,
);
assert.equal(
  combat.skipChance({ category: "fusion", fusionOf: [{ category: "bond" }, { category: "normal" }] }),
  0.15,
);
assert.equal(combat.landingStatus({ category: "normal", status: "bound" }), null);
assert.equal(combat.landingStatus({ category: "unique", status: "bound" }), "bound");
assert.equal(
  combat.cardAppliesLine({ status: "dazed", category: "normal", sp: 1 }),
  "Applies Dazed (20%): they act last in the turn order.",
);
assert.equal(
  combat.cardAppliesLine({ status: "dazed", category: "origin", sp: 4 }),
  "Applies Dazed (80%): they act last in the turn order.",
);
assert.equal(
  combat.cardAppliesLine({ drainAp: 1, category: "normal", sp: 2 }),
  "Applies Drain (20%): they lose 1 AP.",
);
assert.equal(combat.cardAppliesLine({ status: "bound", category: "normal", sp: 1 }), "");
assert.equal(combat.cardAppliesLine({ status: "bound", category: "unique", sp: 1 }), "Applies Bound (100%): they skip their next turn.");
assert.equal(combat.effectBadge({ status: "dazed", category: "normal" }), "Dazed 20%");
assert.equal(combat.effectBadge({ status: "dazed", category: "origin" }), "Dazed 80%");
assert.equal(combat.effectBadge({ drainAp: 1, category: "normal" }), "Drain 20%");
for (const card of allCards) {
  assert.equal(card.text, combat.cardRulesText(card, allCards));
  assert.match(card.text, /Applies /);
  assert.match(card.text, /\(\d+%\)/);
  assert.match(card.text, /Cost is damage/);
}

const fight0 = combat.createFight({
  hero,
  monster,
  heroCards,
  monsterCards: monsterPool,
  rng: combat.rngFromSeed(11),
});
assert.equal(fight0.units.find((u) => u.side === "enemy").hand.length, 6);
assert.equal(fight0.units.find((u) => u.side === "ally").hand.length, 6);
assert.equal(fight0.stage, null);
for (const unit of fight0.units) {
  assert.equal(unit.apGain, 1);
  assert.equal(unit.currentAp, 1);
  assert.ok(unit.life > 0);
  assert.equal(unit.maxLife, unit.life);
}
assert.equal(combat.nextToAct(fight0).id, combat.currentActor(fight0).id);

const firstActor = combat.currentActor(fight0);
if (firstActor.side === "enemy") {
  assert.equal(combat.canSkipTurn(fight0), false);
  const ignored = combat.skipTurn(fight0);
  assert.equal(ignored.actorId, fight0.actorId);
  assert.equal(ignored.units.find((u) => u.id === firstActor.id).currentAp, 1);
} else {
  assert.equal(combat.canSkipTurn(fight0), true);
}

const alwaysPlay = () => 0.99;
const alwaysLand = () => 0;
const fight1 = combat.continueFight(fight0, alwaysPlay);
assert.ok(fight1.stage, "Continue must put an action on the stage");
assert.ok(fight1.stage.media?.src);
assert.equal(fight1.stage.hold, true);

const fight2 = combat.continueFight(fight1, alwaysPlay);
assert.ok(fight2.stage, "Continue must not clear the stage");
assert.ok(fight2.stage.card || fight2.stage.passed);
assert.notEqual(
  fight2.actorId,
  fight1.actorId,
  "second Continue ends the turn instead of dumping remaining AP",
);
const actorAfterOnePlay = fight2.units.find((u) => u.id === combat.currentActor(fight1).id);
assert.equal(
  actorAfterOnePlay.currentAp,
  fight1.units.find((u) => u.id === actorAfterOnePlay.id).currentAp,
);

const fatAp = combat.createFight({
  hero,
  monster,
  heroCards,
  monsterCards: monsterPool,
  rng: combat.rngFromSeed(11),
});
const fatId = fatAp.actorId;
fatAp.units.find((u) => u.id === fatId).currentAp = 5;
const fatPlay = combat.continueFight(fatAp, alwaysPlay);
assert.ok(fatPlay.stage.card);
assert.equal(fatPlay.actorId, fatId);
assert.equal(fatPlay.stage.spent, Number(fatPlay.stage.card.sp) || 0);
assert.equal(
  fatPlay.units.find((u) => u.id === fatId).currentAp,
  5 - fatPlay.stage.spent,
);
const fatDone = combat.continueFight(fatPlay, alwaysPlay);
assert.notEqual(fatDone.actorId, fatId);
assert.equal(
  fatDone.units.find((u) => u.id === fatId).currentAp,
  5 - fatPlay.stage.spent,
);

const banker = {
  side: "enemy",
  currentAp: 1,
  playedKeys: [],
  hand: [{ id: "tentacle_ink", sp: 1 }],
};
assert.equal(combat.chooseCard(banker, () => 0), null);
assert.equal(combat.chooseCard(banker, () => 0.99)?.id, "tentacle_ink");

let manual = combat.setAllyAuto(
  combat.createFight({
    hero,
    monster,
    heroCards,
    monsterCards: monsterPool,
    rng: combat.rngFromSeed(11),
  }),
  false,
);
let hops = 0;
while (combat.currentActor(manual).side !== "ally" && hops < 8) {
  const id = manual.actorId;
  manual = combat.continueFight(manual, alwaysPlay);
  if (manual.actorId === id) manual = combat.continueFight(manual, alwaysPlay);
  hops += 1;
}
assert.equal(combat.currentActor(manual).side, "ally");
const ally = manual.units.find((u) => u.side === "ally");
ally.currentAp = 3;
const slapIdx = ally.hand.findIndex((c) => c.id === "slap");
assert.ok(slapIdx >= 0);
ally.hand[slapIdx] = { ...ally.hand[slapIdx], recoverAp: 2 };
const recovered = combat.playManualCard(manual, "slap", alwaysPlay);
assert.equal(recovered.stage.spent, 1);
assert.equal(recovered.stage.recovered, 2);
assert.equal(recovered.units.find((u) => u.side === "ally").currentAp, 4);
const afterManual = combat.continueFight(recovered, alwaysPlay);
assert.ok(
  afterManual.actorId !== recovered.actorId || afterManual.round !== recovered.round,
  "continue after a play must end the turn",
);
const allyAfter = afterManual.units.find((u) => u.side === "ally");
if (afterManual.round === recovered.round) {
  assert.equal(allyAfter.currentAp, 4);
} else {
  assert.equal(allyAfter.currentAp, 4 + allyAfter.apGain);
}

const ordered = combat.sortTurnOrder([
  { id: "slow", currentAp: 0, side: "ally", alterations: ["dazed"] },
  { id: "fast", currentAp: 4, side: "enemy", alterations: [] },
]);
assert.equal(ordered[0].id, "fast");
assert.equal(ordered[1].id, "slow");

function walkToAlly(state) {
  let s = combat.setAllyAuto(state, false);
  let hops = 0;
  while (hops < 16) {
    const who = combat.currentActor(s);
    if (who.side === "ally" && !combat.hasStatus(who, "bound")) break;
    const id = s.actorId;
    s = combat.continueFight(s, alwaysPlay);
    if (s.actorId === id) s = combat.continueFight(s, alwaysPlay);
    hops += 1;
  }
  return s;
}

let fx = walkToAlly(
  combat.createFight({
    hero,
    monster,
    heroCards,
    monsterCards: monsterPool,
    rng: combat.rngFromSeed(21),
  }),
);
assert.equal(combat.currentActor(fx).side, "ally");
const fxAlly = fx.units.find((u) => u.side === "ally");
const fxEnemy = fx.units.find((u) => u.side === "enemy");
fxAlly.currentAp = 6;
fxAlly.alterations = [];
const enemyLife = fxEnemy.life;
const slapped = combat.playManualCard(fx, "slap", alwaysLand);
assert.deepEqual(slapped.stage.applied, ["dazed"]);
assert.equal(slapped.stage.damage, 1);
assert.equal(slapped.units.find((u) => u.side === "enemy").life, enemyLife - 1);
assert.ok(combat.hasStatus(slapped.units.find((u) => u.side === "enemy"), "dazed"));
const slappedAgain = combat.addStatus(slapped.units.find((u) => u.side === "enemy"), "dazed");
assert.equal(slappedAgain, false);

let resistFight = walkToAlly(
  combat.createFight({
    hero,
    monster,
    heroCards,
    monsterCards: monsterPool,
    rng: combat.rngFromSeed(26),
  }),
);
resistFight.units.find((u) => u.side === "ally").currentAp = 6;
resistFight.units.find((u) => u.side === "ally").alterations = [];
const resisted = combat.playManualCard(resistFight, "slap", alwaysPlay);
assert.deepEqual(resisted.stage.applied, []);
assert.equal(resisted.stage.damage, 1);
assert.equal(resisted.stage.resisted, true);
assert.equal(combat.hasStatus(resisted.units.find((u) => u.side === "enemy"), "dazed"), false);

let grabFight = walkToAlly(
  combat.createFight({
    hero,
    monster,
    heroCards,
    monsterCards: monsterPool,
    rng: combat.rngFromSeed(22),
  }),
);
grabFight.units.find((u) => u.side === "ally").currentAp = 6;
grabFight.units.find((u) => u.side === "ally").alterations = [];
const grabbed = combat.playManualCard(grabFight, "grab", alwaysLand);
assert.deepEqual(grabbed.stage.applied, ["dazed"]);
assert.equal(combat.hasStatus(grabbed.units.find((u) => u.side === "enemy"), "bound"), false);

let skipFight = walkToAlly(
  combat.createFight({
    hero,
    monster,
    heroCards,
    monsterCards: monsterPool,
    rng: combat.rngFromSeed(27),
  }),
);
const skipAlly = skipFight.units.find((u) => u.side === "ally");
skipAlly.currentAp = 6;
skipAlly.alterations = [];
const grabIdx = skipAlly.hand.findIndex((c) => c.id === "grab");
assert.ok(grabIdx >= 0);
skipAlly.hand[grabIdx] = {
  ...skipAlly.hand[grabIdx],
  category: "unique",
  status: "bound",
};
const uniqueBind = combat.playManualCard(skipFight, "grab", alwaysLand);
assert.deepEqual(uniqueBind.stage.applied, ["bound"]);
assert.ok(combat.hasStatus(uniqueBind.units.find((u) => u.side === "enemy"), "bound"));
let afterUnique = combat.continueFight(uniqueBind, alwaysPlay);
let skipHops = 0;
while (combat.currentActor(afterUnique).side !== "enemy" && skipHops < 12) {
  const who = combat.currentActor(afterUnique);
  if (who.side === "ally") {
    afterUnique =
      (who.actionsThisTurn || 0) >= 1
        ? combat.continueFight(afterUnique, alwaysPlay)
        : combat.skipTurn(afterUnique);
  } else {
    afterUnique = combat.continueFight(afterUnique, alwaysPlay);
  }
  skipHops += 1;
}
assert.equal(combat.currentActor(afterUnique).side, "enemy");
const boundSkip = combat.continueFight(afterUnique, alwaysPlay);
assert.equal(boundSkip.stage.boundSkip, true);
assert.equal(boundSkip.stage.passed, true);

let originBind = walkToAlly(
  combat.createFight({
    hero,
    monster,
    heroCards,
    monsterCards: monsterPool,
    rng: combat.rngFromSeed(28),
  }),
);
const originAlly = originBind.units.find((u) => u.side === "ally");
originAlly.currentAp = 6;
originAlly.alterations = [];
const slapIdx2 = originAlly.hand.findIndex((c) => c.id === "slap");
originAlly.hand[slapIdx2] = {
  ...originAlly.hand[slapIdx2],
  category: "origin",
  status: "bound",
};
const originTried = combat.playManualCard(originBind, "slap", alwaysLand);
assert.deepEqual(originTried.stage.applied, []);
assert.equal(combat.hasStatus(originTried.units.find((u) => u.side === "enemy"), "bound"), false);

let bondRare = walkToAlly(
  combat.createFight({
    hero,
    monster,
    heroCards,
    monsterCards: monsterPool,
    rng: combat.rngFromSeed(29),
  }),
);
const bondAlly = bondRare.units.find((u) => u.side === "ally");
bondAlly.currentAp = 6;
bondAlly.alterations = [];
const slapIdx3 = bondAlly.hand.findIndex((c) => c.id === "slap");
bondAlly.hand[slapIdx3] = {
  ...bondAlly.hand[slapIdx3],
  category: "bond",
  status: "bound",
};
const bondMiss = combat.playManualCard(bondRare, "slap", alwaysPlay);
assert.equal(bondMiss.stage.resisted, true);
assert.deepEqual(bondMiss.stage.applied, []);
bondRare = walkToAlly(
  combat.createFight({
    hero,
    monster,
    heroCards,
    monsterCards: monsterPool,
    rng: combat.rngFromSeed(31),
  }),
);
const bondAlly2 = bondRare.units.find((u) => u.side === "ally");
bondAlly2.currentAp = 6;
bondAlly2.alterations = [];
const slapIdx4 = bondAlly2.hand.findIndex((c) => c.id === "slap");
bondAlly2.hand[slapIdx4] = {
  ...bondAlly2.hand[slapIdx4],
  category: "bond",
  status: "bound",
};
const bondHit = combat.playManualCard(bondRare, "slap", alwaysLand);
assert.deepEqual(bondHit.stage.applied, ["bound"]);

let kissFight = walkToAlly(
  combat.createFight({
    hero,
    monster,
    heroCards,
    monsterCards: monsterPool,
    rng: combat.rngFromSeed(23),
  }),
);
const kissEnemy = kissFight.units.find((u) => u.side === "enemy");
kissFight.units.find((u) => u.side === "ally").currentAp = 6;
kissFight.units.find((u) => u.side === "ally").alterations = [];
kissEnemy.currentAp = 3;
const kissed = combat.playManualCard(kissFight, "kiss", alwaysLand);
assert.equal(kissed.stage.drained, 1);
assert.equal(kissed.units.find((u) => u.side === "enemy").currentAp, 2);

let woundFight = walkToAlly(
  combat.createFight({
    hero,
    monster,
    heroCards,
    monsterCards: monsterPool,
    rng: combat.rngFromSeed(24),
  }),
);
woundFight.units.find((u) => u.side === "ally").currentAp = 6;
woundFight.units.find((u) => u.side === "ally").alterations = [];
const wounded = combat.playManualCard(woundFight, "tease", alwaysLand);
assert.ok(combat.hasStatus(wounded.units.find((u) => u.side === "enemy"), "wound"));
const woundLife = wounded.units.find((u) => u.side === "enemy").life;
wounded.stage.hold = false;
wounded.units.find((u) => u.side === "ally").actionsThisTurn = 0;
const woundSlap = combat.playManualCard(wounded, "slap", alwaysPlay);
assert.equal(woundSlap.stage.damage, 2);
assert.equal(woundSlap.units.find((u) => u.side === "enemy").life, woundLife - 2);

let blindFight = walkToAlly(
  combat.createFight({
    hero,
    monster,
    heroCards,
    monsterCards: monsterPool,
    rng: combat.rngFromSeed(25),
  }),
);
blindFight.units.find((u) => u.side === "ally").currentAp = 6;
blindFight.units.find((u) => u.side === "ally").alterations = [];
const whispered = combat.playManualCard(blindFight, "whisper", alwaysLand);
assert.deepEqual(whispered.stage.applied, ["blind"]);
assert.equal(whispered.stage.damage, 2);
assert.ok(combat.hasStatus(whispered.units.find((u) => u.side === "enemy"), "blind"));
let afterWhisper = combat.continueFight(whispered, alwaysPlay);
let blindHops = 0;
let missedHit = afterWhisper;
while (blindHops < 16) {
  const who = combat.currentActor(afterWhisper);
  if (who.side === "ally") {
    afterWhisper =
      (who.actionsThisTurn || 0) >= 1
        ? combat.continueFight(afterWhisper, alwaysPlay)
        : combat.skipTurn(afterWhisper);
  } else {
    missedHit = combat.continueFight(afterWhisper, alwaysPlay);
    afterWhisper = missedHit;
    if (missedHit.stage?.card) break;
  }
  blindHops += 1;
}
assert.equal(missedHit.stage.missed, true);
assert.equal(missedHit.stage.damage, 0);
assert.deepEqual(missedHit.stage.applied, []);
assert.equal(combat.hasStatus(missedHit.units.find((u) => u.side === "enemy"), "blind"), false);

let cursor = fight0;
let guard = 0;
while (combat.currentActor(cursor).side !== "ally" && guard < 12) {
  cursor = combat.continueFight(cursor, combat.rngFromSeed(30 + guard));
  guard += 1;
}
if (combat.hasStatus(combat.currentActor(cursor), "bound")) {
  cursor = combat.continueFight(cursor, alwaysPlay);
  guard = 0;
  while (combat.currentActor(cursor).side !== "ally" && guard < 12) {
    cursor = combat.continueFight(cursor, combat.rngFromSeed(50 + guard));
    guard += 1;
  }
}
assert.equal(combat.currentActor(cursor).side, "ally");
const skipperId = cursor.actorId;
assert.equal(combat.canSkipTurn(cursor), true);
const apBeforeSkip = combat.currentActor(cursor).currentAp;
const skipperGain = combat.currentActor(cursor).apGain;
const skipped = combat.skipTurn(cursor);
assert.notEqual(skipped.actorId, skipperId);
const apAfterSkip = skipped.units.find((u) => u.id === skipperId).currentAp;
if (skipped.round === cursor.round) {
  assert.equal(apAfterSkip, apBeforeSkip);
} else {
  assert.equal(apAfterSkip, apBeforeSkip + skipperGain);
}

let roundWalk = fight0;
guard = 0;
const leftover = {};
while (roundWalk.round === 1 && guard < 40) {
  const who = combat.currentActor(roundWalk);
  leftover[who.id] = who.currentAp;
  if (who.side === "ally") {
    if (combat.hasStatus(who, "bound")) roundWalk = combat.continueFight(roundWalk);
    else roundWalk = combat.skipTurn(roundWalk);
  } else roundWalk = combat.continueFight(roundWalk, combat.rngFromSeed(40 + guard));
  guard += 1;
}
assert.equal(roundWalk.round, 2);
for (const unit of roundWalk.units) {
  const before = leftover[unit.id] ?? unit.apGain;
  assert.equal(unit.currentAp, before + unit.apGain);
}

const playUi = readFileSync(path.join(root, "app/play/CombatScreen.js"), "utf8");
assert.match(playUi, /data-testid="turn-bar"/);
assert.match(playUi, /data-testid="continue-btn"/);
assert.match(playUi, /data-testid="skip-btn"/);
assert.match(playUi, /data-testid="now-actor"/);
assert.match(playUi, /data-testid="now-actor-status"/);
assert.match(playUi, /data-testid="now-actor-life"/);
assert.match(playUi, /Di turno/);
assert.match(playUi, /data-testid="stage"/);
assert.match(playUi, /data-testid="stage-ap"/);
assert.match(playUi, /data-testid="last-card"/);
assert.match(playUi, /data-testid="next-hand"/);
assert.match(playUi, /Prossimo di turno/);
assert.match(playUi, /Quello che succede/);
assert.match(playUi, /Ultima carta/);
assert.match(playUi, /AP non spesi restano/);
assert.match(playUi, /Skip turn/);
assert.match(playUi, /now-actor-effects/);
assert.match(playUi, /Immobilizzato/);
assert.match(playUi, /data-testid="stage-rules"/);
assert.match(playUi, /cardAppliesLine/);
assert.match(playUi, /effectBadge/);
assert.match(playUi, /now-actor-art/);
assert.match(playUi, /combat-layout-split/);
assert.doesNotMatch(playUi, /absolute left-3 bottom-3/);
assert.doesNotMatch(playUi, /setTimeout|setInterval/);
const catalogUi = readFileSync(path.join(root, "app/play/catalog/page.js"), "utf8");
const playCss = readFileSync(path.join(root, "app/globals.css"), "utf8");
assert.match(playCss, /grid-column: 1 \/ -1/);
assert.match(playCss, /now-actor-art/);
assert.match(playCss, /minmax\(260px/);
assert.match(playCss, /\.result-col/);
assert.match(playCss, /\.next-hand/);
assert.match(playUi, /danno /);
assert.match(playUi, /resistito/);
assert.match(catalogUi, /cardAppliesLine/);
assert.match(catalogUi, /card-effect-/);
assert.doesNotMatch(catalogUi, /Bound/);

console.log("catalog + landing checks ok");
