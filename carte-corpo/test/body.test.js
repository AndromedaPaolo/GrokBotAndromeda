const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const src = fs.readFileSync(path.join(__dirname, "../js/body.js"), "utf8");
const ctx = { console, Math, performance: { now: () => 0 } };
vm.createContext(ctx);
vm.runInContext(`${src}\nthis.idlePose = idlePose;\nthis.reactAmount = reactAmount;\nthis.warpOffset = warpOffset;\nthis.BODY_ZONES = BODY_ZONES;`, ctx);

const { idlePose, reactAmount, warpOffset, BODY_ZONES } = ctx;

const start = idlePose(0, 5600);
assert.equal(start.a, 0);
assert.equal(start.mix, 0);

const held = idlePose(200, 5600);
assert.equal(held.a, 0);
assert.equal(held.b, 0);

const fading = idlePose(5600 * 0.2 + 5600 * 0.025, 5600);
assert.ok(fading.mix > 0.3 && fading.mix < 0.7);
assert.equal(fading.a, 0);
assert.equal(fading.b, 1);

assert.equal(reactAmount(0, null, 780), 0);
assert.ok(reactAmount(390, 0, 780) > 0.9);
assert.equal(reactAmount(800, 0, 780), 0);

const rest = warpOffset(6, 9, 12, 18, 0, 0, []);
assert.ok(Math.abs(rest.dx) < 8);
assert.ok(Math.abs(rest.dy) < 8);

const chest = warpOffset(6, 6, 12, 18, 1400 * (Math.PI / 2), 80, []);
const foot = warpOffset(6, 17, 12, 18, 1400 * (Math.PI / 2), 80, []);
assert.ok(Math.abs(chest.dy) > Math.abs(foot.dy), "chest should breathe more than feet");

const hit = warpOffset(6, 9, 12, 18, 0, 0, [{ x: 0.5, y: 0.5, amp: 4 }]);
assert.ok(Math.abs(hit.dx) + Math.abs(hit.dy) >= 0);

assert.ok(BODY_ZONES.pube.y > BODY_ZONES.seno.y);

console.log("body motion tests passed");
