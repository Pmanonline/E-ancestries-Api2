const Historical = require("../models/historicalModel");

// Fetch all historical figures
const getAllHistoricalPeople = async (req, res) => {
  try {
    const historicalPeople = await Historical.find();
    res.status(200).json(historicalPeople);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch historical people",
      error: error.message,
    });
  }
};

// Fetch a specific historical figure by ID
const getHistoricalPersonById = async (req, res) => {
  try {
    const historicalPerson = await Historical.findById(req.params.id);
    if (!historicalPerson) {
      return res.status(404).json({ message: "Historical person not found" });
    }
    res.status(200).json(historicalPerson);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch historical person",
      error: error.message,
    });
  }
};

module.exports = {
  getAllHistoricalPeople,
  getHistoricalPersonById,
};
