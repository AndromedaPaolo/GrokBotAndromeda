import Link from "next/link";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "Gioca — Fantasy Empire",
};

export default function PlayPage() {
  return (
    <main className="min-h-screen">
      <header className="max-w-5xl mx-auto px-6 pt-10 flex items-center justify-between">
        <Link href="/" className="display text-2xl text-[var(--ink)]">
          Fantasy Empire
        </Link>
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Anteprima /play</span>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="display text-5xl">La città aspetta il GDD.</h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)] leading-relaxed">
          L’account beta e il database D1 arrivano nel Build 1. Qui vedi lo scheletro:
          se manca una clip, il combattimento resta 2D. Non c’è checkout.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-10">
          <div className="frame rounded-2xl p-6 min-h-56">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Città</p>
            <p className="display text-3xl mt-2">Edifici spenti</p>
            <p className="text-[var(--muted)] mt-2">Produzione carte e party: in arrivo.</p>
          </div>
          <div className="frame rounded-2xl p-6 min-h-56">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Carte eroe</p>
            <div className="grid grid-cols-4 gap-2 mt-4 text-center text-sm">
              {["Head", "Chest", "Arms", "Legs"].map((z) => (
                <div key={z} className="border border-[var(--line)] rounded-lg py-6">
                  {z}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
