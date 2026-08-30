# Catalogo ruoli (laboratorio)

**Tipo documento:** proposta di coda. Non è l'elenco di vendita.
**Versione:** 1.0 — 30 agosto 2026

Criterio v0: compito ripetibile, dimostrabile in eval, **non** esercizio di professione intellettuale protetta. Fonti di mappa: ISTAT CP2021, CCNL di settore, un Analista (G1) con data.

---

## In laboratorio ora

| id | Ruolo | ISTAT (indicativo) | Classe legale | Pack |
|---|---|---|---|---|
| `segreteria-pmi` | Addetto/a alla segreteria amministrativa PMI | 4.1.1 / 4.2.1.1 | ruolo-non-ordinistico | scritto, eval a mano |
| `customer-care-ecommerce` | Addetto/a customer care e-commerce | 4.2.2.2 | ruolo-non-ordinistico | stub catalogo |
| `assistente-studio` | Assistente di studio (commercialista / consulente lavoro) | 4.1.2 | assistente-di-studio | stub catalogo |

Assistente di studio non è il commercialista. Il pack dice in testa: bozza, protocollo, prima nota di supporto. Dichiarazioni, viste di conformità, CUD/Unilav firmati: umani iscritti.

---

## Coda (G1 le prende una alla volta, se Approvi il ruolo)

| id | Ruolo | Perché sì | Perché attendere |
|---|---|---|---|
| `social-pmi` | Social media manager PMI | Compiti visibili, demo facile | Disclosure IA, minori, ads (GrokBot Bacheca è un altro prodotto) |
| `recruiter-screening` | Screening CV | Alto volume | GDPR art. 9 se salute/sindacato; AI Act se scoring |
| `property-manager` | Comunicazioni condòmini / inquilini | Mail ripetibili | Assemblee, millesimi, avvocato del condominio |
| `backoffice-assicurativo` | Prima linea sinistri | Scriptabili | IVASS, dati sanitari |
| `copy-seo-locale` | Copywriter SEO attività locali | Testo, eval automatico | Niente ordini |

---

## Fuori catalogo. Non si mappa per venderli come "ruolo sostituito"

Avvocato, notaio, commercialista *in quanto firmatario*, consulente del lavoro *adempimenti*, medico, farmacista, geometra/ingegnere su asseverazioni, CAF come sostituto d'imposta, agente di commercio con mandato se il pack "chiude" contratti.

Si può, più avanti, un pack **assistente-di-studio-avvocato** con classe `assistente-di-studio` e VINCOLI da Ordine. Non ora. Gazzetta prima.

---

## Come si aggiunge un ruolo

1. Issue con id kebab, ISTAT, classe legale, 8–15 compiti.
2. Tu Approvi.
3. C1+C2 aprono il pack in `laboratorio`.
4. C3 mette 3 scenari. Punteggio può restare null.
5. C4 rigenera il catalogo (`npm run catalogo`).

Niente ruolo nuovo "perché ChatGPT fa l'avvocato".
