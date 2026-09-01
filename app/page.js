"use client";

import Link from "next/link";
import AgeGate from "./components/AgeGate";
import SiteFooter from "./components/SiteFooter";

const FAQ = [
  {
    q: "È davvero gratis?",
    a: "Sì. In Fase 0 non si paga, non c’è checkout e non chiediamo un metodo di pagamento “per dopo”.",
  },
  {
    q: "C’è una data di fine beta?",
    a: "No. L’accesso gratuito non ha una data di scadenza. Non è una promessa di gratis per sempre: se un giorno attiveremo i pagamenti, avviso almeno 30 giorni prima. Il save non si cancella in silenzio.",
  },
  {
    q: "Quante clip IA a settimana?",
    a: "Fino a 7 richieste. Le clip già generate si rivedono. Il combattimento non aspetta un video: se manca, vedi 2D.",
  },
  {
    q: "Se un giorno ci sarà un abbonamento?",
    a: "Santuario extra e generazione automatica a nostro carico. Te lo diciamo 30 giorni prima. Niente pay-to-win. I video di azione sono generati da IA.",
  },
];

export default function Home() {
  return (
    <AgeGate>
      <main>
        <header className="max-w-5xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between">
          <p className="display text-2xl">Fantasy Empire</p>
          <span className="text-xs tracking-[0.2em] uppercase border border-[var(--line)] rounded-full px-3 py-1 text-[var(--gold)]">
            18+
          </span>
        </header>

        <section className="max-w-5xl mx-auto px-6 pt-6 pb-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-[var(--gold)]">
              Beta gratuita · Italia
            </p>
            <h1 className="display text-5xl sm:text-6xl leading-[1.05] mt-3">
              Città, carte,
              <br />
              dungeon infiniti.
            </h1>
            <p className="mt-5 text-lg text-[var(--muted)] max-w-xl leading-relaxed">
              Un web game persistente: gestisci la città, fondi le carte, scendi nel
              dungeon. Adulti inventati, SFW sexy. Nessun prezzo in questa pagina.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link className="gold-btn" href="/play">
                Crea account e gioca
              </Link>
              <a className="ghost-btn" href="#faq">
                FAQ
              </a>
            </div>
          </div>
          <div className="frame rounded-2xl overflow-hidden aspect-video grid place-items-center relative">
            <div className="text-center px-6">
              <div className="mx-auto mb-4 h-14 w-14 rounded-full border border-[var(--gold)] grid place-items-center text-[var(--gold)]">
                ▶
              </div>
              <p className="display text-2xl">Trailer in arrivo</p>
              <p className="text-sm text-[var(--muted)] mt-2">
                Play con click, niente autoplay. Animatic 45–75 s quando il file è in{" "}
                <code className="text-[var(--gold)]">/trailer.mp4</code>.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 grid sm:grid-cols-3 gap-4">
          {["Gestione città", "Carte & Bond", "Dungeon / mondo infinito"].map((label) => (
            <div key={label} className="frame rounded-xl px-5 py-6">
              <p className="display text-2xl">{label}</p>
            </div>
          ))}
        </section>

        <section className="max-w-5xl mx-auto px-6 mt-8">
          <div className="rounded-xl px-5 py-4 bg-[var(--wine)]/80 text-[var(--ink)]">
            Accesso gratuito, senza una data di fine. Non si paga. Se attiveremo i
            pagamenti te lo diciamo almeno 30 giorni prima. Il tuo save resta.
          </div>
        </section>

        <section id="faq" className="max-w-5xl mx-auto px-6 mt-16">
          <h2 className="display text-4xl mb-6">Domande</h2>
          <div className="grid gap-4">
            {FAQ.map((item) => (
              <details key={item.q} className="frame rounded-xl px-5 py-4">
                <summary className="cursor-pointer font-semibold">{item.q}</summary>
                <p className="text-[var(--muted)] mt-2 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <SiteFooter />
      </main>
    </AgeGate>
  );
}
