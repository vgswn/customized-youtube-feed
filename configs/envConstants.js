require("dotenv").config();
/**
 * Used to store all env variables loaded from .env file
 */
ENV_CONSTANT = {
  googleApiKey: process.env.GOOGLE_AUTH_KEY,
  ytKeyword: process.env.YT_KEY_WORD || "cricket"
}

module.exports = { ENV_CONSTANT }
