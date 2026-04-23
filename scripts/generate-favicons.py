#!/usr/bin/env python3
"""Regenerate raster favicons (PNG + ICO) and apple-touch-icon from favicon.svg.

Why this exists:
  Google's favicon crawler probes /favicon.ico directly and historically prefers
  raster formats. Browsers will use the SVG via the <link rel="icon"> tag, but
  search engines and many third-party tools fall back to the .ico at the root.

Run:
  .favicon-venv/bin/python scripts/generate-favicons.py

Outputs (overwritten in repo root):
  favicon.ico            (16, 32, 48 multi-size ICO)
  favicon-48.png         (search/UI, 48x48 baseline per Google guidelines)
  favicon-192.png        (PWA / Android)
  apple-touch-icon.png   (180x180 for iOS home screen)
"""
from __future__ import annotations

import io
from pathlib import Path

import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SVG_PATH = ROOT / "favicon.svg"

PNG_SIZES = [48, 192]
APPLE_TOUCH_SIZE = 180
ICO_SIZES = [16, 32, 48]


def render_png(size: int) -> Image.Image:
    """Render the SVG at the requested square size into a Pillow Image."""
    png_bytes = cairosvg.svg2png(
        url=str(SVG_PATH),
        output_width=size,
        output_height=size,
    )
    return Image.open(io.BytesIO(png_bytes)).convert("RGBA")


def main() -> None:
    if not SVG_PATH.exists():
        raise SystemExit(f"missing source: {SVG_PATH}")

    for size in PNG_SIZES:
        out = ROOT / f"favicon-{size}.png"
        render_png(size).save(out, format="PNG", optimize=True)
        print(f"wrote {out.relative_to(ROOT)}")

    apple = ROOT / "apple-touch-icon.png"
    render_png(APPLE_TOUCH_SIZE).save(apple, format="PNG", optimize=True)
    print(f"wrote {apple.relative_to(ROOT)}")

    largest = max(ICO_SIZES)
    base = render_png(largest)
    ico_path = ROOT / "favicon.ico"
    base.save(
        ico_path,
        format="ICO",
        sizes=[(s, s) for s in ICO_SIZES],
    )
    print(f"wrote {ico_path.relative_to(ROOT)} ({ICO_SIZES})")


if __name__ == "__main__":
    main()
