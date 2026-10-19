"""Render tools/cv/cv.html to assets/profile/Nejat-Sumlu-CV.pdf.
Usage (from the repository root, with a local server running on port 8000):
    python3 -m http.server 8000 &
    pip install playwright && playwright install chromium   # once
    python3 tools/cv/build-cv.py
"""
import asyncio
from playwright.async_api import async_playwright

async def main(port=8000):
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page()
        await pg.goto(f'http://localhost:{port}/tools/cv/cv.html', wait_until='networkidle')
        await pg.pdf(path='assets/profile/Nejat-Sumlu-CV.pdf', format='A4', print_background=True, prefer_css_page_size=True)
        await b.close()

if __name__ == '__main__':
    import sys
    asyncio.run(main(int(sys.argv[1]) if len(sys.argv) > 1 else 8000))
