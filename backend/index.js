const express = require("express");
const connectDB = require("./config/DB");
const userRouter = require("./Routes/userRoutes");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: "https://data-nexify-two.vercel.app" }));

app.use("/user", userRouter);

app.listen(process.env.port, async () => {
  try {
    await connectDB;
    console.log("Server is running on port " + process.env.port);
  } catch (error) {
    console.log(error);
  }
});
