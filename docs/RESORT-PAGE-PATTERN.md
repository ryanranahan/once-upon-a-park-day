# Resort page pattern: quick facts + full guide

Each resort that gets a full write-up has **two paired pages**:

| Page | URL | Built from | Canonical |
|---|---|---|---|
| Quick facts | `/resorts/<slug>/` | `src/resorts/resort.njk` → `src/_includes/partials/resort-quick-facts.njk` | Points to the full guide |
| Full guide | `/resorts/<guide-slug>/` (e.g. `/resorts/pop-century-resort/`) | `src/resorts/guides/<guide-slug>.njk` | Itself |

Resorts without a full guide keep the original placeholder template in `resort.njk`. Nothing changes for them until you add `fullGuide` to their data.

Pop Century is the worked example: `/resorts/pop-century/` (quick facts) and `/resorts/pop-century-resort/` (full guide).

## Step by step for a new resort

1. **Data: `src/_data/resorts.json`.** Add these fields to the resort's existing entry:
   ```json
   "fullGuide": "/resorts/<guide-slug>/",
   "author": "Ryan",
   "lastVerified": "Mon YYYY",
   "quickFacts": [
     { "label": "Category and price", "value": "..." },
     { "label": "Getting to the parks", "value": "..." },
     { "label": "Room size", "value": "..." },
     { "label": "Best for", "value": "..." },
     { "label": "Food", "value": "..." },
     { "label": "Pools", "value": "..." }
   ],
   "heads": "Optional one-line warning (closures, refurbs). Leave out if none."
   ```
   Adding `fullGuide` is the switch. It turns `/resorts/<slug>/` into the quick facts page, sets that page's canonical to the full guide, changes its title to "<Short> Resort: Quick Facts", and makes the `/resorts/` card show the resort once with "Read the full guide" and "Quick facts" links.

2. **Full guide: copy `src/resorts/guides/pop-century-resort.njk`** to `src/resorts/guides/<guide-slug>.njk` and change the front matter:
   ```yaml
   ---
   layout: layouts/base.njk
   section: resorts
   resortSlug: <slug>                    # must match the resorts.json slug
   permalink: "/resorts/<guide-slug>/"   # must match fullGuide
   title: "<Short> Resort: The Full Guide"
   description: "..."
   ---
   ```
   The hero (breadcrumb, byline, "Last verified" badge, "Just want the quick facts?" link) reads `author`, `lastVerified`, `tier` and `short` from `resorts.json`, so you don't edit it. Rewrite the body sections below the hero.

3. **Build and commit:** `npm run build`, then commit `src/` **and** `public/`. Cloudflare Pages does not build (its build command is `exit 0`); it publishes the committed `public/` folder.

## Full guide body: sections and components

All of these live in the guide file as plain HTML. Their styles are in `src/css/site.css` under "Full resort guide".

| Section | id | Component / class |
|---|---|---|
| Lead photo | – | `.placeholder.photo-ph` with `[RYAN'S PHOTO: …]` until a real photo exists |
| At a glance | `glance` | `.card.glance` with a `<dl>` |
| Ad slot (wide) | – | `.placeholder` with `[AD SPACE…]`. Empty, no ad code |
| Who it's best for / Think twice if | `best-for` | `<ul>` lists |
| Room types, sizes and beds | `rooms` | `.table-wrap > table`: Room type, Size, Sleeps, Beds, View and location, Sq ft per guest (size ÷ max adults), Our take |
| Getting to the parks | `transport` | `.table-wrap > table`: To, How, Change?, Time, Ease (`.rate` 1–5), then a "Skyliner vs. bus" (or equivalent) list |
| Dining | `dining` | list |
| Pools and things to do | `pools` | list, `.photo-row` for photos |
| Pros and cons | `pros-cons` | `.procon` with two `.card`s |
| Booking and value tips | `booking` | list + `.fg-callout` |
| What's changed recently | `changes` | list |
| Last verified line | – | `p.note` |
| Disclaimer | – | `aside.card.disclaimer` (not affiliated with Disney) |
| Sidebar | – | `.fg-side` with `.toc` ("On this page") and an `[AD SPACE]` placeholder |

Inline markers:
- `<span class="ryan">[Ryan: …]</span>`: a first-hand opinion Ryan needs to write.
- `<span class="verify">[verify]</span>`: a fact not yet confirmed against a current official source.

Both show publicly, so clear them before merging to `main`.

## Rules carried over

- Byline is "Ryan" only. No sources section on the page (keep research notes off-site).
- Every fact must come from a page actually opened while writing, preferably Disney's official site. If it can't be confirmed, mark it `[verify]`; never guess.
- Ryan's own photos are the priority. Never replace a slot that already uses one of his stills. Character icons that are part of resort scenery are fine; don't use Disney logos, the castle, or ears as the focal point of a photo.
- Disney press photos from [the Walt Disney World News Room](https://disneyexperiences.com/disneyworld-press/) are **not** in the pages yet. The News Room's [Supplemental Terms of Use](https://disneyexperiences.com/supplemental-terms-of-use/) limit use to editorial news, forbid modifying the files, and say travel-guidebook authors (including electronic guides on the internet) must contact Disney PR before using the assets. See `docs/NEEDS-LIST.md` for the full caveat, the credit format to use if PR clears it (`Photo: Disney` or `Photo: Disney (Name, photographer)`), and which slots are still empty.
- The footer disclaimer comes from `base.njk`; the guide also has its own disclaimer box.

## Needs list

Open photo slots, `[Ryan: …]` opinion blanks, `[verify]` facts, page-level placeholders, and site-wide decisions are tracked in [`docs/NEEDS-LIST.md`](NEEDS-LIST.md). Update that list when a pair is added or a marker is cleared.

## Canonical URLs

`base.njk` prints `<link rel="canonical" href="{{ site.url }}{{ canonical or page.url }}">` on every page. Pages are self-canonical unless their front matter sets `canonical`. The base URL is in `src/_data/site.json`, currently `https://once-upon-a-park-day.pages.dev`. Change it to `https://onceuponaparkday.com` when the domain is attached, then rebuild.
