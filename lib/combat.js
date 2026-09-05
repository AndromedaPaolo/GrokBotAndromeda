export const HERO_CARD_IDS = ["slap", "kiss", "grab", "tease", "pin", "whisper"];
export const TENTACLE_CARD_IDS = [
  "tentacle_lash",
  "tentacle_coil",
  "tentacle_slam",
  "tentacle_grasp",
  "tentacle_ink",
  "tentacle_birth",
];

export const HAND_SIZE = 6;

/** AP di base = carte assegnate ÷ 6. */
export function apGainFromPool(assignedCount) {
  return Math.floor(assignedCount / HAND_SIZE);
}

export function rngFromSeed(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function shuffle(items, rng = Math.random) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Pesca 6. Pool da 6 = permutazione. Pool più piccola: con ripetizione. */
export function drawHand(pool, count = HAND_SIZE, rng = Math.random) {
  if (!pool.length || count <= 0) return [];
  if (pool.length >= count) return shuffle(pool, rng).slice(0, count);
  const out = [];
  for (let i = 0; i < count; i += 1) {
    out.push(pool[Math.floor(rng() * pool.length)]);
  }
  return out;
}

export function sortTurnOrder(units) {
  return [...units].sort((a, b) => {
    if (a.currentAp !== b.currentAp) return a.currentAp - b.currentAp;
    if (a.side !== b.side) return a.side === "enemy" ? -1 : 1;
    return a.id.localeCompare(b.id);
  });
}

export function stageMedia(card) {
  if (card?.public?.video) return { type: "video", src: card.public.video };
  return { type: "image", src: card?.public?.art ?? null };
}

function handKey(card, index) {
  return `${card.id}:${index}`;
}

export function affordableOptions(unit) {
  return unit.hand
    .map((card, index) => ({ card, index, key: handKey(card, index) }))
    .filter(
      ({ card, key }) =>
        !unit.playedKeys.includes(key) && (Number(card.sp) || 0) <= unit.currentAp,
    );
}

export function chooseCard(unit, rng = Math.random) {
  const opts = affordableOptions(unit);
  if (!opts.length) return null;
  if (unit.side === "enemy") return opts[Math.floor(rng() * opts.length)].card;
  return opts[0].card;
}

function snapshotUnit(character, side, cards, rng, auto) {
  const hand = drawHand(cards, HAND_SIZE, rng);
  const assigned = cards.length || HAND_SIZE;
  const apGain = apGainFromPool(assigned);
  return {
    id: character.id,
    name: character.name,
    side,
    auto,
    portrait: character.public?.portrait ?? null,
    body: character.public?.body ?? null,
    currentAp: apGain,
    apGain,
    hand,
    pool: cards,
    playedKeys: [],
  };
}

export function createFight({ hero, monster, heroCards, monsterCards, rng = Math.random }) {
  const units = [
    snapshotUnit(hero, "ally", heroCards, rng, true),
    snapshotUnit(monster, "enemy", monsterCards, rng, true),
  ];
  const order = sortTurnOrder(units).map((u) => u.id);
  const actor = units.find((u) => u.id === order[0]);
  return {
    round: 1,
    units,
    order,
    actedIds: [],
    actorId: actor.id,
    stage: null,
    allyAuto: true,
  };
}

function playCard(state, actor, card) {
  const idx = actor.hand.findIndex(
    (c, i) => c.id === card.id && !actor.playedKeys.includes(handKey(c, i)),
  );
  const key = idx >= 0 ? handKey(actor.hand[idx], idx) : `${card.id}:x`;
  actor.playedKeys = [...actor.playedKeys, key];
  actor.currentAp -= Number(card.sp) || 0;
  state.stage = {
    actorId: actor.id,
    actorName: actor.name,
    side: actor.side,
    card,
    media: stageMedia(card),
    hold: true,
    passed: false,
  };
}

function startActor(state, actorId) {
  const actor = state.units.find((u) => u.id === actorId);
  state.actorId = actor.id;
}

function nextUnusedActorId(state) {
  return state.order.find((id) => !state.actedIds.includes(id)) ?? null;
}

function beginRound(state, rng) {
  state.round += 1;
  for (const unit of state.units) {
    unit.currentAp += unit.apGain;
    unit.playedKeys = [];
    unit.hand = drawHand(unit.pool, HAND_SIZE, rng);
  }
  state.actedIds = [];
  state.order = sortTurnOrder(state.units).map((u) => u.id);
  startActor(state, state.order[0]);
}

function passToNextActor(state, rng) {
  if (!state.actedIds.includes(state.actorId)) {
    state.actedIds = [...state.actedIds, state.actorId];
  }
  const nextId = nextUnusedActorId(state);
  if (!nextId) beginRound(state, rng);
  else startActor(state, nextId);
}

export function currentActor(state) {
  return state.units.find((u) => u.id === state.actorId) ?? null;
}

export function canSkipTurn(state) {
  const actor = currentActor(state);
  return Boolean(actor && actor.side === "ally");
}

/**
 * Passa il turno senza giocare. AP non spesi restano.
 * Sul mostro non fa nulla: la scelta è random, Skip è spento.
 */
export function skipTurn(state, rng = Math.random) {
  if (!canSkipTurn(state)) return state;
  const next = structuredClone(state);
  if (next.stage) next.stage.hold = false;
  next.stage = {
    ...(next.stage ?? {}),
    actorId: next.actorId,
    actorName: currentActor(next)?.name,
    side: currentActor(next)?.side,
    card: next.stage?.card ?? null,
    media: next.stage?.media ?? null,
    hold: false,
    passed: true,
  };
  passToNextActor(next, rng);
  return next;
}

/**
 * Avanza un'azione. Niente timer: lo still resta finché non chiami di nuovo.
 * Mostro: pesca una carta giocabile a caso. Se non può giocare, passa da solo.
 */
export function continueFight(state, rng = Math.random) {
  const next = structuredClone(state);
  const actor = currentActor(next);
  actor.auto = actor.side === "enemy" ? true : next.allyAuto;

  if (actor.side === "ally" && !actor.auto) {
    if (next.stage) next.stage.hold = false;
    return next;
  }

  const pick = chooseCard(actor, rng);
  if (pick) {
    playCard(next, actor, pick);
    return next;
  }
  passToNextActor(next, rng);
  return next;
}

export function setAllyAuto(state, auto) {
  const next = structuredClone(state);
  next.allyAuto = Boolean(auto);
  const ally = next.units.find((u) => u.side === "ally");
  if (ally) ally.auto = next.allyAuto;
  return next;
}

export function playManualCard(state, cardId) {
  const next = structuredClone(state);
  const actor = currentActor(next);
  if (!actor || actor.side !== "ally" || next.allyAuto) return state;
  if (next.stage?.hold) return state;
  const opts = affordableOptions(actor).filter(({ card }) => card.id === cardId);
  if (!opts.length) return state;
  playCard(next, actor, opts[0].card);
  return next;
}

export function unitBySide(state, side) {
  return state.units.find((u) => u.side === side) ?? null;
}

export function nextOfSide(state, side) {
  const upcomingId = state.order.find((id) => {
    const unit = state.units.find((u) => u.id === id);
    return unit?.side === side && !state.actedIds.includes(id);
  });
  if (upcomingId) return state.units.find((u) => u.id === upcomingId) ?? null;
  return unitBySide(state, side);
}
