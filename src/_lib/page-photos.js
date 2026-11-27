// Adds every photo shown in a page's main content to its JSON-LD as ImageObjects,
// so search engines and AI assistants can find and cite section photos, not only
// the hero. Runs on the finished HTML, so it picks up photos however a template
// or guide adds them (hero, section galleries, photos inside guide text).

import site from "../_data/site.json" with { type: "json" };

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return m ? m[1] : undefined;
};
const decode = (s) =>
  s && s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

export function addPagePhotos(html, pageUrl) {
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!ld || !main) return html;

  const photos = [];
  const seen = new Set();
  for (const tag of main[1].match(/<img\b[^>]*>/g) || []) {
    const src = attr(tag, "src");
    if (!src || !/\.(jpe?g|png|webp|avif)$/i.test(src) || !src.startsWith("/images/")) continue;
    // Use the largest file in srcset when there is one.
    const srcset = attr(tag, "srcset");
    let best = src;
    if (srcset) {
      let bestW = 0;
      for (const part of srcset.split(",")) {
        const [u, w] = part.trim().split(/\s+/);
        const n = parseInt(w, 10) || 0;
        if (n > bestW) { bestW = n; best = u; }
      }
    }
    if (seen.has(best)) continue;
    seen.add(best);
    const alt = decode(attr(tag, "alt"));
    const width = parseInt(attr(tag, "width"), 10);
    const height = parseInt(attr(tag, "height"), 10);
    photos.push({
      "@type": "ImageObject",
      contentUrl: site.url + best,
      url: site.url + best,
      ...(alt ? { caption: alt, description: alt } : {}),
      ...(width && height ? { width, height } : {}),
    });
  }
  if (!photos.length) return html;

  let data;
  try {
    data = JSON.parse(ld[1]);
  } catch {
    return html;
  }
  const graph = data["@graph"] || [];
  const pageId = site.url + pageUrl;
  // Only guides, articles and posts: listing pages show other pages' thumbnails.
  const target = graph.find(
    (n) => ["Article", "BlogPosting"].includes(n["@type"]) && String(n["@id"] || "").startsWith(pageId)
  );
  if (!target) return html;

  target.image = photos;
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return html.replace(ld[0], () => `<script type="application/ld+json">${json}</script>`);
}
