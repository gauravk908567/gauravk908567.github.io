# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for **Gaurav Kumar** (Game Producer | CAPM | Program Manager), hosted on GitHub Pages at `gauravk908567.github.io`. This is a static HTML/CSS/JS site — no Unity project despite the directory name.

The site showcases:
- Professional work experience (GetMega, Gamemano)
- Game projects (Planet of Twins and others)
- Skills, certifications, and contact info

## Running Locally

Plain static HTML: open `index.html` in a browser. Deployment happens automatically when `main` is pushed to GitHub (GitHub Pages). Analytics only load on `gauravk908567.github.io`, so local views are never counted.

## How the pages are made (since the October 2026 redesign)

- `index.html` is **hand-written** and is the single source of the shared style (the `<style>` block) and the star/analytics script.
- Every other page is **generated** by `C:\ResourceData\UnityProject\portfolio-redesign\build_pages.py`, which writes straight into this folder. It also cuts `pc.css` and `pc.js` out of `index.html`, and writes `sitemap.xml` and `robots.txt`. To change a sub-page, edit the generator and rerun it; never hand-edit a generated file.
- After every build run `python check_pages.py` (same folder): tag balance, missing files and anchors, CSS urls, dashes, banned phrases, exact dates, leftover `../` paths or `noindex`. It must report 0 problems.
- Planet of Twins bug and test counts are read fresh from the game project on every build.
- The old template (`css/`, `js/`, `sass/`, Bootstrap, jQuery) is no longer used by any live page except `generic.html`.

## Page Structure

| File | Purpose |
|---|---|
| `index.html` | Landing page: player card, record, story, skills, experience (expandable job cards), projects, contact. Hand-written. |
| `landing1.html` | Planet of Twins (original IP, in development) |
| `landing5.html` | Action RPG |
| `landing.html` | FPP Horror |
| `landing4.html` | Furry Escape (playable through the itch.io embed) |
| `landing3.html` | Space Shooting Range |
| `landing2.html` | FPS Multiplayer |
| `aboutme.html` | About: his story as a hero's journey |
| `resume.html` | Embeds `doc/resume/GauravKumarResume.pdf`; to update the resume, replace that file under the same name |
| `expgamemano.html`, `expgetmega.html` | Instant forwards to `index.html#experience` (kept so old links never break) |
| `pc.css`, `pc.js` | Shared style and script for the generated pages |
| `generic.html` | Old template page, not linked |

## Assets

- [img/](img/) — profile photo (`profile.jpg`), game screenshots; [img/pot/](img/pot/) has the Planet of Twins stills
- [video/](video/) — gameplay footage; [video/pot/](video/pot/) has the October 2026 Planet of Twins build. Web settings: at most 1280 wide, 30 fps, H.264 CRF 27, `+faststart` (ffmpeg comes with the `imageio-ffmpeg` Python package; `portfolio-redesign/encode_pot.py`). Planet of Twins clips are always muted.
- **Never commit** `video/newest/` or `video/old/` (raw recordings, some over GitHub's 100 MB limit); `.gitignore` covers them.
- [doc/](doc/) — the resume PDF and pitch materials
- [fonts/](fonts/) — self-hosted woff2 (Lexend, Montserrat; Latin subsets). No Google Fonts or other font service.

## Content Rules

- **Planet of Twins privacy:** the game's repo is private. No bug IDs, bug lists, bug dates, backlog, code links or funding figures on the site. Counts and severity (game-breaking, major, minor) are fine.
- Project dates are month and year only.
- No dashes as pauses in page copy (commas, colons, full stops instead).

## Workflow & Tracking

- **[CHANGELOG.md](CHANGELOG.md)** — Updated every time a change is made. Use it to understand what changed and revert if needed.
- **[bugs.md](bugs.md)** — Tracks known issues and their status.
- Always update CHANGELOG.md when making any content or code changes.

## No Artifacts

- Do NOT create, publish or update claude.ai Artifacts (or use a design canvas) unless Gaurav specifically asks for one. This covers mockups, research notes, reports, storyboards and everything else.
- Mockups and prototypes go in the local `test/` folder as plain HTML pages, with `test/index.html` as the picker.
- Research and notes go in chat or in local files.

## Ideas Are Logged Only When Asked

- Do NOT write an idea into any idea list (for example `Planet-of-Twins/PART2_IDEAS.md`) until Gaurav specifically says to log it. Only things he is sure of get logged. Talking an idea through, liking it, changing it or ruling it out is not a request to log it.
- Planet of Twins part 2 ideas built on the stars and his birth chart (new abilities, the twins manipulating the chart to win) are exploratory and may change completely or be dropped.
- Do not edit `Planet-of-Twins/CLAUDE.md`. Rules for Claude go in this file.

## Branch Conventions

- `main` — production, auto-deployed to GitHub Pages. Merge into it only when Gaurav says so.
- `portfolio-redesign` — the October 2026 redesign, waiting for his check before it goes to `main`
- `experience` — older branch for work experience updates (June 2026)
