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
    <div className="mt-2" data-testid="now-actor-life">
      <div className="flex justify-between text-[10px] uppercase tracking-[0.16em] text-[var(--muted)] mb-1">
        <span>Vita</span>
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
    return `${stage.actorName} è immobilizzato. Turno saltato. AP conservati (${stage.apLeft}).`;
  }
  if (stage.passed) {
    return `${stage.actorName} passa. AP conservati (${stage.apLeft}).`;
  }
  if (!stage.card) return "";
  const bits = [`${stage.actorName} · ${stage.card.name}`];
  if (stage.missed) bits.push("mancato");
  else {
    bits.push(`danno ${stage.damage ?? 0}`);
    const fx = appliedEffect(stage.card);
    if (fx) {
      bits.push(`applica ${fx.name} (${fx.pct}%): ${fx.doesIt}`);
      bits.push(stage.resisted ? "resistito" : "colpito");
    }
  }
  bits.push(
    `AP −${stage.spent ?? stage.card.sp}${stage.recovered ? ` · +${stage.recovered}` : ""} · restano ${stage.apLeft}`,
  );
  return bits.join(" · ");
}

function actorHint(actor, fight, boundNow) {
  if (!actor) return null;
  if (boundNow) {
    return `Tocca a ${actor.name}, ma è immobilizzato. Continua salta il turno.`;
  }
  if (actor.actionsThisTurn >= 1) {
    return `Carta giocata. Continua chiude il turno. AP restanti: ${actor.currentAp}.`;
  }
  if (actor.side === "enemy") {
    return `Tocca a ${actor.name}. Continua: una carta a caso, o passa e tiene gli AP.`;
  }
  if (fight.allyAuto) {
    return `Tocca a ${actor.name}. Continua: una carta. Skip turn passa.`;
  }
  return `Tocca a ${actor.name}. Una carta o Skip turn. Il costo è il danno.`;
}

function HandList({ unit, acting, onPick }) {
  const clickable =
    acting &&
    unit.side === "ally" &&
    !unit.auto &&
    (unit.actionsThisTurn || 0) === 0 &&
    !hasStatus(unit, "bound");
  return (
    <div className="grid grid-cols-2 gap-1.5" data-testid={`${unit.side}-hand`}>
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
              className="w-full block"
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
    <div className="min-h-screen flex flex-col" data-testid="combat-root">
      <header className="px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between gap-3">
        <Link href="/" className="display text-2xl text-[var(--ink)]">
          Fantasy Empire
        </Link>
        <nav className="flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-[var(--gold)]">
          <Link href="/play/catalog">Catalogo</Link>
          <span>Combattimento</span>
        </nav>
      </header>

      <div className="combat-board px-3 sm:px-5 pb-6 flex-1" data-testid="combat-layout-split">
        <div className="turn-bar frame rounded-xl px-3 py-2" data-testid="turn-bar">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)] mb-2">
            Turno {fight.round} · una carta ciascuno · AP non spesi restano
          </p>
          <ol className="flex items-stretch gap-2 overflow-x-auto">
            {fight.order.map((id, i) => {
              const unit = fight.units.find((u) => u.id === id);
              const active = id === fight.actorId;
              const done = fight.actedIds.includes(id);
              return (
                <li
                  key={id}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1 min-w-[9.5rem] border ${
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
                      className="h-10 w-10 rounded-full object-cover object-top"
                    />
                  ) : null}
                  <span>
                    <span className="block text-sm leading-tight">{unit?.name}</span>
                    <span className="block text-[10px] uppercase tracking-wider text-[var(--muted)]">
                      {unit?.side === "enemy" ? "Nemico" : "Alleato"} · AP {unit?.currentAp} · +
                      {unit?.apGain}/turno
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="now-actor frame rounded-xl overflow-hidden flex flex-col" data-testid="now-actor">
          <div className="now-actor-art">
            {actor?.body || actor?.portrait ? (
              <img
                src={actor.body || actor.portrait}
                alt={actor.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            ) : null}
          </div>
          <div className="p-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)] m-0">Di turno</p>
            <p className="display text-3xl m-0 mt-1">{actor?.name}</p>
            <p className="text-xs text-[var(--muted)] m-0 mt-1" data-testid="now-actor-status">
              {actor?.side === "enemy" ? "Nemico" : "Alleato"}
              {" · "}
              AP {actor?.currentAp}
              {" · +"}
              {actor?.apGain}/turno
            </p>
            {actor ? <LifeRow unit={actor} /> : null}
            <StatusBadges unit={actor} testId="now-actor-effects" />
          </div>
        </aside>

        <section className="action-stage frame rounded-xl overflow-hidden flex flex-col">
          <div className="action-frame" data-testid="stage">
            {media?.type === "video" && media.src ? (
              <video
                key={media.src + (lastCard?.id ?? "")}
                src={media.src}
                className="absolute inset-0 w-full h-full object-contain"
                controls
                playsInline
                muted
              />
            ) : media?.src ? (
              <img
                src={media.src}
                alt={lastCard?.name ?? "Azione"}
                className="absolute inset-0 w-full h-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] m-0">
                  Video / immagine dell azione
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

        <aside className="last-card frame rounded-xl p-3" data-testid="last-card">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold)] m-0 mb-2">
            Ultima carta
          </p>
          {lastCard ? (
            <div className="stage-art rounded-lg mx-auto">
              <img
                src={lastCard.public?.art}
                alt={lastCard.name}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          ) : (
            <p className="text-xs text-[var(--muted)] m-0">Nessuna carta giocata in questo turno.</p>
          )}
          {lastCard ? (
            <p className="display text-xl m-0 mt-2 text-center">{lastCard.name}</p>
          ) : null}
        </aside>

        <section className="result-col frame rounded-xl p-3 flex flex-col gap-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold)] m-0">
            Quello che succede
          </p>
          <p className="text-sm leading-relaxed m-0" data-testid="stage-ap">
            {stage?.card || stage?.passed
              ? stageLine(stage)
              : "Una carta a turno. Il costo è il danno."}
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed m-0" data-testid="stage-rules">
            {lastCard ? cardAppliesLine(lastCard) : ""}
          </p>
          <p className="text-xs text-[var(--muted)] m-0">{actorHint(actor, fight, boundNow)}</p>
          <div className="flex items-center gap-2 mt-auto pt-2">
            <button
              type="button"
              className="ghost-btn"
              data-testid="skip-btn"
              disabled={!canSkipTurn(fight)}
              title={
                canSkipTurn(fight)
                  ? "Passa senza giocare. Gli AP restano."
                  : boundNow
                    ? "Immobilizzato: Continua salta il turno."
                    : "Il mostro gioca a caso: Skip turn è spento."
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
              Continua
            </button>
          </div>
        </section>

        <section className="next-hand frame rounded-xl p-3" data-testid="next-hand">
          <div className="flex items-end justify-between gap-2 mb-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold)] m-0">
                Prossimo di turno
              </p>
              <h2 className="display text-2xl m-0 mt-1">{upcoming?.name ?? "—"}</h2>
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
  );
}
