const mongoose = require("mongoose");

uri = process.env.MONGODB_URL;
const connectDB = async () => {
    try{
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
module.exports = connectDB;
