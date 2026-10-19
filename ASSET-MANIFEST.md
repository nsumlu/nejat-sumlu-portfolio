# Asset manifest

Every file the website uses, with its project, role, caption and verified source in the supplied package
(`nejat-sumlu-claude-final-assets.zip`). Each project keeps its own folder under `assets/projects/<project>/` — images and drawings are never shared between projects.

Public captions use neutral labels (*Visualisation*, *Plan*, *Section*, *Elevation*). Provenance is kept here, not on the site.

## Concept Store  `assets/projects/concept-store/`

| File(s) | Role | Caption | Source (package) | Verification |
|---|---|---|---|---|
| `storefront-800.webp`<br>`storefront-1400.webp`<br>`storefront-1672.webp` | Image — Selector cover; matches first frame of entrance video; Selected views (offset, with note) | Visualisation — Storefront at dusk | `projects/01-concept-store/images/01-facade.png`<br>orig. *ChatGPT Image Oct 18, 2026, 10_54_30 PM.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `entrance-axis-800.webp`<br>`entrance-axis-1400.webp`<br>`entrance-axis-1787.webp` | Image — Project hero (settled arrival). The video's last frame = this render ×0.861, shifted −128.8/+0.3 px, no rotation (ORB/RANSAC, 2,714 inliers; residual 3.6/255); the entrance crossfades frame → render | Visualisation — Arrival, the entrance axis | `projects/01-concept-store/images/04-entrance-axis.png`<br>orig. *bijan2.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `display-and-stair-800.webp`<br>`display-and-stair-1400.webp`<br>`display-and-stair-1910.webp` | Image — Selected views (pair) | Visualisation — Menswear display and stair | `projects/01-concept-store/images/02-display-and-stair.png`<br>orig. *ChatGPT Image Oct 18, 2026, 09_47_23 PM.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `podium-office-800.webp`<br>`podium-office-1400.webp`<br>`podium-office-1910.webp` | Image — Selected views (pair) | Visualisation — Podium and frosted office | `projects/01-concept-store/images/05-podium-office.png`<br>orig. *ChatGPT Image Oct 18, 2026, 09_32_19 PM.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `display-capsules-800.webp`<br>`display-capsules-1400.webp`<br>`display-capsules-1679.webp` | Image — Materials and details image | Visualisation — Glass display capsules | `projects/01-concept-store/images/03-display-capsules.png`<br>orig. *bijan1.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `front-elevation.pdf`<br>`front-elevation-preview.webp`<br>`front-elevation-large.webp` | Drawing — Elevation | Elevation — Front elevation | `projects/01-concept-store/drawings/front-elevation.pdf`<br>orig. *PLAN2-ÖNGÖRÜNÜŞ.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `ground-floor.pdf`<br>`ground-floor-preview.webp`<br>`ground-floor-large.webp` | Drawing — Plan | Plan — Ground floor | `projects/01-concept-store/drawings/ground-floor.pdf`<br>orig. *plan2-Model.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `mezzanine.pdf`<br>`mezzanine-preview.webp`<br>`mezzanine-large.webp` | Drawing — Plan | Plan — Mezzanine | `projects/01-concept-store/drawings/mezzanine.pdf`<br>orig. *plan2-Model.pdf2.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `section-aa.pdf`<br>`section-aa-preview.webp`<br>`section-aa-large.webp` | Drawing — Section | Section — Section A-A | `projects/01-concept-store/drawings/section-aa.pdf`<br>orig. *plan2-KESİTA.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `section-bb.pdf`<br>`section-bb-preview.webp`<br>`section-bb-large.webp` | Drawing — Section | Section — Section B-B | `projects/01-concept-store/drawings/section-bb.pdf`<br>orig. *plan2-Mkesitb.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `section-cc.pdf`<br>`section-cc-preview.webp`<br>`section-cc-large.webp` | Drawing — Section | Section — Section C-C | `projects/01-concept-store/drawings/section-cc.pdf`<br>orig. *plan2-CCKESİT.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `section-dd.pdf`<br>`section-dd-preview.webp`<br>`section-dd-large.webp` | Drawing — Section | Section — Section D-D | `projects/01-concept-store/drawings/section-dd.pdf`<br>orig. *plan2-DDKESİT.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `door-entry-720.mp4`<br>`door-entry-540.mp4`<br>`door-entry-720.webm`<br>`door-entry-540.webm` | Entrance video (plays once after selecting Concept Store) | Entering Concept Store | `projects/01-concept-store/video/door-entry.mp4`<br>orig. *Walkthrough_into_menswear_boutiq…_20261018233947.mp4* | Facade → door with atlantes → runway axis. The supplied clip has an abrupt jump at the threshold (frames 119→120, 5.0 s); smoothed with a 0.25 s dissolve, giving 7.75 s. No other edits. First frame matches 01-facade.png (mean diff 3.6/255); last frame unchanged. Audio removed; H.264 + VP9. |

## Concept Restaurant  `assets/projects/concept-restaurant/`

| File(s) | Role | Caption | Source (package) | Verification |
|---|---|---|---|---|
| `dining-room-800.webp`<br>`dining-room-1400.webp`<br>`dining-room-1672.webp` | Image — Selector cover and project hero | Visualisation — Dining room | `projects/02-concept-restaurant/images/01-dining.png`<br>orig. *ChatGPT Image Oct 19, 2026, 05_48_21 PM.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `bar-oblique-800.webp`<br>`bar-oblique-1400.webp`<br>`bar-oblique-1672.webp` | Image — Selected views (pair) | Visualisation — The bar, oblique view | `projects/02-concept-restaurant/images/02-bar-oblique.png`<br>orig. *ChatGPT Image Oct 19, 2026, 05_48_27 PM.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `bar-front-800.webp`<br>`bar-front-1400.webp`<br>`bar-front-1672.webp` | Image — Selected views (pair) | Visualisation — The bar, front view | `projects/02-concept-restaurant/images/03-bar-front.png`<br>orig. *ChatGPT Image Oct 19, 2026, 05_48_33 PM.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `terrace-day-800.webp`<br>`terrace-day-1400.webp`<br>`terrace-day-1711.webp` | Image — Selected views (full width) | Visualisation — Upper-floor terrace by day | `projects/02-concept-restaurant/images/04-terrace-day.png`<br>orig. *ChatGPT Image Oct 19, 2026, 05_39_45 PM.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `terrace-night-800.webp`<br>`terrace-night-1400.webp`<br>`terrace-night-1672.webp` | Image — Selected views (offset) | Visualisation — Upper-floor terrace at night | `projects/02-concept-restaurant/images/05-terrace-night.png`<br>orig. *ChatGPT Image Oct 19, 2026, 05_39_52 PM.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `ground-floor.pdf`<br>`ground-floor-preview.webp`<br>`ground-floor-large.webp` | Drawing — Plan | Plan — Ground floor | `projects/02-concept-restaurant/drawings/ground-floor.pdf`<br>orig. *plan1.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `section-aa.pdf`<br>`section-aa-preview.webp`<br>`section-aa-large.webp` | Drawing — Section | Section — Section A-A | `projects/02-concept-restaurant/drawings/section-aa.pdf`<br>orig. *kesitaa.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `section-bb.pdf`<br>`section-bb-preview.webp`<br>`section-bb-large.webp` | Drawing — Section | Section — Section B-B | `projects/02-concept-restaurant/drawings/section-bb.pdf`<br>orig. *kesitb.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `section-cc.pdf`<br>`section-cc-preview.webp`<br>`section-cc-large.webp` | Drawing — Section | Section — Section C-C | `projects/02-concept-restaurant/drawings/section-cc.pdf`<br>orig. *kesitcc.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `section-dd.pdf`<br>`section-dd-preview.webp`<br>`section-dd-large.webp` | Drawing — Section | Section — Section D-D | `projects/02-concept-restaurant/drawings/section-dd.pdf`<br>orig. *kesitdd.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |

## Concept Cultural Centre  `assets/projects/concept-cultural-centre/`

| File(s) | Role | Caption | Source (package) | Verification |
|---|---|---|---|---|
| `exterior-day-800.webp`<br>`exterior-day-1400.webp`<br>`exterior-day-1672.webp` | Image — Selector cover and project hero | Visualisation — Exterior by day | `projects/03-concept-cultural-centre/images/11-discephe-gunduz.png`<br>orig. *11-discephe-gunduz.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `exhibition-hall-800.webp`<br>`exhibition-hall-1400.webp`<br>`exhibition-hall-1672.webp` | Image — Selected views (full width) | Visualisation — Exhibition hall, ground floor | `projects/03-concept-cultural-centre/images/02-sergi-holu.png`<br>orig. *02-sergi-holu.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `exhibition-detail-800.webp`<br>`exhibition-detail-1400.webp`<br>`exhibition-detail-1672.webp` | Image — Selected views (pair) | Visualisation — Exhibition detail | `projects/03-concept-cultural-centre/images/05-sergi-detay.png`<br>orig. *05-sergi-detay.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `exhibition-panels-800.webp`<br>`exhibition-panels-1400.webp`<br>`exhibition-panels-1672.webp` | Image — Selected views (pair) | Visualisation — Exhibition panels | `projects/03-concept-cultural-centre/images/07-sergi-panolari.png`<br>orig. *07-sergi-panolari.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `performance-hall-800.webp`<br>`performance-hall-1400.webp`<br>`performance-hall-1672.webp` | Image — Selected views (offset) | Visualisation — Multipurpose performance hall | `projects/03-concept-cultural-centre/images/04-konferans.png`<br>orig. *04-konferans.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `music-workshop-800.webp`<br>`music-workshop-1400.webp`<br>`music-workshop-1672.webp` | Image — Selected views (trio) | Visualisation — Music workshop | `projects/03-concept-cultural-centre/images/06-muzik-atolyesi.png`<br>orig. *06-muzik-atolyesi.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `dance-studio-800.webp`<br>`dance-studio-1400.webp`<br>`dance-studio-1672.webp` | Image — Selected views (trio) | Visualisation — Dance studio | `projects/03-concept-cultural-centre/images/01-dans.png`<br>orig. *01-dans.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `painting-workshop-800.webp`<br>`painting-workshop-1400.webp`<br>`painting-workshop-1672.webp` | Image — Selected views (trio) | Visualisation — Painting workshop | `projects/03-concept-cultural-centre/images/08-resim-atolyesi.png`<br>orig. *08-resim-atolyesi.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `sculpture-workshop-800.webp`<br>`sculpture-workshop-1400.webp`<br>`sculpture-workshop-1672.webp` | Image — Selected views (pair) | Visualisation — Sculpture workshop | `projects/03-concept-cultural-centre/images/03-heykel-atolyesi.png`<br>orig. *03-heykel-atolyesi.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `cafe-800.webp`<br>`cafe-1400.webp`<br>`cafe-1672.webp` | Image — Selected views (pair) | Visualisation — Café | `projects/03-concept-cultural-centre/images/09-kafe.png`<br>orig. *09-kafe.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `exterior-night-800.webp`<br>`exterior-night-1400.webp`<br>`exterior-night-1672.webp` | Image — Selected views (full width) | Visualisation — Exterior at night | `projects/03-concept-cultural-centre/images/10-discephe-gece.png`<br>orig. *10-discephe-gece.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `first-floor.pdf`<br>`first-floor-preview.webp`<br>`first-floor-large.webp` | Drawing — Plan | Plan — First floor | `projects/03-concept-cultural-centre/drawings/first-floor.pdf`<br>orig. *BİRKAT.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `ground-floor.pdf`<br>`ground-floor-preview.webp`<br>`ground-floor-large.webp` | Drawing — Plan | Plan — Ground floor | `projects/03-concept-cultural-centre/drawings/ground-floor.pdf`<br>orig. *ZEMKAT.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `second-floor.pdf`<br>`second-floor-preview.webp`<br>`second-floor-large.webp` | Drawing — Plan | Plan — Second floor | `projects/03-concept-cultural-centre/drawings/second-floor.pdf`<br>orig. *plan33.pdf* | Source file was plan33.pdf in the restaurant ("cafe") folder. Confirmed cultural centre: music 42 m², dance 31 m², drawing 49 m², crafts 30 m² workshops + twin lifts match section A-A/B-B at +11.00. NOT used for the restaurant. |
| `section-aa.pdf`<br>`section-aa-preview.webp`<br>`section-aa-large.webp` | Drawing — Section | Section — Section A-A | `projects/03-concept-cultural-centre/drawings/section-aa.pdf`<br>orig. *aakesit.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `section-bb.pdf`<br>`section-bb-preview.webp`<br>`section-bb-large.webp` | Drawing — Section | Section — Section B-B | `projects/03-concept-cultural-centre/drawings/section-bb.pdf`<br>orig. *bbkesit.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `section-cc.pdf`<br>`section-cc-preview.webp`<br>`section-cc-large.webp` | Drawing — Section | Section — Section C-C | `projects/03-concept-cultural-centre/drawings/section-cc.pdf`<br>orig. *CCKESİT.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `section-dd.pdf`<br>`section-dd-preview.webp`<br>`section-dd-large.webp` | Drawing — Section | Section — Section D-D | `projects/03-concept-cultural-centre/drawings/section-dd.pdf`<br>orig. *ddkesit.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |
| `third-floor.pdf`<br>`third-floor-preview.webp`<br>`third-floor-large.webp` | Drawing — Plan | Plan — Third floor | `projects/03-concept-cultural-centre/drawings/third-floor.pdf`<br>orig. *3KATT.pdf* | Title block / room labels read and sheet rendered; previews rendered directly from this PDF (not reused). |

## RELIC No.01  `assets/projects/relic-no01/`

| File(s) | Role | Caption | Source (package) | Verification |
|---|---|---|---|---|
| `object-800.webp`<br>`object-1122.webp` | Image — Selector cover and project hero | Visualisation — RELIC No.01 | `projects/04-relic/images/01-object.png`<br>orig. *ChatGPT Görseli 9 Eki 2026 12_26_26-2.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |
| `material-detail-800.webp`<br>`material-detail-1122.webp` | Image — Object view beside link | Visualisation — Material detail | `projects/04-relic/images/02-material-detail.png`<br>orig. *ChatGPT Görseli 9 Eki 2026 12_26_28-3.png* | Visually checked: belongs to this project (consistent interior language, signage/programme); hash matches package manifest. |

## Profile  `assets/profile/`

| File(s) | Role | Caption | Source (package) | Verification |
|---|---|---|---|---|
| `portrait-326.webp` | Portrait | Portrait of Nejat Şumlu | `profile/portrait.png` | Pixel-identical to the image embedded in the CV PDF. |
| `linkedin-480.png` | QR code | Scan — LinkedIn | `profile/qr/linkedin.png` | Decoded: https://q.me-qr.com/dhlhrgz8 (me-qr.com dynamic redirect). Resized copy re-decoded to the same URL. |
| `behance-480.png` | QR code | Scan — Behance | `profile/qr/behance.png` | Decoded: https://q.me-qr.com/hov3la8e (me-qr.com dynamic redirect). Resized copy re-decoded to the same URL. |
| `Nejat-Sumlu-CV.pdf` | Public CV download | Download CV (PDF) | `tools/cv/cv.html (generated)` | Rebuilt from verified CV facts only; excludes address, phone, high school and references. |

## Flagged for review

| Item | Status | Reason |
|---|---|---|
| projects/02-concept-restaurant/moodboard/material-light-palette.png | **Excluded** | Composite board (Turkish heading, duplicated renders, material swatches of unverified origin); not in the selected images folder. Possible overlap with old-portfolio material imagery cannot be ruled out. |
| Restaurant upper-floor plan | **Missing** | No clean verified PDF supplied. Old-portfolio page not used. The page shows the ground floor plan and four sections only. |
| LinkedIn / Behance profile URLs | **Needs review** | QR codes decode to me-qr.com redirect links; the final profile URLs could not be fetched from this environment. Dynamic QR links can expire — replace with direct URLs in assets/js/content.js (SITE.social) and tools/cv/cv.html. |
| Project dates | **Hidden until confirmed** | Concept Store: old portfolio says 2022/2023, source folder says "2.sınıf-2.dönem" (2nd year, spring term), i.e. 2021/22 if enrolment began in 2020. Concept Restaurant 2022/2023 and Cultural Centre 2024/2025 come from the old portfolio only. All dates are omitted; set `year` + `showYear` in content.js once confirmed. |
| Plan scales | **Shown only where printed** | Restaurant ground floor and the four cultural-centre plans carry no printed scale; no scale is shown for them. |
| RELIC No.01 text | **Sourced** | Wording taken from https://nsumlu.github.io/relic-no01-final/ (title, materials, “Light, remembered.”). |

## Supplied but deliberately not used

- text-reference-only/OLD-PORTFOLIO-TEXT-ONLY.pdf — text only; no images, drawings, layouts or colours extracted
- design-references/*.jpg — design inspiration only, never shown
- review/*.png|jpg — internal review aids only
- projects/*/drawing-previews/*.webp — superseded; previews regenerated from the verified PDFs
- profile/Nejat-Sumlu-CV.pdf — original contains private address, phone and references; not published

Source SHA-256 hashes for every file are in `asset-manifest.json`; all 74 package hashes matched the package manifest on 19 Oct 2026.
