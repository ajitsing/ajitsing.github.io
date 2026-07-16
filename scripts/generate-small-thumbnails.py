#!/usr/bin/env python3
"""Generate sidebar/alert small thumbnails as 112px-wide WebP.

Liquid includes derive the path from thumbnail-img by swapping .png for
-small.webp (or appending -small.webp for other raster extensions).

Run:
  python3 scripts/generate-small-thumbnails.py --all
  python3 scripts/generate-small-thumbnails.py --all --delete-jpg
  python3 scripts/generate-small-thumbnails.py assets/img/posts/foo/bar.png
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMG_ROOT = ROOT / "assets" / "img"
MAX_WIDTH = 112
WEBP_QUALITY = 80


def output_path_for(source: Path) -> Path:
    """Map a master image (or legacy *-small.jpg) to *-small.webp."""
    name = source.name
    if name.endswith("-small.jpg") or name.endswith("-small.jpeg"):
        stem = name.rsplit("-small.", 1)[0]
        return source.with_name(f"{stem}-small.webp")
    if name.endswith("-small.webp"):
        return source
    return source.with_name(f"{source.stem}-small.webp")


def resolve_master(path: Path) -> Path:
    """Prefer the full-size sibling over a legacy *-small.jpg."""
    path = path.resolve()
    name = path.name

    if name.endswith("-small.webp"):
        stem = name[: -len("-small.webp")]
        for ext in (".png", ".jpg", ".jpeg"):
            candidate = path.with_name(stem + ext)
            if candidate.is_file():
                return candidate
        return path

    if name.endswith("-small.jpg") or name.endswith("-small.jpeg"):
        stem = name.rsplit("-small.", 1)[0]
        for ext in (".png", ".jpg", ".jpeg"):
            candidate = path.with_name(stem + ext)
            if candidate.is_file():
                return candidate
        return path

    return path


def generate_one(path: Path) -> Path:
    if not path.is_file():
        raise FileNotFoundError(f"Source not found: {path}")

    master = resolve_master(path)
    if master.name.endswith(("-small.jpg", "-small.jpeg", "-small.webp")):
        out = output_path_for(master)
    else:
        out = master.with_name(f"{master.stem}-small.webp")

    with Image.open(master) as im:
        im = im.convert("RGB")
        im.thumbnail((MAX_WIDTH, MAX_WIDTH * 10), Image.Resampling.LANCZOS)
        out.parent.mkdir(parents=True, exist_ok=True)
        im.save(out, "WEBP", quality=WEBP_QUALITY, method=6)

    return out


def discover_sources() -> list[Path]:
    """Find masters for every existing *-small.jpg (and any *-small.webp)."""
    sources: list[Path] = []
    seen_out: set[Path] = set()

    patterns = ("*-small.jpg", "*-small.jpeg", "*-small.webp")
    for pattern in patterns:
        for small in sorted(IMG_ROOT.rglob(pattern)):
            master = resolve_master(small)
            out = (
                master.with_name(f"{master.stem}-small.webp")
                if not master.name.endswith(("-small.jpg", "-small.jpeg", "-small.webp"))
                else output_path_for(master)
            )
            if out in seen_out:
                continue
            seen_out.add(out)
            sources.append(master)

    return sources


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "paths",
        nargs="*",
        type=Path,
        help="Source image path(s). Prefer the full PNG.",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help=f"Regenerate all small thumbs under {IMG_ROOT.relative_to(ROOT)}",
    )
    parser.add_argument(
        "--delete-jpg",
        action="store_true",
        help="Delete obsolete *-small.jpg files after generating WebP",
    )
    args = parser.parse_args()

    if args.all:
        targets = discover_sources()
    elif args.paths:
        targets = [p if p.is_absolute() else ROOT / p for p in args.paths]
    else:
        parser.error("Pass image path(s) or --all")

    created: list[Path] = []
    errors = 0
    for target in targets:
        try:
            out = generate_one(target)
        except Exception as exc:  # noqa: BLE001 — report and continue in batch
            print(f"ERROR {target}: {exc}", file=sys.stderr)
            errors += 1
            continue
        rel = out.relative_to(ROOT) if out.is_relative_to(ROOT) else out
        print(f"wrote {rel} ({out.stat().st_size} bytes)")
        created.append(out)

    if args.delete_jpg:
        removed = 0
        for pattern in ("*-small.jpg", "*-small.jpeg"):
            for jpg in IMG_ROOT.rglob(pattern):
                print(f"deleted {jpg.relative_to(ROOT)}")
                jpg.unlink()
                removed += 1
        print(f"removed {removed} obsolete small JPEG(s)")

    print(f"done: {len(created)} WebP thumbnail(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
