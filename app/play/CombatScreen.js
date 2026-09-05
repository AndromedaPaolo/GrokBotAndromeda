/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  canSkipTurn,
  continueFight,
  createFight,
  currentActor,
  nextOfSide,
  playManualCard,
  setAllyAuto,
  skipTurn,
} from "@/lib/combat";

function HandRow({ unit, acting, onPick }) {
  const clickable =
    acting && unit.side === "ally" && !unit.auto && (unit.actionsThisTurn || 0) === 0;
  return (
    <div
      className="grid grid-cols-6 gap-1.5 sm:gap-2"
      data-testid={`${unit.side}-hand`}
    >
      {unit.hand.map((card, index) => {
        const key = `${card.id}:${index}`;
        const spent = unit.playedKeys.includes(key);
        return (
          <button
            key={key}
            type="button"
            disabled={!clickable || spent}
            onClick={() => onPick?.(card.id)}
            className={`relative rounded-md overflow-hidden border p-0 ${
              spent
                ? "border-[var(--line)] opacity-35"
                : acting
                  ? "border-[var(--gold)]"
                  : "border-[var(--line)]"
            } ${clickable && !spent ? "cursor-pointer" : "cursor-default"}`}
          >
            <img src={card.public?.art} alt={card.name} className="w-full block" />
            <span className="sr-only">{card.name}</span>
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
  const enemy = nextOfSide(fight, "enemy");
  const ally = nextOfSide(fight, "ally");
  const stage = fight.stage;
  const media = stage?.media;

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

      <div className="combat-board px-3 sm:px-5 pb-6 flex-1">
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
          <div className="relative flex-1 min-h-[220px] bg-black">
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
            <p className="display text-2xl m-0 mt-1">{actor?.name}</p>
            <p className="text-xs text-[var(--muted)] m-0 mt-1" data-testid="now-actor-status">
              {actor?.side === "enemy" ? "Nemico" : "Alleato"}
              {" · "}
              AP {actor?.currentAp}
              {" · +"}
              {actor?.apGain}/turno
              {actor?.life != null ? ` · Life ${actor.life}` : ""}
            </p>
            <p className="text-xs m-0 mt-2">
              {actor?.side === "enemy"
                ? "In azione. Una carta, oppure passa e tiene gli AP."
                : fight.allyAuto
                  ? "In azione. Auto: una carta, AP restanti al round dopo."
                  : "In azione. Una carta o Skip. Gli AP non spesi restano."}
            </p>
          </div>
        </aside>

        <section className="enemy-row">
          <div className="flex items-end justify-between gap-3 mb-2">
            <h2 className="display text-2xl sm:text-3xl m-0">Prossimo nemico</h2>
            <p className="text-xs text-[var(--muted)] m-0">{enemy?.name} · 6 carte dalla pool</p>
          </div>
          {enemy ? (
            <HandRow unit={enemy} acting={actor?.id === enemy.id} />
          ) : null}
        </section>

        <section className="ally-row">
          <div className="flex items-end justify-between gap-3 mb-2">
            <h2 className="display text-2xl sm:text-3xl m-0">Prossimo alleato</h2>
            <label className="text-xs text-[var(--muted)] flex items-center gap-2">
              <input
                type="checkbox"
                checked={fight.allyAuto}
                onChange={onAuto}
                data-testid="auto-toggle"
              />
              Auto combat
            </label>
          </div>
          {ally ? (
            <HandRow unit={ally} acting={actor?.id === ally.id} onPick={onPick} />
          ) : null}
        </section>

        <aside className="stage-col frame rounded-xl overflow-hidden flex flex-col">
          <div
            className="relative bg-black aspect-video overflow-hidden shrink-0"
            data-testid="stage"
          >
            {media?.type === "video" && media.src ? (
              <video
                key={media.src + (stage?.card?.id ?? "")}
                src={media.src}
                className="absolute inset-0 w-full h-full object-contain"
                controls
                playsInline
                muted
              />
            ) : media?.src ? (
              <img
                src={media.src}
                alt={stage?.card?.name ?? "Azione"}
                className="absolute inset-0 w-full h-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center gap-6 px-4">
                {enemy?.portrait ? (
                  <img
                    src={enemy.portrait}
                    alt={enemy.name}
                    className="h-28 w-28 rounded-full object-cover object-top opacity-90"
                  />
                ) : null}
                <span className="display text-3xl text-[var(--gold)]">vs</span>
                {ally?.portrait ? (
                  <img
                    src={ally.portrait}
                    alt={ally.name}
                    className="h-28 w-28 rounded-full object-cover object-top opacity-90"
                  />
                ) : null}
              </div>
            )}
            {stage?.card ? (
              <div className="absolute left-3 bottom-3 right-3 flex justify-between gap-2 text-xs">
                <span className="rounded-full bg-black/70 px-3 py-1" data-testid="stage-ap">
                  {`${stage.actorName} · ${stage.card.name} · AP −${stage.spent ?? stage.card.sp}${
                    stage.recovered ? ` · +${stage.recovered}` : ""
                  } · restano ${stage.apLeft}`}
                </span>
                <span className="rounded-full bg-black/70 px-3 py-1 text-[var(--gold)]">
                  {media?.type === "video" ? "Video" : "2D"}
                </span>
              </div>
            ) : (
              <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-[var(--muted)]">
                {stage?.passed
                  ? `${stage.actorName} passa. AP conservati (${stage.apLeft}).`
                  : "Una carta a turno. Continua tiene lo still, poi chiude il turno."}
              </p>
            )}
          </div>
          <div className="p-3 mt-auto flex items-end justify-between gap-3">
            <p className="text-xs text-[var(--muted)] m-0 max-w-[14rem]">
              {actor
                ? actor.actionsThisTurn >= 1
                  ? `Carta giocata. Continua chiude il turno. AP restanti: ${actor.currentAp}.`
                  : actor.side === "enemy"
                    ? `Tocca a ${actor.name}. Continua: una carta a caso, o passa e tiene gli AP.`
                    : fight.allyAuto
                      ? `Tocca a ${actor.name}. Continua: una carta. Skip turn passa.`
                      : `Tocca a ${actor.name}. Una carta o Skip turn. Non devi spendere tutti gli AP.`
                : null}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="ghost-btn"
                data-testid="skip-btn"
                disabled={!canSkipTurn(fight)}
                title={
                  canSkipTurn(fight)
                    ? "Passa senza giocare. Gli AP restano."
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
          </div>
        </aside>
      </div>
    </div>
  );
}
