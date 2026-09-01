import Link from "next/link";
import SiteFooter from "../components/SiteFooter";

export const metadata = { title: "Contatti — Fantasy Empire" };

export default function ContattiPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/">← Fantasy Empire</Link>
      <h1 className="display text-5xl mt-6">Contatti</h1>
      <p className="text-[var(--muted)] mt-4 leading-relaxed">
        Paolo Bertoneri — titolare del servizio in Fase 0 (pre P.IVA).
      </p>
      <p className="mt-3">
        <a href="mailto:bertoneri.paolo.1988@gmail.com">bertoneri.paolo.1988@gmail.com</a>
      </p>
      <SiteFooter />
    </main>
  );
}
