// The "coming soon" splash page. While site.comingSoon is true it builds at
// /coming-soon/, and functions/index.js shows it as the homepage of the real
// domain (site.domain). The pages.dev site keeps the full homepage at "/".
export default {
  eleventyExcludeFromCollections: true,
  eleventyComputed: {
    permalink: (d) => (d.site.comingSoon ? "/coming-soon/" : false),
  },
};
