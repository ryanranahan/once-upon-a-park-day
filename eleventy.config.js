export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/images": "images", "src/css": "css", "src/favicon.svg": "favicon.svg" });

  eleventyConfig.addCollection("post", (api) =>
    api.getFilteredByGlob("src/blog/posts/*.md").filter((p) => !p.data.draft).sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("byTier", (resorts, tier) => resorts.filter((r) => r.tier === tier));
  eleventyConfig.addFilter("byArea", (resorts, area, exceptSlug) => resorts.filter((r) => r.area === area && r.slug !== exceptSlug));
  eleventyConfig.addFilter("findTierByName", (tiers, name) => tiers.find((t) => t.name === name));
  eleventyConfig.addFilter("findResort", (resorts, slug) => resorts.find((r) => r.slug === slug));
  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("resortUrl", (slug) => `/resorts/${slug}/`);
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  return {
    dir: { input: "src", output: "public", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
