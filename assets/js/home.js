import { SITE, PROJECTS, src } from './content.js';
import { el, picture, bindProfile, initReveals, reducedMotion, projectUrl, heroSizes } from './common.js';

/* ---------------------------------------------------------------- profile */
bindProfile();
const q = (s) => document.querySelector(s);
q('[data-bind="intro"]').textContent = SITE.intro;
const portrait = q('[data-bind="portrait"]');
portrait.src = SITE.portrait.src; portrait.alt = SITE.portrait.alt;
q('[data-bind="count"]').textContent = String(PROJECTS.length).padStart(2, '0');

const li = (o) => el('li', {}, [el('span', { class: 'cv-list__years meta', text: o.years }), el('strong', { text: o.title }), el('span', { text: o.place })]);
q('[data-list="education"]').replaceChildren(...SITE.education.map(li));
q('[data-list="internships"]').replaceChildren(...SITE.internships.map(li));
q('[data-list="software"]').replaceChildren(...SITE.software.map((s) => el('li', { text: s })));
q('[data-list="languages"]').replaceChildren(...SITE.languages.map((s) => el('li', { text: s })));
q('[data-list="social"]').replaceChildren(...SITE.social.map((s) =>
  el('li', { class: 'social__item' }, [
    el('a', { class: 'social__link', href: s.href, target: '_blank', rel: 'noopener' }, [el('span', { text: s.label }), el('span', { 'aria-hidden': 'true', text: '↗' })]),
    el('figure', { class: 'qr' }, [
      el('img', { src: s.qr, width: 480, height: 480, alt: `QR code linking to Nejat Şumlu on ${s.label}`, loading: 'lazy' }),
      el('figcaption', { class: 'meta', text: `Scan — ${s.label}` }),
    ]),
  ])));

/* ---------------------------------------------------------------- selector
   A fixed spatial scene after reference 2: image planes stand along two
   walls of a corridor that recedes to a central vanishing point. The scene
   never reshuffles. The selected plane turns towards the viewer and steps
   forward a little; selecting (inactive plane) and opening (selected plane
   or its “View Project” link) are separate actions. Phones get a swipeable
   strip whose cards angle away from the centre. */
const space = q('[data-space]');
const stage = q('[data-stage]');
const labels = q('[data-labels]');
const progress = q('[data-progress]');
const STORE_KEY = 'ns.selector.active';
const N = PROJECTS.length;
let active = 0;
try { active = Math.min(N - 1, Math.max(0, Number(sessionStorage.getItem(STORE_KEY)) || 0)); } catch { /* storage unavailable */ }
q('[data-total]').textContent = String(N).padStart(2, '0');

const isMobile = () => window.matchMedia('(max-width: 760px)').matches;
const plain = (e) => !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button);
const openFrom = (i) => (e) => { if (!plain(e)) return; e.preventDefault(); setActive(i); openProject(i); };

const panels = PROJECTS.map((p, i) => {
  const hit = el('a', { class: 'plane__hit', href: projectUrl(p), tabindex: '-1', 'aria-label': `View Project — ${p.number} ${p.title}` });
  hit.addEventListener('click', openFrom(i));
  const select = el('button', { class: 'plane__select', type: 'button', 'aria-label': `Show ${p.number} — ${p.title}, ${p.category}` });
  select.addEventListener('click', () => setActive(i, { focus: true }));
  // mobile cards carry their own label; desktop labels sit flat beneath the scene
  const mLabel = el('div', { class: 'plane__mlabel' }, [
    el('span', { class: 'lbl__num', text: p.number }),
    el('span', { class: 'lbl__title', text: p.title }),
    el('span', { class: 'plane__mopen', 'aria-hidden': 'true' }, 'View Project →'),
  ]);
  return el('div', { class: 'plane', role: 'listitem', 'data-i': i, 'aria-label': `${p.number} ${p.title}`, style: `--accent:${p.accent || '#3546B6'}` }, [
    el('div', { class: 'plane__img' }, picture(p, p.cover, { sizes: '(max-width: 760px) 64vw, 22vw', eager: true })),
    hit, select, mLabel,
  ]);
});
space.replaceChildren(...panels);

const labelEls = PROJECTS.map((p, i) => {
  const open = el('a', { class: 'lbl__open', href: projectUrl(p) }, ['View Project ', el('span', { 'aria-hidden': 'true', text: '→' })]);
  open.setAttribute('aria-label', `View Project — ${p.number} ${p.title}`);
  open.addEventListener('click', openFrom(i));
  const li = el('li', { class: 'lbl', 'data-i': i, style: `--accent:${p.accent || '#3546B6'}` }, [
    el('span', { class: 'lbl__num', text: p.number }),
    el('span', { class: 'lbl__title', text: p.title }),
    open,
  ]);
  li.addEventListener('click', (e) => { if (!e.target.closest('a') && i !== active) setActive(i, { focus: true }); });
  return li;
});
labels.replaceChildren(...labelEls);
progress.replaceChildren(...PROJECTS.map(() => el('span')));

// Fine-pointer hover selects without navigating or moving keyboard focus.
const hoverInput = window.matchMedia('(hover: hover) and (pointer: fine)');
panels.forEach((panel, i) => {
  panel.addEventListener('pointerenter', (event) => {
    if (event.pointerType !== 'touch' && hoverInput.matches && !isMobile() && i !== active) setActive(i);
  });
});
labelEls.forEach((label, i) => {
  label.addEventListener('pointerenter', (event) => {
    if (event.pointerType !== 'touch' && hoverInput.matches && !isMobile() && i !== active) setActive(i);
  });
});

/* corridor geometry: t ∈ [-1, 1] across the scene */
const PERSP = 1100, WALL = 54, ACTIVE_TURN = 14, STEP = 70, SPREAD = 0.31, DEPTH = 300;
function place(i) {
  const t = N === 1 ? 0 : (i - (N - 1) / 2) / ((N - 1) / 2);
  const side = Math.sign(t);
  return { t, side, z: -(1 - Math.abs(t)) * DEPTH, ry: -side * WALL };
}

function layout() {
  const mobile = isMobile();
  stage.classList.toggle('is-mobile', mobile);
  panels.forEach((pl, i) => {
    pl.classList.toggle('is-active', i === active); pl.toggleAttribute('aria-current', i === active);
    // desktop: the label's “View Project” link is the tab stop; phones: the card itself
    pl.querySelector('.plane__hit').tabIndex = mobile && i === active ? 0 : -1;
  });
  labelEls.forEach((l, i) => l.classList.toggle('is-active', i === active));
  [...progress.children].forEach((s, i) => s.classList.toggle('is-on', i === active));
  q('[data-current]').textContent = PROJECTS[active].number;
  if (mobile) { tiltCards(); return; }
  const W = stage.clientWidth;
  panels.forEach((pl, i) => {
    const g = place(i), on = i === active;
    const x = g.t * SPREAD * W;
    const z = g.z + (on ? STEP : 0);
    const ry = on ? -g.side * ACTIVE_TURN : g.ry;
    pl.style.setProperty('--x', `${x}px`);
    pl.style.setProperty('--z', `${z}px`);
    pl.style.setProperty('--ry', `${ry}deg`);
    pl.style.zIndex = on ? 20 : 10 - Math.round(Math.abs(g.z) / 100);
    // flat label under the projected centre of its plane
    labelEls[i].style.setProperty('--lx', `${(x * PERSP) / (PERSP - g.z)}px`);
  });
}

/* phones: cards angle away from the centre of the strip */
function tiltCards() {
  const mid = space.scrollLeft + space.clientWidth / 2;
  panels.forEach((pl) => {
    const d = (pl.offsetLeft + pl.offsetWidth / 2 - mid) / pl.offsetWidth;
    pl.style.setProperty('--ry', `${Math.max(-28, Math.min(28, -d * 28))}deg`);
    pl.style.setProperty('--z', `${-Math.min(1, Math.abs(d)) * 60}px`);
  });
}

function setActive(i, { focus = false } = {}) {
  active = (i + N) % N;
  try { sessionStorage.setItem(STORE_KEY, String(active)); } catch { /* ignore */ }
  layout();
  if (isMobile()) centreCard(active, true);
  if (focus) (isMobile() ? panels[active].querySelector('.plane__hit') : labelEls[active].querySelector('.lbl__open')).focus({ preventScroll: true });
}

function centreCard(i, smooth) {
  const pl = panels[i];
  space.scrollTo({ left: pl.offsetLeft - (space.clientWidth - pl.offsetWidth) / 2, behavior: smooth && !reducedMotion() ? 'smooth' : 'auto' });
}

q('[data-prev]').addEventListener('click', () => setActive(active - 1, { focus: !isMobile() }));
q('[data-next]').addEventListener('click', () => setActive(active + 1, { focus: !isMobile() }));
q('.work').addEventListener('keydown', (e) => {
  if (!e.target.closest('[data-stage], .stage__labels, .stage__bar')) return;
  const k = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: N - 1 }[e.key];
  if (k === undefined) return;
  e.preventDefault(); setActive(k, { focus: true });
});

// Tablets: horizontal swipe across the scene browses
let touchX = null, touchY = null;
stage.addEventListener('touchstart', (e) => { if (!isMobile()) { touchX = e.touches[0].clientX; touchY = e.touches[0].clientY; } }, { passive: true });
stage.addEventListener('touchend', (e) => {
  if (touchX == null) return;
  const dx = e.changedTouches[0].clientX - touchX, dy = e.changedTouches[0].clientY - touchY; touchX = null;
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) setActive(active + (dx < 0 ? 1 : -1));
}, { passive: true });

// Phones: native scroll; tilt follows the scroll, selection follows the centred card
let scrollT, raf = 0;
space.addEventListener('scroll', () => {
  if (!isMobile()) return;
  if (!raf) raf = requestAnimationFrame(() => { raf = 0; tiltCards(); });
  clearTimeout(scrollT);
  scrollT = setTimeout(() => {
    const mid = space.scrollLeft + space.clientWidth / 2;
    let best = 0, bestD = Infinity;
    panels.forEach((pl, i) => { const d = Math.abs(pl.offsetLeft + pl.offsetWidth / 2 - mid); if (d < bestD) { bestD = d; best = i; } });
    if (best !== active) { active = best; try { sessionStorage.setItem(STORE_KEY, String(active)); } catch {} layout(); }
    stage.classList.toggle('is-scrolled-end', space.scrollLeft + space.clientWidth >= space.scrollWidth - 4);
  }, 80);
}, { passive: true });

let resizeT;
window.addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(layout, 60); });
stage.classList.add('no-anim'); layout();
requestAnimationFrame(() => requestAnimationFrame(() => stage.classList.remove('no-anim')));
if (isMobile()) requestAnimationFrame(() => { centreCard(active, false); tiltCards(); });

/* ---------------------------------------------------------------- opening a project */
const portal = q('[data-portal]');
const portalMedia = q('[data-portal-media]');
const portalUI = q('[data-portal-ui]');
let opening = false;

let heroEl = null;
function go(p) {
  try {
    sessionStorage.setItem('ns.arrive', p.id);
    const hs = heroEl && (heroEl.currentSrc || heroEl.src);
    if (hs) sessionStorage.setItem('ns.heroSrc', new URL(hs, location.href).href);
  } catch {}
  window.location.href = projectUrl(p);
}

/* Warm the cache with the exact hero candidate the project page will choose */
let heroPre = null;
function preloadHero(p) {
  const h = picture(p, p.hero, { eager: true, sizes: heroSizes(p.hero) });
  h.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none';
  document.body.append(h);
  heroEl = h;
  heroPre = h.decode ? h.decode().then(() => h).catch(() => h) : Promise.resolve(h);
}

/* Concept Store: bridge the video's last frame to the full-resolution render.
   1. place the render exactly over the frame (measured match, see content.js)
   2. crossfade (450 ms) — the content is identical, only the sharpness changes
   3. if the page hero's "cover" framing differs on this screen (very wide or
      unusual viewports), settle into it with a short, gentle move (600 ms). */
function bridgeToHero(p) {
  const b = p.entrance.bridge;
  if (!b || !heroPre) return Promise.resolve();
  return Promise.race([heroPre, new Promise((r) => setTimeout(() => r(null), 600))]).then((pre) => {
    if (!pre || !pre.naturalWidth) return; // not ready: go straight to the page
    const vw = portalMedia.clientWidth, vh = portalMedia.clientHeight;
    const [fw, fh] = b.frame, sv = Math.max(vw / fw, vh / fh);
    const ox = (vw - fw * sv) / 2, oy = (vh - fh * sv) / 2;
    const rw = p.hero.w, rh = p.hero.h;
    const mw = rw * b.scale * sv, ml = ox + b.tx * sv, mt = oy + b.ty * sv;   // matched to the frame
    const cs = Math.max(vw / rw, vh / rh), cw = rw * cs, ch = rh * cs;         // page-hero cover
    const cl = (vw - cw) / 2, ct = (vh - ch) / 2;
    const k = mw / cw, dx = ml - cl, dy = mt - ct;
    const img = el('img', { class: 'portal__bridge', src: pre.currentSrc || pre.src, alt: '' });
    Object.assign(img.style, { left: `${cl}px`, top: `${ct}px`, width: `${cw}px`, height: `${ch}px`, transform: `translate(${dx}px, ${dy}px) scale(${k})` });
    portalMedia.append(img);
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      .then(() => { img.classList.add('is-in'); return wait(470); })
      .then(() => {
        if (Math.abs(k - 1) < 0.015 && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
        img.classList.add('is-settling'); img.style.transform = 'none';
        return wait(640);
      });
  });
}

function openProject(i) {
  const p = PROJECTS[i];
  if (opening) return;
  if (reducedMotion()) { go(p); return; }
  opening = true;

  // Start loading the entrance video immediately (only for projects that have one)
  let video = null;
  if (p.entrance) {
    video = el('video', { muted: true, playsinline: true, preload: 'auto', 'aria-hidden': 'true', disablepictureinpicture: true });
    video.muted = true; // property, for iOS
    const size = window.innerWidth < 900 ? 'small' : 'large';
    const fmt = video.canPlayType('video/mp4; codecs="avc1.640028"') ? 'mp4' : (video.canPlayType('video/webm; codecs="vp9"') ? 'webm' : 'mp4');
    video.src = p.dir + p.entrance.video[fmt][size];
    video.load();
  }

  // Start from the image already on screen (no reload, no flash), then sharpen
  const fromImg = panels[i].querySelector('img');
  const r = fromImg.getBoundingClientRect();
  const img = el('img', { src: fromImg.currentSrc || fromImg.src, alt: '', class: 'portal__img' });
  portalMedia.replaceChildren(img);
  const sharp = new Image(); sharp.src = src(p, p.cover, 1600);
  sharp.decode?.().then(() => { if (img.isConnected) img.src = sharp.src; }).catch(() => {});
  preloadHero(p);
  Object.assign(portalMedia.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
  portal.hidden = false;
  portal.classList.remove('is-open');
  void portalMedia.offsetWidth; // commit start rect
  requestAnimationFrame(() => {
    portal.classList.add('is-open');
    Object.assign(portalMedia.style, { left: '0px', top: '0px', width: '100vw', height: '100dvh' });
  });

  const expanded = new Promise((res) => {
    const done = () => { portalMedia.removeEventListener('transitionend', done); res(); };
    portalMedia.addEventListener('transitionend', done);
    setTimeout(done, 1000);
  });

  if (!video) { expanded.then(() => go(p)); return; }

  // ---- Concept Store: cross the threshold
  q('[data-portal-label]').textContent = p.entrance.label;
  video.className = 'portal__video';
  portalMedia.append(video);
  let finished = false;
  const finish = () => { if (finished) return; finished = true; go(p); };
  q('[data-portal-skip]').onclick = finish;
  video.addEventListener('ended', () => { if (!finished) { portalUI.hidden = true; bridgeToHero(p).then(finish, finish); } }, { once: true });
  video.addEventListener('error', finish, { once: true });
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { document.removeEventListener('keydown', esc); finish(); } });

  expanded.then(() => {
    portalUI.hidden = false;
    q('[data-portal-skip]').focus({ preventScroll: true });
    // If the video cannot start within 3 s, continue to the project rather than trap the visitor
    const stall = setTimeout(finish, 3000);
    const start = () => {
      video.play().then(() => {
        clearTimeout(stall);
        video.classList.add('is-playing'); // fades over the matching still frame
      }).catch(finish);
    };
    if (video.readyState >= 3) start(); else video.addEventListener('canplay', start, { once: true });
  });
}

/* Returning with the Back button: the page may come from the bfcache with the
   portal still open — reset it, keep the scroll position and selection. */
window.addEventListener('pageshow', (e) => {
  if (!e.persisted) return;
  opening = false;
  portal.hidden = true; portal.classList.remove('is-open'); portalUI.hidden = true;
  portalMedia.replaceChildren(); portalMedia.removeAttribute('style');
  layout();
  if (isMobile()) centreCard(active, false);
});

initReveals();

// Light-to-navy threshold: the cobalt plane extends as the selector arrives
const work = q('.work');
if (reducedMotion() || !('IntersectionObserver' in window)) work.classList.add('is-in');
else new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { work.classList.add('is-in'); o.disconnect(); } }, { threshold: 0.15 }).observe(work);
