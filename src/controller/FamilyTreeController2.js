const asyncHandler = require("express-async-handler");
const PersonModel = require("../models/personModel");
const RelationshipsModel = require("../models/RelationshipSchma"); // Corrected schema name
const UserModel = require("../models/User.model");
const mongoose = require("mongoose");
const path = require("path");

const maternalGrtGrandFather = asyncHandler(async (req, res) => {
  const { firstName, lastName, Lstatus, DOB, yearDeceased, placesLived } =
    req.body;
  const file = req.file ? req.file.path : null;
  const userId = req.user._id;

  // Validate input data
  if (!firstName || !lastName || !DOB || !Lstatus) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if a maternal grandfather with the same userId already exists
  const existingMainPerson = await PersonModel.findOne({
    userId,
    role: "GrtGrandFather(maternal)",
  });

  if (existingMainPerson) {
    return res.status(400).json({ message: "Already created for this user." });
  }

  try {
    // Fetch the user's person data
    const user = await PersonModel.findOne({ userId, role: "main" }).select(
      "firstName lastName"
    );

    // Check if the user was found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Construct the user's name
    const userName = `${user.firstName} ${user.lastName}`;
    // Create a new Person document in MongoDB with role set to 'maternalGrandFather'
    const person = await PersonModel.create({
      userId,
      firstName,
      lastName,
      DOB,
      file,
      role: "GrtGrandFather(maternal)",
      Lstatus,
      userName,
      yearDeceased,
      placesLived,
    });

    // Create a relationship between the user and the newly created maternal grandfather
    await RelationshipsModel.create({
      userId,
      personId: person._id,
      relationshipType: "GrtGrandFather(maternal)",
    });

    res.status(201).json({
      userId: person.userId,
      firstName: person.firstName,
      lastName: person.lastName,
      DOB: person.DOB,
      Lstatus: person.Lstatus,
      file: person.file,
      role: person.role,
      yearDeceased: person.yearDeceased,
      placesLived: person.placesLived,
    });
  } catch (error) {
    console.error("Error creating GrtGrandFather, error");
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const maternalGrtGrandMother = asyncHandler(async (req, res) => {
  const { firstName, lastName, Lstatus, DOB, yearDeceased, placesLived } =
    req.body;
  const file = req.file ? req.file.path : null;
  const userId = req.user._id;

  // Validate input data
  if (!firstName || !lastName || !DOB || !Lstatus) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if a maternal grandfather with the same userId already exists
  const existingMainPerson = await PersonModel.findOne({
    userId,
    role: "GrtGrandMother(maternal)",
  });

  if (existingMainPerson) {
    return res.status(400).json({ message: "Already created for this user." });
  }

  try {
    // Fetch the user's person data
    const user = await PersonModel.findOne({ userId, role: "main" }).select(
      "firstName lastName"
    );

    // Check if the user was found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Construct the user's name
    const userName = `${user.firstName} ${user.lastName}`;
    // Create a new Person document in MongoDB with role set to 'maternalGrandFather'
    const person = await PersonModel.create({
      userId,
      firstName,
      lastName,
      DOB,
      file,
      role: "GrtGrandMother(maternal)",
      Lstatus,
      userName,
      yearDeceased,
      placesLived,
    });

    // Create a relationship between the user and the newly created maternal grandfather
    await RelationshipsModel.create({
      userId,
      personId: person._id,
      relationshipType: "GrtGrandMother(maternal)",
    });

    res.status(201).json({
      userId: person.userId,
      firstName: person.firstName,
      lastName: person.lastName,
      DOB: person.DOB,
      Lstatus: person.Lstatus,
      file: person.file,
      role: person.role,
      yearDeceased: person.yearDeceased,
      placesLived: person.placesLived,
    });
  } catch (error) {
    console.error("Error creating GrtGrandMother(maternal), error");
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const paternalGrtGrandFather = asyncHandler(async (req, res) => {
  const { firstName, lastName, Lstatus, DOB, yearDeceased, placesLived } =
    req.body;
  const file = req.file ? req.file.path : null;
  const userId = req.user._id;

  // Validate input data
  if (!firstName || !lastName || !DOB || !Lstatus) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if a maternal grandfather with the same userId already exists
  const existingMainPerson = await PersonModel.findOne({
    userId,
    role: "GrtGrandFather(paternal)",
  });

  if (existingMainPerson) {
    return res.status(400).json({ message: "Already created for this user." });
  }

  try {
    // Fetch the user's person data
    const user = await PersonModel.findOne({ userId, role: "main" }).select(
      "firstName lastName"
    );

    // Check if the user was found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Construct the user's name
    const userName = `${user.firstName} ${user.lastName}`;
    // Create a new Person document in MongoDB with role set to 'maternalGrandFather'
    const person = await PersonModel.create({
      userId,
      firstName,
      lastName,
      DOB,
      file,
      role: "GrtGrandFather(paternal)",
      Lstatus,
      userName,
      yearDeceased,
      placesLived,
    });

    // Create a relationship between the user and the newly created maternal grandfather
    await RelationshipsModel.create({
      userId,
      personId: person._id,
      relationshipType: "GrtGrandFather(paternal)",
    });

    res.status(201).json({
      userId: person.userId,
      firstName: person.firstName,
      lastName: person.lastName,
      DOB: person.DOB,
      Lstatus: person.Lstatus,
      file: person.file,
      role: person.role,
      yearDeceased: person.yearDeceased,
      yearDeceased: person.yearDeceased,
      placesLived: person.placesLived,
    });
  } catch (error) {
    console.error("Error creating GrtGrandFather(paternal)");
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const paternalGrtGrandMother = asyncHandler(async (req, res) => {
  const { firstName, lastName, Lstatus, DOB, yearDeceased, placesLived } =
    req.body;
  const file = req.file ? req.file.path : null;
  const userId = req.user._id;

  // Validate input data
  if (!firstName || !lastName || !DOB || !Lstatus) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if a maternal grandfather with the same userId already exists
  const existingMainPerson = await PersonModel.findOne({
    userId,
    role: "GrtGrandMother(paternal)",
  });

  if (existingMainPerson) {
    return res.status(400).json({ message: "Already created!" });
  }

  try {
    // Fetch the user's person data
    const user = await PersonModel.findOne({ userId, role: "main" }).select(
      "firstName lastName"
    );

    // Check if the user was found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Construct the user's name
    const userName = `${user.firstName} ${user.lastName}`;
    // Create a new Person document in MongoDB with role set to 'maternalGrandFather'
    const person = await PersonModel.create({
      userId,
      firstName,
      lastName,
      DOB,
      file,
      role: "GrtGrandMother(paternal)",
      Lstatus,
      userName,
      yearDeceased,
      placesLived,
    });

    // Create a relationship between the user and the newly created maternal grandfather
    await RelationshipsModel.create({
      userId,
      personId: person._id,
      relationshipType: "GrtGrandMother(paternal)",
    });

    res.status(201).json({
      userId: person.userId,
      firstName: person.firstName,
      lastName: person.lastName,
      DOB: person.DOB,
      Lstatus: person.Lstatus,
      file: person.file,
      role: person.role,
      yearDeceased: person.yearDeceased,
      placesLived: person.placesLived,
    });
  } catch (error) {
    console.error("Error creating GrtGrandMother(paternal)");
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const get_MGrtGrandFather = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    // Find the relationship where the user is related as a paternal grandfather
    const relationship = await RelationshipsModel.findOne({
      userId,
      relationshipType: "GrtGrandFather(maternal)",
    });

    if (!relationship) {
      return res
        .status(404)
        .json({ message: "maternal greatgrandfathers's details not found" });
    }

    // Find the person using the personId from the relationship
    const MGrtGrandFather = await PersonModel.findById(relationship.personId);

    if (!MGrtGrandFather) {
      return res
        .status(404)
        .json({ message: "maternal grandmother not found" });
    }

    // Construct the image URL if a file exists
    const imageUrl = MGrtGrandFather.file
      ? `${req.protocol}://${req.get("host")}/${MGrtGrandFather.file}`
      : null;

    res.json({
      ...MGrtGrandFather.toObject(),
      imageUrl,
    });
  } catch (error) {
    console.error("Error fetching maternal grandmother's details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const get_MGrtGrandMother = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    // Find the relationship where the user is related as a paternal grandfather
    const relationship = await RelationshipsModel.findOne({
      userId,
      relationshipType: "GrtGrandMother(maternal)",
    });

    if (!relationship) {
      return res
        .status(404)
        .json({ message: "maternal greatgrandMothers's details not found" });
    }

    // Find the person using the personId from the relationship
    const MGrtGrandMother = await PersonModel.findById(relationship.personId);

    if (!MGrtGrandMother) {
      return res
        .status(404)
        .json({ message: "maternal grandmother not found" });
    }

    // Construct the image URL if a file exists
    const imageUrl = MGrtGrandMother.file
      ? `${req.protocol}://${req.get("host")}/${MGrtGrandMother.file}`
      : null;

    res.json({
      ...MGrtGrandMother.toObject(),
      imageUrl,
    });
  } catch (error) {
    console.error(
      "Error fetching maternal great grandmother's details:",
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

const get_PGrtGrandMother = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    // Find the relationship where the user is related as a paternal grandfather
    const relationship = await RelationshipsModel.findOne({
      userId,
      relationshipType: "GrtGrandMother(paternal)",
    });

    if (!relationship) {
      return res
        .status(404)
        .json({ message: "paternal greatgrandMothers's details not found" });
    }

    // Find the person using the personId from the relationship
    const PGrtGrandMother = await PersonModel.findById(relationship.personId);

    if (!PGrtGrandMother) {
      return res
        .status(404)
        .json({ message: "maternal grandmother not found" });
    }

    // Construct the image URL if a file exists
    const imageUrl = PGrtGrandMother.file
      ? `${req.protocol}://${req.get("host")}/${PGrtGrandMother.file}`
      : null;

    res.json({
      ...PGrtGrandMother.toObject(),
      imageUrl,
    });
  } catch (error) {
    console.error(
      "Error fetching maternal great grandmother's details:",
      error
    );
    res.status(500).json({ message: "Server error" });
  }
});

const get_PGrtGrandFather = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    // Find the relationship where the user is related as a paternal grandfather
    const relationship = await RelationshipsModel.findOne({
      userId,
      relationshipType: "GrtGrandFather(paternal)",
    });

    if (!relationship) {
      return res
        .status(404)
        .json({ message: "paternal greatgrandFathers's details not found" });
    }

    // Find the person using the personId from the relationship
    const PGrtGrandFather = await PersonModel.findById(relationship.personId);

    if (!PGrtGrandFather) {
      return res
        .status(404)
        .json({ message: "paternal grandfather not found" });
    }

    // Construct the image URL if a file exists
    const imageUrl = PGrtGrandFather.file
      ? `${req.protocol}://${req.get("host")}/${PGrtGrandFather.file}`
      : null;

    res.json({
      ...PGrtGrandFather.toObject(),
      imageUrl,
    });
  } catch (error) {
    console.error("Error fetching paternal great grandfathers details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  maternalGrtGrandFather,
  maternalGrtGrandMother,
  paternalGrtGrandMother,
  paternalGrtGrandFather,
  get_MGrtGrandFather,
  get_MGrtGrandMother,
  get_PGrtGrandMother,
  get_PGrtGrandFather,
};
