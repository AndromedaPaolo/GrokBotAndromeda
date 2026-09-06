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

/** Malus sull'avversario. Non stackano. Blind/Bound si consumano; Dazed/Wound durano lo scontro. */
export const STATUSES = {
  blind: {
    id: "blind",
    name: "Blind",
    it: "Accecato",
    hint: "La prossima azione manca",
  },
  bound: {
    id: "bound",
    name: "Bound",
    it: "Immobilizzato",
    hint: "Salta il prossimo turno",
  },
  dazed: {
    id: "dazed",
    name: "Dazed",
    it: "Stordito",
    hint: "Agisce per ultimo",
  },
  wound: {
    id: "wound",
    name: "Wound",
    it: "Ferita",
    hint: "+1 danno subito",
  },
};

export const CATEGORIES = {
  normal: {
    id: "normal",
    name: "Normal",
    chance: 0.2,
    where: "Carte iniziali di un personaggio",
  },
  fusion: {
    id: "fusion",
    name: "Fusion",
    chance: 0.2,
    where: "Fusioni di carte",
  },
  bond: {
    id: "bond",
    name: "Bond",
    chance: 0.8,
    where: "Eventi speciali",
  },
  special: {
    id: "special",
    name: "Special",
    chance: 0.8,
    where: "Solo ai boss",
  },
  origin: {
    id: "origin",
    name: "Origin",
    chance: 0.8,
    where: "Nascita di un mostro",
  },
  unique: {
    id: "unique",
    name: "Unique",
    chance: 1,
    where: "Super boss delle invasioni",
  },
};

const HIGH_CATEGORIES = new Set(["bond", "special", "origin"]);

export function cardCategory(card) {
  const raw = String(card?.category || "").toLowerCase();
  if (CATEGORIES[raw]) return raw;
  if (card?.kind === "monster_origin" || card?.kind === "origin") return "origin";
  if (card?.kind === "bond") return "bond";
  if (card?.kind === "special") return "special";
  if (card?.kind === "unique") return "unique";
  if (card?.kind === "fusion") return "fusion";
  return "normal";
}

function parentCards(card, catalog) {
  const refs = Array.isArray(card?.fusionOf) ? card.fusionOf : [];
  return refs.map((ref) => {
    if (ref && typeof ref === "object") return ref;
    return catalog.find((c) => c.id === ref) ?? { category: "normal" };
  });
}

/**
 * % di applicare status/drain (non il danno).
 * Normal e Fusion di due Normal: 20%. Bond/Special/Origin: 80%. Unique: 100%.
 * Fusion mista: prende la categoria più alta tra i genitori.
 */
export function effectChance(card, catalog = []) {
  return effectChanceFrom(card, catalog, new Set());
}

function effectChanceFrom(card, catalog, seen) {
  const cat = cardCategory(card);
  if (cat === "unique") return CATEGORIES.unique.chance;
  if (HIGH_CATEGORIES.has(cat)) return CATEGORIES[cat].chance;
  if (cat !== "fusion") return CATEGORIES.normal.chance;

  const id = card.id ?? JSON.stringify(card.fusionOf ?? []);
  if (seen.has(id)) return CATEGORIES.normal.chance;
  seen.add(id);

  const parents = parentCards(card, catalog);
  if (!parents.length) return CATEGORIES.normal.chance;
  const chances = parents.map((parent) => effectChanceFrom(parent, catalog, seen));
  return Math.max(...chances);
}

export function effectChanceLabel(chance) {
  return `${Math.round(Number(chance) * 100)}%`;
}

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

export function hasStatus(unit, id) {
  return Boolean(unit && (unit.alterations ?? []).includes(id));
}

export function addStatus(unit, id) {
  if (!unit || !STATUSES[id]) return false;
  if (!unit.alterations) unit.alterations = [];
  if (unit.alterations.includes(id)) return false;
  unit.alterations.push(id);
  return true;
}

export function takeStatus(unit, id) {
  if (!hasStatus(unit, id)) return false;
  unit.alterations = unit.alterations.filter((s) => s !== id);
  return true;
}

export function foeOf(state, actor) {
  return state.units.find((u) => u.side !== actor.side) ?? null;
}

export function statusLabel(id) {
  return STATUSES[id]?.it ?? id;
}

export function sortTurnOrder(units) {
  return [...units].sort((a, b) => {
    const aDazed = hasStatus(a, "dazed") ? 1 : 0;
    const bDazed = hasStatus(b, "dazed") ? 1 : 0;
    if (aDazed !== bDazed) return aDazed - bDazed;
    if (a.currentAp !== b.currentAp) return a.currentAp - b.currentAp;
    if (a.side !== b.side) return a.side === "enemy" ? -1 : 1;
    return a.id.localeCompare(b.id);
  });
}

export function stageMedia(card) {
  if (card?.public?.video) return { type: "video", src: card.public.video };
  return { type: "image", src: card?.public?.art ?? null };
}

export function cardApCost(card) {
  return Math.max(0, Number(card?.sp) || 0);
}

export function cardApRecover(card) {
  return Math.max(0, Number(card?.recoverAp) || 0);
}

function handKey(card, index) {
  return `${card.id}:${index}`;
}

export function affordableOptions(unit) {
  return unit.hand
    .map((card, index) => ({ card, index, key: handKey(card, index) }))
    .filter(
      ({ card, key }) =>
        !unit.playedKeys.includes(key) && cardApCost(card) <= unit.currentAp,
    );
}

/**
 * Una carta, non tutta la barra. Se può lasciare AP, spesso lo fa.
 * Se ogni carta svuoterebbe gli AP, a volte passa e se li tiene.
 */
export function chooseCard(unit, rng = Math.random) {
  const opts = affordableOptions(unit);
  if (!opts.length) return null;

  const partial = opts.filter(({ card }) => cardApCost(card) < unit.currentAp);
  if (!partial.length && rng() < 0.45) return null;

  const pool = partial.length && rng() < 0.7 ? partial : opts;
  if (unit.side === "enemy") return pool[Math.floor(rng() * pool.length)].card;
  return pool[0].card;
}

function snapshotUnit(character, side, cards, rng, auto) {
  const hand = drawHand(cards, HAND_SIZE, rng);
  const assigned = cards.length || HAND_SIZE;
  const apGain = apGainFromPool(assigned);
  const life = cards.reduce((sum, card) => sum + (Number(card.sp) || 0), 0);
  return {
    id: character.id,
    name: character.name,
    side,
    auto,
    portrait: character.public?.portrait ?? null,
    body: character.public?.body ?? null,
    currentAp: apGain,
    apGain,
    life,
    hand,
    pool: cards,
    playedKeys: [],
    actionsThisTurn: 0,
    alterations: [],
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

function fightCatalog(state) {
  const out = [];
  for (const unit of state.units ?? []) {
    if (Array.isArray(unit.pool)) out.push(...unit.pool);
    if (Array.isArray(unit.hand)) out.push(...unit.hand);
  }
  return out;
}

function playCard(state, actor, card, rng = Math.random) {
  const idx = actor.hand.findIndex(
    (c, i) => c.id === card.id && !actor.playedKeys.includes(handKey(c, i)),
  );
  const key = idx >= 0 ? handKey(actor.hand[idx], idx) : `${card.id}:x`;
  actor.playedKeys = [...actor.playedKeys, key];
  actor.actionsThisTurn = (actor.actionsThisTurn || 0) + 1;

  const spent = cardApCost(card);
  const recovered = cardApRecover(card);
  actor.currentAp = Math.max(0, actor.currentAp - spent) + recovered;

  const foe = foeOf(state, actor);
  const missed = takeStatus(actor, "blind");
  const catalog = fightCatalog(state);
  const chance = effectChance(card, catalog);
  const hasFx = Boolean(card.status) || Math.max(0, Number(card.drainAp) || 0) > 0;
  let damage = 0;
  let drained = 0;
  const applied = [];
  let effectHit = false;
  let resisted = false;

  if (!missed && foe) {
    damage = spent;
    if (hasStatus(foe, "wound")) damage += 1;
    foe.life = Math.max(0, foe.life - damage);
    effectHit = hasFx && rng() < chance;
    resisted = hasFx && !effectHit;
    if (effectHit) {
      if (addStatus(foe, card.status)) applied.push(card.status);
      const drain = Math.max(0, Number(card.drainAp) || 0);
      if (drain) {
        const before = foe.currentAp;
        foe.currentAp = Math.max(0, foe.currentAp - drain);
        drained = before - foe.currentAp;
      }
    }
  }

  state.stage = {
    actorId: actor.id,
    actorName: actor.name,
    side: actor.side,
    card,
    media: stageMedia(card),
    hold: true,
    passed: false,
    spent,
    recovered,
    apLeft: actor.currentAp,
    missed,
    damage,
    drained,
    applied,
    foeName: foe?.name ?? null,
    boundSkip: false,
    chance,
    effectHit,
    resisted,
  };
}

function markPassed(state, actor, extra = {}) {
  state.stage = {
    actorId: actor.id,
    actorName: actor.name,
    side: actor.side,
    card: null,
    media: null,
    hold: false,
    passed: true,
    spent: 0,
    recovered: 0,
    apLeft: actor.currentAp,
    missed: false,
    damage: 0,
    drained: 0,
    applied: [],
    foeName: null,
    boundSkip: false,
    chance: 0,
    effectHit: false,
    resisted: false,
    ...extra,
  };
}

function startActor(state, actorId) {
  const actor = state.units.find((u) => u.id === actorId);
  state.actorId = actor.id;
  actor.actionsThisTurn = 0;
}

function nextUnusedActorId(state) {
  return state.order.find((id) => !state.actedIds.includes(id)) ?? null;
}

function beginRound(state, rng) {
  state.round += 1;
  for (const unit of state.units) {
    unit.currentAp += unit.apGain;
    unit.playedKeys = [];
    unit.actionsThisTurn = 0;
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

function endActorTurn(state, rng) {
  if (state.stage) state.stage.hold = false;
  passToNextActor(state, rng);
}

function consumeBoundIfAny(state, actor, rng) {
  if (!takeStatus(actor, "bound")) return false;
  markPassed(state, actor, { boundSkip: true });
  passToNextActor(state, rng);
  return true;
}

export function currentActor(state) {
  return state.units.find((u) => u.id === state.actorId) ?? null;
}

export function canSkipTurn(state) {
  const actor = currentActor(state);
  return Boolean(actor && actor.side === "ally" && !hasStatus(actor, "bound"));
}

/**
 * Passa il turno senza giocare. AP non spesi restano.
 * Sul mostro non fa nulla: la scelta è random, Skip è spento.
 */
export function skipTurn(state, rng = Math.random) {
  if (!canSkipTurn(state)) return state;
  const next = structuredClone(state);
  const actor = currentActor(next);
  markPassed(next, actor);
  passToNextActor(next, rng);
  return next;
}

/**
 * Avanza un'azione. Niente timer: lo still resta finché non chiami di nuovo.
 * Una carta a turno; il click successivo chiude il turno e tiene gli AP restanti.
 * Mostro: a caso gioca una carta o passa per tenersi gli AP.
 * Bound: il turno viene saltato. Blind: l'azione manca, niente effetto sull'avversario.
 */
export function continueFight(state, rng = Math.random) {
  const next = structuredClone(state);
  const actor = currentActor(next);
  actor.auto = actor.side === "enemy" ? true : next.allyAuto;

  if ((actor.actionsThisTurn || 0) >= 1) {
    endActorTurn(next, rng);
    return next;
  }

  if (consumeBoundIfAny(next, actor, rng)) return next;

  if (actor.side === "ally" && !actor.auto) {
    if (next.stage) next.stage.hold = false;
    return next;
  }

  const pick = chooseCard(actor, rng);
  if (pick) {
    playCard(next, actor, pick, rng);
    return next;
  }
  markPassed(next, actor);
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

export function playManualCard(state, cardId, rng = Math.random) {
  const next = structuredClone(state);
  const actor = currentActor(next);
  if (!actor || actor.side !== "ally" || next.allyAuto) return state;
  if ((actor.actionsThisTurn || 0) >= 1) return state;
  if (hasStatus(actor, "bound")) return state;
  if (next.stage?.hold) return state;
  const opts = affordableOptions(actor).filter(({ card }) => card.id === cardId);
  if (!opts.length) return state;
  playCard(next, actor, opts[0].card, rng);
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
