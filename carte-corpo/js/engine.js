function shuffle(list, random) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function createEngine(deck, options = {}) {
  const HAND_SIZE = options.handSize ?? 5;
  const CLIMAX = options.climax ?? 100;
  const random = options.random ?? Math.random;
  const afterClimaxPleasure = options.afterClimaxPleasure ?? 28;

  let drawPile = [];
  let hand = [];
  let pleasure = 0;
  let lastZone = null;
  let climaxOpen = false;

  function refillDraw() {
    const held = new Set(hand.map((card) => card.id));
    const rest = deck.filter((card) => !held.has(card.id));
    drawPile = shuffle(rest.length > 0 ? rest : deck, random);
  }

  function drawToHand() {
    const seen = new Set(hand.map((card) => card.id));
    while (hand.length < HAND_SIZE) {
      if (drawPile.length === 0) refillDraw();
      const card = drawPile.pop();
      if (!card) break;
      if (seen.has(card.id)) continue;
      seen.add(card.id);
      hand.push(card);
    }
  }

  function snapshot() {
    return {
      hand: [...hand],
      pleasure,
      lastZone,
      climaxOpen,
    };
  }

  function startRound() {
    drawPile = shuffle(deck, random);
    hand = [];
    pleasure = 0;
    lastZone = null;
    climaxOpen = false;
    drawToHand();
    return snapshot();
  }

  function play(id) {
    if (climaxOpen) {
      return { ok: false, reason: "climax", card: null, combo: false, gain: 0, ...snapshot() };
    }
    const index = hand.findIndex((card) => card.id === id);
    if (index < 0) {
      return { ok: false, reason: "missing", card: null, combo: false, gain: 0, ...snapshot() };
    }
    const card = hand[index];
    const combo = lastZone === card.zone;
    lastZone = card.zone;
    const gain = card.power + (combo ? 5 : 0);
    pleasure = Math.min(CLIMAX, pleasure + gain);
    hand.splice(index, 1);
    drawToHand();
    if (pleasure >= CLIMAX) climaxOpen = true;
    return { ok: true, reason: null, card, combo, gain, ...snapshot() };
  }

  function continueAfterClimax() {
    pleasure = afterClimaxPleasure;
    climaxOpen = false;
    return snapshot();
  }

  return {
    startRound,
    play,
    continueAfterClimax,
    getState: snapshot,
    climaxAt: CLIMAX,
  };
}
