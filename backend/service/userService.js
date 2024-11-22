const { oAuth2Client } = require("../config/GoogleOAuthConfig");
const userModel = require("../model/userModel");

const createTokenFn = async (code) => {
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

  // console.log(user);
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
    return newUser.email;
  } else {
    // console.log("existing user =>", existingUser);
    return existingUser.email;
  }
};

const createEventsFn = async (eventData) => {
  const {
    name,
    description,
    startDateTime,
    endDateTime,
    location,
    attendees,
    email,
  } = eventData;

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

  return event;
};

const getEventsFn = async (email) => {
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

  return response.data.items;
};

module.exports = { createTokenFn, createEventsFn, getEventsFn };
