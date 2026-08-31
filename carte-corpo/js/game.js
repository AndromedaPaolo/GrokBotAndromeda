(() => {
  const engine = createEngine(DECK);
  const PHOTOS = {
    calm: "img/giulia.jpg",
    hot: "img/giulia.jpg",
    peak: "img/giulia-peak.jpg",
  };
  const FACES = {
    calm: "img/giulia-face.jpg",
    hot: "img/giulia-face-soft.jpg",
    peak: "img/giulia-face-closed.jpg",
  };

  const gate = document.getElementById("gate");
  const app = document.getElementById("app");
  const handEl = document.getElementById("hand");
  const meterFill = document.getElementById("meter-fill");
  const meterLabel = document.getElementById("meter-label");
  const herLine = document.getElementById("her-line");
  const logEl = document.getElementById("log");
  const climaxEl = document.getElementById("climax");
  const burstEl = document.getElementById("touch-burst");
  const hitLabel = document.getElementById("hit-label");
  const stageFrame = document.querySelector(".stage-frame");
  const bodyPhoto = document.getElementById("body-photo");
  const bodyImg = document.getElementById("body-img");
  const bodyLive = document.getElementById("body-live");
  const avatar = document.getElementById("avatar");
  let live = null;
  let wantLive = false;

  function setVisible(el, on) {
    el.hidden = !on;
    el.classList.toggle("is-on", on);
  }

  function setFace(level) {
    if (!live) bodyImg.src = PHOTOS[level];
    avatar.src = FACES[level];
    bodyPhoto.classList.remove("is-calm", "is-hot", "is-peak");
    bodyPhoto.classList.add(`is-${level}`);
    stageFrame.classList.toggle("breathing", level !== "calm");
  }

  function setVisible(el, on) {
    el.hidden = !on;
    el.classList.toggle("is-on", on);
  }

  function setFace(level) {
    bodyImg.src = PHOTOS[level];
    avatar.src = FACES[level];
    bodyPhoto.classList.remove("is-calm", "is-hot", "is-peak");
    bodyPhoto.classList.add(`is-${level}`);
    stageFrame.classList.toggle("breathing", level !== "calm");
  }

  function faceFromMeter(pleasure) {
    if (pleasure >= 80) setFace("peak");
    else if (pleasure >= 35) setFace("hot");
    else setFace("calm");
  }

  function renderMeter(pleasure) {
    const pct = Math.min(100, pleasure);
    meterFill.style.width = `${pct}%`;
    meterLabel.textContent = String(pct);
    faceFromMeter(pleasure);
  }

  function zoneCenter(zone) {
    const nodes = [...document.querySelectorAll(`.zone[data-zone="${zone}"]`)];
    if (nodes.length === 0) return { x: 180, y: 300 };
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

  function clearPreview() {
    for (const node of document.querySelectorAll(".zone.is-preview")) {
      node.classList.remove("is-preview");
    }
  }

  function previewZone(zone) {
    clearPreview();
    for (const node of document.querySelectorAll(`.zone[data-zone="${zone}"]`)) {
      node.classList.add("is-preview");
    }
  }

  function flashZone(zone, touch, name) {
    const nodes = document.querySelectorAll(`.zone[data-zone="${zone}"]`);
    for (const node of nodes) node.classList.add("is-hit");
    const { x, y } = zoneCenter(zone);
    burstEl.hidden = false;
    burstEl.dataset.kind = touch || "mano";
    burstEl.style.left = `${x}px`;
    burstEl.style.top = `${y}px`;
    hitLabel.hidden = false;
    hitLabel.textContent = name;
    hitLabel.style.left = `${x}px`;
    hitLabel.style.top = `${Math.max(24, y - 42)}px`;
    window.setTimeout(() => {
      for (const node of nodes) node.classList.remove("is-hit");
      burstEl.hidden = true;
      hitLabel.hidden = true;
    }, 650);
  }

  function addLog(card, combo) {
    const item = document.createElement("li");
    item.textContent = combo
      ? `${card.name} su ${card.zone} — combo, lei trema di più.`
      : `${card.name} → ${card.zone}. ${card.text}`;
    logEl.prepend(item);
  }

  function renderHand(hand) {
    handEl.replaceChildren();
    for (const card of hand) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "card";
      btn.dataset.zone = card.zone;
      btn.dataset.id = card.id;

      const tag = document.createElement("span");
      tag.className = "zone-tag";
      tag.textContent = card.zone;

      const title = document.createElement("h3");
      title.textContent = card.name;

      const text = document.createElement("p");
      text.textContent = card.text;

      const power = document.createElement("span");
      power.className = "power";
      power.textContent = `Intensità ${card.power}`;

      btn.append(tag, title, text, power);
      btn.addEventListener("click", () => playCard(card.id));
      btn.addEventListener("pointerenter", () => previewZone(card.zone));
      btn.addEventListener("pointerleave", clearPreview);
      btn.addEventListener("focus", () => previewZone(card.zone));
      btn.addEventListener("blur", clearPreview);
      handEl.append(btn);
    }
  }

  function playCard(id) {
    const result = engine.play(id);
    if (!result.ok) return;
    herLine.textContent = result.card.line;
    flashZone(result.card.zone, result.card.touch, result.card.name);
    addLog(result.card, result.combo);
    renderHand(result.hand);
    renderMeter(result.pleasure);
    bodyPhoto.classList.remove("is-hit-move");
    void bodyPhoto.offsetWidth;
    bodyPhoto.classList.add("is-hit-move");
    if (live) {
      live.setPleasure(result.pleasure);
      live.hit(result.card.zone);
    }
    if (result.climaxOpen) {
      setFace("peak");
      herLine.textContent = "«Non fermarti— vengo.»";
      setVisible(climaxEl, true);
    }
  }

  function startRound() {
    const state = engine.startRound();
    logEl.replaceChildren();
    setVisible(climaxEl, false);
    herLine.textContent = "«Puoi iniziare. Scegli una carta.»";
    renderHand(state.hand);
    renderMeter(state.pleasure);
    if (live) live.setPleasure(state.pleasure);
  }

  function bootLive() {
    wantLive = true;
    if (!live) return;
    bodyLive.hidden = false;
    bodyPhoto.classList.add("is-live");
    live.start();
  }

  function enterApp() {
    setVisible(gate, false);
    app.hidden = false;
    startRound();
    bootLive();
  }

  function refuse() {
    document.body.replaceChildren();
    const p = document.createElement("p");
    p.className = "refused";
    p.textContent = "Ok. Chiudi la scheda.";
    document.body.append(p);
  }

  function again() {
    const state = engine.continueAfterClimax();
    setVisible(climaxEl, false);
    herLine.textContent = "«Ancora. Più lenta stavolta.»";
    renderMeter(state.pleasure);
    if (live) live.setPleasure(state.pleasure);
  }

  document.getElementById("gate-yes").addEventListener("click", enterApp);
  document.getElementById("gate-no").addEventListener("click", refuse);
  document.getElementById("again").addEventListener("click", again);

  loadLiveBody(bodyLive)
    .then((body) => {
      live = body;
      if (wantLive) bootLive();
    })
    .catch(() => {
      bodyLive.hidden = true;
    });

  if (new URLSearchParams(location.search).get("autotest") === "1") {
    enterApp();
    let steps = 0;
    while (!engine.getState().climaxOpen && steps < 40) {
      playCard(engine.getState().hand[0].id);
      steps += 1;
    }
    again();
    const state = engine.getState();
    const pass = state.climaxOpen === false && state.pleasure === 28 && steps > 0;
    document.documentElement.dataset.test = pass ? "pass" : "fail";
    document.documentElement.dataset.steps = String(steps);
  }
})();
