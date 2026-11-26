import { quickAnswers } from "../_lib/quick-answers.js";

// Computed data for hotel pages (src/disneyland/hotel.njk).
export default {
  eleventyComputed: {
    faq: (data) => (data.resort ? quickAnswers(data.resort, data.resort.guide, data.disneyland) : data.faq),
  },
};
