import Link from "next/link";
import SiteFooter from "../components/SiteFooter";

export const metadata = { title: "Termini — Fantasy Empire" };

export default function TerminiPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/">← Fantasy Empire</Link>
      <h1 className="display text-5xl mt-6">Termini</h1>
      <div className="mt-4 space-y-4 text-[var(--muted)] leading-relaxed">
        <p>Accesso beta gratuito, senza data di fine. Non è una promessa di gratis per sempre.</p>
        <p>18+. Personaggi adulti inventati. Contenuti SFW sexy. Territorio: Italia e UE.</p>
        <p>
          Se un giorno attiveremo i pagamenti, avviso pubblico almeno 30 giorni prima. Il save
          non si cancella in silenzio.
        </p>
        <p>Niente pay-to-win. I video di azione, quando ci sono, sono generati da IA.</p>
        <p>Bozza. I testi definitivi vanno chiusi con avvocato prima di un’offerta a pagamento.</p>
      </div>
      <SiteFooter />
    </main>
  );
}
