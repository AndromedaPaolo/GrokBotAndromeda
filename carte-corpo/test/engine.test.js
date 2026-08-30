const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const root = path.join(__dirname, "..");
const src =
  fs.readFileSync(path.join(root, "js/cards.js"), "utf8") +
  "\n" +
  fs.readFileSync(path.join(root, "js/engine.js"), "utf8") +
  "\n({ DECK, createEngine, shuffle })";

const ctx = { console, Math };
vm.createContext(ctx);
const { DECK, createEngine, shuffle } = vm.runInContext(src, ctx);

assert.ok(DECK.length >= 12, "deck should have a full set of body-action cards");
assert.ok(
  DECK.every(
    (card) =>
      card.zone &&
      card.power > 0 &&
      card.text &&
      card.line &&
      ["bocca", "mano", "dita"].includes(card.touch)
  ),
  "every card needs zone, power, text, line, touch"
);

const zones = new Set(DECK.map((card) => card.zone));
for (const need of ["collo", "seno", "capezzoli", "ventre", "fianco", "coscia", "pube"]) {
  assert.ok(zones.has(need), `missing zone ${need}`);
}

let seq = 0;
const random = () => {
  seq += 1;
  return (seq % 10) / 10;
};

const engine = createEngine(DECK, { random });
let state = engine.startRound();
assert.equal(state.hand.length, 5);
assert.equal(state.pleasure, 0);
assert.equal(state.climaxOpen, false);

const first = state.hand[0];
let result = engine.play(first.id);
assert.equal(result.ok, true);
assert.equal(result.hand.length, 5);
assert.equal(result.pleasure, first.power);
assert.equal(result.lastZone, first.zone);

const sameZone = result.hand.find((card) => card.zone === first.zone) || result.hand[0];
result = engine.play(sameZone.id);
assert.equal(result.ok, true);
if (sameZone.zone === first.zone) {
  assert.equal(result.gain, sameZone.power + 5);
  assert.equal(result.combo, true);
} else {
  assert.equal(result.gain, sameZone.power);
}

result = engine.play("no-such-card");
assert.equal(result.ok, false);
assert.equal(result.reason, "missing");

const climaxEngine = createEngine(DECK, { random: () => 0.3 });
climaxEngine.startRound();
let steps = 0;
let last = climaxEngine.getState();
while (!last.climaxOpen && steps < 40) {
  last = climaxEngine.play(climaxEngine.getState().hand[0].id);
  steps += 1;
}
assert.equal(last.ok, true);
assert.equal(last.climaxOpen, true);
assert.equal(last.pleasure, 100);

const blocked = climaxEngine.play(climaxEngine.getState().hand[0].id);
assert.equal(blocked.ok, false);
assert.equal(blocked.reason, "climax");

const after = climaxEngine.continueAfterClimax();
assert.equal(after.climaxOpen, false);
assert.equal(after.pleasure, 28);

const shuffled = shuffle([1, 2, 3, 4, 5], () => 0.99);
assert.deepEqual(shuffled.sort((a, b) => a - b), [1, 2, 3, 4, 5]);

console.log("engine tests passed");
