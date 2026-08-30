#!/usr/bin/env python3
"""Compress the photoreal studio stills into carte-corpo/img/."""

from pathlib import Path

from PIL import Image

ASSETS = Path("/opt/cursor/artifacts/assets")
OUT = Path(__file__).resolve().parents[1] / "img"

JOBS = {
    "giulia-beige.png": "giulia.jpg",
    "giulia-beige-eyes-closed.png": "giulia-peak.jpg",
    "giulia-face.png": "giulia-face.jpg",
    "giulia-face-soft.png": "giulia-face-soft.jpg",
    "giulia-face-eyes-closed.png": "giulia-face-closed.jpg",
}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for src_name, dest_name in JOBS.items():
        src = ASSETS / src_name
        dest = OUT / dest_name
        Image.open(src).convert("RGB").save(dest, quality=90, optimize=True)
        print("wrote", dest)


if __name__ == "__main__":
    main()
