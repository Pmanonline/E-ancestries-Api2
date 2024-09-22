const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Import controller functions
const {
  getAllNames,
  getNameByValue,
  getNameByQuery,
  getUsereByQuery,
} = require("../controller/nameController");

// Define routes
router.route("/names").get(getAllNames);
router.route("/names/:name").get(getNameByValue);
router.route("/searchUser").get(getNameByQuery);
router.route("/search").get(getUsereByQuery);

module.exports = router;
