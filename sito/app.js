const catalogoEl = document.getElementById("catalogo");
const scheda = document.getElementById("scheda");
const schedaCorpo = document.getElementById("scheda-corpo");
const chiudi = document.getElementById("chiudi");

const CLASSE_LABEL = {
  "ruolo-non-ordinistico": "non ordinistico",
  "assistente-di-studio": "assistente di studio",
  "ordinistico-vietato-vendita": "ordinistico — non in vendita",
};

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function punteggioLabel(p) {
  if (p == null) return "eval non misurato";
  return `copertura ${p}%`;
}

function renderCatalogo(data) {
  catalogoEl.replaceChildren();
  for (const pack of data.packs) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "carta";
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = `
      <span class="linguetta">${escapeHtml(pack.id)}<br />v${escapeHtml(pack.versione)}</span>
      <span class="carta-corpo">
        <h3>${escapeHtml(pack.nome)}</h3>
        <p class="meta">${escapeHtml(pack.sommario)}</p>
        <div class="bolli">
          <span class="bollo">${escapeHtml(pack.stato)}</span>
          <span class="bollo">${escapeHtml(CLASSE_LABEL[pack.classe_legale] || pack.classe_legale)}</span>
          <span class="bollo">${escapeHtml(punteggioLabel(pack.punteggio))}</span>
          <span class="bollo">${pack.compiti_totali} compiti · ${pack.scenari} scenari</span>
          <span class="bollo">${pack.prezzo_previsto_eur} € previsto</span>
        </div>
      </span>`;
    btn.addEventListener("click", () => apriScheda(pack));
    catalogoEl.append(btn);
  }
}

function apriScheda(pack) {
  const compiti = pack.compiti
    .map((c) => {
      const demo = c.dimostrato ? "dimostrato" : "mappato";
      const firma = c.firma_umana ? " · firma umana" : "";
      return `<li><code>${escapeHtml(c.id)}</code> — ${escapeHtml(c.nome)} <em>(${demo}${firma})</em></li>`;
    })
    .join("");
  const vietato = pack.vietato.map((v) => `<li>${escapeHtml(v)}</li>`).join("");
  schedaCorpo.innerHTML = `
    <p class="protocollo">${escapeHtml(pack.id)} · ISTAT ${escapeHtml(pack.istat)}</p>
    <h3>${escapeHtml(pack.nome)}</h3>
    <p>${escapeHtml(pack.sommario)}</p>
    <p class="meta">
      <a href="/packs/${encodeURIComponent(pack.id)}/ISTRUZIONI.md">Istruzioni</a>
      · <a href="/packs/${encodeURIComponent(pack.id)}/memory/VINCOLI.md">Vincoli</a>
      · <a href="/packs/${encodeURIComponent(pack.id)}/memory/SEED.md">Memoria</a>
      · <a href="/packs/${encodeURIComponent(pack.id)}/pack.json">pack.json</a>
    </p>
    <h2>Compiti</h2>
    <ul>${compiti}</ul>
    <h2>Vietato</h2>
    <ul>${vietato}</ul>`;
  scheda.hidden = false;
}

chiudi.addEventListener("click", () => {
  scheda.hidden = true;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") scheda.hidden = true;
});

const res = await fetch("/catalogo.json");
if (!res.ok) {
  catalogoEl.textContent = "Catalogo assente. Gira npm start da repo root.";
} else {
  renderCatalogo(await res.json());
}
