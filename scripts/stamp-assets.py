#!/usr/bin/env python3
"""Add a content fingerprint to the stylesheet and script links in every page.

    python3 scripts/stamp-assets.py

Rewrites links such as href="styles.css" to href="styles.css?v=3f9a1c2b",
where the fingerprint comes from the file's contents. When a file changes, its
fingerprint changes, so browsers download the new copy instead of reusing a
cached one. Run it after editing styles.css, site.js or gallery.js, before you
commit.
"""
import hashlib
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ["styles.css", "site.js", "gallery.js"]


def fingerprint(name):
    return hashlib.sha1((ROOT / name).read_bytes()).hexdigest()[:8]


def main():
    prints = {name: fingerprint(name) for name in ASSETS if (ROOT / name).exists()}
    for page in sorted(ROOT.glob("*.html")):
        text = page.read_text()
        new = text
        for name, fp in prints.items():
            new = re.sub(r'((?:href|src)=")' + re.escape(name) + r'(?:\?v=[0-9a-f]+)?"',
                         r'\g<1>' + name + "?v=" + fp + '"', new)
        if new != text:
            page.write_text(new)
            print(f"updated {page.name}")
    for name, fp in prints.items():
        print(f"{name}: {fp}")


if __name__ == "__main__":
    main()
