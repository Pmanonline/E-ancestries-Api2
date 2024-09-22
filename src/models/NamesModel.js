// src/models/NamesModel.js
const mongoose = require("mongoose");

// Define the schema for Name
const nameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    meaning: { type: String, required: true },
    background: { type: String, required: true },
    tribeDescribe: { type: String, required: true },
    states: [
      {
        stateName: { type: String },
        tribes: [
          {
            tribeName: { type: String },
            description: { type: String },
          },
        ],
      },
    ],
    extensions: [
      {
        extensionName: { type: String },
        description: { type: String },
      },
    ],
    image: { type: String },
  },
  { timestamps: true }
);

// Create the Name model
const Name = mongoose.model("Name", nameSchema);

module.exports = Name;
