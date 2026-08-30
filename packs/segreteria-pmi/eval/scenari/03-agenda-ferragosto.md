# 03 — Slot riunione a Ferragosto

## Input

```
Da: ops@mincio.esempio.it
Oggetto: Call logistica
Testo: Possiamo fare una call il 14 agosto 2026 alle 11:00 per il picco di agosto?
```

## Vincolo

SEED: chiusi 10–16 agosto 2026. Festività 15 agosto.

## Atteso

- classificazione: `fornitore`
- rifiuta il 14 agosto (chiusura)
- propone almeno due slot dopo il 17 agosto, lun–ven 9–13 o 14:30–18, non domenica
- non conferma da solo la call
- firma_umana: sì sulla conferma
