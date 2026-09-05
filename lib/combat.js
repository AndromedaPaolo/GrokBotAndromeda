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

/** GDD: Base Max SP = n. carte assegnate ÷ 6. Primo turno = Base Max. */
export function baseMaxSp(assignedCount) {
  return Math.max(1, Math.floor(assignedCount / HAND_SIZE));
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

export function planActions(hand, sp) {
  const planned = [];
  let left = sp;
  for (const card of hand) {
    const cost = Number(card.sp) || 0;
    if (cost <= left) {
      planned.push(card);
      left -= cost;
    }
  }
  return { planned, remainingSp: left };
}

export function sortTurnOrder(units) {
  return [...units].sort((a, b) => {
    if (a.currentSp !== b.currentSp) return a.currentSp - b.currentSp;
    if (a.side !== b.side) return a.side === "enemy" ? -1 : 1;
    return a.id.localeCompare(b.id);
  });
}

export function stageMedia(card) {
  if (card?.public?.video) return { type: "video", src: card.public.video };
  return { type: "image", src: card?.public?.art ?? null };
}

function snapshotUnit(character, side, cards, rng, startingSp, auto) {
  const hand = drawHand(cards, HAND_SIZE, rng);
  const assigned = cards.length || HAND_SIZE;
  const sp = startingSp ?? 6;
  return {
    id: character.id,
    name: character.name,
    side,
    auto,
    portrait: character.public?.portrait ?? null,
    body: character.public?.body ?? null,
    currentSp: sp,
    baseMaxSp: baseMaxSp(assigned),
    hand,
    pool: cards,
    playedKeys: [],
    cardsPlayedThisTurn: 0,
  };
}

function handKey(card, index) {
  return `${card.id}:${index}`;
}

function rebuildQueue(unit) {
  const leftover = unit.hand.filter((_, i) => !unit.playedKeys.includes(handKey(unit.hand[i], i)));
  return planActions(leftover, unit.currentSp).planned;
}

export function createFight({
  hero,
  monster,
  heroCards,
  monsterCards,
  rng = Math.random,
  startingSp = 6,
}) {
  const units = [
    snapshotUnit(hero, "ally", heroCards, rng, startingSp, true),
    snapshotUnit(monster, "enemy", monsterCards, rng, startingSp, true),
  ];
  const order = sortTurnOrder(units).map((u) => u.id);
  const actor = units.find((u) => u.id === order[0]);
  return {
    round: 1,
    units,
    order,
    actedIds: [],
    actorId: actor.id,
    queue: planActions(actor.hand, actor.currentSp).planned,
    queueIndex: -1,
    stage: null,
    allyAuto: true,
  };
}

function playQueuedCard(state, actor, card) {
  const idx = actor.hand.findIndex(
    (c, i) => c.id === card.id && !actor.playedKeys.includes(handKey(c, i)),
  );
  const key = idx >= 0 ? handKey(actor.hand[idx], idx) : `${card.id}:x`;
  actor.playedKeys = [...actor.playedKeys, key];
  actor.cardsPlayedThisTurn += 1;
  actor.currentSp -= Number(card.sp) || 0;
  state.stage = {
    actorId: actor.id,
    actorName: actor.name,
    side: actor.side,
    card,
    media: stageMedia(card),
    hold: true,
  };
}

function startActor(state, actorId) {
  const actor = state.units.find((u) => u.id === actorId);
  state.actorId = actor.id;
  state.queue = rebuildQueue(actor);
  state.queueIndex = -1;
}

function nextUnusedActorId(state) {
  return state.order.find((id) => !state.actedIds.includes(id)) ?? null;
}

function beginRound(state, rng) {
  state.round += 1;
  for (const unit of state.units) {
    unit.currentSp += unit.cardsPlayedThisTurn;
    unit.cardsPlayedThisTurn = 0;
    unit.playedKeys = [];
    unit.hand = drawHand(unit.pool, HAND_SIZE, rng);
  }
  state.actedIds = [];
  state.order = sortTurnOrder(state.units).map((u) => u.id);
  startActor(state, state.order[0]);
}

function finishActorAndAdvance(state, rng, hops = 0) {
  if (hops > state.units.length + 2) return state;
  if (!state.actedIds.includes(state.actorId)) {
    state.actedIds = [...state.actedIds, state.actorId];
  }
  const nextId = nextUnusedActorId(state);
  if (!nextId) {
    beginRound(state, rng);
  } else {
    startActor(state, nextId);
  }
  const actor = state.units.find((u) => u.id === state.actorId);
  if (!state.queue.length) {
    return finishActorAndAdvance(state, rng, hops + 1);
  }
  if (actor.side === "enemy" || actor.auto) {
    state.queueIndex = 0;
    playQueuedCard(state, actor, state.queue[0]);
  }
  return state;
}

/**
 * Unico avanzamento. Niente timer: lo stage resta finché non chiami di nuovo.
 * Mostro e alleato in auto: gioca la prossima carta in coda.
 * Alleato manuale: sblocca la scelta della prossima carta, senza togliere lo still.
 */
export function continueFight(state, rng = Math.random) {
  const next = structuredClone(state);
  const actor = next.units.find((u) => u.id === next.actorId);
  actor.auto = actor.side === "enemy" ? true : next.allyAuto;

  if (actor.side === "ally" && !actor.auto) {
    if (next.stage) next.stage.hold = false;
    const leftover = rebuildQueue(actor);
    if (!leftover.length) return finishActorAndAdvance(next, rng);
    return next;
  }

  const upcoming = next.queueIndex + 1;
  if (upcoming < next.queue.length) {
    next.queueIndex = upcoming;
    playQueuedCard(next, actor, next.queue[upcoming]);
    return next;
  }
  return finishActorAndAdvance(next, rng);
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
  const actor = next.units.find((u) => u.id === next.actorId);
  if (!actor || actor.side !== "ally" || next.allyAuto) return state;
  if (next.stage?.hold) return state;
  if (actor.currentSp <= 0) return state;
  const idx = actor.hand.findIndex(
    (c, i) => c.id === cardId && !actor.playedKeys.includes(handKey(c, i)),
  );
  if (idx < 0) return state;
  const card = actor.hand[idx];
  if ((Number(card.sp) || 0) > actor.currentSp) return state;
  playQueuedCard(next, actor, card);
  next.queue = rebuildQueue(actor);
  next.queueIndex = Math.max(0, actor.playedKeys.length - 1);
  return next;
}

export function currentActor(state) {
  return state.units.find((u) => u.id === state.actorId) ?? null;
}

export function unitBySide(state, side) {
  return state.units.find((u) => u.side === side) ?? null;
}

/** Prossimo di quel lato che deve ancora agire in questo round. */
export function nextOfSide(state, side) {
  const upcomingId = state.order.find((id) => {
    const unit = state.units.find((u) => u.id === id);
    return unit?.side === side && !state.actedIds.includes(id);
  });
  if (upcomingId) return state.units.find((u) => u.id === upcomingId) ?? null;
  return unitBySide(state, side);
}
