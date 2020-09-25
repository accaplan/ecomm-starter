require("dotenv").config();

module.exports = {
  env: {
    SANITY_DRAFT_TOKEN: process.env.SANITY_DRAFT_TOKEN,
    SANITY_WRITE_TOKEN: process.env.SANITY_WRITE_TOKEN,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  },
};
