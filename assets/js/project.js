import { PROJECTS } from './content.js';
import { el, picture, bindProfile, initReveals, reducedMotion, projectUrl, heroSizes } from './common.js';
import { initViewer } from './viewer.js';

const params = new URLSearchParams(location.search);
const idx = PROJECTS.findIndex((p) => p.id === params.get('id'));
const main = document.querySelector('[data-project]');
bindProfile();


function render(p, i) {
  document.title = `${p.title} — Nejat Şumlu`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', `${p.title}: ${p.lede}`);
  document.documentElement.style.setProperty('--accent', p.accent || '#3546B6');

  let arrived = false;
  try { arrived = sessionStorage.getItem('ns.arrive') === p.id; sessionStorage.removeItem('ns.arrive'); sessionStorage.removeItem('ns.heroSrc'); } catch {}
  document.body.classList.add(arrived ? 'is-arrived' : 'is-direct');
  document.body.dataset.kind = p.kind;

  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const sections = [hero(p), intro(p, i), concept(p), facts(p)];
  if (p.kind === 'object') sections.push(objectBlock(p));
  if (p.views?.length) sections.push(views(p));
  if (p.drawings?.length) sections.push(drawings(p));
  if (p.materials) sections.push(materials(p));
  if (PROJECTS.length > 1) sections.push(nextBlock(next));
  main.replaceChildren(...sections);

  initReveals(main);
  if (p.drawings?.length) initViewer(p, main);
  requestAnimationFrame(() => document.body.classList.add('is-ready'));
}

/* ---------------------------------------------------------------- blocks */
const meta = (t, cls = '') => el('span', { class: `meta ${cls}`, text: t });

function caption(img, n) {
  return el('figcaption', { class: 'cap' }, [
    n != null ? el('span', { class: 'cap__n', text: String(n).padStart(2, '0') }) : null,
    el('span', { class: 'cap__t', text: img.caption || '' }),
    el('span', { class: 'cap__l', text: img.label || 'Visualisation' }),
  ]);
}

function hero(p) {
  const pos = p.kind === 'object' ? 'center 55%' : 'center';
  // Compact title plate only: the image stays dominant; context lives in the intro strip below
  return el('header', { class: 'p-hero' }, [
    el('figure', { class: 'p-hero__media', style: `--pos:${pos}` }, [
      (() => { const im = picture(p, p.hero, { eager: true, sizes: heroSizes(p.hero) }); im.decoding = 'sync'; return im; })(),
    ]),
    el('div', { class: 'p-hero__plate' }, [
      el('p', { class: 'p-hero__kicker' }, [el('span', { class: 'num', text: p.number }), meta(p.category)]),
      el('h1', { class: 'p-hero__title', text: p.title }),
    ]),
  ]);
}

function intro(p, i) {
  const loc = (p.facts.find(([k]) => k === 'Location') || [])[1];
  const rows = [['Category', p.category]];
  if (loc) rows.push(['Location', loc]);
  rows.push(['Opening image', `${p.hero.caption || p.title} — ${(p.hero.label || 'Visualisation').toLowerCase()}`]);
  return el('section', { class: 'p-intro wrap', 'aria-label': 'Project summary' }, [
    el('p', { class: 'p-intro__n' }, [el('span', { class: 'p-intro__big', text: p.number }), el('span', { class: 'meta', text: `/ ${String(PROJECTS.length).padStart(2, '0')}` })]),
    el('p', { class: 'p-intro__lede reveal', text: p.lede }),
    el('dl', { class: 'p-intro__meta' }, rows.map(([k, v]) => el('div', {}, [el('dt', { class: 'meta', text: k }), el('dd', { text: v })]))),
  ]);
}

function concept(p) {
  return el('section', { class: 'p-concept wrap', id: 'concept', 'aria-labelledby': 'concept-h' }, [
    el('span', { class: 'ghost-num', 'aria-hidden': 'true', text: p.number }),
    el('h2', { class: 'side-label', id: 'concept-h' }, [el('span', { class: 'num', text: 'A' }), 'Concept']),
    el('div', { class: 'p-concept__body' }, p.concept.map((t, k) => el('p', { class: k === 0 ? 'p-concept__first reveal' : 'reveal', text: t }))),
  ]);
}

function facts(p) {
  const rows = p.facts.slice();
  if (p.showYear && p.year) rows.splice(1, 0, ['Year', p.year]);
  return el('section', { class: 'p-facts wrap', 'aria-labelledby': 'facts-h' }, [
    el('h2', { class: 'side-label', id: 'facts-h' }, [el('span', { class: 'num', text: 'B' }), 'Project facts']),
    el('dl', { class: 'facts' }, rows.flatMap(([k, v]) => [el('div', { class: 'facts__row' }, [el('dt', { text: k }), el('dd', { text: v })])])),
  ]);
}

let figN = 0;
function fig(p, img, sizes, cls = '') {
  figN += 1;
  return el('figure', { class: `v-fig reveal ${cls}` }, [el('div', { class: 'v-fig__img' }, picture(p, img, { sizes })), caption(img, figN)]);
}

function views(p) {
  figN = 0;
  const rows = p.views.map((v) => {
    const imgs = v.images;
    switch (v.layout) {
      case 'pair': return el('div', { class: 'v-row v-row--pair' }, [fig(p, imgs[0], '(max-width:760px) 100vw, 58vw'), fig(p, imgs[1], '(max-width:760px) 100vw, 40vw')]);
      case 'trio': return el('div', { class: 'v-row v-row--trio' }, imgs.map((m) => fig(p, m, '(max-width:760px) 100vw, 33vw')));
      case 'offset-left': return el('div', { class: 'v-row v-row--offset-left' }, [fig(p, imgs[0], '(max-width:760px) 100vw, 66vw'), el('p', { class: 'v-note reveal', text: v.text || '' })]);
      case 'offset-right': return el('div', { class: 'v-row v-row--offset-right' }, [el('p', { class: 'v-note reveal', text: v.text || '' }), fig(p, imgs[0], '(max-width:760px) 100vw, 66vw')]);
      default: return el('div', { class: 'v-row v-row--full' }, fig(p, imgs[0], '100vw'));
    }
  });
  return el('section', { class: 'p-views wrap', 'aria-labelledby': 'views-h' }, [
    el('h2', { class: 'side-label', id: 'views-h' }, [el('span', { class: 'num', text: 'C' }), 'Selected views']),
    ...rows,
  ]);
}

function drawings(p) {
  const plans = p.drawings.filter((d) => d.type === 'Plan');
  const others = p.drawings.filter((d) => d.type !== 'Plan');
  const card = (d) => {
    const k = p.drawings.indexOf(d);
    const label = `${d.type} — ${d.title === 'Front elevation' ? 'Front' : d.title}${d.scale ? ' · ' + d.scale : ''}`;
    const tall = d.h > d.w * 1.05;
    return el('figure', { class: `dwg reveal${tall ? ' dwg--tall' : ''}${d.w > d.h * 1.6 ? ' dwg--wide' : ''}` }, [
      el('button', { class: 'dwg__sheet', type: 'button', 'data-dwg': k, 'aria-label': `Open ${label} in the drawing viewer` },
        el('img', { src: `${p.dir}${d.file}-preview.webp`, width: d.w, height: d.h, alt: `${label} — technical drawing`, loading: 'lazy', decoding: 'async' })),
      el('figcaption', { class: 'dwg__cap' }, [
        el('span', { class: 'dwg__type meta', text: d.type }),
        el('span', { class: 'dwg__title', text: d.title + (d.scale ? `, ${d.scale}` : '') }),
        el('span', { class: 'dwg__acts' }, [
          el('button', { type: 'button', class: 'txt-btn', 'data-dwg': k, text: 'View' }),
          el('a', { class: 'txt-btn', href: `${p.dir}${d.file}.pdf`, target: '_blank', rel: 'noopener', text: 'PDF ↗' }),
        ]),
      ]),
    ]);
  };
  return el('section', { class: 'p-drawings', 'aria-labelledby': 'dwg-h' }, [
    el('div', { class: 'p-drawings__band' }, el('div', { class: 'wrap p-drawings__head' }, [
      el('h2', { class: 'h-section', id: 'dwg-h' }, [el('span', { class: 'num', text: 'D' }), 'Plans and sections']),
      el('p', { class: 'p-drawings__note', text: `${p.drawings.length} drawings. Open any sheet to zoom and pan; the original PDF is linked beside each.` }),
    ])),
    el('div', { class: 'wrap' }, [
      plans.length ? el('div', { class: `dwg-grid dwg-grid--plans${plans.length === 1 ? ' dwg-grid--single' : ''}` }, [
        ...plans.map(card),
        plans.length === 1 && p.drawingsNote ? el('p', { class: 'dwg-note reveal', text: p.drawingsNote }) : null,
      ]) : null,
      others.length ? el('div', { class: 'dwg-grid dwg-grid--sections' }, others.map(card)) : null,
    ]),
  ]);
}

function materials(p) {
  const m = p.materials;
  return el('section', { class: 'p-materials wrap', 'aria-labelledby': 'mat-h' }, [
    el('h2', { class: 'side-label', id: 'mat-h' }, [el('span', { class: 'num', text: 'E' }), 'Materials and details']),
    el('div', { class: 'p-materials__text' }, [
      el('p', { class: 'reveal', text: m.text }),
      el('dl', { class: 'facts facts--compact' }, m.list.map(([k, v]) => el('div', { class: 'facts__row' }, [el('dt', { text: k }), el('dd', { text: v })]))),
    ]),
    m.image ? el('div', { class: 'p-materials__img' }, fig(p, m.image, '(max-width:760px) 100vw, 45vw')) : null,
  ]);
}

function objectBlock(p) {
  return el('section', { class: 'p-object wrap', 'aria-label': 'Object views and link' }, [
    ...(p.gallery || []).map((g) => el('div', { class: 'p-object__img' }, fig(p, g, '(max-width:760px) 100vw, 40vw'))),
    p.external ? el('div', { class: 'p-object__cta' }, [
      el('p', { class: 'meta', text: 'The full project lives on its own site' }),
      el('a', { class: 'cta-block', href: p.external.url, target: '_blank', rel: 'noopener' }, [
        el('span', { class: 'cta-block__t', text: p.external.label }),
        el('span', { class: 'cta-block__u', text: p.external.url.replace(/^https:\/\//, '') }),
        el('span', { class: 'cta-block__a', 'aria-hidden': 'true', text: '↗' }),
      ]),
    ]) : null,
  ]);
}

function nextBlock(n) {
  return el('nav', { class: 'p-next', 'aria-label': 'Next project' },
    el('a', { class: 'p-next__link', href: projectUrl(n), style: `--accent:${n.accent || '#3546B6'}` }, [
      el('div', { class: 'wrap p-next__inner' }, [
        el('span', { class: 'meta p-next__k', text: 'Next project' }),
        el('span', { class: 'p-next__num', text: n.number }),
        el('span', { class: 'p-next__title', text: n.title }),
        el('span', { class: 'p-next__cat meta', text: n.category }),
        el('span', { class: 'p-next__img' }, picture(n, n.cover, { sizes: '(max-width:760px) 60vw, 28vw' })),
      ]),
    ]));
}

if (reducedMotion()) document.documentElement.classList.add('rm');

/* ---------------------------------------------------------------- start */
if (idx < 0) {
  document.title = 'Project not found — Nejat Şumlu';
  main.replaceChildren(el('section', { class: 'wrap notfound' }, [
    el('h1', { class: 'h-display', text: 'Not found' }),
    el('p', {}, el('a', { class: 'btn btn--solid', href: './#work', text: 'Back to projects' })),
  ]));
} else {
  render(PROJECTS[idx], idx);
}
