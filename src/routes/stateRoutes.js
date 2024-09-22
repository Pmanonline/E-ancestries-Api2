const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const app = express();

const {
  getAllStates,
  getStateByName,
  getReligion,
} = require("../controller/StateController");

router.route("/states").get(getAllStates);
router.route("/getReligion").get(getReligion);
router.route("/states/:name").get(getStateByName);

module.exports = router;
