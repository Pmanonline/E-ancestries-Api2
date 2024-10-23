const ConnectionRequest = require("../models/connectionRequest");
const Connection = require("../models/connections");

const sendConnectionRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Check if the users are already connected or if a request already exists
    const existingRequest = await ConnectionRequest.findOne({
      senderId,
      receiverId,
    });
    const existingConnection = await Connection.findOne({
      $or: [
        { userId1: senderId, userId2: receiverId },
        { userId1: receiverId, userId2: senderId },
      ],
    });

    if (existingRequest || existingConnection) {
      return res.status(400).json({
        message: "Request already sent or users are already connected.",
      });
    }

    const newRequest = new ConnectionRequest({
      senderId,
      receiverId,
      status: "Pending",
    });

    await newRequest.save();
    res.status(201).json({ message: "Connection request sent." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from URL parameters

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const requests = await ConnectionRequest.find({
      receiverId: userId,
      status: "Pending",
    }).populate("senderId", "firstName lastName image");

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const respondToConnectionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { response } = req.body; // Expected to be "Accepted" or "Rejected"

    // Validate the response value
    if (!["Accepted", "Rejected"].includes(response)) {
      return res.status(400).json({ message: "Invalid response value." });
    }

    // Find the connection request by ID
    const connectionRequest = await ConnectionRequest.findById(requestId);

    // Check if the request exists and is still pending
    if (!connectionRequest || connectionRequest.status !== "Pending") {
      return res.status(400).json({ message: "Invalid or expired request." });
    }

    // Handle the response
    if (response === "Accepted") {
      // Create a new connection if the request is accepted
      const newConnection = new Connection({
        userId1: connectionRequest.senderId,
        userId2: connectionRequest.receiverId,
      });
      await newConnection.save();

      // Update the connection request status
      connectionRequest.status = "Accepted";
      await connectionRequest.save();
    } else {
      // If rejected, remove the connection request from the database
      await ConnectionRequest.findByIdAndDelete(requestId);
    }

    // Return a success message
    res.status(200).json({
      message: `Request ${response.toLowerCase()}.`,
      status: response,
    });
  } catch (error) {
    console.error("Error responding to connection request:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getConnections = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from URL parameters

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find all connections where the user is involved
    const connections = await Connection.find({
      $or: [{ userId1: userId }, { userId2: userId }],
    })
      .populate("userId1", "firstName lastName image gender")
      .populate("userId2", "firstName lastName image gender");

    res.status(200).json(connections);
  } catch (error) {
    console.error("Error fetching connections:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
const deleteConnection = async (req, res) => {
  try {
    const { connectionId } = req.params;

    // Delete the connection
    const deletedConnection = await Connection.findByIdAndDelete(connectionId);

    if (!deletedConnection) {
      return res.status(404).json({ message: "Connection not found." });
    }

    // Remove related connection requests
    await ConnectionRequest.deleteMany({
      $or: [
        {
          senderId: deletedConnection.userId1,
          receiverId: deletedConnection.userId2,
        },
        {
          senderId: deletedConnection.userId2,
          receiverId: deletedConnection.userId1,
        },
      ],
    });

    // Fetch updated connections list
    const updatedConnections = await Connection.find({
      $or: [
        { userId1: deletedConnection.userId1 },
        { userId2: deletedConnection.userId1 },
      ],
    })
      .populate("userId1", "firstName lastName image gender")
      .populate("userId2", "firstName lastName image gender");

    res.status(200).json({
      message: "Connection deleted successfully.",
      connections: updatedConnections,
    });
  } catch (error) {
    console.error("Error deleting connection:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  sendConnectionRequest,
  getPendingRequests,
  respondToConnectionRequest,
  getConnections,
  deleteConnection,
};
