// const { Root } = require("../models/GeneologySchema");
// const Religion = require("../models/religionShema");
// const Tribe = require("../models/tribeShema");

// // Get all states
// const getAllStates = async (req, res) => {
//   try {
//     const rootDocument = await Root.findOne();
//     if (!rootDocument) {
//       return res.status(404).json({ message: "No states found" });
//     }
//     res.status(200).json(rootDocument.states);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Get state by name
// const getStateByName = async (req, res) => {
//   try {
//     // Decode URL component to handle spaces and special characters
//     const stateName = decodeURIComponent(req.params.name.replace(/-/g, " "));

//     const rootDocument = await Root.findOne({ "states.name": stateName });

//     if (!rootDocument) {
//       return res
//         .status(404)
//         .json({ message: `State '${stateName}' not found` });
//     }

//     const state = rootDocument.states.find((state) => state.name === stateName);
//     if (!state) {
//       return res
//         .status(404)
//         .json({ message: `State '${stateName}' not found` });
//     }

//     res.status(200).json(state);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Get all religions
// const getReligion = async (req, res) => {
//   try {
//     const religions = await Religion.find();
//     const tribes = await Tribe.find(); // Ensure you have a Tribe model and data

//     res.json({ religions, tribes });
//   } catch (error) {
//     console.error("Error fetching religions and tribes:", error);
//     res.status(500).json({
//       message: "Error fetching religions and tribes",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   getAllStates,
//   getStateByName,
//   getReligion,
// };

const { State } = require("../models/GeneologySchema");
const Religion = require("../models/religionShema");
const Tribe = require("../models/tribeShema");

// Get all states
const getAllStates = async (req, res) => {
  try {
    const states = await State.find();
    if (!states || states.length === 0) {
      return res.status(404).json({ message: "No states found" });
    }
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get state by name
const getStateByName = async (req, res) => {
  try {
    // Decode URL component to handle spaces and special characters
    const stateName = decodeURIComponent(req.params.name.replace(/-/g, " "));

    const state = await State.findOne({ name: stateName });

    if (!state) {
      return res
        .status(404)
        .json({ message: `State '${stateName}' not found` });
    }

    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all religions
const getReligion = async (req, res) => {
  try {
    const religions = await Religion.find();
    const tribes = await Tribe.find(); // Ensure you have a Tribe model and data

    res.json({ religions, tribes });
  } catch (error) {
    console.error("Error fetching religions and tribes:", error);
    res.status(500).json({
      message: "Error fetching religions and tribes",
      error: error.message,
    });
  }
};

module.exports = {
  getAllStates,
  getStateByName,
  getReligion,
};
