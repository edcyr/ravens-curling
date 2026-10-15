#!/usr/bin/env python3
"""Prepare gallery photos for the website.

Put photos in images/gallery/oua/ and images/gallery/usports/, then run:

    python3 scripts/build-gallery.py

Each photo larger than 1600 px is shrunk in place to 1600 px on its long side
(JPEG, normal quality, about 200 KB), PNG and HEIC files are converted to JPEG,
filenames are made web-safe (lowercase, hyphens instead of spaces),
and images/gallery/gallery.json is rewritten with the photo list the
slideshows read. Photos play in filename order. Uses macOS `sips`.
"""
import json
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
GALLERY = ROOT / "images" / "gallery"
EVENTS = ["oua", "usports"]
MAX = 1600


def dims(path):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)],
                         capture_output=True, text=True, check=True).stdout
    vals = {k.strip(): v.strip() for k, v in (line.split(":", 1) for line in out.splitlines()[1:] if ":" in line)}
    return int(vals["pixelWidth"]), int(vals["pixelHeight"])


def safe_name(path):
    """Rename to a web-safe filename (lowercase, no spaces or apostrophes)."""
    stem = re.sub(r"[^a-z0-9]+", "-", path.stem.lower().replace("'", "")).strip("-")
    new = path.with_name(stem + path.suffix.lower())
    if new != path:
        path.rename(new)
    return new


def prepare(path):
    """Shrink or convert one photo; return the path of the web-ready JPEG."""
    path = safe_name(path)
    w, h = dims(path)
    is_jpeg = path.suffix.lower() in (".jpg", ".jpeg")
    if is_jpeg and max(w, h) <= MAX:
        return path
    out = path.with_suffix(".jpg")
    subprocess.run(["sips", "-Z", str(MAX), "-s", "format", "jpeg", "-s", "formatOptions", "normal",
                    str(path), "--out", str(out)], capture_output=True, check=True)
    if out != path:
        path.unlink()
    return out


def main():
    data = {}
    for event in EVENTS:
        folder = GALLERY / event
        folder.mkdir(parents=True, exist_ok=True)
        photos = []
        for path in sorted(folder.iterdir()):
            if path.suffix.lower() not in (".jpg", ".jpeg", ".png", ".heic"):
                continue
            web = prepare(path)
            w, h = dims(web)
            photos.append({"src": f"images/gallery/{event}/{web.name}", "w": w, "h": h})
        data[event] = photos
        print(f"{event}: {len(photos)} photos")
    (GALLERY / "gallery.json").write_text(json.dumps(data, indent=1) + "\n")


if __name__ == "__main__":
    main()
