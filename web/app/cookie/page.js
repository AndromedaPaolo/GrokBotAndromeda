import Link from "next/link";
import SiteFooter from "../components/SiteFooter";

export const metadata = { title: "Cookie — Fantasy Empire" };

export default function CookiePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/">← Fantasy Empire</Link>
      <h1 className="display text-5xl mt-6">Cookie</h1>
      <p className="text-[var(--muted)] mt-4 leading-relaxed">
        Usiamo cookie tecnici necessari: gate 18+ (<code>fe_age18</code>) e sessione dashboard
        operatore (<code>fe_ops</code>, httpOnly). Niente analytics di marketing in Fase 0.
      </p>
      <SiteFooter />
    </main>
  );
}
