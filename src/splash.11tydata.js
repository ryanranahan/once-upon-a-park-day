// The "coming soon" splash only exists while site.comingSoon is true.
export default {
  eleventyComputed: {
    permalink: (d) => (d.site.comingSoon ? "/" : false),
  },
};
