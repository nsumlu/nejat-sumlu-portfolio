# Nejat Şumlu — portfolio website

A static portfolio site (HTML, CSS and JavaScript modules). It has no build step, framework, database or backend, so it runs on GitHub Pages as it is.

```
index.html              Opening (CV / identity) + spatial project selector
project.html            One template for every project page (?id=<project-id>)
assets/js/content.js    ← ALL editable text, images, drawings and projects
assets/js/home.js       Selector, project-opening transition, Concept Store entrance
assets/js/project.js    Project page layout (opening → concept → facts → views → drawings → materials → next)
assets/js/viewer.js     Full-screen drawing viewer (zoom, pan, pinch, reset, keyboard)
assets/css/site.css     Design system: colour tokens, grid, type, components
assets/projects/<id>/   One folder per project: images/, drawings/, video/
assets/profile/         Portrait, QR codes, public CV PDF
assets/fonts/           Inter Tight (SIL Open Font License, see LICENSE-OFL.txt)
tools/                  Helpers for new images, drawings and the CV
ASSET-MANIFEST.md       Every file: project, role, caption, verified source, open questions
```

## Run locally

The pages use JavaScript modules, so serve them over HTTP. Opening the file directly with `file://` won't work.

```bash
cd nejat-sumlu-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

Any static server works, e.g. `npx serve`.

## Edit content

Everything you would normally edit lives in **`assets/js/content.js`**:

- `SITE` holds the name, title, intro, education, internships, software, languages, email, social links and CV path.
- `PROJECTS` holds one object per project, in display order. Each one has:
  - `title`, `number`, `category`, `lede`
  - `concept` (paragraphs) and `facts` (label/value pairs)
  - `cover` (the selector panel image) and `hero` (the opening image of the project page)
  - `views`, the image rows. Each row's `layout` is one of `full`, `pair`, `trio`, `offset-left` or `offset-right`; the offset layouts take a short `text`.
  - `drawings` (`type`: Plan / Section / Elevation, `title`, optional `scale`, shown only when printed on the sheet) and optional `drawingsNote`, a short text placed beside a project's only plan
  - `materials` (`text`, `list`, optional `image`)
  - `year` / `showYear`. Dates are hidden for now because the sources disagree (see ASSET-MANIFEST.md).

Save the file and reload the browser. There is no build step.

**Social links.** `SITE.social` points to the exact destinations encoded in the supplied QR codes (me-qr.com redirect links). When you have the direct LinkedIn and Behance profile URLs, replace the `href` values. Also update `tools/cv/cv.html` and rebuild the CV.

## Replace images and videos

1. Put the new file in the right project's folder. Never borrow an image from another project.
2. Create the responsive sizes:
   ```bash
   python3 tools/make-image-sizes.py ~/Desktop/new-render.png assets/projects/concept-store/images/new-view
   ```
   This prints a line like `base: 'images/new-view', widths: [800, 1400, 1920], w: 1920, h: 1080` to paste into `content.js`.
3. Add `alt` (what the image shows), `caption`, and `label: 'Visualisation'` (or `'Concept Study'`). Don't label visualisations as photographs.

**Drawings:**
```bash
python3 tools/make-drawing-preview.py ~/Desktop/plan.pdf assets/projects/concept-store/drawings/ground-floor
```
This copies the PDF unchanged and renders a preview and a large zoom image from it. Add the printed `w`/`h` to the project's `drawings` list. Only add drawings whose project and floor/section you have checked.

**Concept Store entrance video** (`assets/projects/concept-store/video/`): keep the four files (720p and 540p, in MP4 and WebM), all muted. Then:
```bash
ffmpeg -i new.mp4 -an -c:v libx264 -crf 21 -pix_fmt yuv420p -movflags +faststart door-entry-720.mp4
ffmpeg -i new.mp4 -an -vf scale=960:540 -c:v libx264 -crf 25 -pix_fmt yuv420p -movflags +faststart door-entry-540.mp4
ffmpeg -i new.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 34 door-entry-720.webm
ffmpeg -i new.mp4 -an -vf scale=960:540 -c:v libvpx-vp9 -b:v 0 -crf 38 door-entry-540.webm
```
The current files come from the supplied clip with one repair. The source jumps abruptly at the door (frames 119→120). A 0.25 s dissolve bridges the jump, which shortens the clip to 7.75 s:
```bash
ffmpeg -i door-entry.mp4 -filter_complex "[0:v]trim=end_frame=120,setpts=PTS-STARTPTS[a];[0:v]trim=start_frame=120,setpts=PTS-STARTPTS[b];[a][b]xfade=transition=fade:duration=0.25:offset=4.75,format=yuv420p[v]" -map "[v]" -an -crf 12 smoothed.mp4
```
The video's **first frame must match the storefront cover**, and its **last frame must match the hero render**. If you change either, re-measure `entrance.bridge` (scale and offset of the render inside the last frame).

## Add a project

1. Create `assets/projects/<new-id>/images/` (and `drawings/` if needed).
2. In `content.js`, copy an existing project block inside `PROJECTS`. Change `id`, `number`, `title`, `kind` (`'interior'` or `'object'`), `category`, `dir` and the content.
3. Done. The selector, the project index, the project page and the "next project" chain all update automatically. The selector is designed for up to about six projects.

Object projects can use `gallery` and `external: { label, url }` (as RELIC No.01 does) instead of `views`, `drawings` and `materials`. Only add finished, real projects. Don't add placeholders.

## Update the CV

`assets/profile/Nejat-Sumlu-CV.pdf` is generated from `tools/cv/cv.html`. That public version contains no home address, phone number or references. To regenerate it:
```bash
python3 -m http.server 8000 &
pip install playwright && playwright install chromium   # once
python3 tools/cv/build-cv.py
```
Or replace the PDF with your own export, keeping the same file name.

## Deploy with GitHub Pages

The site uses relative paths only, so it works at `https://<user>.github.io/<repo>/` as well as at a custom domain.

1. Create a repository (for example `portfolio`) and push this folder:
   ```bash
   git init && git add . && git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages → Build and deployment → Deploy from a branch**, then choose `main` and `/ (root)`.
3. After a minute the site is live at `https://<user>.github.io/<repo>/`.

The `.nojekyll` file stops GitHub from processing the files. The `tools/` folder and the manifests are published too; they're harmless, but you can move them out if you prefer.

## Behaviour notes

- **Selector:** a fixed spatial scene after the blue-plane reference. Four image planes stand on two walls of a corridor that recedes towards a softly lit vanishing point, with compact numbers and titles laid flat beneath them. The scene never reshuffles. Selecting a project turns its plane towards the viewer and moves it forward slightly, with no scaling.
  - *Select:* click or tap an inactive plane or its title, use ← / →, Home/End, or the ← → buttons.
  - *Open:* click the selected plane or its **View Project** link, or press Enter. Ctrl/⌘-click opens it in a new tab.
  - *Tablets:* swiping across the scene browses.
  - *Phones:* a swipe strip where the centred card faces you and its neighbours turn away (simplified perspective), with progress segments, a counter and a "Swipe for more" cue. Tapping the centred card opens it.
  - The corridor geometry (angle, depth, spread) lives in `assets/js/home.js`: `WALL`, `DEPTH`, `SPREAD`, `ACTIVE_TURN`, `STEP`.
- **Concept Store:** the facade expands from its plane to full screen. The entrance video then plays once (muted, inline, no loop) with a visible **Skip** button, also triggered by Esc. When it ends, the final frame crossfades (0.45 s) to the full-resolution render `images/entrance-axis`, placed exactly over it. Feature matching showed the frame is that render scaled ×0.861 and shifted, with no rotation; the numbers are in `entrance.bridge` in `content.js`. On unusually wide screens, the render then settles gently into the page framing. The store page opens on the same render, so there is no cut. If the video fails or doesn't start within 3 seconds, the visitor goes straight to the project; with reduced motion, there is no expansion and no video.
- **Reduced motion:** no expansion, no video and no reveal animation. Selecting a project opens it directly with the same content.
- **Back button:** returns to the same scroll position and selected project.
- **Drawings:** open any sheet to zoom (wheel, pinch, + / −, double-click), drag to pan, reset with 0, move between sheets with ← → when not zoomed, and close with Esc. "Original PDF" opens the unchanged source sheet.
