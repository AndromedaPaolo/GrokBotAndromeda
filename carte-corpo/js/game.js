(() => {
  const HAND_SIZE = 5;
  const CLIMAX = 100;

  const gate = document.getElementById("gate");
  const app = document.getElementById("app");
  const handEl = document.getElementById("hand");
  const meterFill = document.getElementById("meter-fill");
  const meterLabel = document.getElementById("meter-label");
  const herLine = document.getElementById("her-line");
  const logEl = document.getElementById("log");
  const climaxEl = document.getElementById("climax");
  const burstEl = document.getElementById("touch-burst");
  const stageFrame = document.querySelector(".stage-frame");

  let drawPile = [];
  let hand = [];
  let pleasure = 0;
  let lastZone = null;

  function shuffle(list) {
    const next = [...list];
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  }

  function refillDraw() {
    const held = new Set(hand.map((c) => c.id));
    const rest = DECK.filter((c) => !held.has(c.id));
    drawPile = shuffle(rest.length > 0 ? rest : DECK);
  }

  function drawToHand() {
    while (hand.length < HAND_SIZE) {
      if (drawPile.length === 0) refillDraw();
      const card = drawPile.pop();
      if (!card) break;
      hand.push(card);
    }
  }

  function show(el, on) {
    el.style.display = on ? "" : "none";
  }

  function setFace(level) {
    const open = document.getElementById("eyes-open");
    const half = document.getElementById("eyes-half");
    const closed = document.getElementById("eyes-closed");
    const calm = document.getElementById("mouth-calm");
    const openMouth = document.getElementById("mouth-open");
    const blushL = document.getElementById("blush-l");
    const blushR = document.getElementById("blush-r");

    show(open, level === "calm");
    show(half, level === "hot");
    show(closed, level === "peak");
    show(calm, level !== "peak");
    show(openMouth, level === "peak");
    const blush = level === "calm" ? 0.15 : level === "hot" ? 0.45 : 0.7;
    blushL.setAttribute("opacity", String(blush));
    blushR.setAttribute("opacity", String(blush));
    document.querySelector(".stage-frame").classList.toggle("breathing", level !== "calm");
  }

  function faceFromMeter() {
    if (pleasure >= 80) setFace("peak");
    else if (pleasure >= 35) setFace("hot");
    else setFace("calm");
  }

  function renderMeter() {
    const pct = Math.min(100, pleasure);
    meterFill.style.width = `${pct}%`;
    meterLabel.textContent = String(pct);
    faceFromMeter();
  }

  function zoneCenter(zone) {
    const nodes = [...document.querySelectorAll(`.zone[data-zone="${zone}"]`)];
    if (nodes.length === 0) return { x: 180, y: 300 };
    const svg = document.getElementById("body");
    const frameRect = stageFrame.getBoundingClientRect();
    let x = 0;
    let y = 0;
    for (const node of nodes) {
      const b = node.getBoundingClientRect();
      x += b.left + b.width / 2;
      y += b.top + b.height / 2;
    }
    x /= nodes.length;
    y /= nodes.length;
    return { x: x - frameRect.left, y: y - frameRect.top };
  }

  function flashZone(zone) {
    const nodes = document.querySelectorAll(`.zone[data-zone="${zone}"]`);
    for (const node of nodes) node.classList.add("is-hit");
    const { x, y } = zoneCenter(zone);
    burstEl.hidden = false;
    burstEl.style.left = `${x}px`;
    burstEl.style.top = `${y}px`;
    window.setTimeout(() => {
      for (const node of nodes) node.classList.remove("is-hit");
      burstEl.hidden = true;
    }, 550);
  }

  function addLog(card, combo) {
    const item = document.createElement("li");
    item.textContent = combo
      ? `${card.name} su ${card.zone} — combo, lei trema di più.`
      : `${card.name} → ${card.zone}. ${card.text}`;
    logEl.prepend(item);
  }

  function renderHand() {
    handEl.replaceChildren();
    for (const card of hand) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "card";
      btn.innerHTML = `
        <span class="zone-tag">${card.zone}</span>
        <h3>${card.name}</h3>
        <p>${card.text}</p>
        <span class="power">Intensità ${card.power}</span>
      `;
      btn.addEventListener("click", () => playCard(card.id));
      handEl.append(btn);
    }
  }

  function playCard(id) {
    if (!climaxEl.hidden) return;
    const index = hand.findIndex((c) => c.id === id);
    if (index < 0) return;
    const card = hand[index];
    const combo = lastZone === card.zone;
    lastZone = card.zone;
    const gain = card.power + (combo ? 5 : 0);
    pleasure = Math.min(CLIMAX, pleasure + gain);
    hand.splice(index, 1);
    drawToHand();
    herLine.textContent = card.line;
    flashZone(card.zone);
    addLog(card, combo);
    renderHand();
    renderMeter();
    if (pleasure >= CLIMAX) {
      setFace("peak");
      herLine.textContent = "«Non fermarti— vengo.»";
      climaxEl.hidden = false;
    }
  }

  function startRound() {
    drawPile = shuffle(DECK);
    hand = [];
    pleasure = 0;
    lastZone = null;
    logEl.replaceChildren();
    climaxEl.hidden = true;
    herLine.textContent = "«Puoi iniziare. Scegli una carta.»";
    drawToHand();
    renderHand();
    renderMeter();
  }

  document.getElementById("gate-yes").addEventListener("click", () => {
    gate.hidden = true;
    app.hidden = false;
    startRound();
  });

  document.getElementById("gate-no").addEventListener("click", () => {
    document.body.replaceChildren();
    document.body.innerHTML =
      "<p style='padding:40px;color:#b9a394;font-family:Georgia,serif'>Ok. Chiudi la scheda.</p>";
  });

  document.getElementById("again").addEventListener("click", () => {
    pleasure = 28;
    climaxEl.hidden = true;
    herLine.textContent = "«Ancora. Più lenta stavolta.»";
    renderMeter();
  });
})();
