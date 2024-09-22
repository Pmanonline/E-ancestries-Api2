const express = require("express");
const router = express.Router();
const {
  getAllHistoricalPeople,
  getHistoricalPersonById,
} = require("../controller/historyController");

// Route to fetch all historical people
router.get("/AllhistoricalPeople", getAllHistoricalPeople);

// Route to fetch a historical person by ID
router.get("/historicalPeople/:userId", getHistoricalPersonById);

module.exports = router;
