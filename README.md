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
| Blog posts (one Markdown file each) | `src/blog/posts/` |
| Images | `src/images/` |

**Add a blog post:** copy `src/blog/posts/_TEMPLATE.md.txt` to a new file named like `2026-12-01-my-post.md`, fill in the top section, and write the post in Markdown. It appears at `/blog/my-post/`.

**Run it locally:** `npm install`, then `npm start` and open http://localhost:8080.

## Hosting

Cloudflare Pages builds and publishes the site on every push to `main`.

- Build command: `exit 0` (nothing to build, `public/` is already built)
- Build output directory: `public`

Not affiliated with, endorsed by, or sponsored by The Walt Disney Company.
