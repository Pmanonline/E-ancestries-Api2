const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide a unique email"],
      unique: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    uniqueId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    refreshTokens: [
      {
        token: { type: String },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date },
        deviceInfo: { type: String },
      },
    ],
    phoneNumber: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    DOB: { type: String },
    background: { type: String },
    streetAddress: { type: String },
    lga: { type: String },
    state: { type: String },
    kindred: { type: String },
    village: { type: String },
    autonomous: { type: String },
    tribe: { type: String },
    religion: { type: String },
    profession: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    about: { type: String },
    middlename: { type: String },
    gender: { type: String },
    image: {
      type: String, // URL of the user's profile image
    },
    image2: {
      type: String, // URL of the user's profile image
    },
    images: [
      {
        path: {
          type: String, // Path to the image file
        },
        caption: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
