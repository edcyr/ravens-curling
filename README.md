# Ravens Varsity Curling

Website for the Carleton Ravens varsity curling program: program history, season goals, tryout details and coach contacts.

| File | Purpose |
| --- | --- |
| `index.html` | The site. One self-contained file; styles, script and logos are embedded. |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are, without a Jekyll build. |

## Publishing with GitHub Pages

In the repository on GitHub: **Settings → Pages → Build and deployment**

- Source: **Deploy from a branch**
- Branch: **main**, folder **/ (root)**

The site is served at https://ravenscurling.com (custom domain, set in the same Pages settings and recorded in the `CNAME` file).

## Updating

Edit `index.html`, commit, and push to `main`. Pages redeploys on its own, usually within a few minutes.

Before each tryout, update the date in three places in `index.html`:

1. The red "Next tryout" bar at the top of the page
2. The ticket in the Tryouts section
3. The countdown date in the script near the end of the file (`new Date('2026-10-14T21:00:00-04:00')`)
