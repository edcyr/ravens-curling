# Ravens Varsity Curling

Website for the Carleton Ravens varsity curling program: program history, season goals, tryout details and coach contacts.

| File | Purpose |
| --- | --- |
| `index.html` | Home page: history, goals, tryouts and the email list. |
| `roster.html` | Roster page for the current season (2026–27), with a Season menu linking to past seasons. |
| `roster-2025-26.html` | Archived 2025–26 roster with that season's team photos. |
| `coaches.html` | Coaches page: coach bios, starting with Jamie Sinclair and Curl Up With Jamie. |
| `schedule.html` | Schedule page: season calendar for both teams, and Team Blad / Team Nicholls results and next events. |
| `championships.html` | Championships page: how the OUA and U SPORTS championships work, with this season's dates and links. |
| `events.html` | Redirect for old links: sends visitors to `championships.html` (or `schedule.html#team-nicholls`). |
| `gallery.html` | Gallery page: OUA and U SPORTS slideshows, with links to download the original photos. |
| `styles.css` | Shared styles for both pages. |
| `site.js` | Shared script: in-page links and the tryout countdown. |
| `gallery.js` | Gallery slideshows; reads `images/gallery/gallery.json`. |
| `scripts/stamp-assets.py` | Adds a fingerprint (`?v=…`) to the stylesheet and script links so browsers load the latest version after each update. |
| `scripts/build-gallery.py` | Shrinks gallery photos to web size and rebuilds `gallery.json`. |
| `images/` | Logos (raven, U SPORTS, OUA), team photos, and opponent logos in `images/teams/` (from each team's official website). |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are, without a Jekyll build. |

## Publishing with GitHub Pages

In the repository on GitHub: **Settings → Pages → Build and deployment**

- Source: **Deploy from a branch**
- Branch: **main**, folder **/ (root)**

The site is served at https://ravenscurling.com (custom domain, set in the same Pages settings and recorded in the `CNAME` file).

## Updating

Edit the pages, run `python3 scripts/stamp-assets.py` if you changed `styles.css`, `site.js` or `gallery.js`, then commit and push to `main`. Pages redeploys on its own, usually within a few minutes.

Before each tryout, update the date in these places:

1. The red "Next tryout" bar at the top of every page (`index.html`, `roster.html`, `roster-2025-26.html`, `coaches.html`, `schedule.html`, `championships.html`, `gallery.html`)
2. The ticket in the Tryouts section
3. The countdown date in `site.js` (`new Date('2026-10-28T21:00:00-04:00')`)

Each season, copy `roster.html` to `roster-YYYY-YY.html` as an archive (add it to the Season menu on every roster page), then update `roster.html` with the new lineups and new team photos in `images/`, and update the championship dates, hosts and links in `championships.html`.

## Adding gallery photos

1. Put the photos in `images/gallery/oua/` or `images/gallery/usports/`. They play in filename order.
2. Run `python3 scripts/build-gallery.py` (macOS). Photos larger than 1600 px are shrunk in place to about 200 KB each, and the slideshow list is rebuilt.
3. Commit and push. Full-resolution originals stay in the shared folders that the "Download original photos" buttons link to.

## After each event

On `schedule.html`: update the team's next-event card, add a results block (newest first, open by default; older ones closed), and update the season calendar entry. Update the Next up strip on `index.html` to match.
