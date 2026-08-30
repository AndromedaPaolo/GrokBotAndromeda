const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css/game.css"), "utf8");
const scripts = ["js/cards.js", "js/engine.js", "js/game.js"];

assert.match(css, /\[hidden\]\s*\{\s*display:\s*none\s*!important;/);
assert.match(css, /\.climax\s*\{[^}]*display:\s*none;/s);
assert.match(css, /\.climax\.is-on\s*\{[^}]*display:\s*grid;/s);
assert.match(css, /\.gate\.is-on\s*\{[^}]*display:\s*grid;/s);
assert.doesNotMatch(
  css.replace(/\.climax\.is-on\s*\{[^}]*\}/s, ""),
  /\.climax\s*\{[^}]*display:\s*grid/s
);

assert.match(html, /id="gate"[^>]*class="gate is-on"/);
assert.match(html, /id="climax"[^>]*class="climax"[^>]*hidden/);
assert.match(html, /id="gate-yes"/);
assert.match(html, /id="again"/);
assert.match(html, /data-zone="pube"/);
assert.match(html, /Giulia, donna adulta/);

for (const src of scripts) {
  assert.ok(html.includes(`src="${src}"`), `missing script ${src}`);
  assert.ok(fs.existsSync(path.join(root, src)));
}

console.log("overlay markup tests passed");
