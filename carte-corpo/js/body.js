const BODY_ZONES = {
  collo: { x: 0.5, y: 0.22 },
  seno: { x: 0.5, y: 0.335 },
  capezzoli: { x: 0.5, y: 0.348 },
  ventre: { x: 0.5, y: 0.43 },
  fianco: { x: 0.5, y: 0.48 },
  pube: { x: 0.5, y: 0.527 },
  coscia: { x: 0.5, y: 0.68 },
};

const POSE_CENTER = 0;
const POSE_LEFT = 1;
const POSE_RIGHT = 2;
const POSE_LOOK = 3;
const POSE_PEAK = 4;

function idlePose(timeMs, period) {
  const seq = [POSE_CENTER, POSE_LEFT, POSE_LOOK, POSE_RIGHT];
  const hold = period ? period * 0.18 : 900;
  const fade = period ? period * 0.14 : 700;
  const cycle = seq.length * (hold + fade);
  let t = ((timeMs % cycle) + cycle) % cycle;
  for (let i = 0; i < seq.length; i += 1) {
    if (t <= hold) return { a: seq[i], b: seq[i], mix: 0 };
    t -= hold;
    if (t <= fade) {
      const ease = 0.5 - 0.5 * Math.cos((t / fade) * Math.PI);
      return { a: seq[i], b: seq[(i + 1) % seq.length], mix: ease };
    }
    t -= fade;
  }
  return { a: POSE_CENTER, b: POSE_CENTER, mix: 0 };
}

function reactAmount(now, reactAt, duration) {
  if (reactAt == null) return 0;
  const age = now - reactAt;
  if (age < 0 || age >= duration) return 0;
  const t = age / duration;
  return Math.sin(t * Math.PI);
}

function warpOffset(col, row, cols, rows, timeMs, pleasure, impulses) {
  const yn = rows <= 1 ? 0 : row / (rows - 1);
  const xn = cols <= 1 ? 0 : col / (cols - 1);
  const breath = Math.sin(timeMs / 1500) * (11 + pleasure * 0.09);
  const sway = Math.sin(timeMs / 2100) * (13 + pleasure * 0.07);
  const chest = yn > 0.2 && yn < 0.5 ? Math.sin(((yn - 0.2) / 0.3) * Math.PI) : 0;
  const hair = yn < 0.2 ? (0.2 - yn) / 0.2 : 0;
  const hip = yn > 0.44 && yn < 0.64 ? Math.sin(((yn - 0.44) / 0.2) * Math.PI) : 0;
  let dx = sway * (0.35 + hair * 1.15 - hip * 0.55);
  let dy = breath * chest;
  for (const imp of impulses) {
    const px = imp.x * (cols - 1);
    const py = imp.y * (rows - 1);
    const d2 = (col - px) * (col - px) + (row - py) * (row - py);
    const fall = Math.exp(-d2 / 10) * imp.amp;
    dx += (col - px) * fall * 0.35;
    dy += (row - py) * fall * 0.22;
  }
  dx += (xn - 0.5) * chest * breath * 0.25;
  return { dx, dy };
}

function createLiveBody(canvas, frames) {
  const COLS = 12;
  const ROWS = 18;
  const off = document.createElement("canvas");
  const view = canvas.getContext("2d");
  const buf = off.getContext("2d");
  let pleasure = 0;
  let running = false;
  let raf = 0;
  let origin = 0;
  let reactAt = null;
  let impulses = [];
  let lastSize = "";

  function resize() {
    const cssW = Math.max(1, canvas.clientWidth || canvas.width || 340);
    const cssH = Math.max(1, canvas.clientHeight || canvas.height || 510);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(cssW * dpr);
    const h = Math.round(cssH * dpr);
    const key = `${w}x${h}`;
    if (key === lastSize) return;
    lastSize = key;
    canvas.width = w;
    canvas.height = h;
    off.width = w;
    off.height = h;
  }

  function activeImpulses(now) {
    const live = [];
    for (const imp of impulses) {
      const age = now - imp.born;
      if (age < 0 || age >= imp.life) continue;
      const amp = imp.amp * Math.sin((age / imp.life) * Math.PI);
      live.push({ x: imp.x, y: imp.y, amp });
    }
    return live;
  }

  function drawImageFit(ctx, img, alpha) {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, 0, 0, off.width, off.height);
    ctx.globalAlpha = 1;
  }

  function compose(now) {
    const pose = idlePose(now - origin, 4800);
    const react = reactAmount(now, reactAt, 1100);
    const peak = pleasure >= 80 ? (pleasure - 80) / 20 : 0;
    buf.clearRect(0, 0, off.width, off.height);
    buf.globalCompositeOperation = "source-over";
    drawImageFit(buf, frames[pose.a], 1);
    if (pose.mix > 0.01) drawImageFit(buf, frames[pose.b], pose.mix);
    if (react > 0.02) drawImageFit(buf, frames[POSE_LOOK], react * 0.9);
    if (peak > 0.02) drawImageFit(buf, frames[POSE_PEAK], peak);
  }

  function warp(now) {
    const w = canvas.width;
    const h = canvas.height;
    const t = now - origin;
    const rock = Math.sin(t / 1700) * (0.05 + pleasure * 0.0002);
    const lift = Math.sin(t / 1300) * (0.035 + pleasure * 0.00018);
    const moving = activeImpulses(now);
    let jx = 0;
    let jy = 0;
    for (const imp of moving) {
      jx += (imp.x - 0.5) * imp.amp * 2.2;
      jy += (imp.y - 0.45) * imp.amp * 1.4;
    }
    view.clearRect(0, 0, w, h);
    view.imageSmoothingEnabled = true;
    view.save();
    view.translate(w / 2 + jx, h * 0.8 + jy);
    view.rotate(rock);
    view.scale(1 + lift * 0.25, 1 + lift);
    view.translate(-w / 2, -h * 0.8);
    view.drawImage(off, 0, 0, w, h);
    view.restore();
  }

  function tick(now) {
    if (!running) return;
    resize();
    compose(now);
    warp(now);
    raf = window.requestAnimationFrame(tick);
  }

  function start() {
    if (running) return;
    running = true;
    origin = performance.now();
    raf = window.requestAnimationFrame(tick);
  }

  function stop() {
    running = false;
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
  }

  function setPleasure(value) {
    pleasure = value;
  }

  function hit(zone) {
    const uv = BODY_ZONES[zone] || { x: 0.5, y: 0.4 };
    const now = performance.now();
    impulses.push({ x: uv.x, y: uv.y, born: now, life: 900, amp: 9 });
    if (impulses.length > 8) impulses.shift();
    reactAt = now;
  }

  return { start, stop, setPleasure, hit, BODY_ZONES };
}

function loadBodyFrame(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`missing ${src}`));
    img.src = src;
  });
}

async function loadLiveBody(canvas) {
  const sources = [
    "img/giulia.jpg",
    "img/giulia-shift-l.jpg",
    "img/giulia-shift-r.jpg",
    "img/giulia-look.jpg",
    "img/giulia-peak.jpg",
  ];
  const frames = await Promise.all(sources.map(loadBodyFrame));
  return createLiveBody(canvas, frames);
}
