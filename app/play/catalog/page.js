/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import { getCatalog } from "@/lib/catalog";
import {
  CATEGORIES,
  HERO_CARD_IDS,
  TENTACLE_CARD_IDS,
  cardCategory,
  cardEffectChance,
  effectChanceLabel,
} from "@/lib/combat";

export const metadata = {
  title: "Catalogo — Fantasy Empire",
};

function CardGrid({ cards, catalog }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
      {cards.map((card) => {
        const cat = cardCategory(card);
        const chance = cardEffectChance(card, catalog);
        return (
          <figure key={card.id} className="m-0">
            <img
              src={card.public?.art}
              alt={`${card.name}: ${card.text}`}
              className="w-full rounded-lg border border-[var(--line)]"
            />
            <figcaption className="mt-2">
              <p className="display text-xl m-0">{card.name}</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold)] m-0 mt-1">
                {CATEGORIES[cat]?.name ?? cat} · effetto {effectChanceLabel(chance)} · danno = costo
              </p>
              <p className="text-xs text-[var(--muted)] m-0 mt-1 leading-relaxed">{card.text}</p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

export default async function CatalogPage() {
  const { characters, cards } = await getCatalog();
  const hero = characters.find((c) => c.id === "hero_selene");
  const monster = characters.find((c) => c.id === "monster_tentacle");
  const hand = HERO_CARD_IDS.map((id) => cards.find((c) => c.id === id)).filter(Boolean);
  const tentacleHand = TENTACLE_CARD_IDS.map((id) => cards.find((c) => c.id === id)).filter(
    Boolean,
  );

  return (
    <main className="min-h-screen">
      <header className="max-w-6xl mx-auto px-6 pt-10 flex items-center justify-between">
        <Link href="/" className="display text-2xl text-[var(--ink)]">
          Fantasy Empire
        </Link>
        <Link href="/play" className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
          Combattimento
        </Link>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-[280px_1fr] gap-10">
        <aside className="frame rounded-2xl overflow-hidden">
          {hero?.public?.body ? (
            <img
              src={hero.public.body}
              alt={hero.name}
              className="w-full aspect-[3/4] object-cover object-top"
            />
          ) : null}
          <div className="p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">First hero</p>
            <h1 className="display text-4xl mt-1">{hero?.name ?? "Selene"}</h1>
            <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
              Invented adult. Lingerie full-body. Cards show the action, not her.
            </p>
          </div>
        </aside>
        <div>
          <h2 className="display text-4xl">Starter hand</h2>
          <p className="text-[var(--muted)] mt-2 max-w-xl">
            Six English Normal cards. Cost is damage. Effects land 20% of the time. Bound (skip
            a turn) is Bond (rare) or Unique only.
          </p>
          <CardGrid cards={hand} catalog={cards} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-12 grid lg:grid-cols-[280px_1fr] gap-10">
        <aside className="frame rounded-2xl overflow-hidden">
          {monster?.public?.body ? (
            <img
              src={monster.public.body}
              alt={monster.name}
              className="w-full aspect-[3/4] object-cover object-top"
            />
          ) : null}
          <div className="p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">First monster</p>
            <h2 className="display text-4xl mt-1">{monster?.name ?? "Tentacle"}</h2>
            <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
              Fantasy threat, not porn. Five strikes plus Birth, the Origin card.
            </p>
          </div>
        </aside>
        <div>
          <h2 className="display text-4xl">Tentacle cards</h2>
          <p className="text-[var(--muted)] mt-2 max-w-xl">
            English, no body zone. Cost is damage. Five Normal strikes (effect 20%) plus Birth,
            Origin (effect 80%). Bound (skip a turn) is Bond, rarely, or Unique, always.
          </p>
          <CardGrid cards={tentacleHand} catalog={cards} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
