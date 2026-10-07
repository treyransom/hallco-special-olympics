#!/usr/bin/env python3
"""Build responsive web images + blur placeholders.

Drop original photos in source-photos/ (any size, .jpg/.jpeg/.png) and run:
    python3 scripts/build-images.py
Outputs public/images/<name>.jpg plus <name>-{480,960,1440,1920}.jpg (only
widths smaller than the original) and src/lib/blur.json used by SmartImage.
"""
import base64, io, json, os, sys
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "source-photos")
OUT = os.path.join(ROOT, "public", "images")
WIDTHS = [480, 960, 1440, 1920]
manifest = {}

for f in sorted(os.listdir(SRC)):
    if not f.lower().endswith((".jpg", ".jpeg", ".png")):
        continue
    name = os.path.splitext(f)[0]
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, f))).convert("RGB")
    w, h = im.size
    full_w = min(w, 2000)
    full = im.resize((full_w, round(h * full_w / w)), Image.LANCZOS) if full_w < w else im
    full.save(os.path.join(OUT, f"{name}.jpg"), quality=82, optimize=True, progressive=True)
    widths = []
    for tw in WIDTHS:
        if tw >= full_w:
            break
        r = full.resize((tw, round(full.height * tw / full_w)), Image.LANCZOS)
        r.save(os.path.join(OUT, f"{name}-{tw}.jpg"), quality=80, optimize=True, progressive=True)
        widths.append(tw)
    widths.append(full_w)
    tiny = full.resize((16, max(1, round(16 * full.height / full_w))), Image.LANCZOS)
    buf = io.BytesIO()
    tiny.save(buf, format="JPEG", quality=40)
    manifest[f"/images/{name}.jpg"] = {"w": full.width, "h": full.height, "widths": widths, "blur": "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()}
    print(f"{name}: {w}x{h} -> {widths}")

with open(os.path.join(ROOT, "src", "lib", "blur.json"), "w") as fp:
    json.dump(manifest, fp, indent=1)
print(f"wrote {len(manifest)} entries to src/lib/blur.json")
