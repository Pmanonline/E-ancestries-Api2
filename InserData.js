const mongoose = require("mongoose");
const connectDB = require("./src/config/database");
const { State } = require("./src/models/GeneologySchema"); // Update path if needed

const stateData = {
  states: [
    {
      name: "Adamawa State",
      language: "Fulfulde, Hausa",
      location: "northeast",
      tribe: "Fulani",
      origin: ` 
       <div class="biography-content">
        <p>Adamawa State is located in the northeastern part of Nigeria. It was created on August 27, 1991, from the former Gongola State. The state was named after Modibo Adama, a warrior and leader who founded the state.</p>
        <p>Adamawa is home to a diverse range of ethnic groups, with the Fulani being the dominant tribe. The state is known for its rich cultural heritage and is a melting pot of various cultures and traditions.</p>
        <p>The state has a predominantly agrarian economy, with agriculture being the mainstay. The people of Adamawa are known for their hospitality and rich traditions.</p>
      </div>
      `,
      history: [
        {
          writeUp: `<div className="biography-content">
The history of Adamawa State is deeply rooted in the Fulani jihad led by Modibo Adama in the early 19th century. The area was initially part of the Sokoto Caliphate but was later recognized as a separate emirate due to Adama's leadership. 
<div>`,
          list: [
            "<strong>Early History:</strong> The region was initially inhabited by various ethnic groups, including the Fali, Bata, and Higgi, who had their distinct cultural and social systems.",
            "<strong>Fulani Jihad:</strong> The Fulani jihad of the early 19th century, led by Modibo Adama, played a crucial role in shaping the region's history. The jihad established the Adamawa Emirate as part of the Sokoto Caliphate.",
            "<strong>Colonial Era:</strong> During British colonial rule, the region was administered as part of Northern Nigeria. The colonial period brought about significant changes in governance, education, and infrastructure.",
            "<strong>Post-Independence:</strong> After Nigeria gained independence in 1960, the region became part of the Northern Region. In 1976, it became part of Gongola State, and later in 1991, Adamawa State was created from Gongola State.",
            "<strong>Modern Developments:</strong> Since its creation, Adamawa State has continued to develop, focusing on agriculture, education, and infrastructure development. The state has also been a hub of cultural diversity and traditional practices.",
          ],
        },
      ],
      cultures: [
        {
          writeUp: `   <div class="biography-content">
              <p>
              Adamawa State, located in northeastern Nigeria, is a culturally diverse state with a rich heritage. The state is home to several ethnic groups, including the Fulani, Bata, Higgi, and others, each with its unique traditions and customs.
              </p> 
            </div>`,
          list: [
            "<strong>Language:</strong> The primary languages spoken in Adamawa State are Fulfulde and Hausa, with many residents also speaking their ethnic languages.",
            "<strong>Traditional Religion:</strong> Although Islam is the dominant religion in Adamawa State, many ethnic groups maintain traditional religious practices, particularly in rural areas.",
            "<strong>Traditional Attire:</strong> Traditional Fulani attire, including flowing robes and caps, is commonly worn, especially during cultural events.",
            "<strong>Music and Dance:</strong> Music and dance are integral parts of Adamawa's cultural identity, with traditional instruments like the 'kalangu' drum being popular.",
            "<strong>Cuisine:</strong> Adamawa cuisine includes dishes like 'Tuwo Shinkafa' (rice balls), 'Miyan Kuka' (baobab leaf soup), and 'Kilishi' (spicy dried meat).",
            "<strong>Cultural Festivals:</strong> The state hosts various cultural festivals, such as the Njuwa Fishing Festival and the Lamido's Durbar, which celebrate the region's heritage.",
            "<strong>Arts and Craftsmanship:</strong> Adamawa is known for its traditional arts and crafts, including pottery, weaving, and leatherwork.",
            "<strong>Traditional Marriage:</strong> Marriage ceremonies in Adamawa are often elaborate, involving multiple stages and the exchange of gifts.",
            "<strong>Family and Community Values:</strong> The people of Adamawa uphold traditional values, with a strong emphasis on respect for elders and communal living.",
            "<strong>Modern Influences:</strong> While modernity has influenced Adamawa State, traditional practices and cultural heritage remain strong.",
          ],
        },
      ],
      kingship: [
        {
          writeUp: `<div class="biography-content">
            
            <p>
            The traditional system of governance in Adamawa State is centered around the Lamido, the emir of the Adamawa Emirate. The Lamido plays a vital role in preserving the cultural heritage of the state and is a key figure in the community.
            </P>
<P>
The Lamido's role includes conflict resolution, overseeing traditional ceremonies, and serving as a cultural custodian.
</P>
            
            </div>`,

          list: [
            "<strong>Preserving Culture:</strong> The Lamido and other traditional rulers play a crucial role in preserving and promoting the cultural heritage of their communities.",
            "<strong>Conflict Resolution:</strong> The Lamido mediates disputes and conflicts within the community, using customary laws and traditions.",
            "<strong>Rituals and Ceremonies:</strong> The Lamido oversees important rituals and ceremonies, including the installation of traditional leaders and community festivals.",
            "<strong>Custodians of Tradition:</strong> Traditional rulers are responsible for maintaining and passing down oral history and traditions.",
            "<strong>Advisers and Leaders:</strong> Traditional rulers act as advisers to the community and are respected leaders.",
          ],
        },
      ],
      foods: [
        {
          writeUp:
            "  Adamawa State, located in northeastern Nigeria, is known for its rich and diverse cuisine, reflecting the cultural diversity of the state. The state's cuisine features a wide range of dishes that are enjoyed across the region.",
          list: [
            "<strong>Tuwo Shinkafa:</strong> A staple food made from rice flour, typically served with various soups.",
            "<strong>Miyan Kuka:</strong> A soup made from baobab leaves, commonly served with Tuwo Shinkafa.",
            "<strong>Kilishi:</strong> Spicy dried meat, similar to jerky, is a popular snack.",
            "<strong>Fura da Nono:</strong> A traditional drink made from fermented milk and millet.",
            "<strong>Waina:</strong> A rice cake dish that is often served with spicy sauces.",
            "<strong>Masa:</strong> A popular rice-based dish, often enjoyed with soup or stew.",
            "<strong>Pate:</strong> A traditional meal made from maize, vegetables, and sometimes meat, cooked in a pot.",
          ],
        },
      ],
      image: "AdamawaState.jpg",
      localGovernmentsList: [
        "Demsa",
        "Fufure",
        "Ganye",
        "Gayuk",
        "Gombi",
        "Grie",
        "Hong",
        "Jada",
        "Lamurde",
        "Madagali",
        "Maiha",
        "Mayo-Belwa",
        "Michika",
        "Mubi North",
        "Mubi South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
        "Yola North",
        "Yola South",
      ],
      localGovernments: [
        {
          name: "Yola",
          origin: {
            writeUp:
              "Yola, the capital city of Adamawa State in Nigeria, has a history rooted in the development and growth of the Adamawa Emirate. The origin and history of Yola are closely tied to the establishment of the emirate and the subsequent administrative and cultural developments in the region.",
            list: [
              "Adamawa Emirate: Yola is a key city within the historical Adamawa Emirate, which was established in the early 19th century. The Fulbe Jihad, led by Usman dan Fodio in the early 19th century, played a significant role in the establishment of various emirates, including the Adamawa Emirate.",
              "Modibo Adama and Yola: Modibo Adama, a Fulbe leader and a disciple of Usman dan Fodio, played a crucial role in the conquest and establishment of the Adamawa Emirate. Yola, being a strategic location, became a significant center within the emirate, contributing to its political and cultural prominence.",
              "Geographical Significance: Yola is situated on the banks of the Benue River and is known for its picturesque landscapes and proximity to natural resources. The geographical location of Yola has contributed to its historical importance as a trade and cultural hub.",
              "Colonial Era: Yola, like other parts of Nigeria, came under colonial rule during the late 19th and early 20th centuries. The British colonial administration had an impact on the political and administrative structures in Yola and the surrounding region.",
              "Integration into Nigeria: Yola and the Adamawa region became integrated into the modern state of Nigeria following independence in 1960. The city has since played a role in the political, economic, and social life of Adamawa State.",
              "Urban Development: Yola has undergone urban development and expansion over the years, with the establishment of institutions, government offices, and infrastructure.",
              "Cultural and Ethnic Diversity: Yola, like Adamawa State as a whole, is characterized by cultural and ethnic diversity. It is home to various ethnic groups, each contributing to the city's cultural richness.",
              "Economic Activities: Yola serves as an economic center for Adamawa State, with activities such as trade, agriculture, and commerce contributing to the city's economic vibrancy.",
            ],
          },
          history: {
            writeUp:
              "Yola, the capital city of Adamawa State in Nigeria, has a rich history that is closely tied to the establishment of the Adamawa Emirate and the broader historical context of the region.",
            list: [
              "Fulbe Jihad and Adamawa Emirate: In the early 19th century, the Fulbe Jihad (also known as the Fulani Jihad) led by Usman dan Fodio had a significant impact on the Adamawa region. Modibo Adama, a prominent Fulbe leader and disciple of Usman dan Fodio, played a crucial role in the establishment of the Adamawa Emirate. Yola became a key city within the emirate, serving as a political, cultural, and economic center.",
              "Modibo Adama's Role: Modibo Adama, who was appointed as the first Lamido (ruler) of the Adamawa Emirate, contributed to the organization and governance of the region. Yola, with its strategic location along the Benue River, became a hub for trade and administrative activities.",
              "Colonial Era: In the late 19th century, European colonial powers, including the Germans, exerted influence in the Adamawa region. Yola and the surrounding areas came under German control as part of German Kamerun (Cameroon) following the scramble for Africa.",
              "British Rule and Integration into Nigeria: After World War I, the League of Nations mandated the Adamawa region to the British and French. Yola and the Adamawa region were integrated into the modern state of Nigeria after gaining independence in 1960.",
              "Administrative Changes: Yola has undergone administrative changes over the years, reflecting the evolving political landscape of Nigeria. It has served as the capital of Adamawa State since the state's creation in 1991.",
              "Cultural Heritage: Yola is home to a diverse population representing various ethnic groups, including the Fulbe, Gbaya, Chamba, and others. The city's cultural heritage is reflected in its traditional architecture, local markets, and cultural festivals.",
              "Economic Activities: Yola is an economic center for Adamawa State, with economic activities such as trade, agriculture, and commerce contributing to the city's vibrancy.",
              "Educational and Institutional Development: Yola has seen the establishment of educational institutions, government offices, and other infrastructure over the years. The city has a growing urban character with schools, hospitals, and other amenities.",
              "Social and Religious Diversity: Yola is characterized by social and religious diversity, with residents practicing various religions, including Islam and Christianity. The city hosts religious institutions and places of worship representing different faiths.",
            ],
          },
          kingship: {
            writeUp:
              "Yola, as the capital city of Adamawa State in Nigeria, does not have a traditional kingship system in the same way some other areas do. Instead, the city and state are characterized by a combination of political and traditional leadership structures.",
            list: [
              "Political Leadership: Yola, like other cities in Nigeria, has political leaders at the state and local government levels. The Governor of Adamawa State is the highest political leader in the state, overseeing the administration, governance, and policy implementation. Local Government Chairmen and Councillors represent the political leadership at the local government level within Yola.",
              "Traditional Leadership: While Yola does not have a traditional king, it does have traditional leaders and institutions that play important roles in the cultural and social life of the community. The Lamido of Adamawa, who is the traditional ruler of the Adamawa Emirate, holds a significant position in the traditional leadership structure. The Lamido is a symbol of continuity with the historical Fulbe leadership established during the Fulbe Jihad.",
              "Lamido of Adamawa: The Lamido of Adamawa is the title given to the traditional ruler of the Adamawa Emirate. The Lamido is considered the custodian of the emirate's cultural heritage and traditions. The Lamido often plays a role in mediating conflicts, preserving cultural practices, and participating in community development.",
              "District Heads and Village Chiefs: The traditional leadership structure also includes district heads and village chiefs at the local level. District heads and village chiefs represent the traditional authority in specific geographic areas and communities within Yola.",
              "Religious and Community Leaders: Yola, being diverse in terms of religion and ethnicity, has religious leaders representing various faiths. Community leaders, elders, and influential individuals also contribute to leadership and decision-making within the city.",
            ],
          },
          food: {
            writeUp:
              "Yola, being the capital city of Adamawa State in Nigeria, is home to a diverse culinary landscape that reflects the cultural richness of the region. The cuisine in Yola features a blend of traditional northern Nigerian dishes, as well as local specialties unique to the Adamawa State.",
            list: [
              "Fura da Nono: Fura da Nono is a popular traditional northern Nigerian snack and beverage. It consists of millet balls (fura) served with a fermented milk drink called Nono.",
              "Tuwo Shinkafa: Tuwo Shinkafa is a staple dish made from cooked rice, which is then mashed and molded into a smooth, elastic dough-like consistency. It is often served with soups or stews.",
              "Masa: Masa is a type of rice cake or pancake made from fermented rice batter. It is usually deep-fried until golden brown and can be served with different sauces.",
              "Pate: Pate is a nutritious porridge made from groundnut (peanut) paste, millet, sorghum, or maize. It is often served as a breakfast dish.",
              "Nyama Choma: Nyama Choma is a grilled meat dish that is popular in various parts of Africa. In Yola, it might involve marinated and grilled beef or other meats.",
              "Brochettes: Brochettes are skewered and grilled meat, often served with spicy sauces. It's a common street food and popular at social gatherings.",
              "Dambu Nama: Dambu Nama is a type of spicy shredded and sun-dried meat, usually beef or goat meat. It is seasoned with spices and can be eaten as a snack or added to soups.",
              "Boli: Boli is a popular street food made by grilling ripe plantains until they develop a slightly charred exterior. It is often served with groundnut (peanut) sauce.",
              "Suya: Suya is skewered and grilled meat coated with a spicy peanut mixture. It's a popular street food enjoyed for its flavorful and smoky taste.",
              "Kilishi: Kilishi is a type of spicy beef jerky that is seasoned and sun-dried. It is a popular snack, especially during festive occasions.",
              "Gwote: Gwote is a traditional rice dish made with rice, spices, and sometimes meat or fish. It is a hearty and flavorful meal.",
              "Tinun-Tinun: Tinun-Tinun is a traditional dessert made from millet and groundnut. It is sweetened and often enjoyed as a snack.",
            ],
          },
          myth: {
            writeUp:
              " Myths play a significant role in the cultural and traditional fabric of societies, and Yola, being part of Adamawa State in Nigeria, likely has its share of myths and folklore. Myths often serve to explain natural phenomena, cultural practices, and historical events while conveying moral lessons. However, specific myths can vary among different ethnic groups within Yola. Here are some general categories of myths that might be present:",
            list: [
              "Creation Myths: Creation myths explain the origin of the world, humanity, and natural elements. These myths often involve supernatural beings or gods and may vary among different ethnic groups within Yola.",
              "Heroic Myths: Heroic myths recount the adventures and exploits of legendary heroes or cultural figures. These stories may celebrate bravery, intelligence, or other virtues and are often passed down through generations.",
              "Folktales: Folktales are narratives that convey moral lessons or cultural values. They may feature animals, supernatural beings, or human characters and are often used as a means of teaching important principles.",
              "Myths About Cultural Practices: Some myths may be associated with specific cultural practices, rituals, or customs within the communities of Yola. These myths can provide explanations for the origin or significance of certain traditions.",
              "Nature Myths: Nature myths explain natural phenomena, such as the creation of mountains, rivers, and other geographical features. They may involve deities or supernatural forces shaping the landscape.",
              "Ancestral Myths: Ancestral myths relate to the origin and significance of specific clans or lineages within the community. These myths often highlight the heroic deeds or unique qualities of ancestral figures.",
              "Myths about Spirits and Supernatural Beings: Myths about spirits, ghosts, or supernatural beings are common in many cultures. These myths may explain the presence of spirits in certain locations or their influence on human affairs.",
              "Cultural Heroes and Heroines: Myths may celebrate cultural heroes and heroines who are believed to have played crucial roles in the history or development of the community. These figures often embody certain virtues or qualities.",
              "Migration Myths: Migration myths explain the movement and settlement of specific ethnic groups within the region. They may describe the reasons for migration and the establishment of particular communities.",
              "Myths About Sacred Sites: Certain myths may be associated with sacred sites, shrines, or natural landmarks within Yola. These myths often highlight the spiritual significance of these places.",
            ],
          },

          Marriage: {
            writeUp:
              "The marriage procedure in Yola, as in many other Nigerian communities, involves a series of cultural, religious, and legal steps. The process is often influenced by the customs and traditions of the various ethnic groups in the region. Here is a general overview of the marriage procedure in Yola:",
            list: [
              "Introduction and Inquiry: The process typically begins with the interested man making inquiries about a woman he wishes to marry. This may involve informal discussions with the woman's family, friends, or community members.",
              "Family Consent: Once the man has expressed his intention to marry, it is customary for his family to approach the family of the prospective bride. The families may meet to discuss the proposal, and the consent of both families is sought.",
              "Traditional Engagement: If the families agree, a formal introduction and engagement ceremony may be arranged. This ceremony involves the exchange of gifts, including kola nuts, traditional drinks, and symbolic items. The groom's family may present gifts to the bride's family as a sign of respect and commitment.",
              "Dowry Negotiation: Dowry negotiations take place, and the groom may be required to provide a dowry or bride price. The dowry is often a symbolic gesture, and its significance varies among different ethnic groups. The dowry may include items such as livestock, clothing, jewelry, and other gifts.",
              "Religious Ceremony: If the families and individuals involved are adherents of a particular religion, a religious ceremony may take place. For Muslims, this could involve a Nikah ceremony, while Christians may have a church wedding. The religious ceremony formalizes the marriage in accordance with the beliefs of the couple.",
              "Legal Registration: To ensure the marriage is recognized legally, couples are often required to register their marriage with the appropriate government authorities. This may involve obtaining a marriage certificate from the marriage registry.",
              "Wedding Celebration: A wedding celebration or reception may be organized to commemorate the union. This is a joyous occasion where family and friends come together to celebrate the newlyweds. Festivities may include traditional dances, music, and feasting.",
              "Post-Wedding Customs: After the wedding, there may be additional customs and rituals depending on the cultural practices of the couple's ethnic group. These may include visits to extended family members, community acknowledgments, and other traditional ceremonies.",
            ],
          },
        },
      ],
    },
  ],
};

const upsertStateByName = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Loop through states to upsert each one
    for (const state of stateData.states) {
      const result = await State.updateOne(
        { name: state.name }, // Filter condition
        { $set: state }, // Data to update or insert
        { upsert: true } // Create if not exists
      );
      console.log("Upsert Result:", result);
    }
  } catch (error) {
    console.error("Error upserting state:", error);
  } finally {
    // Optionally, close the database connection
    mongoose.connection.close();
  }
};

upsertStateByName();
