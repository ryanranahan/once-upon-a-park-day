# Once Upon A Park Day

Static website for Once Upon A Park Day, an independent guide to Disney resorts and Disney Cruise Line for first-time visitors.

Read `PROJECT-BRIEF.md` before making changes.

## How it's built

The site uses [Eleventy](https://www.11ty.dev/), which turns templates and Markdown into plain HTML. Everything you edit is in `src/`; the build writes the finished site to `public/`.

**Important:** `public/` is committed to the repo, and Cloudflare publishes it as-is (no build step on Cloudflare). After changing anything in `src/`, run `npm run build` and commit the updated `public/` folder too, or the change won't show on the live site.

| What | Where |
|---|---|
| Homepage | `src/index.njk` |
| Shared header, footer and menu | `src/_includes/layouts/base.njk` |
| Styles | `src/css/site.css` |
| Resort facts (one entry per resort) | `src/_data/resorts.json` |
| Resort categories and their intros | `src/_data/tiers.json` |
| Resort page template | `src/resorts/resort.njk` |
| Written resort guides (one file per resort, fills the template) | `src/_data/resortGuides/` |
| Ship facts (one entry per ship) | `src/_data/ships.json` |
| Ship page template | `src/cruises/ship.njk` |
| Cruises page and comparison table | `src/cruises/index.njk` |
| Blog posts (one Markdown file each) | `src/blog/posts/` |
| Images | `src/images/` |

**Add a blog post:** copy `src/blog/posts/_TEMPLATE.md.txt` to a new file named like `2026-12-01-my-post.md`, fill in the top section, and write the post in Markdown. It appears at `/blog/my-post/`.

**Run it locally:** `npm install`, then `npm start` and open http://localhost:8080.

## Search engines and AI assistants

- `src/_data/site.json` holds the site's address. **When the custom domain is live, change `url` there and rebuild**: canonical links, the sitemap, `robots.txt`, `llms.txt` and the structured data all update from it.
- Page titles, descriptions, social preview tags and schema.org structured data are generated in `src/_includes/layouts/base.njk` using helpers in `src/_lib/seo.js`.
- `sitemap.xml`, `robots.txt`, `llms.txt` and `404.html` are built from `src/sitemap.njk`, `src/robots.njk`, `src/llms.njk` and `src/404.njk`. New guides and posts are added to them automatically.

## Hosting

Cloudflare Pages builds and publishes the site on every push to `main`.

- Build command: `exit 0` (nothing to build, `public/` is already built)
- Build output directory: `public`

Not affiliated with, endorsed by, or sponsored by The Walt Disney Company.

## Destinations (added November 2026)

- **Walt Disney World**: `src/_data/resorts.json` + one guide per resort in `src/_data/resortGuides/<slug>.json`. Pages at `/resorts/<slug>/`.
- **Disneyland Resort**: everything in `src/_data/disneyland.json` (hotels, tiers, guest benefits). Pages at `/disneyland/` and `/disneyland/hotels/<slug>/`.
- **Universal Orlando Resort**: everything in `src/_data/universal.json`. Pages at `/universal-orlando/` and `/universal-orlando/hotels/<slug>/`.
- Guides with `"researched": true` are written from research, not a stay. They show a "Researched guide" badge and an Overview section instead of "Our take". To make one your own, add `"author"`, `"experience"` and `"take"` to its guide, and remove `"researched"`.
- The Resorts menu (`src/_includes/resorts-menu.njk`) lists every hotel automatically from those data files.
