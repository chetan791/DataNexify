const { google } = require("googleapis");
const dotenv = require("dotenv").config();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

const oAuth2Client = new google.auth.OAuth2({
  clientId: googleClientId,
  clientSecret: googleClientSecret,
  redirectUri: redirectUri, // if working offline use localhost else use deployed url
});

module.exports = { oAuth2Client };
