const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const connectDB = require("./src/config/database");
const Routes = require("./src/routes/route");
const FTroutes = require("./src/routes/FamilytreeRoute/FamilyTreeRoute");
const StateRoutes = require("./src/routes/stateRoutes");
const NameRoute = require("./src/routes/nameRoute");
const historicalRoutes = require("./src/routes/historicalRoutes");
const ConnectionRoute = require("./src/routes/connectionRoute");
const UserModel = require("./src/models/User.model");
const PersonModel = require("./src/models/personModel");
// const passportConfig = require("./src/config/passport");
const { authMiddleware, refreshMiddleware } = require("./src/middleware/auth");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();
// passportConfig(passport);

// Set up the HTTP server and Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://ancestries.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ancestries.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  // Add new user
  socket.on("addNewUser", (userId) => {
    const existingUserIndex = onlineUsers.findIndex(
      (user) => user.userId === userId
    );

    if (existingUserIndex === -1) {
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    } else {
      onlineUsers[existingUserIndex].socketId = socket.id;
    }

    console.log("onlineUsers =", onlineUsers);

    // Emit the updated online users list to all clients
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    console.log("Received sendMessage event:", message);

    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      console.log("User found, sending message and notification:", user);

      io.to(user.socketId).emit("getMessage", message);

      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    } else {
      console.log("User not found or not online:", message.recipientId);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    console.log("Updated onlineUsers =", onlineUsers);

    // Emit the updated online users list to all clients
    io.emit("getOnlineUsers", onlineUsers);
  });
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    },
  })
);

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ancestries.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    },
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/insertImage", express.static(path.join(__dirname, "insertImage")));

app.use("/api", Routes);
app.use("/api", StateRoutes);
app.use("/api", NameRoute);
app.use("/api", historicalRoutes);
app.use("/api", ConnectionRoute);
app.use("/api", authMiddleware, FTroutes);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
