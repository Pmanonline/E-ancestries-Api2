// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // Local Government Schema
// const LocalGovernmentSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   Array: { type: [String], required: true },
//   origin: {
//     type: String,
//     required: true,
//   },
//   history: {
//     type: String,
//     required: true,
//   },
//   cultureTradition: [String],
// });

// // State Schema
// const StateSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   language: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   tribe: {
//     type: String,
//     required: true,
//   },
//   origin: {
//     type: String,
//     required: true,
//   },
//   history: {
//     type: String,
//     required: true,
//   },
//   cultures: [
//     {
//       writeUp: {
//         type: String,
//       },
//       list: [
//         {
//           type: String,
//           required: true,
//         },
//       ],
//     },
//   ],
//   kingship: [
//     {
//       writeUp: {
//         type: String,
//       },
//       list: [
//         {
//           type: String,
//           required: true,
//         },
//       ],
//     },
//   ],
//   foods: [
//     {
//       writeUp: {
//         type: String,
//       },
//       list: [
//         {
//           type: String,
//           required: true,
//         },
//       ],
//     },
//   ],
//   image: {
//     type: String,
//   },
//   localGovernments: [LocalGovernmentSchema],
// });

// // Add an index to the `name` field in the StateSchema
// StateSchema.index({ name: 1 });

// // Root Schema for the entire collection
// const RootSchema = new Schema({
//   states: [StateSchema],
// });

// // Models
// const LocalGovernment = mongoose.model(
//   "LocalGovernment",
//   LocalGovernmentSchema
// );
// const State = mongoose.model("State", StateSchema);
// const Root = mongoose.model("Root", RootSchema);

// module.exports = { LocalGovernment, State, Root };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Local Government Schema
const LocalGovernmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  origin: [
    {
      writeUp: {
        type: String,
        default: "", // Optional with default empty string
      },
      list: [
        {
          type: String,
        },
      ],
    },
  ],

  history: [
    {
      writeUp: {
        type: String,
        default: "", // Optional with default empty string
      },
      list: [
        {
          type: String,
        },
      ],
    },
  ],
  cultureTradition: [
    {
      writeUp: {
        type: String,
        default: "", // Optional with default empty string
      },
      list: [
        {
          type: String,
        },
      ],
    },
  ],
  kingship: [
    {
      writeUp: {
        type: String,
        default: "", // Optional with default empty string
      },
      list: [
        {
          type: String,
        },
      ],
    },
  ],
  Marriage: [
    {
      writeUp: {
        type: String,
        default: "", // Optional with default empty string
      },
      list: [
        {
          type: String,
        },
      ],
    },
  ],
  myth: [
    {
      writeUp: {
        type: String,
        default: "", // Optional with default empty string
      },
      list: [
        {
          type: String,
        },
      ],
    },
  ],
});

// State Schema
const StateSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  language: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  tribe: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },

  history: [
    {
      writeUp: {
        type: String,
        default: "",
      },
      list: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
  cultures: [
    {
      writeUp: {
        type: String,
        default: "",
      },
      list: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
  kingship: [
    {
      writeUp: {
        type: String,
        default: "", // Optional with default empty string
      },
      list: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
  foods: [
    {
      writeUp: {
        type: String,
        default: "", // Optional with default empty string
      },
      list: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
  localGovernmentsList: {
    // Changed `Array` to `areas` for better naming clarity
    type: [String],
    required: true,
  },
  image: {
    type: String, // Represents a URL for the image
    default: "", // Default empty string if no image is provided
  },
  localGovernments: {
    type: [LocalGovernmentSchema], // An array of local governments
    default: [], // Default to an empty array
  },
});

// Add an index to the `name` field in the StateSchema
StateSchema.index({ name: 1 });

// Root Schema for the entire collection
const RootSchema = new Schema({
  states: {
    type: [StateSchema], // An array of states
    default: [], // Default to an empty array
  },
});

// Models
const LocalGovernment = mongoose.model(
  "LocalGovernment",
  LocalGovernmentSchema
);
const State = mongoose.model("State", StateSchema);
const Root = mongoose.model("Root", RootSchema);

module.exports = { LocalGovernment, State, Root };
