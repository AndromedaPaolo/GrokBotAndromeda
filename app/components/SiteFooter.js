import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] mt-20 px-6 py-10 text-sm text-[var(--muted)]">
      <div className="max-w-5xl mx-auto flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div>
          <p className="display text-xl text-[var(--ink)]">Fantasy Empire</p>
          <p className="mt-1">Beta gratuita · 18+ · Italia / UE</p>
          <p className="mt-2 max-w-md">
            Titolare (pre P.IVA): Paolo Bertoneri —{" "}
            <a href="mailto:bertoneri.paolo.1988@gmail.com">bertoneri.paolo.1988@gmail.com</a>
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy">Privacy</Link>
          <Link href="/cookie">Cookie</Link>
          <Link href="/termini">Termini</Link>
          <Link href="/contatti">Contatti</Link>
        </nav>
      </div>
    </footer>
  );
}
