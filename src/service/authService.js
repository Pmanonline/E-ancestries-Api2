const jwt = require("jsonwebtoken");

// Use environment variable or fallback to a default secret
const JWT_SECRET = process.env.JWT_SECRET || "Qwe123123";

// Generate Access Token with short expiry
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "15m" } // Short-lived token
  );
};

// Generate Refresh Token with longer expiry
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id }, // Refresh token usually doesn't need email
    JWT_SECRET,
    { expiresIn: "7d" } // Long-lived token
  );
};

// Generate both tokens together
const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
};

module.exports = { generateAccessToken, generateRefreshToken, generateTokens };
