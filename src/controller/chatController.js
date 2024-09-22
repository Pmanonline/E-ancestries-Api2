const mongoose = require("mongoose");
const Conversation = require("../models/conversationModel.js");
const chatModel = require("../models/chatModel.js");
const UserModel = require("../models/User.model.js");
const MessageModel = require("../models/messageModel.js");

const markAsRead = async (req, res) => {
  try {
    const { receiverId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ error: "Invalid receiver ID" });
    }

    // Find unread messages for this receiver and mark them as read
    const result = await Message.updateMany(
      { receiverId, isRead: false },
      { $set: { isRead: true } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "No unread messages found to update" });
    }

    res.status(200).json({ message: "Messages marked as read successfully" });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error finding a user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllUser = async (req, res) => {
  try {
    const Users = await UserModel.find();
    if (Users) {
      res.status(200).json(Users);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error finding a user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({
      members: [firstId, secondId],
    });

    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error creating a chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error finding user chats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.error("Error finding chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  try {
    const message = new MessageModel({
      chatId,
      senderId,
      text,
    });

    // Save the message and wait for the operation to complete
    const savedMessage = await message.save();

    // Respond with the saved message
    res.status(200).json(savedMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await MessageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  markAsRead,
  findUser,
  getAllUser,
  createChat,
  findUserChats,
  findChat,
  createMessage,
  getMessages,
};

// // Sender route to send a message
// app.post("/api/sendMessage", async (req, res) => {
//   try {
//     const { message, senderId, receiverId } = req.body;

//     // Validate senderId and receiverId
//     if (
//       !mongoose.Types.ObjectId.isValid(senderId) ||
//       !mongoose.Types.ObjectId.isValid(receiverId)
//     ) {
//       return res.status(400).json({ error: "Invalid sender or receiver ID" });
//     }

//     // Ensure the message field is present and not empty
//     if (!message || typeof message !== "string") {
//       return res.status(400).json({ error: "Message content is required" });
//     }

//     // Find or create a conversation between the sender and receiver
//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     // Create the new message
//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message, // This should match the field in your schema
//     });

//     if (newMessage) {
//       conversation.messages.push(newMessage._id);
//     }

//     await Promise.all([conversation.save(), newMessage.save()]);

//     // SOCKET IO FUNCTIONALITY
//     const receiverSocketId = userSocketMap.get(receiverId);
//     if (receiverSocketId) {
//       // Emit the new message event to the specific receiver
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     // Respond with the new message
//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Receiver route to get messages
// app.get("/api/getMessages/:receiverId", async (req, res) => {
//   try {
//     const { receiverId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(receiverId)) {
//       return res.status(400).json({ error: "Invalid receiver ID" });
//     }

//     const conversation = await Conversation.findOne({
//       participants: receiverId,
//     }).populate("messages");

//     if (!conversation) return res.status(200).json([]);

//     res.status(200).json(conversation.messages);
//   } catch (error) {
//     console.error("Error in getMessages controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
