// Shared settings for every blog post in this folder.
export default {
  layout: "layouts/post.njk",
  permalink: "/blog/{{ page.fileSlug }}/",
  author: "Ryan",
  eleventyComputed: {
    // The summary doubles as the meta description unless a post sets its own.
    description: (d) => d.description || d.summary,
  },
};
