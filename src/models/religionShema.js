const mongoose = require("mongoose");

const religionSchema = new mongoose.Schema({
  religionName: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Religion", religionSchema);
