const userService = require("../service/userService");

const home = (req, res) => {
  res.send("user router");
};

const createToken = async (req, res) => {
  try {
    const { code } = req.body;
    const email = await userService.createTokenFn(code);
    res.send(email);
  } catch (error) {
    res.send(error);
  }
};

const createEvents = async (req, res) => {
  try {
    const eventData = req.body;
    const event = await userService.createEventsFn(eventData);
    res.send(event);
  } catch (error) {
    res.send(error);
  }
};

const getEvents = async (req, res) => {
  try {
    const email = req.body.email;
    const allEvents = await userService.getEventsFn(email);
    res.send(allEvents);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, createToken, createEvents, getEvents };
