"""Create the responsive WebP sizes the site expects from one source image.

    python3 tools/make-image-sizes.py SOURCE.png assets/projects/<project>/images/<name>

Writes <name>-800.webp, <name>-1400.webp and <name>-<full>.webp (full = source
width, capped at 2000). Prints the `widths`, `w` and `h` values to paste into
assets/js/content.js. Requires Pillow (pip install Pillow).
"""
import sys, os
from PIL import Image

src, base = sys.argv[1], sys.argv[2]
os.makedirs(os.path.dirname(base) or '.', exist_ok=True)
im = Image.open(src).convert('RGB')
W, H = im.size
widths = sorted({w for w in (800, 1400) if w < W} | {min(W, 2000)})
for w in widths:
    r = im if w == W else im.resize((w, round(H * w / W)), Image.LANCZOS)
    r.save(f'{base}-{w}.webp', 'WEBP', quality=82, method=6)
fw = widths[-1]
print(f"base: 'images/{os.path.basename(base)}', widths: {widths}, w: {fw}, h: {round(H * fw / W)}")
