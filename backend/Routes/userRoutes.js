const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/usercontroller");

userRouter.get("/", userController.home);

userRouter.post("/create-token", userController.createToken);

userRouter.post("/create-event", userController.createEvents);

userRouter.post("/get-events", userController.getEvents);

module.exports = userRouter;
