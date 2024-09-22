const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  DOB: {
    type: Date,
  },
  yearDeceased: {
    type: Date,
  },
  Lstatus: {
    type: String,
  },

  file: {
    type: String,
    default: null,
  },
  image: {
    type: String,
  },
  placesLived: {
    type: String,
  },
  userName: { type: String },
  role: {
    type: String,
    enum: [
      "main",
      "main2",
      "mother",
      "father",
      "paternalGrandMother",
      "paternalGrandFather",
      "maternalGrandMother",
      "maternalGrandFather",
      "GrtGrandFather(maternal)",
      "GrtGrandMother(maternal)",
      "GrtGrandFather(paternal)",
      "GrtGrandMother(paternal)",

      "other",
    ],
    default: "other",
    required: true,
  },
});

const PersonModel = mongoose.model("Person", personSchema);
module.exports = PersonModel;
