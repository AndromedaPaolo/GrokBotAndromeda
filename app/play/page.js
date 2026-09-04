/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import { getCatalog } from "@/lib/catalog";

export const metadata = {
  title: "Play — Fantasy Empire",
};

const STARTER_CARDS = ["slap", "kiss", "grab", "tease", "pin", "whisper"];
const TENTACLE_CARDS = [
  "tentacle_lash",
  "tentacle_coil",
  "tentacle_slam",
  "tentacle_grasp",
  "tentacle_ink",
  "tentacle_birth",
];

function CardGrid({ cards }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
      {cards.map((card) => (
        <figure key={card.id} className="m-0">
          <img
            src={card.public?.art}
            alt={`${card.name}: ${card.text}`}
            className="w-full rounded-lg border border-[var(--line)]"
          />
        </figure>
      ))}
    </div>
  );
}

export default async function PlayPage() {
  const { characters, cards } = await getCatalog();
  const hero = characters.find((c) => c.id === "hero_selene");
  const monster = characters.find((c) => c.id === "monster_tentacle");
  const hand = STARTER_CARDS.map((id) => cards.find((c) => c.id === id)).filter(Boolean);
  const tentacleHand = TENTACLE_CARDS.map((id) => cards.find((c) => c.id === id)).filter(
    Boolean,
  );

  return (
    <main className="min-h-screen">
      <header className="max-w-6xl mx-auto px-6 pt-10 flex items-center justify-between">
        <Link href="/" className="display text-2xl text-[var(--ink)]">
          Fantasy Empire
        </Link>
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Preview /play</span>
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
            Six English cards. Cost top-left, action in the frame, text at the bottom. No body
            zone.
          </p>
          <CardGrid cards={hand} />
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
            English, no body zone. Birth is the Origin card: it summons this monster and grows
            +1 SP.
          </p>
          <CardGrid cards={tentacleHand} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
