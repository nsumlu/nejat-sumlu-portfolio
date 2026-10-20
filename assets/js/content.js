/* ==========================================================================
   SITE CONTENT — edit this file to change text, images and projects.
   --------------------------------------------------------------------------
   • Paths are relative to the site root (they work on GitHub Pages
     sub-directories such as https://user.github.io/repo/).
   • Images: give the base name (without "-800.webp") plus the widths that
     exist on disk. Use tools/make-image-sizes.py to create them.
   • Every image is a visualisation of an unbuilt academic proposal or
     object study — keep the "label" honest (Visualisation / Concept Study).
   • See README.md → "Editing content" and "Adding a project".
   ========================================================================== */

export const SITE = {
  name: 'Nejat Şumlu',
  title: 'Interior Designer', // the only public professional title
  location: 'Istanbul, Türkiye',
  email: 'nsumlu@hotmail.com',
  intro:
    'I am an Istanbul-based interior designer exploring how material, light and spatial composition shape experience. My work spans cultural, retail and hospitality environments, alongside an interest in collectible objects.',
  portrait: { src: 'assets/profile/portrait-326.webp', w: 326, h: 435, alt: 'Portrait of Nejat Şumlu' },
  cv: 'assets/profile/Nejat-Sumlu-CV.pdf',
  education: [
    { years: '2020–2025', title: 'Interior Architecture (BA)', place: 'Istanbul Gelişim University, Faculty of Fine Arts' },
  ],
  internships: [
    { years: 'Aug–Sep 2024', title: 'Internship', place: 'Artaş İnşaat' },
    { years: 'Aug–Sep 2023', title: 'Internship', place: 'Kaleseramik' },
  ],
  software: ['AutoCAD', 'Autodesk 3ds Max', 'Adobe Photoshop', 'Rhino 7', 'Microsoft Office'],
  languages: ['English — B2'],
  /* Social links. The hrefs are the exact destinations encoded in the supplied
     QR codes (me-qr.com redirect links). Replace them with the direct profile
     URLs once confirmed — see ASSET-MANIFEST.md → "Needs review". */
  social: [
    { label: 'LinkedIn', href: 'https://q.me-qr.com/dhlhrgz8', qr: 'assets/profile/qr/linkedin-480.png' },
    { label: 'Behance', href: 'https://q.me-qr.com/hov3la8e', qr: 'assets/profile/qr/behance-480.png' },
  ],
};

/* Helper: an image entry. `base` is relative to the project's folder. */
const V = 'Visualisation';

/* --------------------------------------------------------------------------
   PROJECTS — order here is the order on the site.
   kind: 'interior' | 'object'   (the selector supports up to ~6 projects)
   -------------------------------------------------------------------------- */
export const PROJECTS = [
  /* ------------------------------------------------------------------ 01 */
  {
    id: 'concept-store',
    number: '01',
    title: 'Concept Store',
    kind: 'interior',
    category: 'Retail interior',
    dir: 'assets/projects/concept-store/',
    accent: '#C99A2E',
    cover: { base: 'images/storefront', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Classical yellow storefront with columns and carved figures flanking an arched entrance, lit at dusk', label: V },
    /* Settled hero: the full-resolution render the entrance video ends on.
       Measured by feature matching (2,714 inlier points): the video's last
       frame = this render × 0.861, shifted −128.8 px / +0.3 px, no rotation.
       The entrance uses `entrance.bridge` to crossfade frame → render. */
    hero: { base: 'images/entrance-axis', widths: [800, 1400, 1787], w: 1787, h: 835, alt: 'Inside the store: a red runway carpet leads between marble columns to a lit podium under a chandelier', label: V, caption: 'Arrival — the entrance axis' },
    entrance: {
      // MP4 (H.264) for Safari/Edge/Chrome, WebM (VP9) where H.264 is unavailable
      video: {
        mp4: { large: 'video/door-entry-720.mp4', small: 'video/door-entry-540.mp4' },
        webm: { large: 'video/door-entry-720.webm', small: 'video/door-entry-540.webm' },
      },
      label: 'Entering Concept Store',
      bridge: { frame: [1280, 720], scale: 0.861, tx: -128.8, ty: 0.3 },
    },
    lede: 'A menswear concept store where a palazzo facade opens onto a runway.',
    concept: [
      'An academic retail study combining luxury menswear with technology and a runway experience. The brief took BIJAN — the Beverly Hills menswear house known for its Mediterranean-style palazzo boutique — as a reference for character and clientele.',
      'The facade borrows that palazzo language: Corinthian columns, a carved pediment and two atlantes framing the door. Inside, a single axis organises the store. A red runway carpet runs from the entrance to a lit circular podium; suits are shown in glass capsules between dark marble columns; a mezzanine for shoes, bags and fragrance looks down into the gallery void.',
      'Behind the sales floor, a material room and a simulation room support fittings and product presentation, so the technology serves the visit rather than decorating it.',
    ],
    facts: [
      ['Type', 'Retail interior — menswear concept store'],
      ['Location', 'Bağdat Caddesi, Kadıköy, Istanbul'],
      ['Levels', 'Ground floor, mezzanine, walkable roof terrace'],
      ['Programme', 'Runway podium, sales floor, fitting rooms, material room, simulation room, office and staff areas'],
      ['Context', 'Academic project — Interior Architecture, Istanbul Gelişim University'],
      ['Brand reference', 'BIJAN, used as a design-brief reference; not a commissioned collaboration'],
      ['Imagery', 'Visualisations of an unbuilt proposal'],
    ],
    views: [
      { layout: 'pair', images: [
        { base: 'images/display-and-stair', widths: [800, 1400, 1910], w: 1910, h: 823, alt: 'Suits on a circular display beside a dark marble column, with a curved white stair beyond', caption: 'Menswear display and stair', label: V },
        { base: 'images/podium-office', widths: [800, 1400, 1910], w: 1910, h: 823, alt: 'A white circular podium in front of a frosted glass enclosure, flanked by marble columns', caption: 'Podium and frosted office', label: V },
      ] },
      { layout: 'offset-right', images: [{ base: 'images/storefront', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Classical yellow storefront with Corinthian columns and two carved figures flanking an arched entrance, lit at dusk', caption: 'Storefront at dusk', label: V }],
        text: 'The facade borrows a palazzo language — Corinthian columns, a carved pediment and two atlantes framing the door — and opens straight onto the runway axis.' },
    ],
    /* `scale` is shown only where it is printed on the sheet itself. */
    drawings: [
      { file: 'drawings/ground-floor', type: 'Plan', title: 'Ground floor', scale: '1:50', w: 1007, h: 1400 },
      { file: 'drawings/mezzanine', type: 'Plan', title: 'Mezzanine', scale: '1:50', w: 1020, h: 1400 },
      { file: 'drawings/front-elevation', type: 'Elevation', title: 'Front elevation', w: 1400, h: 589 },
      { file: 'drawings/section-aa', type: 'Section', title: 'Section A-A', scale: '1:50', w: 1400, h: 891 },
      { file: 'drawings/section-bb', type: 'Section', title: 'Section B-B', scale: '1:50', w: 1400, h: 621 },
      { file: 'drawings/section-cc', type: 'Section', title: 'Section C-C', scale: '1:50', w: 1400, h: 900 },
      { file: 'drawings/section-dd', type: 'Section', title: 'Section D-D', scale: '1:50', w: 1400, h: 609 },
    ],
    materials: {
      text: 'Finishes as noted on the drawings. The palette stays deliberately narrow so the garments, the marble columns and the red runway carry the colour.',
      list: [
        ['Ground-floor rooms', 'Laminate flooring, painted walls and ceilings'],
        ['Mezzanine sales', 'Ceramic flooring, stone-brick walls, suspended ceiling'],
        ['Wet areas', 'Ceramic flooring'],
      ],
      image: { base: 'images/display-capsules', widths: [800, 1400, 1679], w: 1679, h: 937, alt: 'Tailored suits inside cylindrical glass display capsules between dark marble columns', caption: 'Glass display capsules', label: V },
    },
    /* Dates conflict between sources (see ASSET-MANIFEST.md). Set `year`
       and `showYear: true` once confirmed. */
    year: null, showYear: false,
  },

  /* ------------------------------------------------------------------ 02 */
  {
    id: 'concept-restaurant',
    number: '02',
    title: 'Concept Restaurant',
    kind: 'interior',
    category: 'Restaurant interior',
    dir: 'assets/projects/concept-restaurant/',
    accent: '#C4471F',
    cover: { base: 'images/dining-room', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Restaurant dining room with terracotta walls, string lights, patterned floor tiles and red-clothed tables', label: V },
    hero: { base: 'images/dining-room', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Restaurant dining room with terracotta walls, string lights, patterned floor tiles and red-clothed tables', label: V, caption: 'Dining room' },
    lede: 'A two-level restaurant built around Mexican food, craft and celebration.',
    concept: [
      'A two-level restaurant in Yeşilköy, Istanbul, drawing on the many cultures of Mexico. The aim is the moment you step inside: warm colour, traditional patterns and music that make the room feel like somewhere else.',
      'Colour does the first piece of work — terracotta walls, painted murals, woven textiles and patterned floor tiles. The plan then gives equal weight to eating and taking part. The ground floor gathers several dining rooms around a central bar and a shared hall; the upper level adds workshop rooms, a gift shop, a photo corner with a changing room, and an open terrace.',
      'On set days the restaurant becomes a programme: tasting events, taco and burrito workshops, live music, and evenings of dance, art and dress.',
    ],
    facts: [
      ['Type', 'Restaurant and bar interior'],
      ['Location', 'Yeşilköy, Bakırköy, Istanbul'],
      ['Levels', 'Two floors and an upper-floor terrace'],
      ['Programme', 'Dining rooms, central bar, kitchen, food workshops, gift shop, photo corner, terrace'],
      ['Events', 'Tasting days, taco and burrito workshops, live music, dance'],
      ['Context', 'Academic project — Interior Architecture, Istanbul Gelişim University'],
      ['Imagery', 'Visualisations of an unbuilt proposal'],
    ],
    views: [
      { layout: 'pair', images: [
        { base: 'images/bar-oblique', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'A long timber bar beneath a large painted mural, seen at an angle across the dining tables', caption: 'The bar, oblique view', label: V },
        { base: 'images/bar-front', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'The bar seen head-on, with a colourful skull-motif mural wall and patterned upholstered seating', caption: 'The bar, front view', label: V },
      ] },
      { layout: 'full', images: [{ base: 'images/terrace-day', widths: [800, 1400, 1711], w: 1711, h: 919, alt: 'A covered upper-floor terrace with timber pergola, mural wall and dining tables overlooking water', caption: 'Upper-floor terrace by day', label: V }] },
      { layout: 'offset-right', images: [{ base: 'images/terrace-night', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'The terrace at night under a fringed umbrella, with lantern-like lights and guests at standing tables', caption: 'Upper-floor terrace at night', label: V }],
        text: 'The terrace extends the evening programme outdoors — standing tables, lanterns and a place for live performance.' },
    ],
    /* Only the verified ground-floor plan and four sections are supplied.
       The upper-floor plan is intentionally absent — do not substitute. */
    drawingsNote: 'The four sections cut through both floors and the walkable roof terrace, showing the dining levels, workshop rooms and floor build-ups.',
    drawings: [
      { file: 'drawings/ground-floor', type: 'Plan', title: 'Ground floor', w: 1400, h: 1097 },
      { file: 'drawings/section-aa', type: 'Section', title: 'Section A-A', scale: '1:50', w: 1400, h: 690 },
      { file: 'drawings/section-bb', type: 'Section', title: 'Section B-B', scale: '1:50', w: 1400, h: 777 },
      { file: 'drawings/section-cc', type: 'Section', title: 'Section C-C', scale: '1:50', w: 1400, h: 617 },
      { file: 'drawings/section-dd', type: 'Section', title: 'Section D-D', scale: '1:50', w: 1400, h: 595 },
    ],
    materials: {
      text: 'Finishes as noted on the drawings. Marble and tile floors keep the base calm beneath saturated walls, murals and textiles.',
      list: [
        ['Dining rooms', 'Marble flooring, painted walls and ceilings'],
        ['Service areas', 'Ceramic and laminate flooring'],
        ['Floor build-up', 'Ceramic tile, screed, thermal and water insulation, reinforced-concrete slab'],
      ],
    },
    year: null, showYear: false,
  },

  /* ------------------------------------------------------------------ 03 */
  {
    id: 'concept-cultural-centre',
    number: '03',
    title: 'Concept Cultural Centre',
    kind: 'interior',
    category: 'Cultural interior',
    dir: 'assets/projects/concept-cultural-centre/',
    accent: '#E0561B',
    cover: { base: 'images/exterior-day', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Four-storey building with orange and white bands, glazed upper floors and a grey stone base, in daylight', label: V },
    hero: { base: 'images/exterior-day', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Four-storey building with orange and white bands, glazed upper floors and a grey stone base, in daylight', label: V, caption: 'Exterior by day' },
    lede: 'A cultural centre organised around a vertical public square.',
    concept: [
      'A cultural centre in Sütlüce, Istanbul. The vertical space at the heart of the building carries the project’s idea: instead of stacking separate programmes, the centre gathers them around a shared stair-and-lift core and a gallery void that act as a vertical square.',
      'Circulation becomes a sequence of encounters. Visitors move from the exhibition hall, shop and café at street level, to a multipurpose performance hall with its backstage on the first floor, to music, dance, drawing and crafts workshops on the second, with administration above. Each landing opens onto activity rather than a corridor.',
      'Orange and white bands run across walls and ceilings as continuous lines — a graphic device that suggests movement and leads the eye between levels — set against warm timber and polished concrete.',
    ],
    facts: [
      ['Type', 'Cultural interior — exhibition, performance and workshops'],
      ['Location', 'Sütlüce, Beyoğlu, Istanbul'],
      ['Levels', 'Basement, ground and three upper floors (±0.00 / +6.00 / +11.00 / +15.00)'],
      ['Programme', 'Exhibition hall, shop, café, 125 m² multipurpose hall, music, dance, drawing and crafts workshops, offices'],
      ['Context', 'Academic project — Interior Architecture, Istanbul Gelişim University'],
      ['Imagery', 'Visualisations of an unbuilt proposal'],
    ],
    views: [
      { layout: 'full', images: [{ base: 'images/exhibition-hall', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Bright exhibition hall with polished floor, display cases and visitors among artworks', caption: 'Exhibition hall — ground floor', label: V }] },
      { layout: 'pair', images: [
        { base: 'images/exhibition-detail', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Sculpture plinths and display cases in front of a dark panelled wall and an orange column', caption: 'Exhibition detail', label: V },
        { base: 'images/exhibition-panels', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Exhibition wall with a large painting reproduction, a screen and information panels', caption: 'Exhibition panels', label: V },
      ] },
      { layout: 'offset-left', images: [{ base: 'images/performance-hall', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Performance hall with red seating, a low stage and a timber-slatted back wall', caption: 'Multipurpose performance hall', label: V }],
        text: 'First floor: a 125 m² multipurpose hall for talks, screenings and performance, with its own backstage and a foyer overlooking the void.' },
      { layout: 'trio', images: [
        { base: 'images/music-workshop', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Music workshop with guitars on the wall, keyboards and a grand piano beside full-height glazing', caption: 'Music workshop', label: V },
        { base: 'images/dance-studio', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Dance studio with a barre and full-height windows to the water, framed by orange bands', caption: 'Dance studio', label: V },
        { base: 'images/painting-workshop', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Painting workshop with long tables, easels and canvases against a glazed wall', caption: 'Painting workshop', label: V },
      ] },
      { layout: 'pair', images: [
        { base: 'images/sculpture-workshop', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Sculpture workshop with a figure on a plinth, stools and shelving in front of glazing', caption: 'Sculpture workshop', label: V },
        { base: 'images/cafe', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'Café with arched niche, long bench seating and a view to a mosque and bridge across the water', caption: 'Café', label: V },
      ] },
      { layout: 'full', images: [{ base: 'images/exterior-night', widths: [800, 1400, 1672], w: 1672, h: 941, alt: 'The building lit at night, its orange frames and glazed floors glowing', caption: 'Exterior at night', label: V }] },
    ],
    drawings: [
      { file: 'drawings/ground-floor', type: 'Plan', title: 'Ground floor', w: 1400, h: 1101 },
      { file: 'drawings/first-floor', type: 'Plan', title: 'First floor', w: 1400, h: 1101 },
      { file: 'drawings/second-floor', type: 'Plan', title: 'Second floor', w: 1385, h: 1400 },
      { file: 'drawings/third-floor', type: 'Plan', title: 'Third floor', w: 1399, h: 1400 },
      { file: 'drawings/section-aa', type: 'Section', title: 'Section A-A', scale: '1:50', w: 1400, h: 1185 },
      { file: 'drawings/section-bb', type: 'Section', title: 'Section B-B', scale: '1:50', w: 1400, h: 1237 },
      { file: 'drawings/section-cc', type: 'Section', title: 'Section C-C', scale: '1:50', w: 1400, h: 1146 },
      { file: 'drawings/section-dd', type: 'Section', title: 'Section D-D', scale: '1:50', w: 1244, h: 1400 },
    ],
    materials: {
      text: 'Finishes as noted on the drawings — each chosen for what happens in the room.',
      list: [
        ['Exhibition hall and shop', 'Polished concrete'],
        ['Multipurpose hall and backstage', 'Carpet, acoustic wall finish'],
        ['Music and dance workshops', 'Acoustic vinyl'],
        ['Drawing and crafts workshops', 'Epoxy flooring'],
        ['Wet areas', 'Ceramic'],
      ],
    },
    year: null, showYear: false,
  },

  /* ------------------------------------------------------------------ 04 */
  {
    id: 'relic-no01',
    number: '04',
    title: 'RELIC No.01',
    kind: 'object',
    category: 'Collectible object',
    dir: 'assets/projects/relic-no01/',
    accent: '#B8742A',
    cover: { base: 'images/object', widths: [800, 1122], w: 1122, h: 1402, alt: 'Sculptural table light: a flowing bronze frame holding amber glass around a candle flame', label: V },
    hero: { base: 'images/object', widths: [800, 1122], w: 1122, h: 1402, alt: 'Sculptural table light: a flowing bronze frame holding amber glass around a candle flame', label: V, caption: 'RELIC No.01' },
    lede: 'Light, remembered.',
    concept: [
      'A collectible sculptural table light: amber glass, faceted crystal and a flowing bronze frame. RELIC No.01 reinterprets the warmth and ritual of flame-based lighting — antique spirit without nostalgia, sculptural form without ornament.',
    ],
    facts: [
      ['Type', 'Collectible lighting object'],
      ['Materials', 'Amber glass, faceted crystal, bronze'],
      ['Imagery', 'Visualisations'],
    ],
    gallery: [
      { base: 'images/material-detail', widths: [800, 1122], w: 1122, h: 1402, alt: 'Close-up of faceted amber crystal set in a bronze frame, lit from within', caption: 'Material detail', label: V },
    ],
    external: { label: 'Explore RELIC No.01', url: 'https://nsumlu.github.io/relic-no01-final/' },
    year: null, showYear: false,
  },

  /* ------------------------------------------------------------------
     FUTURE PROJECTS — copy one of the blocks above, give it a new id,
     number and folder (assets/projects/<id>/), and it will appear in the
     selector, the index and the "next project" chain automatically.
     Do not add placeholder entries: only real, finished projects.
     ------------------------------------------------------------------ */
];

/* Utility used by the renderers ------------------------------------------ */
export function srcset(project, img) {
  const base = (project ? project.dir : '') + img.base;
  return img.widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
}
export function src(project, img, prefer = 1400) {
  const base = (project ? project.dir : '') + img.base;
  const w = img.widths.find((x) => x >= prefer) || img.widths[img.widths.length - 1];
  return `${base}-${w}.webp`;
}
