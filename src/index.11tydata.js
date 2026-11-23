// While site.comingSoon is true, the splash page (src/splash.njk) takes "/"
// and this full homepage moves to /home/, hidden from search engines.
export default {
  eleventyComputed: {
    permalink: (d) => (d.site.comingSoon ? "/home/" : "/"),
    noindex: (d) => d.noindex || !!d.site.comingSoon,
  },
};
