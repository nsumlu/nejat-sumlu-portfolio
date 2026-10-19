"""Render web previews for a verified drawing PDF (the PDF itself stays unchanged).

    python3 tools/make-drawing-preview.py SHEET.pdf assets/projects/<project>/drawings/<name>

Copies the PDF to <name>.pdf and writes <name>-preview.webp (1400 px) and
<name>-large.webp (3200 px, used when zooming). White margins are trimmed.
Prints the `w`/`h` values for content.js. Requires Pillow and poppler (pdftoppm).
"""
import sys, os, shutil, subprocess, tempfile
from PIL import Image, ImageChops

pdf, base = sys.argv[1], sys.argv[2]
os.makedirs(os.path.dirname(base), exist_ok=True)
shutil.copy2(pdf, base + '.pdf')
with tempfile.TemporaryDirectory() as t:
    subprocess.run(['pdftoppm', '-r', '300', '-png', '-singlefile', pdf, os.path.join(t, 'p')], check=True)
    im = Image.open(os.path.join(t, 'p.png')).convert('RGB')
diff = ImageChops.difference(im, Image.new('RGB', im.size, 'white')).convert('L').point(lambda v: 255 if v > 12 else 0)
x0, y0, x1, y1 = diff.getbbox(); pad = int(0.025 * max(im.size))
im = im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)))
for tag, longest in (('preview', 1400), ('large', 3200)):
    s = min(1, longest / max(im.size))
    r = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    r.save(f'{base}-{tag}.webp', 'WEBP', quality=90, method=6)
    if tag == 'preview':
        print(f"file: 'drawings/{os.path.basename(base)}', w: {r.width}, h: {r.height}")
