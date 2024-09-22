const mongoose = require("mongoose");

const tribeSchema = new mongoose.Schema({
  tribeName: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Tribe", tribeSchema);
