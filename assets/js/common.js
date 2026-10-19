import { SITE, srcset, src } from './content.js';

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function el(tag, attrs = {}, children = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else if (k === 'html') n.innerHTML = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? '' : v);
  }
  for (const c of [].concat(children)) if (c != null) n.append(c);
  return n;
}

/** Responsive <img> for a content image. */
export function picture(project, img, { sizes = '100vw', eager = false, cls = '' } = {}) {
  return el('img', {
    class: cls,
    src: src(project, img, 1400),
    srcset: srcset(project, img),
    sizes,
    width: img.w,
    height: img.h,
    alt: img.alt || '',
    loading: eager ? 'eager' : 'lazy',
    decoding: 'async',
    fetchpriority: eager ? 'high' : null,
  });
}

/** Fill shared profile bindings (email, location, social…) on any page. */
export function bindProfile(root = document) {
  root.querySelectorAll('[data-year]').forEach((n) => (n.textContent = new Date().getFullYear()));
  root.querySelectorAll('[data-bind="email"]').forEach((a) => { a.href = `mailto:${SITE.email}`; a.textContent = SITE.email; });
  root.querySelectorAll('[data-bind="location"]').forEach((n) => (n.textContent = SITE.location));
  root.querySelectorAll('[data-list="social-plain"]').forEach((ul) => {
    ul.replaceChildren(...SITE.social.map((s) => el('li', {}, el('a', { href: s.href, target: '_blank', rel: 'noopener', text: `${s.label} ↗` }))));
  });
}

/** Scroll-reveal for images and blocks. Content is visible without JS. */
export function initReveals(root = document) {
  const items = root.querySelectorAll('.reveal');
  if (reducedMotion() || !('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((i) => io.observe(i));
}

/** A full-viewport "cover" image is as wide as max(viewport width, viewport height × aspect).
    Telling the browser so makes portrait phones load the sharp file instead of upscaling. */
export function heroSizes(img) { return `max(100vw, ${((img.w / img.h) * 100).toFixed(1)}vh)`; }

export function projectUrl(p) { return `project.html?id=${encodeURIComponent(p.id)}`; }
