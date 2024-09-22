const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  visited: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  visitedAt: {
    type: Date,
    default: Date.now,
  },
});

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
