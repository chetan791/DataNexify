const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = mongoose.connect(process.env.MongoUrl);

module.exports = connectDB;
