// Map to keep track of userId to socketId mapping
const userSocketMap = new Map();

// Server-side code
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined room ${conversationId}`);
  });

  socket.on("sendMessage", (message) => {
    console.log("Message received on server:", message);
    const { conversationId } = message;
    io.to(conversationId).emit("newMessage", message); // Ensure this emits to the correct room
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Helper function to get receiver socket ID
const getReceiverSocketId = (receiverId) => {
  return userSocketMap.get(receiverId);
};
