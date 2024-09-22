const mongoose = require("mongoose");
const connectDB = require("./src/config/database");
const Religion = require("./src/models/religionShema");
const Tribe = require("./src/models/tribeShema");

const data = [
  {
    religionName: "Christianity",
    description:
      "Christianity is a monotheistic religion based on the life and teachings of Jesus Christ. It is the world's largest religion, with over 2.3 billion adherents. Christians believe in the Holy Trinity: God the Father, God the Son, and God the Holy Spirit.",
  },
  {
    religionName: "Islam",
    description:
      "Islam is a monotheistic religion founded by the Prophet Muhammad in the 7th century. It is the world's second-largest religion, with over 1.8 billion followers. Muslims believe in one God, Allah, and follow the teachings of the Quran.",
  },
  {
    religionName: "Hinduism",
    description:
      "Hinduism is the world's oldest religion, with roots and customs dating back over 4,000 years. It is the third-largest religion, with over 1.2 billion followers. Hinduism is a complex faith with a vast array of gods and goddesses, rituals, and beliefs.",
  },
  {
    religionName: "Buddhism",
    description:
      "Buddhism is a non-theistic religion or philosophy that focuses on the teachings of Siddhartha Gautama (Buddha). It is practiced by over 500 million people worldwide. Buddhism emphasizes the Four Noble Truths and the Eightfold Path as a means to achieve enlightenment and end suffering.",
  },
  {
    religionName: "Judaism",
    description:
      "Judaism is one of the oldest monotheistic religions, with a history spanning over 3,000 years. It is the religious, cultural, and legal tradition of the Jewish people. Judaism is based on the Torah, which is part of the larger text known as the Tanakh or Hebrew Bible.",
  },
  // TribesData
  {
    tribeName: "Igbo",
    description:
      "The Igbo ethnic group, found mainly in southeastern Nigeria, is distinguished by its rich cultural traditions and strong sense of community. The Igbo celebrate numerous festivals, including the New Yam Festival, and are known for their traditional masquerades and ceremonies. Predominantly Christian, the Igbo have a robust entrepreneurial spirit, with many successful businesses and a significant role in Nigeria's economic development. Their cultural and political influence is substantial, with a notable presence in various sectors such as education, commerce, and governance.",
  },
  {
    tribeName: "Yoruba",
    description:
      "The Yoruba people, native to southwestern Nigeria, are renowned for their dynamic cultural heritage and complex social structures. Their culture is marked by colorful festivals, such as the Osun-Osogbo and Eyo festivals, and traditional practices that include vibrant dances and masquerades. The Yoruba predominantly practice Christianity and traditional religions. They have a significant presence in Nigeria's political, economic, and educational sectors, contributing to various industries including agriculture, trade, and urban professions. Their historical influence is also reflected in their elaborate urban planning and communal life.",
  },
  {
    tribeName: "Hausa-Fulani",
    description:
      "The Hausa-Fulani, located predominantly in northern Nigeria, are one of the country's largest ethnic groups, comprising a significant portion of the population. They are known for their rich cultural traditions, including vibrant festivals, traditional music, and distinctive art forms. Islam is the predominant religion among the Hausa-Fulani, deeply influencing their customs and lifestyle. They are primarily engaged in agriculture, livestock rearing, and trading, and they play a crucial role in Nigeria's political landscape through their involvement in various levels of government and traditional leadership.",
  },
  {
    tribeName: "Ijaw",
    description:
      "The Ijaw people, indigenous to the Niger Delta region, are recognized for their deep connection to the waterways and their unique cultural practices. Their festivals, such as the Epie-Atisa Festival, highlight their traditional riverine customs. The Ijaw predominantly practice Christianity and traditional religions. They have become increasingly influential in Nigeria's political sphere, especially in advocating for the rights and development of the Niger Delta region. Their economy traditionally centers around fishing, agriculture, and more recently, the oil industry.",
  },
  {
    tribeName: "Kanuri",
    description:
      "The Kanuri, residing mainly in northeastern Nigeria, are known for their historic legacy from the ancient Kanem-Bornu Empire. Their culture is deeply influenced by Islam, and they celebrate various traditional ceremonies and festivals. The Kanuri are primarily involved in agriculture and pastoralism, reflecting their historical roots and adaptations to the region's environment. They maintain significant cultural and traditional leadership roles, with their historical influence extending into modern political and social spheres in northeastern Nigeria.",
  },
  {
    tribeName: "Other",
    description: " Other tribes details.",
  },
];

async function insertOrUpdateData() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    for (const item of data) {
      if (item.religionName) {
        const { religionName, description } = item;
        const existingItem = await Religion.findOne({ religionName });

        if (existingItem) {
          existingItem.description = description;
          await existingItem.save();
          console.log(`Updated Religion: ${religionName}`);
        } else {
          await Religion.create({ religionName, description });
          console.log(`Created Religion: ${religionName}`);
        }
      } else if (item.tribeName) {
        const { tribeName, description } = item;
        const existingItem = await Tribe.findOne({ tribeName });

        if (existingItem) {
          existingItem.description = description;
          await existingItem.save();
          console.log(`Updated Tribe: ${tribeName}`);
        } else {
          await Tribe.create({ tribeName, description });
          console.log(`Created Tribe: ${tribeName}`);
        }
      }
    }
  } catch (error) {
    console.error("Error inserting or updating data:", error);
  } finally {
    mongoose.connection.close();
  }
}

insertOrUpdateData();
