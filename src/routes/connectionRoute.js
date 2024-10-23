const express = require("express");
const router = express.Router();
const {
  sendConnectionRequest,
  getPendingRequests,
  respondToConnectionRequest,
  getConnections,
  deleteConnection,
} = require("../controller/connectionController");

// Routes
router.post("/send", sendConnectionRequest);
router.get("/pending/:userId", getPendingRequests);
// Use the request ID to respond to a connection request
router.post("/confirm/:requestId/response", respondToConnectionRequest);
router.get("/connections/:userId", getConnections);
router.delete("/deleteConnection/:connectionId", deleteConnection);

module.exports = router;
