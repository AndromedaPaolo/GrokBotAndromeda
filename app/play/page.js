import CombatScreen from "./CombatScreen";
import { getCatalog } from "@/lib/catalog";
import { HERO_CARD_IDS, TENTACLE_CARD_IDS } from "@/lib/combat";

export const metadata = {
  title: "Play — Fantasy Empire",
};

export default async function PlayPage() {
  const { characters, cards } = await getCatalog();
  const hero = characters.find((c) => c.id === "hero_selene");
  const monster = characters.find((c) => c.id === "monster_tentacle");
  const heroCards = HERO_CARD_IDS.map((id) => cards.find((c) => c.id === id)).filter(Boolean);
  const monsterCards = TENTACLE_CARD_IDS.map((id) => cards.find((c) => c.id === id)).filter(
    Boolean,
  );

  return (
    <CombatScreen
      hero={hero}
      monster={monster}
      heroCards={heroCards}
      monsterCards={monsterCards}
    />
  );
}
