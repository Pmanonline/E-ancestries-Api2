const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user based on the token's decoded payload
    let user;
    if (decoded._id) {
      user = await UserModel.findById(decoded._id).select("-password");
    } else if (decoded.googleId) {
      user = await UserModel.findOne({ googleId: decoded.googleId }).select(
        "-password"
      );
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, authorization denied" });
    }

    // Add user data to the request object
    req.user = user;

    // console.log("Logged in user:", user);
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware to verify refresh token and issue a new access token
const refreshMiddleware = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  // console.log("Refresh token:", refreshToken);

  if (!refreshToken) {
    console.log("No refresh token provided");
    return res.status(403).json({ message: "Refresh token not found" });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    // console.log("Decoded refresh token:", decoded);

    const user = await UserModel.findById(decoded._id);

    if (!user || user.refreshToken !== refreshToken) {
      // console.log("Invalid refresh token");
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
    });

    req.user = user;
    next();
  } catch (error) {
    // console.error("Refresh token verification failed:", error.message);
    res.status(403).json({ message: "Refresh token is not valid" });
  }
};

module.exports = { authMiddleware, refreshMiddleware };
