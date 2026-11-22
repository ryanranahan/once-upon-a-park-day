# Once Upon A Park Day: project brief

Read this before making any change to the site. It records what has been decided so far.

## What the site is

- An independent Disney information and blog site for people planning a stay at Disney resorts, a Disney Cruise Line sailing, and related trips.
- Main audience: first-time visitors who need the basics explained in plain English.
- Owner: Ryan.
- Earlier working name was "The Resort Compass". The current name is "Once Upon A Park Day".

## How it makes money

- Display ads: start with Google AdSense, move to Journey by Mediavine at about 1,000 monthly sessions, then Raptive or full Mediavine as traffic grows.
- Affiliate links: theme park tickets (Undercover Tourist, Get Away Today), hotel and car booking sites, Amazon Associates for gear.
- Cruise content earns poorly through affiliate links; a "request a quote" referral is the usual route.
- Commission rates have not been verified. Check each program when applying.

## Hosting plan

- Static site built with Eleventy (see README.md for where everything lives), no WordPress.
- Files live in a GitHub repository; Cloudflare Pages publishes them automatically on each change.
- Cost is the domain only (about $11 a year).
- Moved to Eleventy in November 2026: each blog post is one Markdown file, and resort pages are generated from `src/_data/resorts.json`.

## Design: logo palette (current)

The site now follows the "Once Upon A Park Day" logo. The earlier "Sunny Boardwalk" palette (sky blue, sunshine yellow, carousel red) has been retired.

| Role | Color |
|---|---|
| Navy (text, hero, signup block, footer) | #16294F |
| Coral (primary buttons, awning, accents; navy text on coral) | #EE7B6F |
| Gold (secondary buttons, number badges, eyebrows on navy) | #C9A24A |
| Soft gold (deal box, photo placeholder) | #F6ECD3 |
| Link red (links and eyebrows on light backgrounds, readable contrast) | #B8483C |
| Cream (page background) | #FBF8F3 |
| Card border | #E8DFD0 |
| Muted text | #4A5570 |

- Fonts: Playfair Display for headings (matches the logo's serif), Nunito for body text (Google Fonts).
- Logo files: `images/logo.svg` (cropped, header), `images/logo-light.svg` (white, footer), `images/logo-full.svg` and `.png` (originals). Favicon: `favicon.svg` (gold sparkle on navy).
- Signature detail: a coral, white and gold striped "awning" band under the header.
- Rounded cards (22px), pill-shaped buttons, a hard coral drop shadow under the resort finder.

## Homepage structure (index.html)

1. Header with logo, search, menu, and a "Start here" button. On phones: search and menu icons, plus a fixed bottom bar (Home, Resorts, Cruises, Deals).
2. Hero with headline, "Watch the 60-second intro" button, author line, and the resort finder (three questions).
3. "Stuck between two options?" comparison shortcuts.
4. "New here? Three reads, in order."
5. Browse by topic: resort hotels, Disney Cruise Line, planning and budgeting, deals and news.
6. Reserved ad space.
7. Latest guides with "Updated" dates, a deal box, and a second ad space.
8. About the author.
9. Email signup for the first-timer checklist.
10. Footer with disclaimer and affiliate disclosure.

## Resort guides

- One page per Disney-owned Walt Disney World resort (31 pages), generated from `src/_data/resorts.json`, plus a listing page at `/resorts/` with an area filter.
- Each resort entry holds only basic facts: category, area, a one-line theme description, and transportation. These came from general knowledge and must be checked against Disney's current listings before the "Facts last checked" date is filled in.
- Everything first-hand (our take, rooms, dining, pros and cons, tips) is a [BRACKETED] placeholder to fill from interviews with Ryan.
- Not yet covered: Swan, Dolphin and Swan Reserve, Shades of Green, Disney Springs area hotels.

## Cruise ship guides

- One page per Disney Cruise Line ship (8 pages) at `/cruises/<ship>/`, generated from `src/_data/ships.json` and `src/cruises/ship.njk`.
- `/cruises/` lists the fleet by class and has a side-by-side comparison table.
- Ryan has sailed the Magic, Dream and Fantasy. Those pages show "We've sailed this ship" and get first-hand notes first.
- Sections on each ship page: overview and who it suits, ship facts, staterooms, dining, kids/teens/adults, pools and water features, shows, deck by deck, itineraries and ports, pros/cons/tips.
- Ship facts (year, size, dining names, water ride, clubs) came from general knowledge and must be verified. Anything uncertain is marked [VERIFY]. Home ports change often, so they are always [VERIFY] until checked.

## Blog

- Lives at `/blog/`. One Markdown file per post in `src/blog/posts/`. A starter welcome post is in place with placeholders.

## What is not built yet

- The resort finder shows a placeholder message; it has no results logic.
- Search, the email signup, and the intro video button are not connected to anything.
- All links point to "#".
- The resort guide page template (the most important page, since most visitors arrive on a guide from Google).
- About, contact, privacy policy, and affiliate disclosure pages.
- Ad code and affiliate links.

## Placeholders to fill

Anything in [BRACKETS] needs real content from Ryan: his name, number of resorts stayed at, bio, photos, deal details, guide counts, dates, and read times. Do not invent these.

## Rules

- No Disney logos, characters, or Disney-owned photos or artwork. Do not use "Disney" in the domain name.
- The five SVG images are original illustrations used as stand-ins. Replace them with Ryan's own photos when available.
- Keep the "not affiliated with The Walt Disney Company" disclaimer in the footer of every page.
- Every page with affiliate links needs a visible disclosure.
- Do not invent prices, statistics, or deal details. Research current facts and show a "last updated" date on every guide.
- Guides should draw on Ryan's first-hand experience; interview him for each one.
- Design for phones first. Keep tap targets at least 44px and text contrast at accessible levels.
- Reserve space for ads so the page does not shift when they load.

## Suggested next steps

1. Design and build the resort guide page template (desktop and phone).
2. Put the files in the GitHub repository and confirm Cloudflare publishes them.
3. Write the first three "start here" guides.
4. Add the about, privacy policy, and affiliate disclosure pages.
5. Apply for AdSense once there is a solid batch of guides.
