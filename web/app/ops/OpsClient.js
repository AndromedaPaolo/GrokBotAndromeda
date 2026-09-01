"use client";

import { useCallback, useEffect, useState } from "react";

const TABS = [
  { id: "character", label: "Personaggi" },
  { id: "card", label: "Carte" },
  { id: "video", label: "Video" },
];

export default function OpsClient() {
  const [status, setStatus] = useState(null);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("character");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/ops/status", { credentials: "include" });
    const data = await res.json();
    setStatus(data);
    if (data.authed) {
      const first =
        tab === "character"
          ? data.catalog?.characters?.[0]?.id
          : tab === "card"
            ? data.catalog?.cards?.[0]?.id
            : data.suggestedVideoKeys?.[0];
      setId((prev) => prev || first || "");
    }
  }, [tab]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function login(e) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/ops/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Password errata");
      return;
    }
    setPassword("");
    await refresh();
  }

  async function logout() {
    await fetch("/api/ops/logout", { method: "POST", credentials: "include" });
    setStatus({ authed: false, configured: status?.configured });
  }

  async function upload(e) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const form = new FormData(e.currentTarget);
    form.set("kind", tab);
    form.set("id", id);
    const res = await fetch("/api/ops/upload", {
      method: "POST",
      credentials: "include",
      body: form,
    });
    const data = await res.json();
    setBusy(false);
    setMessage(data.error || data.ok || JSON.stringify(data));
    if (res.ok) await refresh();
  }

  if (!status) {
    return <p className="p-8 text-[var(--muted)]">Carico…</p>;
  }

  if (!status.configured) {
    return (
      <main className="max-w-lg mx-auto px-6 py-16">
        <h1 className="display text-4xl">Dashboard spenta</h1>
        <p className="text-[var(--muted)] mt-3">
          Imposta la variabile <code>OPS_PASSWORD</code> su Vercel. Questa pagina non è
          linkata dalla landing.
        </p>
      </main>
    );
  }

  if (!status.authed) {
    return (
      <main className="max-w-md mx-auto px-6 py-16">
        <h1 className="display text-4xl">Ops</h1>
        <form onSubmit={login} className="frame rounded-2xl p-6 mt-6 grid gap-3">
          <label className="text-sm">
            Password
            <input
              type="password"
              className="mt-1 w-full rounded-lg bg-black/30 border border-[var(--line)] px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="gold-btn" type="submit">
            Entra
          </button>
          {message ? <p className="text-sm text-[#e8a0a0]">{message}</p> : null}
        </form>
      </main>
    );
  }

  const options =
    tab === "character"
      ? status.catalog.characters
      : tab === "card"
        ? status.catalog.cards
        : status.suggestedVideoKeys.map((k) => ({ id: k, name: k }));

  const slots =
    tab === "character" ? status.slots.character : tab === "card" ? status.slots.card : status.slots.video;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <header className="flex justify-between items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">Privata</p>
          <h1 className="display text-4xl">Carica asset</h1>
        </div>
        <button className="ghost-btn" onClick={logout} type="button">
          Esci
        </button>
      </header>

      <p className="mt-4 text-sm text-[var(--muted)]">
        Storage: <strong className="text-[var(--ink)]">{status.mode}</strong>
        {status.mode === "local"
          ? " — su Vercel i file non restano senza R2. In locale vanno in web/.data/fe-media."
          : " — bucket fe-media."}{" "}
        Hobby: max ~4,5 MB per richiesta.
      </p>

      <div className="flex gap-2 mt-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? "gold-btn" : "ghost-btn"}
            type="button"
            onClick={() => {
              setTab(t.id);
              setId("");
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={upload} className="frame rounded-2xl p-6 mt-6 grid gap-4">
        <label className="text-sm">
          {tab === "video" ? "video_key" : "id dal catalogo JSON"}
          {tab === "video" ? (
            <input
              className="mt-1 w-full rounded-lg bg-black/30 border border-[var(--line)] px-3 py-2"
              value={id}
              onChange={(e) => setId(e.target.value)}
              list="video-keys"
              required
            />
          ) : (
            <select
              className="mt-1 w-full rounded-lg bg-black/30 border border-[var(--line)] px-3 py-2"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            >
              {options.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.id}
                  {o.name ? ` — ${o.name}` : ""}
                </option>
              ))}
            </select>
          )}
        </label>
        {tab === "video" ? (
          <datalist id="video-keys">
            {status.suggestedVideoKeys.map((k) => (
              <option key={k} value={k} />
            ))}
          </datalist>
        ) : null}

        {slots.map((slot) => (
          <label key={slot.name} className="text-sm">
            {slot.name}
            {slot.required ? " *" : " (opzionale)"}
            <input
              className="mt-1 block w-full text-sm"
              type="file"
              name={slot.name}
              accept={slot.accept}
              required={slot.required}
            />
          </label>
        ))}

        <button className="gold-btn w-fit" disabled={busy} type="submit">
          {busy ? "Invio…" : "Carica nello slot"}
        </button>
        {message ? <p className="text-sm whitespace-pre-wrap">{message}</p> : null}
      </form>

      <section className="mt-8">
        <h2 className="display text-2xl">Già presenti</h2>
        <ul className="mt-3 text-sm text-[var(--muted)] space-y-1">
          {(status.objects || []).length === 0 ? (
            <li>Nessun file.</li>
          ) : (
            status.objects.map((key) => <li key={key}>{key}</li>)
          )}
        </ul>
      </section>
    </main>
  );
}
