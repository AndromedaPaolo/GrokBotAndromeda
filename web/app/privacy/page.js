import Link from "next/link";
import SiteFooter from "../components/SiteFooter";

export const metadata = { title: "Privacy — Fantasy Empire" };

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/">← Fantasy Empire</Link>
      <h1 className="display text-5xl mt-6">Privacy</h1>
      <p className="text-[var(--muted)] mt-4 leading-relaxed">
        Bozza Fase 0, non è un parere legale. Titolare: Paolo Bertoneri, Italia. Contatto:{" "}
        <a href="mailto:bertoneri.paolo.1988@gmail.com">bertoneri.paolo.1988@gmail.com</a>.
      </p>
      <ul className="mt-6 space-y-3 text-[var(--muted)] leading-relaxed list-disc pl-5">
        <li>Finalità: account beta, salvataggio partita, sicurezza, obblighi di legge.</li>
        <li>Base: esecuzione del servizio gratuito e legittimo interesse alla sicurezza 18+.</li>
        <li>Dati: email di contatto, autodichiarazione età, log tecnici, save di gioco.</li>
        <li>Nessuna vendita a terzi. Hosting: Vercel e, quando collegato, Cloudflare.</li>
        <li>Diritti: accesso, rettifica, cancellazione account, reclamo al Garante.</li>
        <li>Conservazione: finché l’account è attivo, poi cancellazione o anonimizzazione.</li>
      </ul>
      <SiteFooter />
    </main>
  );
}
