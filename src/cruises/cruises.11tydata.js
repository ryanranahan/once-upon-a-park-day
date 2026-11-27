import { shipAnswers } from "../_lib/quick-answers.js";

// Computed data for ship pages (src/cruises/ship.njk).
export default {
  eleventyComputed: {
    faq: (data) => (data.ship ? shipAnswers(data.ship) : data.faq),
  },
};
