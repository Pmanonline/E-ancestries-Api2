const mongoose = require("mongoose");
const connectDB = require("./src/config/database");
const Name = require("./src/models/NamesModel"); // Ensure this path is correct

// Example data to upsert
const nameData = {
  name: "funke",
  meaning:
    "  funke is an onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Name bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam  bionvallis. Sed ut vulputate nisi. Integer in felis sed leo  vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam  bionvallis. Sed ut vulputate nisi. Integer in felis sed leo       vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut lputate nisi. Integer in felis sed leo  vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Name",
  background:
    "  funke is an onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Name bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam  bionvallis. Sed ut vulputate nisi. Integer in felis sed leo  vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam  bionvallis. Sed ut vulputate nisi. Integer in felis sed leo       vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut lputate nisi. Integer in felis sed leo  vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam",
  tribeDescribe:
    "funke is an onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Name bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam  bionvallis. Sed ut vulputate nisi. Integer in felis sed leo  vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam  bionvallis. Sed ut vulputate nisi. Integer in felis sed leo       vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut lputate nisi. Integer in felis sed leo  vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam",
  states: [
    {
      stateName: "Ondo State",
      tribes: [
        {
          tribeName: "Ilaje",
          description:
            "onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bi",
        },
        {
          tribeName: "Akoko",
          description:
            "onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bi",
        },
      ],
    },
    {
      stateName: "Ogun State",
      tribes: [
        {
          tribeName: "Ijebu",
          description:
            "onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bi",
        },
        {
          tribeName: "Ijesha",
          description:
            "onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bi",
        },
      ],
    },
  ],
  extensions: [
    {
      extensionName: "AYO-MIDE:",
      description:
        "onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bi",
    },
    {
      extensionName: "AYO-MOPO:",
      description:
        "onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bi",
    },
    {
      extensionName: "AYO-BAMI:",
      description:
        "onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bi",
    },
    {
      extensionName: "AYO-BAMIKALE:",
      description:
        "onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur onvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor quis eros tempus lacinia. Nam bi",
    },
  ],
  image: "image-url",
};

const upsertData = async () => {
  try {
    await connectDB();

    const nameDocument = await Name.findOne({ name: nameData.name });
    if (!nameDocument) {
      // If there is no document with the given name, create a new one
      const newName = new Name(nameData);
      await newName.save();
    } else {
      // If the document exists, update it
      nameDocument.meaning = nameData.meaning;
      nameDocument.background = nameData.background;
      nameDocument.image = nameData.image;

      // Update the states array
      for (const state of nameData.states) {
        const stateIndex = nameDocument.states.findIndex(
          (s) => s.stateName === state.stateName
        );
        if (stateIndex === -1) {
          // If state does not exist, push new state
          nameDocument.states.push(state);
        } else {
          // If state exists, update the existing state
          nameDocument.states[stateIndex] = state;
        }
      }

      // Update the extensions array
      nameDocument.extensions = nameData.extensions;

      await nameDocument.save();
    }

    console.log("Data inserted or updated successfully");
  } catch (error) {
    console.error("Error inserting or updating data:", error);
  } finally {
    mongoose.connection.close();
  }
};

upsertData();
