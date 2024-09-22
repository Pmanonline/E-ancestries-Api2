const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  writeUp: {
    type: String,
    required: true,
  },
  list: [
    {
      type: String,
      required: false,
    },
  ],
});

const historicalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      required: true,
    },
    deseasedTime: {
      type: String,
    },
    stateOfOrigin: {
      type: String,
    },
    tribe: {
      type: String,
    },
    born: {
      type: String,
    },
    died: {
      type: String,
    },
    title: {
      type: String,
    },
    sector: {
      type: String,
      required: false,
    },
    achievements: [achievementSchema],
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Historical = mongoose.model("Historical", historicalSchema);

module.exports = Historical;
