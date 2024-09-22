const mongoose = require("mongoose");

const RelationshipsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    relationshipType: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RelationshipsModel = mongoose.model("Relationship", RelationshipsSchema);

module.exports = RelationshipsModel;
