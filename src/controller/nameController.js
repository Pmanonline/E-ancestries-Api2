const Name = require("../models/NamesModel");
const personModel = require("../models/personModel");

// Get all names
const getAllNames = async (req, res) => {
  try {
    const names = await Name.find();
    if (names.length === 0) {
      return res.status(404).json({ message: "No names found" });
    }
    res.status(200).json(names);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getNameByValue = async (req, res) => {
  try {
    // Decode URL component to handle spaces and special characters
    const name = decodeURIComponent(req.params.name.replace(/-/g, " "));

    const specificName = await Name.findOne({ name });

    if (!specificName) {
      return res.status(404).json({ message: `Name '${name}' not found` });
    }

    res.status(200).json(specificName);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUsereByQuery = async (req, res) => {
  const { firstName, lastName, placesLived, dob } = req.query;

  try {
    const query = {};
    if (firstName) query.firstName = new RegExp(firstName, "i");
    if (lastName) query.lastName = new RegExp(lastName, "i");

    // Query placesLived as a string
    if (placesLived) query.placesLived = new RegExp(placesLived, "i");

    if (dob) query.DOB = new Date(dob);

    console.log("Constructed query:", query);

    const users = await personModel.find(query).limit(1000); // Limit results

    console.log("Database query result:", users);

    res.json(users);
  } catch (error) {
    console.error("Search Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while searching for users." });
  }
};

const getNameByQuery = async (req, res) => {
  try {
    const query = req.query.query; // Assuming the query parameter is passed as `query`

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Replace this with the actual logic to fetch names related to the query
    const names = await Name.find({
      name: { $regex: new RegExp(query, "i") },
    });

    res.status(200).json({ names });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while searching.",
      details: error.message,
    });
  }
};

module.exports = {
  getAllNames,
  getNameByValue,
  getNameByQuery,
  getUsereByQuery,
};
