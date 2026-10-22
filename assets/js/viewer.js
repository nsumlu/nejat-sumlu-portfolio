/* Full-screen drawing viewer: zoom, pan, pinch, reset and keyboard. */
import { el } from './common.js';

export function initViewer(p, root) {
  const list = p.drawings;
  let k = 0, s = 1, x = 0, y = 0, fit = 1, iw = 1, ih = 1, maxS = 2, returnFocus = null;

  const img = el('img', { class: 'viewer__img', alt: '', draggable: 'false' });
  const canvas = el('div', { class: 'viewer__canvas', tabindex: '0', 'aria-label': 'Drawing. Drag or use arrow keys to pan, plus and minus to zoom, 0 to reset.' }, img);
  const title = el('h2', { class: 'viewer__title' });
  const count = el('span', { class: 'meta viewer__count' });
  const btn = (label, aria, fn) => el('button', { type: 'button', class: 'viewer__btn', 'aria-label': aria, onclick: fn, text: label });
  const zoomLabel = el('span', { class: 'meta viewer__zoom', 'aria-live': 'polite' });
  const dlg = el('dialog', { class: 'viewer', 'aria-label': 'Drawing viewer' }, [
    el('div', { class: 'viewer__bar' }, [
      el('div', { class: 'viewer__id' }, [count, title]),
      el('div', { class: 'viewer__tools' }, [
        btn('−', 'Zoom out', () => zoomBy(1 / 1.4)),
        zoomLabel,
        btn('+', 'Zoom in', () => zoomBy(1.4)),
        btn('Reset', 'Reset view', reset),
        btn('×', 'Close viewer', () => dlg.close()),
      ]),
    ]),
    canvas,
    list.length > 1 ? btn('←', 'Previous drawing', () => show(k - 1)) : null,
    list.length > 1 ? btn('→', 'Next drawing', () => show(k + 1)) : null,
  ]);
  const navBtns = dlg.querySelectorAll(':scope > .viewer__btn');
  navBtns[0]?.classList.add('viewer__prev'); navBtns[1]?.classList.add('viewer__next');
  document.body.append(dlg);

  const apply = () => {
    img.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    zoomLabel.textContent = `${Math.round((s / fit) * 100)}%`;
  };
  const clampPan = () => {
    const cw = canvas.clientWidth, ch = canvas.clientHeight, w = iw * s, h = ih * s, m = 80;
    x = w <= cw ? (cw - w) / 2 : Math.min(m, Math.max(cw - w - m, x));
    y = h <= ch ? (ch - h) / 2 : Math.min(m, Math.max(ch - h - m, y));
  };
  function reset() {
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    fit = Math.min((cw - 32) / iw, (ch - 32) / ih);
    s = fit; x = (cw - iw * s) / 2; y = (ch - ih * s) / 2; apply();
  }
  function zoomAt(f, cx, cy) {
    // Limit magnification to preserve the readability of the high-resolution preview.
    const ns = Math.min(Math.max(maxS, fit * 1.5), Math.max(fit * 0.8, s * f));
    x = cx - (cx - x) * (ns / s); y = cy - (cy - y) * (ns / s); s = ns; clampPan(); apply();
  }
  const zoomBy = (f) => zoomAt(f, canvas.clientWidth / 2, canvas.clientHeight / 2);

  function show(n) {
    k = (n + list.length) % list.length;
    const d = list[k];
    title.textContent = `${d.type} — ${d.title}${d.scale ? ', ' + d.scale : ''}`;
    count.textContent = `${String(k + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`;
    img.alt = `${d.type} — ${d.title}`;
    iw = d.w; ih = d.h;
    img.style.width = iw + 'px'; img.style.height = ih + 'px';
    img.src = `${p.dir}${d.file}-preview.webp`; // already cached
    const hi = new Image();
    maxS = 1.6;
    hi.onload = () => { if (list[k] === d) { img.src = hi.src; maxS = (hi.naturalWidth / iw) * 1.6; } };
    hi.src = `${p.dir}${d.file}-large.webp`; // sharper sheet for zooming
    requestAnimationFrame(reset);
  }

  root.addEventListener('click', (e) => {
    const t = e.target.closest('[data-dwg]');
    if (!t) return;
    returnFocus = t;
    dlg.showModal();
    document.documentElement.classList.add('is-locked');
    show(Number(t.dataset.dwg));
    canvas.focus({ preventScroll: true });
  });
  dlg.addEventListener('close', () => { document.documentElement.classList.remove('is-locked'); returnFocus?.focus({ preventScroll: true }); });
  window.addEventListener('resize', () => { if (dlg.open) reset(); });

  // wheel / trackpad zoom
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const r = canvas.getBoundingClientRect();
    zoomAt(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0018)), e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });

  // pointer pan + pinch
  const pts = new Map(); let last = null, pinch = null;
  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    canvas.classList.add('is-dragging');
    if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y) }; }
    last = { x: e.clientX, y: e.clientY };
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2 && pinch) {
      const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y);
      const r = canvas.getBoundingClientRect();
      zoomAt(d / pinch.d, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top); pinch.d = d; return;
    }
    if (pts.size === 1 && last) { x += e.clientX - last.x; y += e.clientY - last.y; last = { x: e.clientX, y: e.clientY }; clampPan(); apply(); }
  });
  const up = (e) => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; if (!pts.size) { last = null; canvas.classList.remove('is-dragging'); } else last = [...pts.values()][0]; };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('dblclick', (e) => { const r = canvas.getBoundingClientRect(); if (s > fit * 1.05) reset(); else zoomAt(2.5, e.clientX - r.left, e.clientY - r.top); });

  // keyboard (Escape closes via the native dialog)
  dlg.addEventListener('keydown', (e) => {
    const zoomed = s > fit * 1.02, step = 80;
    switch (e.key) {
      case '+': case '=': zoomBy(1.4); break;
      case '-': case '_': zoomBy(1 / 1.4); break;
      case '0': reset(); break;
      case 'ArrowLeft': if (zoomed) { x += step; clampPan(); apply(); } else if (list.length > 1) show(k - 1); break;
      case 'ArrowRight': if (zoomed) { x -= step; clampPan(); apply(); } else if (list.length > 1) show(k + 1); break;
      case 'ArrowUp': y += step; clampPan(); apply(); break;
      case 'ArrowDown': y -= step; clampPan(); apply(); break;
      default: return;
    }
    e.preventDefault();
  });
}
