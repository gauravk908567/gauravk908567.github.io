# CHANGELOG.md

All changes to this portfolio site are recorded here, newest first.
Use this file to understand what changed and to revert specific changes if something breaks.

## Format
Each entry includes: date, what changed, which file(s), and the git commit hash (once committed).

---

## [2026-06-23] — Projects restructure (1 hero + supporting) + secondary page copy fixes

**Changes:**
- Restructured homepage Projects to focus on Planet of Twins as the hero, per the "one strong project beats three weak ones" principle.
- Kept 3 detailed cards: **Planet of Twins** (hero), **Action RPG**, **FPP Horror** — with rewritten, honest, production-framed copy (dropped "purpose is to learn X" language).
- Collapsed the 3 weakest into a compact **"Other Work"** one-line strip: Furry Escape (Shipped pill), Space Shooting Range, FPS Multiplayer. Files/links kept.
- Removed "(Detailed Explanation)" clutter from headings.
- Added `.other-work` CSS.
- **Secondary page copy fixes:** Action RPG (`landing5.html`) overview + lore rewritten, fixed typos (sowrds/thier/collegues/desginer/suffereing/coverted). FPS Multiplayer (`landing2.html`) reframed from "my goal is to master Photon" to a built-prototype description.

**Files changed:**
- `index.html`, `landing5.html`, `landing2.html`, `css/templatemo-style.css`

**Commit:** _(pending)_

---

## [2026-06-23] — Removed orphan experience pages

**Changes:**
- Deleted `expgamemano.html` and `expgetmega.html`. Both were unreachable (their links in `index.html` were commented out long ago) and `expgamemano.html` held a bare PDF iframe. Confirmed no active link references either before deleting.

**Files removed:**
- `expgamemano.html`, `expgetmega.html`

**Commit:** _(pending)_

---

## [2026-06-23] — Stop PDFs auto-downloading (resume + RPG dev plan)

**Changes:**
- **Resume viewer:** switched the PDF embed from `<iframe>` to `<object>` (inline-view hints `#view=FitH&toolbar=1`) so it renders in-page. Changed the Download control from an `<a download>` (which contributed to eager download) to a `<button>` that only triggers a download on explicit click via JS. Added an in-`<object>` fallback link for browsers that can't render inline.
- **Action RPG dev plan (`landing5.html`):** same fix — bare `<iframe src="doc/devtimeRPG.pdf">` (21MB, was auto-downloading) replaced with a responsive `<object>` + "Open in new tab" fallback.

**Note:** If a user has their browser hard-set to "always download PDFs," that's a browser/OS-level setting we can't override from a static page; the fallback link covers them. For everyone on default settings, PDFs now display inline.

**Files changed:**
- `resume.html`, `landing5.html`

**Commit:** _(pending)_

---

## [2026-06-23] — Carousels on Planet of Twins page (+ fixes overflow)

**Changes:**
- Built a lightweight, dependency-free carousel (`js/carousel.js` + CSS section 9): arrows, dots, count badge, keyboard, touch/mouse swipe, optional autoplay that pauses on hover and while a video plays. Chosen over Swiper/Splide to keep the site's no-CDN/fully-vendored principle (only ~3KB).
- **Hero screenshot carousel** added near the top of `landing1.html` (5 best shots, autoplay 4.5s) so visitors get the visual hook immediately.
- **Story/world videos** converted from a fixed 3-wide `.video-container` (which overflowed horizontally — the reported break) into a video carousel.
- Removed the duplicate bottom "Pitch, Story & Level Snapshots" gallery (those images now live in the hero carousel). Kept the dev-plan/roadmap "Production Artefacts" images.
- Wired `carousel.js` into landing1; bumped CSS cache to `?v=5`.
- Abilities carousel deferred until ability clips are recorded (left the single rescue video inline).

**Files changed:**
- `landing1.html`, `css/templatemo-style.css`, `js/carousel.js` (new), all `*.html` (cache v5)

**Commit:** _(pending)_

---

## [2026-06-23] — Responsive hardening (fix layout breaking on resize)

**Changes:**
- Added a "Responsive Hardening" CSS section. The template only responded at 768/480/992px but several elements had fixed sizes that overflowed in between.
- Global overflow guard (`max-width:100%; overflow-x:hidden`), all images/videos/iframes capped to container width, project `width:600px` images and fixed iframes now fluid.
- Skills + certificates switched to wrap-safe flex with clean 3→2→1 steps that account for the still-present sidebar in the 992–1290 band.
- Banner padding scales 260→120→70px so the hero isn't absurdly tall when narrow; H2 shrinks on small screens. Mobile header recolored to slate. Project hover text shrinks to fit small screens.
- Bumped CSS cache to `?v=4`.

**Files changed:**
- `css/templatemo-style.css`, all `*.html` (cache-bust v4)

**Commit:** _(pending)_

---

## [2026-06-23] — Fix near-invisible project hover text

**Changes:**
- Project image hover overlay text was nearly invisible (dark grey on dark overlay) because the Phase-1 dark body-text rule overrode the overlay's white. Forced `.project-hover .inside` text white with high specificity, deepened the overlay to slate `rgba(31,41,51,0.82)` for contrast, and made the hover title go light-cyan. Bumped CSS cache to `?v=3`.

**Files changed:**
- `css/templatemo-style.css`, all `*.html` (cache-bust v3)

**Commit:** _(pending)_

---

## [2026-06-23] — Cache-bust + content tint + resume filename

**Changes:**
- **Cache-bust:** Added `?v=2` to the `templatemo-style.css` link in all 11 HTML pages so browsers load the new palette/font immediately (the slate sidebar + slate About banner were being hidden by browser CSS cache, not a code issue).
- **Content tint (focus/readability):** Main content area now has a faint cool-slate tint (`#eef3f6`), and each `.page-section` sits on a soft white card with a subtle shadow + rounded corners, so text reads as clearer and more focused. Section titles get a cyan underline tying the accent through the page.
- **Resume filename:** Renamed to `doc/resume/GauravKumarResume.pdf` (so HR remembers the name) and repointed all 5 references in `resume.html`.
- Deleted `palette-preview.html`.

**Files changed:**
- All `*.html` (cache-bust), `css/templatemo-style.css`, `resume.html`, `doc/resume/GauravKumarResume.pdf` (added), `palette-preview.html` (deleted)

**Commit:** _(pending)_

---

## [2026-06-23] — In-browser resume viewer

**Changes:**
- New `resume.html` — themed (slate/cyan, Montserrat) in-browser PDF viewer for the resume. Embeds `doc/resume.pdf` with the browser's native PDF reader (zoom, page nav, print) plus custom **Download**, **Fullscreen**, and **Back to Portfolio** buttons.
- Graceful fallback: if `doc/resume.pdf` is missing (HEAD 404) or can't embed, shows an "Open Resume PDF" card instead of a blank frame.
- GA4 tracking on the viewer: `resume_view` (open), `resume_download` (download click), `resume_fullscreen`, `resume_time` (seconds on page) — full visibility now that the PDF is self-hosted, not on Drive.
- Repointed the homepage "View My Resume" button from the Google Drive link to `resume.html`.

**Action needed from user:** drop the resume PDF into the repo as `doc/resume/resume.pdf` (folder created with a placeholder README) — the viewer activates automatically, no code change needed.

**Files changed:**
- `resume.html` (new), `index.html`

**Commit:** _(pending)_

---

## [2026-06-23] — Visual refresh (Montserrat + Slate/Cyan) + GA4 tracking + Phase 5 cleanup

**Changes:**
- **Font:** Switched the site from Roboto to **Montserrat** (all weights vendored in /fonts; new @font-face block, applied to headings + body) in `css/templatemo-style.css`.
- **Palette:** Applied **Slate Blue + Electric Cyan** (#1f2933 ink / #0aa3c2 accent). Sidebar now slate; About Me banner changed from photo+grey-overlay to solid slate with white text and cyan tagline; links/keywords/buttons cyan.
- **Skills layout fix:** Redesigned skill cards — dropped the photo-with-text-overlay (the "weird look") in favour of clean slate cards with a cyan left edge. Fixed overflow + responsive columns (3 → 2 → 1).
- **Mobile fix:** Removed the hardcoded `margin-left:650px` from the two Experience company/date lines (broke phone layout); now flows under the job title. Added a mobile guard in CSS for any stray inline margins.
- **GA4 advanced tracking:** New `js/analytics-events.js` wired into all 8 pages. Fires events: `resume_view`, `linkedin_click`, `github_click`, `email_click`, `project_open`, `outbound_click`, `video_play`, `section_view`. Uses the existing gtag (G-802G39EQ2E); no markup changes needed.
- **Phase 5 cleanup:** Removed duplicate "Game Design Foundations: 2" certificate + the empty certificate gap. Fixed malformed `encrypted -media` YouTube iframe on `landing.html`.
- **Action RPG status:** Removed all "in/early development" language per user (homepage card, landing5 overview + enemy-types note) — now neutral past/present tense, no status claim.
- Added `palette-preview.html` (standalone palette comparison page; can be deleted later).

**Files changed:**
- `index.html`, `landing.html`, `landing1.html`–`landing5.html`, `aboutme.html`, `css/templatemo-style.css`, `js/analytics-events.js` (new), `palette-preview.html` (new)

**Note on YouTube videos:** All 6 embedded video IDs confirmed live & embeddable. The "broken" appearance was the `file://` local-open limitation — they work when served over http(s). Preview locally via `python -m http.server` then http://localhost:8000.

**Commit:** _(pending)_

---

## [2026-06-23] — Phase 4: Planet of Twins page rebuilt (production framing + systems depth)

**Changes:**
- Rebuilt `landing1.html` (Planet of Twins) from generic marketing copy into a producer-developer case study using only existing media.
- Added a **production-context card** at the top (Role, Team, Status pill, Platform, Engine, Timeline) — the producer's lead.
- New "How I Run It" section: full production ownership, the 13-player playtest + 4 friction points, the business case.
- Reframed game content as **systems I built**: dual-character control + proximity health (core mechanic), hybrid GOAP + Behaviour Tree + FSM enemy AI + emergent ecology, Weaver's Gate rescue, skill tree, narrative/Cinemachine.
- Replaced "Elysia" fluff with the real premise (Binary Land lineage, inverted-curse story, souls-as-grief framing).
- Mapped existing videos to systems: pot_gameplay (overview), pot_movemnt (core mechanic), pot_ghost (rescue), pot_introscene + pot_level + pot_leveloverview (story/world). Kept dev-plan/roadmap/snapshot images as "Production Artefacts".
- Updated the homepage POT project card description to match (was old Elysia copy).
- Added project-page CSS: `.prod-card`, `.status-pill` (dev/shipped/prototype), `.sys-tag`.

**Files changed:**
- `landing1.html`, `index.html`, `css/templatemo-style.css`

**Commit:** _(pending)_

---

## [2026-06-23] — Portfolio revamp Phases 1-3 + resume reconciliation

**Changes:**
- **Phase 1 (foundation):** Added keyword tooltip system — new `js/tooltips.js` (200ms show delay, dismiss on 50px mouse travel) + tooltip/keyword/refined-type CSS appended to `css/templatemo-style.css`. Higher-contrast body text in content areas, deepened accent color, `.kw` / `.kw-metric` keyword-highlight styles, `.skill-chip` keyword tags. Wired `tooltips.js` into `index.html`.
- **Phase 2 (bio + skills):** Finalized roles+values line (Game Producer, Product Owner, Project Manager, Game Designer + leadership/open communication/problem solving, no "hire me" framing). Added a hover-proof keyword tooltip to all 12 Skills cards mapping each skill to where it was demonstrated.
- **Phase 3 (experience STAR):** Rewrote all Gamemano + GetMega bullets into STAR structure — bolded metrics with `.kw-metric`, bolded key skills with `.kw`, added a `.skill-chip` keyword tag with proof tooltip to each bullet. Fixed run-on sentences ("off-peak timesEnhanced", "rapid scaling phase.Detected") and grammar. All facts/numbers kept identical except corrections below. Fixed stray duplicate `</span>` on the Game Tester heading.
- **Resume reconciliation:** Fetched and read the live Google Drive resume. Corrected site delivery-speed metric from 95% to ~90% to match resume. Confirmed "13 titles" (resume's "23" in Highlights is a typo to fix on the resume). Added VALORANT esports leadership ("captain of a mixed-rank Valorant team, 64th in APAC qualifiers") to the bio leadership paragraph.

**Files changed:**
- `index.html`, `css/templatemo-style.css`, `js/tooltips.js` (new)

**Outstanding (resume PDF — not in repo, user must edit on Drive):**
- Fix "23 game titles" → "13 game titles" in Highlights (contradicts the summary line)
- Change "~90%" stays as-is on resume (site now matches)

**Commit:** _(pending)_

---

## [2026-06-23] — About Me bio rewrite and roles addition

**Changes:**
- Rewrote About Me banner section on `index.html` — new voice, new opening hook
- Changed H2 to "Creating Games That Connect People & Build Memories"
- Added tagline: "Owning the Strategy. Leading the People. Shipping the Vision."
- Opening paragraph: "There was always someone who had to sit out and wait..." (replaces generic original)
- Changed "fifth grade" to "very young" for international audience
- Added preferred roles sentence: Game Producer, Product Owner, Project Manager, Game Designer

**Files changed:**
- `index.html`

**Commit:** _(pending)_

---

## [2026-06-23] — Project reorder and navigation fix

**Changes:**
- Moved Planet of Twins above Action RPG in the Projects section on `index.html`
- Removed "PAGE IS UPDATED AS THE DEVELOPMENT PROGRESS" label from Action RPG title on `index.html`
- Updated navigation chain across landing pages to match new order:
  - `landing1.html` (POT): now first project, removed Previous button, Next goes to landing5
  - `landing5.html` (RPG): added Previous → landing1, Next → landing.html
  - `landing.html` (FPP Horror): Previous updated from landing1 to landing5

**Files changed:**
- `index.html`, `landing1.html`, `landing5.html`, `landing.html`

**Commit:** _(pending)_

---

## [2026-06-19] — HTML structural bug fixes (all landing pages)

**Changes:**
- Fixed `<hr` missing closing `>` on `landing1.html` (Planet of Twins) and `landing5.html` (Action RPG)
- Fixed `<div span style=...>` invalid attribute across all 6 landing pages — removed the stray `span` word (no visual change)
- Fixed unclosed `<!-- Scripts` HTML comment in `landing1.html` and `landing5.html` that was swallowing `</body>` and `</html>` tags

**Files changed:**
- `landing1.html`, `landing2.html`, `landing3.html`, `landing4.html`, `landing5.html`, `landing.html`

**Commit:** _(pending)_

---

## [2026-06-19] — Project documentation setup

**Changes:**
- Created `CLAUDE.md` — project guidance for Claude Code (AI assistant context file)
- Created `bugs.md` — bug tracking file
- Created `CHANGELOG.md` — this file, for change tracking

**Files added:**
- `CLAUDE.md`
- `bugs.md`
- `CHANGELOG.md`

**Commit:** _(pending)_

---

## Prior History (from git log)

These are changes made before CHANGELOG.md was introduced. For full details use `git log`.

| Commit | Description |
|---|---|
| `3a2d796` | Edited work experience with correct data |
| `1241b64` | Merge experience branch from main |
| `a55b51d` | Exp (#12) — experience page update |
| `3b2b256` | New RPG Added |
| `f32cd94` | Exp (#11) |
| `b8cce14` | Exp (#10) |
| `d90c813` | Exp (#9) |
| `fe555f7` | Exp (#8) |

> Run `git log --oneline` for the full history.
