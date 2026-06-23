# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for **Gaurav Kumar** (Game Producer | CAPM | Program Manager), hosted on GitHub Pages at `gauravk908567.github.io`. This is a static HTML/CSS/JS site — no Unity project despite the directory name.

The site showcases:
- Professional work experience (GetMega, Gamemano)
- Game projects (Planet of Twins and others)
- Skills, certifications, and contact info

## Running Locally

No build system or package manager. Open `index.html` directly in a browser. Deployment happens automatically when `main` is pushed to GitHub (GitHub Pages).

## Editing Styles

SCSS source is in [sass/](sass/) — partials are `_vars.scss`, `_base.scss`, `_header.scss`, `_banner.scss`, `_about.scss`, `_projects.scss`, `_contact.scss`, `_footer.scss`. Compiled output is [css/templatemo-style.css](css/templatemo-style.css). No build script exists — either compile SCSS manually or edit the compiled CSS directly.

## Page Structure

| File | Purpose |
|---|---|
| `index.html` | Main portfolio (About, Skills, Experience, Projects, Certificates, Contact sections) |
| `aboutme.html` | Extended about page |
| `expgetmega.html` | Work experience — GetMega |
| `expgamemano.html` | Work experience — Gamemano |
| `landing1.html` | Game project — Planet of Twins |
| `landing2.html`–`landing5.html` | Additional game project pages |
| `landing.html` | General project landing page |
| `generic.html` | Template/generic page |

**Layout pattern:** Two-column — sidebar nav (desktop only, `hidden-xs hidden-sm`) + main content area. jQuery single-page navigation in [js/main.js](js/main.js) handles smooth scrolling on `index.html`.

## Assets

- [img/](img/) — profile photo (`profile.jpg`) and game screenshots
- [images/](images/) — LinkedIn/GitHub icons and UI assets
- [video/](video/) — MP4 gameplay footage
- [doc/](doc/) — PDFs and pitch materials (POT_Pitch, StoryPOT, MermaidFlow, devtimeRPG)
- [fonts/](fonts/) — Montserrat, Roboto, FontAwesome (all vendored locally)

Third-party libraries are all vendored (Bootstrap, jQuery, Font Awesome, Normalize.css) — no CDN dependencies.

## Workflow & Tracking

- **[CHANGELOG.md](CHANGELOG.md)** — Updated every time a change is made. Use it to understand what changed and revert if needed.
- **[bugs.md](bugs.md)** — Tracks known issues and their status.
- Always update CHANGELOG.md when making any content or code changes.

## Branch Conventions

- `main` — production, auto-deployed to GitHub Pages
- `experience` — active branch for work experience updates (as of June 2026)
