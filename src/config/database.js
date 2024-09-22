const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      // process.env.MONGO_URI
      "mongodb+srv://firstCRUD:w3schools.com@crud.zgveazn.mongodb.net/myDatabase1"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
