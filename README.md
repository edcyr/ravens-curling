# Ravens Varsity Curling

Website for the Carleton Ravens varsity curling program: program history, season goals, tryout details and coach contacts.

| File | Purpose |
| --- | --- |
| `index.html` | Home page: history, goals, tryouts and the email list. |
| `roster.html` | Roster page: team photos and lineups for the men's and women's teams. |
| `events.html` | Events page: how the OUA and U SPORTS championships work, with this season's dates and links. |
| `gallery.html` | Gallery page: OUA and U SPORTS slideshows, with links to download the original photos. |
| `styles.css` | Shared styles for both pages. |
| `site.js` | Shared script: in-page links and the tryout countdown. |
| `gallery.js` | Gallery slideshows; reads `images/gallery/gallery.json`. |
| `scripts/build-gallery.py` | Shrinks gallery photos to web size and rebuilds `gallery.json`. |
| `images/` | Logos (raven, U SPORTS, OUA) and team photos. |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are, without a Jekyll build. |

## Publishing with GitHub Pages

In the repository on GitHub: **Settings → Pages → Build and deployment**

- Source: **Deploy from a branch**
- Branch: **main**, folder **/ (root)**

The site is served at https://ravenscurling.com (custom domain, set in the same Pages settings and recorded in the `CNAME` file).

## Updating

Edit the pages, commit, and push to `main`. Pages redeploys on its own, usually within a few minutes.

Before each tryout, update the date in these places:

1. The red "Next tryout" bar at the top of `index.html`, `roster.html` and `events.html`
2. The ticket in the Tryouts section
3. The countdown date in `site.js` (`new Date('2026-10-14T21:00:00-04:00')`)

Each season, replace the team photos in `images/` and the names in `roster.html`, and update the championship dates, hosts and links in `events.html`.

## Adding gallery photos

1. Put the photos in `images/gallery/oua/` or `images/gallery/usports/`. They play in filename order.
2. Run `python3 scripts/build-gallery.py` (macOS). Photos larger than 1600 px are shrunk in place to about 200 KB each, and the slideshow list is rebuilt.
3. Commit and push. Full-resolution originals stay in the shared folders that the "Download original photos" buttons link to.
