import { quickAnswers } from "../_lib/quick-answers.js";

// Computed data for Walt Disney World resort pages (src/resorts/resort.njk).
export default {
  eleventyComputed: {
    faq: (data) => {
      if (!data.resort) return data.faq;
      const g = (data.resortGuides || {})[data.resort.slug];
      return quickAnswers(data.resort, g, { slug: "wdw", name: "Walt Disney World Resort" });
    },
  },
};
