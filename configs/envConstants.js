require("dotenv").config();
ENV_CONSTANT = {
  googleApiKey: process.env.GOOGLE_AUTH_KEY,
}

module.exports = { ENV_CONSTANT }
