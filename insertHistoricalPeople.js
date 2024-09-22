const mongoose = require("mongoose");
const connectDB = require("./src/config/database");
const Historical = require("./src/models/historicalModel");

// Example data to upsert

const historicalData = {
  name: "Ahmadu Bello",
  biography: `
    <div class="biography-content">
      <p><strong>Alhaji Sir Ahmadu Bello (1910–1966)</strong> was a distinguished Nigerian statesman and the first Premier of Northern Nigeria. Born in Rabah, Sokoto Province, Ahmadu Bello’s early education at the Sokoto Provincial School and Katsina College laid the foundation for his leadership and political career.</p>

      <p>Ahmadu Bello played a pivotal role in Nigerian politics as a founding member of the Northern People’s Congress (NPC). His leadership in the NPC and his position as Premier of Northern Nigeria from 1954 to 1966 were marked by significant efforts to modernize the northern region of Nigeria. His administration focused on educational reforms, agricultural development, and infrastructure projects aimed at improving the living conditions of the people.</p>

      <p>In addition to his political career, Ahmadu Bello held the traditional title of Sardauna of Sokoto, which granted him considerable influence in both political and traditional spheres. His dual role as a politician and traditional leader helped shape the socio-political landscape of Northern Nigeria.</p>

      <p>Ahmadu Bello’s tenure was tragically cut short when he was assassinated during a military coup in January 1966. His death was a significant event in Nigerian history, and he is remembered as a martyr who dedicated his life to the unity and development of Nigeria.</p>

      <p>Posthumously, Ahmadu Bello has been honored for his contributions to Nigerian politics and development. His legacy continues to influence Nigerian political and cultural life, and he is celebrated for his commitment to progress and social development.</p>

      <p>Ahmadu Bello was married and had several children, and his family remains influential in Nigerian society. As a prominent Muslim leader, he played a crucial role in integrating traditional and modern practices in Northern Nigeria.</p>
    </div>
  `,
  sector: "Politics",
  stateOfOrigin: "Sokoto State",
  tribe: "Fulani",
  born: "June 12, 1910",
  died: "January 15, 1966",
  title: "Premier of Northern Nigeria, Sardauna of Sokoto",
  achievements: [
    {
      writeUp: "Here are some notable achievements of Ahmadu Bello",
      list: [
        "Founder of the Northern People’s Congress (NPC): Played a key role in forming the NPC, which became a dominant political party in Northern Nigeria.",
        "First Premier of Northern Nigeria: Served as Premier from 1954 to 1966, focusing on modernization and development in the northern region.",
        "Educational and Agricultural Reforms: Implemented policies aimed at improving education and agriculture in Northern Nigeria.",
        "Infrastructure Development: Promoted infrastructure projects to enhance connectivity and development in Northern Nigeria.",
        "Assassination and Legacy: Remembered as a martyr for his dedication to Nigeria’s unity and development, with posthumous recognition for his contributions.",
        "Traditional Leadership: Held the title of Sardauna of Sokoto, integrating traditional leadership with political influence.",
      ],
    },
  ],
  image: "AhmaduBello.jpg",
};

const upsertData = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Find if the document exists by name
    let historicalDocument = await Historical.findOne({
      name: historicalData.name,
    });

    if (!historicalDocument) {
      // Create a new document if none exists
      const newDocument = new Historical(historicalData);
      await newDocument.save();
      console.log("New historical document created successfully.");
    } else {
      // Update existing document fields
      historicalDocument.biography = historicalData.biography;
      historicalDocument.sector = historicalData.sector;
      historicalDocument.image = historicalData.image;
      historicalDocument.achievements = historicalData.achievements;
      historicalDocument.deseasedTime = historicalData.deseasedTime;
      historicalDocument.stateOfOrigin = historicalData.stateOfOrigin;
      historicalDocument.tribe = historicalData.tribe;
      historicalDocument.born = historicalData.born;
      historicalDocument.died = historicalData.died;
      historicalDocument.title = historicalData.title;

      // Save the updated document
      await historicalDocument.save();
      console.log("Historical document updated successfully.");
    }
  } catch (error) {
    console.error("Error inserting or updating data:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Call the function to upsert data
upsertData();
