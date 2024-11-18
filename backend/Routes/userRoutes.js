const express = require("express");
const userRouter = express.Router();
const { google } = require("googleapis");
const userModel = require("../model/userModel");
const dotenv = require("dotenv").config();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const oAuth2Client = new google.auth.OAuth2({
  clientId: googleClientId,
  clientSecret: googleClientSecret,
  redirectUri: "https://data-nexify-two.vercel.app", // if working offline use localhost else use deployed url
});

userRouter.get("/", (req, res) => {
  res.send("user router");
});

userRouter.post("/create-token", async (req, res) => {
  try {
    const { code } = req.body;

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // to get user info
    const userInfo = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
        method: "GET",
      }
    );
    const user = await userInfo.json();

    console.log(user);
    // to check if user already exists in database
    const existingUser = await userModel.findOne({ email: user.email });

    if (!existingUser) {
      const newUser = await userModel.create({
        name: user.name,
        email: user.email,
        GoogleID: user.id,
        refreshToken: tokens.refresh_token,
      });
      newUser.save();
      // console.log("new user =>", newUser);
      res.send(newUser.email);
    } else {
      // console.log("existing user =>", existingUser);
      res.send(existingUser.email);
    }
  } catch (error) {
    res.send(error);
  }
});

userRouter.post("/create-event", async (req, res) => {
  try {
    const {
      name,
      description,
      startDateTime,
      endDateTime,
      location,
      attendees,
      email,
    } = req.body;

    // console.log(req.body.email);

    const data = await userModel.findOne({
      email: email,
    });
    // console.log(refreshToken);

    oAuth2Client.setCredentials({ refresh_token: data.refreshToken });
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const event = await calendar.events.insert({
      auth: oAuth2Client,
      calendarId: "primary",
      requestBody: {
        summary: name,
        description: description,
        location: location,
        colorId: "1",
        start: {
          dateTime: new Date(startDateTime),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: new Date(endDateTime),
          timeZone: "Asia/Kolkata",
        },
        attendees: attendees.map((attendee) => {
          return {
            email: attendee,
          };
        }),
      },
    });
    res.send(event);
  } catch (error) {
    res.send(error);
  }
});

userRouter.post("/get-events", async (req, res) => {
  try {
    const { email } = req.body;
    const data = await userModel.findOne({
      email: email,
    });
    // console.log(data);

    oAuth2Client.setCredentials({ refresh_token: data.refreshToken });
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 25,
      singleEvents: true,
      orderBy: "startTime",
    });

    res.send(response.data.items);
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRouter;
