/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  STATUSES,
  appliedEffect,
  canSkipTurn,
  cardAppliesLine,
  effectBadge,
  cardRulesText,
  continueFight,
  createFight,
  currentActor,
  hasStatus,
  nextToAct,
  playManualCard,
  setAllyAuto,
  skipTurn,
  statusLabel,
} from "@/lib/combat";

function StatusBadges({ unit, testId }) {
  const ids = unit?.alterations ?? [];
  if (!ids.length) return null;
  return (
    <p className="flex flex-wrap gap-1 mt-1 mb-0" data-testid={testId}>
      {ids.map((id) => (
        <span
          key={id}
          title={STATUSES[id]?.hint}
          className="rounded-full border border-[var(--gold)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--gold)]"
        >
          {statusLabel(id)}
        </span>
      ))}
    </p>
  );
}

function LifeRow({ unit }) {
  const max = Math.max(1, Number(unit?.maxLife) || Number(unit?.life) || 1);
  const cur = Math.max(0, Number(unit?.life) || 0);
  const pct = Math.min(100, Math.round((cur / max) * 100));
  return (
    <div className="life-row" data-testid="now-actor-life">
      <div className="flex justify-between text-[10px] uppercase tracking-[0.16em] text-[var(--muted)] mb-1">
        <span>Life</span>
        <span>
          {cur}/{max}
        </span>
      </div>
      <div className="life-track">
        <div className="life-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function stageLine(stage) {
  if (stage.passed && stage.boundSkip) {
    return `${stage.actorName} is bound. Turn skipped. AP kept (${stage.apLeft}).`;
  }
  if (stage.passed) {
    return `${stage.actorName} passes. AP kept (${stage.apLeft}).`;
  }
  if (!stage.card) return "";
  const bits = [`${stage.actorName} · ${stage.card.name}`];
  if (stage.missed) bits.push("missed");
  else {
    bits.push(`damage ${stage.damage ?? 0}`);
    const fx = appliedEffect(stage.card);
    if (fx) {
      bits.push(`applies ${fx.name} (${fx.pct}%): ${fx.doesEn}`);
      bits.push(stage.resisted ? "resisted" : "hit");
    }
  }
  bits.push(
    `AP −${stage.spent ?? stage.card.sp}${stage.recovered ? ` · +${stage.recovered}` : ""} · left ${stage.apLeft}`,
  );
  return bits.join(" · ");
}

function actorHint(actor, fight, boundNow) {
  if (!actor) return null;
  if (boundNow) {
    return `${actor.name} is bound. Continue skips the turn.`;
  }
  if (actor.actionsThisTurn >= 1) {
    return `Card played. Continue ends the turn. AP left: ${actor.currentAp}.`;
  }
  if (actor.side === "enemy") {
    return `${actor.name}'s turn. Continue plays a random card, or pass and keep AP.`;
  }
  if (fight.allyAuto) {
    return `${actor.name}'s turn. Continue plays a card. Skip turn passes.`;
  }
  return `${actor.name}'s turn. Play a card or Skip turn. Cost is damage.`;
}

function HandList({ unit, acting, onPick }) {
  const clickable =
    acting &&
    unit.side === "ally" &&
    !unit.auto &&
    (unit.actionsThisTurn || 0) === 0 &&
    !hasStatus(unit, "bound");
  return (
    <div className="hand-grid" data-testid={`${unit.side}-hand`}>
      {unit.hand.map((card, index) => {
        const key = `${card.id}:${index}`;
        const spent = unit.playedKeys.includes(key);
        return (
          <button
            key={key}
            type="button"
            disabled={!clickable || spent}
            onClick={() => onPick?.(card.id)}
            title={cardRulesText(card)}
            className={`relative rounded-md overflow-hidden border p-0 ${
              spent
                ? "border-[var(--line)] opacity-35"
                : acting
                  ? "border-[var(--gold)]"
                  : "border-[var(--line)]"
            } ${clickable && !spent ? "cursor-pointer" : "cursor-default"}`}
          >
            <img
              src={card.public?.art}
              alt={`${card.name}: ${cardRulesText(card)}`}
              className="hand-card-art"
            />
            <span className="absolute inset-x-0 bottom-0 bg-black/75 px-0.5 py-0.5 text-center leading-tight">
              <span className="block text-[8px] sm:text-[9px] text-white truncate">{card.name}</span>
              <span className="block text-[8px] sm:text-[9px] text-[var(--gold)] truncate">
                {effectBadge(card)}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function CombatScreen({ hero, monster, heroCards, monsterCards }) {
  const initial = useMemo(
    () => createFight({ hero, monster, heroCards, monsterCards }),
    [hero, monster, heroCards, monsterCards],
  );
  const [fight, setFight] = useState(initial);

  const actor = currentActor(fight);
  const upcoming = nextToAct(fight);
  const stage = fight.stage;
  const media = stage?.media;
  const boundNow = hasStatus(actor, "bound");
  const lastCard = stage?.card ?? null;
  const recentCards = fight.recentCards ?? [];

  function onContinue() {
    setFight((prev) => continueFight(prev));
  }

  function onSkip() {
    setFight((prev) => skipTurn(prev));
  }

  function onAuto(e) {
    setFight((prev) => setAllyAuto(prev, e.target.checked));
  }

  function onPick(cardId) {
    setFight((prev) => playManualCard(prev, cardId));
  }

  return (
    <div className="combat-root" data-testid="combat-root">
      <header className="combat-header px-4 sm:px-6 flex items-center justify-between gap-3">
        <Link href="/" className="display text-xl text-[var(--ink)]">
          Fantasy Empire
        </Link>
        <nav className="flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-[var(--gold)]">
          <Link href="/play/catalog">Catalog</Link>
          <span>Combat</span>
        </nav>
      </header>

      <div className="combat-board px-3 sm:px-4" data-testid="combat-layout-split">
        <div className="turn-bar frame rounded-xl px-3 py-1.5" data-testid="turn-bar">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)] mb-1">
            Turn {fight.round} · one card each · leftover AP stays
          </p>
          <ol className="flex items-stretch gap-2 overflow-x-auto">
            {fight.order.map((id, i) => {
              const unit = fight.units.find((u) => u.id === id);
              const active = id === fight.actorId;
              const done = fight.actedIds.includes(id);
              return (
                <li
                  key={id}
                  className={`flex items-center gap-2 rounded-lg px-2 py-0.5 min-w-[9rem] border ${
                    active
                      ? "border-[var(--gold)] bg-[color-mix(in_srgb,var(--gold)_14%,transparent)]"
                      : "border-[var(--line)]"
                  } ${done ? "opacity-45" : ""}`}
                >
                  <span className="text-[10px] text-[var(--muted)] w-4">{i + 1}</span>
                  {unit?.portrait ? (
                    <img
                      src={unit.portrait}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover object-top"
                    />
                  ) : null}
                  <span>
                    <span className="block text-sm leading-tight">{unit?.name}</span>
                    <span className="block text-[10px] uppercase tracking-wider text-[var(--muted)]">
                      {unit?.side === "enemy" ? "Enemy" : "Ally"} · AP {unit?.currentAp} · +
                      {unit?.apGain}/turn
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="combat-mid">
          <aside className="now-actor frame rounded-xl overflow-hidden" data-testid="now-actor">
            <div className="now-actor-art">
              {actor?.body || actor?.portrait ? (
                <img
                  src={actor.body || actor.portrait}
                  alt={actor.name}
                  className="now-actor-figure"
                />
              ) : null}
            </div>
            <div className="now-actor-meta">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)] m-0">On turn</p>
              <p className="display text-2xl m-0 mt-0.5">{actor?.name}</p>
              <p className="text-xs text-[var(--muted)] m-0 mt-1" data-testid="now-actor-status">
                {actor?.side === "enemy" ? "Enemy" : "Ally"}
                {" · "}
                AP {actor?.currentAp}
                {" · +"}
                {actor?.apGain}/turn
              </p>
              {actor ? <LifeRow unit={actor} /> : null}
              <StatusBadges unit={actor} testId="now-actor-effects" />
            </div>
          </aside>

          <section className="action-stage frame rounded-xl overflow-hidden">
            <div className="action-frame" data-testid="stage">
              {media?.type === "video" && media.src ? (
                <video
                  key={`${media.src}:${fight.round}:${fight.actorId}:${stage?.apLeft}`}
                  src={media.src}
                  poster={lastCard?.public?.poster || lastCard?.public?.art}
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                  controls
                  playsInline
                  muted
                  autoPlay
                  loop
                  preload="auto"
                  data-testid="stage-video"
                />
              ) : media?.src ? (
                <img
                  src={media.src}
                  alt={lastCard?.name ?? "Action"}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] m-0">
                    Video / action image
                  </p>
                </div>
              )}
              {lastCard ? (
                <span className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--gold)]">
                  {media?.type === "video" ? "Video" : "2D"}
                </span>
              ) : null}
            </div>
          </section>

          <aside className="last-card frame rounded-xl" data-testid="last-card">
            <p className="last-card-label text-[10px] uppercase tracking-[0.18em] text-[var(--gold)]">
              Last cards
            </p>
            <div className="last-card-row">
              {[0, 1, 2].map((i) => {
                const card = recentCards[i];
                return (
                  <div key={card ? `${card.id}:${i}` : `empty-${i}`} className="last-card-slot">
                    {card ? (
                      <>
                        <img
                          src={card.public?.art}
                          alt={card.name}
                          className="last-card-art"
                        />
                        <span className="last-card-name">{card.name}</span>
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="result-col frame rounded-xl flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold)] m-0">
              What happens
            </p>
            <p className="text-sm leading-snug m-0" data-testid="stage-ap">
              {stage?.card || stage?.passed
                ? stageLine(stage)
                : "One card per turn. Cost is damage."}
            </p>
            <p className="text-xs text-[var(--muted)] leading-snug m-0" data-testid="stage-rules">
              {lastCard ? cardAppliesLine(lastCard) : ""}
            </p>
            <p className="text-xs text-[var(--muted)] m-0">{actorHint(actor, fight, boundNow)}</p>
            <div className="flex items-center gap-2 mt-auto pt-1">
              <button
                type="button"
                className="ghost-btn"
                data-testid="skip-btn"
                disabled={!canSkipTurn(fight)}
                title={
                  canSkipTurn(fight)
                    ? "Pass without playing. AP stays."
                    : boundNow
                      ? "Bound: Continue skips the turn."
                      : "The monster plays at random. Skip turn is off."
                }
                onClick={onSkip}
              >
                Skip turn
              </button>
              <button
                type="button"
                className="gold-btn"
                data-testid="continue-btn"
                onClick={onContinue}
              >
                Continue
              </button>
            </div>
          </section>

          <section className="next-hand frame rounded-xl" data-testid="next-hand">
            <div className="flex items-end justify-between gap-2 mb-1">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold)] m-0">
                  Next up
                </p>
                <h2 className="display text-lg m-0 mt-0.5 leading-tight">{upcoming?.name ?? "—"}</h2>
              </div>
              <label className="text-[10px] text-[var(--muted)] flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={fight.allyAuto}
                  onChange={onAuto}
                  data-testid="auto-toggle"
                />
                Auto
              </label>
            </div>
            {upcoming ? (
              <HandList
                unit={upcoming}
                acting={actor?.id === upcoming.id}
                onPick={onPick}
              />
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}
