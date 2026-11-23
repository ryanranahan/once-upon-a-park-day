// Search engine and AI-assistant helpers: page titles, meta descriptions and
// schema.org structured data (JSON-LD). Used by src/_includes/layouts/base.njk.

const SECTION_NAMES = {
  resorts: "Resorts",
  disneyland: "Disneyland Resort",
  "universal-orlando": "Universal Orlando",
  cruises: "Disney Cruise Line",
  blog: "Blog",
  planning: "Planning",
  news: "Deals and news",
  about: "About",
};

const DESTINATIONS = {
  resorts: "Walt Disney World Resort",
  disneyland: "Disneyland Resort",
  "universal-orlando": "Universal Orlando Resort",
};

// Computed titles arrive already HTML-escaped (sometimes twice, e.g. "&amp;amp;").
// Turn them back into plain text; templates escape them once on output.
export function plainText(s) {
  if (s == null) return s;
  let out = String(s);
  for (let i = 0; i < 3 && /&(amp|lt|gt|quot|#39|#x27|apos);/.test(out); i++) {
    out = out
      .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
      .replace(/&#39;|&#x27;|&apos;/g, "'").replace(/&amp;/g, "&");
  }
  return out;
}

// Placeholder text like "[VERIFY]" or "[DATE]" never goes into metadata.
const hasPlaceholder = (s) => typeof s === "string" && /\[[A-Z][A-Z ,]*\]/.test(s);
const clean = (s) => (s && !hasPlaceholder(s) ? String(s) : undefined);

// "Title | Site" when it fits in a search result, otherwise just the title.
export function pageTitle(title, siteName, fallback) {
  if (!title) return fallback;
  title = plainText(title);
  const full = `${title} | ${siteName}`;
  return full.length <= 65 ? full : title;
}

// Keep descriptions to about 160 characters: drop trailing sentences first,
// then cut at a word boundary.
export function metaDescription(text, max = 160) {
  if (!text) return text;
  let s = plainText(text).replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const sentences = s.match(/[^.!?]+[.!?]+(\s|$)/g) || [s];
  let out = "";
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > max) break;
    out += sentence;
  }
  out = out.trim();
  if (out) return out;
  return s.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

// "November 2026" -> "2026-11" (ISO 8601), anything unparseable -> undefined.
function monthDate(text) {
  if (!text) return undefined;
  const t = new Date("1 " + text + " UTC");
  if (isNaN(t)) return undefined;
  return t.toISOString().slice(0, 7);
}

// The guides listed on each index page, for an ItemList.
function indexItems(d) {
  const hotels = (dest, base) => (dest && dest.hotels ? dest.hotels.map((h) => ({ name: h.name, url: `${base}${h.slug}/` })) : []);
  const wdw = (d.resorts || []).map((r) => ({ name: r.name, url: `/resorts/${r.slug}/` }));
  switch (d.url) {
    case "/resorts/":
      return [...wdw, ...hotels(d.disneyland, "/disneyland/hotels/"), ...hotels(d.universal, "/universal-orlando/hotels/")];
    case "/disneyland/":
      return hotels(d.disneyland, "/disneyland/hotels/");
    case "/universal-orlando/":
      return hotels(d.universal, "/universal-orlando/hotels/");
    case "/cruises/":
      return (d.ships || []).map((s) => ({ name: s.name, url: `/cruises/${s.slug}/` }));
    case "/blog/":
      return (d.posts || []).map((p) => ({ name: p.data.title, url: p.url }));
    default:
      return [];
  }
}

function breadcrumbs(url, pageName, siteUrl) {
  const parts = url.split("/").filter(Boolean);
  if (!parts.length) return null;
  const items = [{ name: "Home", item: siteUrl + "/" }];
  let path = "/";
  parts.forEach((seg, i) => {
    path += seg + "/";
    const last = i === parts.length - 1;
    if (seg === "hotels" && !last) return; // no /hotels/ index page
    const name = last ? pageName : SECTION_NAMES[seg];
    if (name) items.push({ name, item: siteUrl + path });
  });
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
  };
}

export function jsonLd(d) {
  const site = d.site;
  d = { ...d, title: plainText(d.title), description: plainText(d.description) };
  const pageUrl = site.url + d.url;
  const orgId = site.url + "/#organization";
  const siteId = site.url + "/#website";
  const org = { "@id": orgId };
  const graph = [];

  graph.push({
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: site.url + "/",
    logo: { "@type": "ImageObject", url: site.url + site.logo },
    description: site.description,
  });
  graph.push({
    "@type": "WebSite",
    "@id": siteId,
    name: site.name,
    url: site.url + "/",
    description: site.description,
    publisher: org,
    inLanguage: "en-US",
  });

  const g = d.guide || {};
  const author = clean(g.author || d.author);
  const person = author
    ? { "@type": "Person", name: author, ...(clean(g.experience) ? { description: g.experience } : {}) }
    : null;
  const top = d.url.split("/").filter(Boolean)[0];
  const items = indexItems(d);

  let pageName = d.title || site.name;
  let main = null;

  if (d.resort) {
    const r = d.resort;
    pageName = r.name;
    const hotel = {
      "@type": "Hotel",
      name: r.name,
      description: clean(r.theme),
      ...(DESTINATIONS[top] ? { containedInPlace: { "@type": "TouristDestination", name: DESTINATIONS[top] } } : {}),
    };
    const checked = monthDate(clean(g.checked));
    main = {
      "@type": "Article",
      "@id": pageUrl + "#guide",
      headline: d.title,
      description: d.description,
      about: hotel,
      author: person || org,
      publisher: org,
      isPartOf: { "@id": siteId },
      mainEntityOfPage: pageUrl,
      ...(checked ? { dateModified: checked } : {}),
    };
  } else if (d.ship) {
    const s = d.ship;
    pageName = s.name;
    main = {
      "@type": "Article",
      "@id": pageUrl + "#guide",
      headline: d.title,
      description: d.description,
      about: {
        "@type": "Thing",
        name: s.name,
        description: clean(s.summary),
        ...(clean(s.cls) ? { additionalType: "Cruise ship, " + s.cls } : { additionalType: "Cruise ship" }),
      },
      author: person || org,
      publisher: org,
      isPartOf: { "@id": siteId },
      mainEntityOfPage: pageUrl,
      ...(d.ship.photo ? { image: site.url + d.ship.photo.src } : {}),
    };
  } else if (d.isArticle) {
    const checked = monthDate(clean(d.checked || "November 2026"));
    main = {
      "@type": "Article",
      "@id": pageUrl + "#article",
      headline: d.title,
      description: d.description,
      author: { "@type": "Person", name: "Ryan", url: site.url + "/about/how-we-research/" },
      publisher: org,
      isPartOf: { "@id": siteId },
      mainEntityOfPage: pageUrl,
      inLanguage: "en-US",
      ...(checked ? { dateModified: checked } : {}),
    };
    if (Array.isArray(d.faq) && d.faq.length) {
      graph.push({
        "@type": "FAQPage",
        "@id": pageUrl + "#faq",
        mainEntity: d.faq.map((f) => ({
          "@type": "Question",
          name: plainText(f.q),
          acceptedAnswer: { "@type": "Answer", text: plainText(f.a) },
        })),
      });
    }
  } else if (d.isPost) {
    main = {
      "@type": "BlogPosting",
      "@id": pageUrl + "#post",
      headline: d.title,
      description: d.description,
      datePublished: d.date,
      dateModified: d.updated || d.date,
      author: person || org,
      publisher: org,
      isPartOf: { "@id": siteId },
      mainEntityOfPage: pageUrl,
      image: site.url + (d.image || site.ogImage),
      inLanguage: "en-US",
      ...(clean(d.category) ? { articleSection: d.category } : {}),
      ...(d.keywords && d.keywords.length ? { keywords: d.keywords.join(", ") } : {}),
      ...(d.about && d.about.length ? { about: d.about.map((name) => ({ "@type": "Thing", name })) } : {}),
      ...(d.sources && d.sources.length ? { citation: d.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })) } : {}),
      ...(d.tldr ? { abstract: d.tldr } : {}),
    };
  } else if (items.length) {
    main = {
      "@type": "CollectionPage",
      "@id": pageUrl,
      url: pageUrl,
      name: d.title,
      description: d.description,
      isPartOf: { "@id": siteId },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: site.url + it.url })),
      },
    };
  }

  if (!main || main["@type"] !== "CollectionPage") {
    graph.push({
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: d.title || site.name,
      description: d.description,
      isPartOf: { "@id": siteId },
      inLanguage: "en-US",
    });
  }
  if (main) graph.push(main);
  // Question-and-answer pairs shown on the page, for search and AI answers.
  if (d.isPost && d.faq && d.faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": pageUrl + "#faq",
      isPartOf: { "@id": pageUrl },
      mainEntity: d.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  const crumbs = breadcrumbs(d.url, pageName, site.url);
  if (crumbs) graph.push(crumbs);

  // Escape "<" so the JSON can never close the script tag early.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}
