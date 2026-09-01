"use client";

import { useEffect, useState } from "react";

const COOKIE = "fe_age18";

function readCookie() {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE}=1`));
}

export default function AgeGate({ children }) {
  const [ok, setOk] = useState(false);
  const [ready, setReady] = useState(false);
  const [age, setAge] = useState(false);
  const [terms, setTerms] = useState(false);

  useEffect(() => {
    setOk(readCookie());
    setReady(true);
  }, []);

  function accept() {
    document.cookie = `${COOKIE}=1; path=/; max-age=31536000; samesite=lax`;
    setOk(true);
  }

  if (!ready) return null;
  if (ok) return children;

  return (
    <div className="min-h-screen grid place-items-center px-5 py-10">
      <div className="frame max-w-lg w-full p-8 rounded-2xl">
        <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)]">18+</p>
        <h1 className="display text-4xl mt-2 mb-3">Fantasy Empire</h1>
        <p className="text-[var(--muted)] leading-relaxed">
          Contenuti per adulti inventati (25+). Territorio beta: Italia e UE. Se hai meno
          di 18 anni, chiudi la pagina.
        </p>
        <label className="flex gap-3 items-start mt-6 text-sm">
          <input type="checkbox" checked={age} onChange={(e) => setAge(e.target.checked)} />
          <span>Dichiaro di avere almeno 18 anni.</span>
        </label>
        <label className="flex gap-3 items-start mt-3 text-sm">
          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          <span>
            Accetto i{" "}
            <a href="/termini" target="_blank" rel="noreferrer">
              Termini
            </a>{" "}
            e ho letto la{" "}
            <a href="/privacy" target="_blank" rel="noreferrer">
              Privacy
            </a>
            .
          </span>
        </label>
        <button className="gold-btn mt-7 w-full" disabled={!age || !terms} onClick={accept}>
          Entra
        </button>
        <p className="text-xs text-[var(--muted)] mt-4">
          Sotto i 18 anni non c’è un’area ridotta: l’accesso è chiuso.
        </p>
      </div>
    </div>
  );
}
