---
layout: layouts/article.njk
title: "Disney deals and news for 2026 and 2027"
short: Deals and news
eyebrow: News
lead: "Current Disney offers for Walt Disney World, Disneyland and Disney Cruise Line, plus the news most likely to affect a 2027 trip."
crumbs: [["Home", "/"]]
permalink: /news/
section: news
researched: true
description: "Current Disney World, Disneyland and Disney Cruise Line deals, with travel dates and who qualifies, plus 2027 news: new hotels, closures and new ships."
faq:
  - q: "What Disney World deals are available for 2027?"
    a: "Disney's published 2027 offers include up to 25% off rooms in spring, a spring package offer, and special deals for Florida residents, Annual Passholders, military and Disney+ subscribers."
  - q: "How do I book a Disney deal?"
    a: "Call your travel agent, who can check which offers apply to your dates and book them for you, or book directly with Disney."
  - q: "When does Disney Lakeshore Lodge open?"
    a: "Disney says Disney Lakeshore Lodge opens July 1, 2027."
---
<div class="deal-cta card"><strong>Call your travel agent today to book these deals.</strong><p>Offers are limited and can change or sell out. A travel agent can check what applies to your dates and book it for you.</p></div>

## Current Disney deals

These are Disney's own published offers, summarized in plain English. Last checked {{ deals.checked }}.

{% for grp in deals.groups %}
### {{ grp.name }}

<div class="deal-grid">
{%- for d in grp.deals %}
<section class="card deal-card">
<h4>{{ d.title }}</h4>
<p>{{ d.what }}</p>
<dl><dt>Who</dt><dd>{{ d.who }}</dd><dt>When</dt><dd>{{ d.when }}</dd></dl>
{% if d.note %}<p class="deal-note">{{ d.note }}</p>{% endif %}
<a href="{{ d.url }}" rel="nofollow noopener" target="_blank">See Disney's offer details</a>
</section>
{%- endfor %}
</div>

[All {{ grp.name }} offers on Disney's site]({{ grp.source }})
{% endfor %}

<div class="deal-cta card"><strong>Call your travel agent today to book these deals.</strong><p>Discounts, dates and availability are set by Disney and can change at any time. Always confirm the final price before you book.</p></div>

## 2027 news to know

### Walt Disney World

- **Disney Lakeshore Lodge opens July 1, 2027.** The new Deluxe resort sits on Bay Lake, with boats to Magic Kingdom. It's bookable now.
- **The Skyliner closes January 24 to 30, 2027** for refurbishment. Disney is running buses instead. If you're staying at Pop Century, Art of Animation, Caribbean Beach or Riviera that week, allow extra time.
- **Early Theme Park Entry and Extended Evening Hours** continue through 2027, Disney says.
- **New lands are on the way.** Animal Kingdom's Tropical Americas is expected in 2027. Check Disney's site for dates before you plan around it.

### Disney Cruise Line

- **Disney Believe**, the newest ship, sets sail on **December 18, 2027**.
- **Fall 2027 and spring 2028 itineraries are out.** They include Disney's first Bermuda cruise on the Fantasy, a New York season on the Wish, and Panama Canal crossings on the Magic. See each **[ship's page](/cruises/)** for the full list.
- **Disney Destiny moves to Port Canaveral** in late 2027, so it's easy to pair with Walt Disney World.

### Universal Orlando

- **Epic Universe** is open, with **Helios Grand** right next to it and **Stella Nova** connected by a walking path. See our **[Universal Orlando hotel guide](/universal-orlando/)**.

Always confirm dates on Disney's or Universal's own site before you book.
