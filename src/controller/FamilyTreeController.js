const asyncHandler = require("express-async-handler");
const PersonModel = require("../models/personModel");
const RelationshipsModel = require("../models/RelationshipSchma"); // Corrected schema name
const UserModel = require("../models/User.model");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const createPerson = asyncHandler(async (req, res) => {
  const { firstName, lastName, gender, DOB, file } = req.body;
  const userId = req.user._id; // This should now be populated by the auth middleware

  // Validate input data
  if (!firstName || !lastName || !gender || !DOB) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if a main person with the same userId already exists
  const existingMainPerson = await PersonModel.findOne({
    userId,
    role: "main",
  });

  if (existingMainPerson) {
    return res
      .status(400)
      .json({ message: "Main person already added for this user." });
  }

  try {
    // Create a new Person document in MongoDB with role set to 'main'
    const person = await PersonModel.create({
      userId,
      firstName,
      lastName,
      gender,
      DOB,
      file,
      role: "main", // Set role to 'main' for the first person
    });

    res.status(201).json({
      userId: person.userId,
      firstName: person.firstName,
      lastName: person.lastName,
      gender: person.gender,
      DOB: person.DOB,
      file: person.file,
      role: person.role,
    });
  } catch (error) {
    console.error("Error creating person:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const createMother = asyncHandler(async (req, res) => {
  const { firstName, lastName, Lstatus, DOB, yearDeceased, placesLived } =
    req.body;
  const file = req.file ? req.file.path : null;
  const userId = req.user._id; // Ensure this is populated by the auth middleware

  if (!firstName || !lastName || !DOB || !Lstatus) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingMainPerson = await PersonModel.findOne({
    userId,
    role: "mother",
  });

  if (existingMainPerson) {
    return res
      .status(400)
      .json({ message: "Mother already added for this user." });
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

    const userName = `${user.firstName} ${user.lastName}`;

    // Create the mother document
    const person = await PersonModel.create({
      userId,
      firstName,
      lastName,
      DOB,
      file,
      role: "mother",
      Lstatus,
      userName, // Store the user's name in the schema
      yearDeceased,
      placesLived,
    });

    // Create the relationship document
    await RelationshipsModel.create({
      userId,
      personId: person._id,
      relationshipType: "mother",
    });

    // Return the response with the created person's data
    res.status(201).json({
      userId: person.userId,
      userName: person.userName, // Return the stored userName
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
    console.error("Error creating mother:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const createFather = asyncHandler(async (req, res) => {
  const { firstName, lastName, Lstatus, DOB, yearDeceased, placesLived } =
    req.body;
  const file = req.file ? req.file.path : null;
  const userId = req.user._id;

  // Validate input data
  if (!firstName || !lastName || !DOB || !Lstatus) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if a father with the same userId already exists
  const existingMainPerson = await PersonModel.findOne({
    userId,
    role: "father",
  });

  if (existingMainPerson) {
    return res
      .status(400)
      .json({ message: "Father already added for this user." });
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

    const userName = `${user.firstName} ${user.lastName}`;

    // Create a new Person document in MongoDB with role set to 'father'
    const person = await PersonModel.create({
      userId,
      firstName,
      lastName,
      DOB,
      file,
      role: "father",
      Lstatus,
      userName,
      yearDeceased,
      placesLived,
    });

    // Create a relationship between the user and the newly created father
    await RelationshipsModel.create({
      userId,
      personId: person._id,
      relationshipType: "father",
    });

    // Return the response with the created person's data
    res.status(201).json({
      userId: person.userId,
      userName: person.userName, // Return the stored userName
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
    console.error("Error creating father:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const paternalGrandMother = asyncHandler(async (req, res) => {
  const { firstName, lastName, Lstatus, DOB, yearDeceased, placesLived } =
    req.body;
  const file = req.file ? req.file.path : null;
  const userId = req.user._id;

  // Validate input data
  if (!firstName || !lastName || !DOB || !Lstatus) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if a paternal grandmother with the same userId already exists
  const existingMainPerson = await PersonModel.findOne({
    userId,
    role: "paternalGrandMother",
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

    const userName = `${user.firstName} ${user.lastName}`;

    // Create a new Person document in MongoDB with role set to 'paternalGrandMother'
    const person = await PersonModel.create({
      userId,
      firstName,
      lastName,
      DOB,
      file,
      role: "paternalGrandMother",
      Lstatus,
      userName, // Store the user's name in the schema
      yearDeceased,
      placesLived,
    });

    // Create a relationship between the user and the newly created paternal grandmother
    await RelationshipsModel.create({
      userId,
      personId: person._id,
      relationshipType: "paternalGrandMother",
    });

    // Return the response with the created person's data
    res.status(201).json({
      userId: person.userId,
      userName: person.userName, // Return the stored userName
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
    console.error("Error creating paternalGrandMother:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const paternalGrandFather = asyncHandler(async (req, res) => {
  const { firstName, lastName, Lstatus, DOB, yearDeceased, placesLived } =
    req.body;
  const file = req.file ? req.file.path : null;
  const userId = req.user._id;

  // Validate input data
  if (!firstName || !lastName || !DOB || !Lstatus) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if a paternal grandfather with the same userId already exists
  const existingMainPerson = await PersonModel.findOne({
    userId,
    role: "paternalGrandFather",
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

    // Create a new Person document in MongoDB with role set to 'paternalGrandFather'
    const person = await PersonModel.create({
      userId,
      firstName,
      lastName,
      DOB,
      file,
      role: "paternalGrandFather",
      Lstatus,
      userName,
      yearDeceased,
      placesLived,
    });

    // Create a relationship between the user and the newly created paternal grandfather
    await RelationshipsModel.create({
      userId,
      personId: person._id,
      relationshipType: "paternalGrandFather",
    });

    // Return the response with the created person's data
    res.status(201).json({
      userId: person.userId,
      userName: person.userName, // Return the stored userName
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
    console.error("Error creating paternalGrandFather:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const maternalGrandMother = asyncHandler(async (req, res) => {
  const { firstName, lastName, Lstatus, DOB, yearDeceased, placesLived } =
    req.body;
  const file = req.file ? req.file.path : null;
  const userId = req.user._id;

  // Validate input data
  if (!firstName || !lastName || !DOB || !Lstatus) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if a maternal grandmother with the same userId already exists
  const existingMainPerson = await PersonModel.findOne({
    userId,
    role: "maternalGrandMother",
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
    // Create a new Person document in MongoDB with role set to 'maternalGrandMother'
    const person = await PersonModel.create({
      userId,
      firstName,
      lastName,
      DOB,
      file,
      role: "maternalGrandMother",
      Lstatus,
      userName,
      yearDeceased,
      placesLived,
    });

    // Create a relationship between the user and the newly created maternal grandmother
    await RelationshipsModel.create({
      userId,
      personId: person._id,
      relationshipType: "maternalGrandMother",
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
    console.error("Error creating maternalGrandMother:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const maternalGrandFather = asyncHandler(async (req, res) => {
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
    role: "maternalGrandFather",
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
      role: "maternalGrandFather",
      Lstatus,
      userName,
      yearDeceased,
      placesLived,
    });

    // Create a relationship between the user and the newly created maternal grandfather
    await RelationshipsModel.create({
      userId,
      personId: person._id,
      relationshipType: "maternalGrandFather",
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
    console.error("Error creating maternalGrandFather:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const Getperson = asyncHandler(async (req, res) => {
  // const userId = req.user._id;
  const { userId } = req.params;
  // console.log("Received userId:", req.params);

  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }
  try {
    // Query using `userId` and `role: 'main'` field
    const person = await PersonModel.findOne({ userId: userId, role: "main" });

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    // Include image URL in response
    const imageUrl = person.file
      ? `${req.protocol}://${req.get("host")}/public/${person.file}`
      : null;

    res.json({
      ...person.toObject(),
      imageUrl,
    });
  } catch (error) {
    console.error("Error fetching person:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const updatePerson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    gender,
    DOB,
    Lstatus,
    yearDeceased,
    placesLived,
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    // Initialize updateData object with the fields to be updated
    const updateData = {
      firstName,
      lastName,
      DOB,
      Lstatus,
      yearDeceased,
      placesLived,
    };

    if (gender) {
      updateData.gender = gender;
    }

    // Find the existing person by ID
    const person = await PersonModel.findById(id);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    // If there's a new file (image), delete the old one
    if (req.file) {
      if (person.image) {
        const oldImagePath = path.resolve(person.image);

        // Check if the old image file exists before attempting to delete it
        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error("Failed to delete old image:", err);
            } else {
              console.log("Old image deleted:", person.image);
            }
          });
        } else {
          console.log("Old image not found, skipping deletion:", oldImagePath);
        }
      }

      // Update the image path in the updateData object
      updateData.image = req.file.path;
    }

    // Update the person's data
    const updatedPerson = await PersonModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedPerson);
  } catch (error) {
    console.error("Error updating person:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Function to delete a person
const deletePerson = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Validate ObjectId
    return res.status(400).json({ message: "Invalid ID format" });
  }

  console.log("Attempting to delete person with ID:", id);

  try {
    // Delete person
    const person = await PersonModel.findByIdAndDelete(id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    // Remove related relationships
    const result = await RelationshipsModel.deleteMany({ personId: id });
    console.log("Number of relationships deleted:", result.deletedCount);

    res.json({
      message: "Person deleted successfully",
      deletedRelationships: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const GetMother = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }
  try {
    // Find the relationship where the user is related as a mother
    const relationship = await RelationshipsModel.findOne({
      userId,
      relationshipType: "mother",
    });

    if (!relationship) {
      return res.status(404).json({ message: "Mother's details not found" });
    }

    // Find the person using the personId from the relationship
    const mother = await PersonModel.findById(relationship.personId);

    if (!mother) {
      return res.status(404).json({ message: "Mother not found" });
    }

    // Include image URL in response
    const imageUrl = mother.file
      ? `${req.protocol}://${req.get("host")}/public/${mother.file}`
      : null;

    res.json({
      ...mother.toObject(),
      imageUrl,
    });
  } catch (error) {
    console.error("Error fetching mother's details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const GetFather = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }
  try {
    // Find the relationship where the user is related as a mother
    const relationship = await RelationshipsModel.findOne({
      userId,
      relationshipType: "father",
    });

    if (!relationship) {
      return res.status(404).json({ message: "father's details not found" });
    }

    // Find the person using the personId from the relationship
    const father = await PersonModel.findById(relationship.personId);

    if (!father) {
      return res.status(404).json({ message: "Father not found" });
    }

    // Include image URL in response
    const imageUrl = father.file
      ? `${req.protocol}://${req.get("host")}/public/${father.file}`
      : null;

    res.json({
      ...father.toObject(),
      imageUrl,
    });
  } catch (error) {
    console.error("Error fetching father's details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const GetPGFather = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    // Find the relationship where the user is related as a paternal grandfather
    const relationship = await RelationshipsModel.findOne({
      userId,
      relationshipType: "paternalGrandFather",
    });

    if (!relationship) {
      return res
        .status(404)
        .json({ message: "Paternal grandfather's details not found" });
    }

    // Find the person using the personId from the relationship
    const paternalGrandFather = await PersonModel.findById(
      relationship.personId
    );

    if (!paternalGrandFather) {
      return res
        .status(404)
        .json({ message: "Paternal grandfather not found" });
    }

    // Construct the image URL if a file exists
    const imageUrl = paternalGrandFather.file
      ? `${req.protocol}://${req.get("host")}/${paternalGrandFather.file}`
      : null;

    res.json({
      ...paternalGrandFather.toObject(),
      imageUrl,
    });
  } catch (error) {
    console.error("Error fetching paternal grandfather's details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// MGF
const GetMGFather = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    // Find the relationship where the user is related as a paternal grandfather
    const relationship = await RelationshipsModel.findOne({
      userId,
      relationshipType: "maternalGrandFather",
    });

    if (!relationship) {
      return res
        .status(404)
        .json({ message: "maternal grandfather's details not found" });
    }

    // Find the person using the personId from the relationship
    const maternalGrandFather = await PersonModel.findById(
      relationship.personId
    );

    if (!maternalGrandFather) {
      return res
        .status(404)
        .json({ message: "Maternal grandfather not found" });
    }

    // Construct the image URL if a file exists
    const imageUrl = maternalGrandFather.file
      ? `${req.protocol}://${req.get("host")}/${maternalGrandFather.file}`
      : null;

    res.json({
      ...maternalGrandFather.toObject(),
      imageUrl,
    });
  } catch (error) {
    console.error("Error fetching maternal grandfather's details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const GetPGMother = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Validate that userId is defined and a valid ObjectId
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid or missing userId" });
  }

  try {
    // Find the relationship where the user is related as a paternal grandmother
    const relationship = await RelationshipsModel.findOne({
      userId,
      relationshipType: "paternalGrandMother",
    });

    if (!relationship) {
      return res
        .status(404)
        .json({ message: "Paternal grandmother's details not found" });
    }

    // Find the person using the personId from the relationship
    const paternalGrandMother = await PersonModel.findById(
      relationship.personId
    );

    if (!paternalGrandMother) {
      return res
        .status(404)
        .json({ message: "Paternal grandmother not found" });
    }

    // Construct the image URL if a file exists
    const imageUrl = paternalGrandMother.file
      ? `${req.protocol}://${req.get("host")}/${paternalGrandMother.file}`
      : null;

    res.json({
      ...paternalGrandMother.toObject(),
      imageUrl,
    });
  } catch (error) {
    console.error("Error fetching paternal grandmother's details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// MGM
const GetMGMother = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    // Find the relationship where the user is related as a paternal grandfather
    const relationship = await RelationshipsModel.findOne({
      userId,
      relationshipType: "maternalGrandMother",
    });

    if (!relationship) {
      return res
        .status(404)
        .json({ message: "maternal grandmother's details not found" });
    }

    // Find the person using the personId from the relationship
    const maternalGrandMother = await PersonModel.findById(
      relationship.personId
    );

    if (!maternalGrandMother) {
      return res
        .status(404)
        .json({ message: "maternal grandmother not found" });
    }

    // Construct the image URL if a file exists
    const imageUrl = maternalGrandMother.file
      ? `${req.protocol}://${req.get("host")}/${maternalGrandMother.file}`
      : null;

    res.json({
      ...maternalGrandMother.toObject(),
      imageUrl,
    });
  } catch (error) {
    console.error("Error fetching maternal grandmother's details:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// MGM

module.exports = {
  createPerson,
  createMother,
  Getperson,
  GetMother,
  updatePerson,
  deletePerson,
  createFather,
  paternalGrandMother,
  paternalGrandFather,
  maternalGrandFather,
  maternalGrandMother,
  GetFather,
  GetPGFather,
  GetPGMother,
  GetMGFather,
  GetMGMother,
};
