const nodemailer = require("nodemailer");
const Visit = require("../models/RecordVisitModal");
const Person = require("../models/personModel");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Invitation = require("../models/invitationModel");
const User = require("../models/User.model");
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      // Do not fail on invalid certificates
      rejectUnauthorized: false,
    },
  });
};

const registerMail = async (req, res) => {
  const { email, firstName } = req.body;

  try {
    const transporter = createTransporter();

    // Verify SMTP connection configuration
    await transporter.verify();

    const mailOptions = {
      from: process.env.EMAIL_USER || "petersonzoconis@gmail.com",
      to: email,
      subject: "Signup Successful 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to E-ancestry! 🎉</h2>
          <p>Hello ${firstName || email},</p>
          <p>We're thrilled to have you join our platform. Here's what you can do next:</p>
          <ul>
            <li>Complete your profile</li>
            <li>Explore your family tree</li>
            <li>Connect with relatives</li>
            <li>Discover your heritage</li>
          </ul>
          <p>If you need any assistance, our support team is here to help!</p>
          <p>Best regards,<br>The E-ancestry Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    res.status(200).json({
      success: true,
      message: "Welcome email sent successfully!",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Email service error:", {
      message: error.message,
      code: error.code,
      command: error.command,
    });

    res.status(500).json({
      success: false,
      error: "Failed to send welcome email",
      details: error.message,
    });
  }
};

// Helper function to send any email
const sendEmail = async ({ to, subject, html, text }) => {
  const transporter = createTransporter();

  try {
    await transporter.verify();

    const mailOptions = {
      from: process.env.EMAIL_USER || "petersonzoconis@gmail.com",
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

const sendInviteEmail = async (req, res) => {
  const { recipient, name, relationshipType } = req.body;
  const senderId = req.user._id;
  const senderName = req.user.firstName;

  if (!recipient || !relationshipType) {
    return res
      .status(400)
      .json({ error: "Recipient email and relationship type are required" });
  }

  const token = generateToken();

  try {
    // Save invitation with the token, sender information, and expiration date
    const invitation = await Invitation.create({
      recipient,
      token,
      sender: senderId,
      senderName,
      relationshipType,
      expiresAt: new Date(+new Date() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });

    console.log("Sending invite to:", recipient);

    const invitationLink = `${process.env.FRONTEND_URL}/accept-invite?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: "You're Invited to Join E-Ancestry! 🌳",
      text: `Hello ${name},

You have been invited to join E-Ancestry by ${senderName}, who considers you their ${relationshipType}.

Explore your family history, connect with relatives, and build your family tree today!

Click the link below to accept the invitation:

${invitationLink}

We're excited to have you onboard!

Best regards,
The E-Ancestry Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Invitation email sent successfully!");

    res.status(200).json({
      message: "Invitation email sent successfully!",
      invitationId: invitation._id,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the invitation email." });
  }
};

const acceptInvite = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Find the invitation using the token
    const invitation = await Invitation.findOne({ token });

    if (!invitation || invitation.accepted) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await newUser.save();

    // Mark the invitation as accepted and link it to the new user
    invitation.accepted = true;
    invitation.invitee = newUser._id; // Optionally store the invitee ID
    await invitation.save();

    // Generate JWT tokens for authentication
    const newToken = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const refreshToken = jwt.sign(
      { _id: newUser._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    // Attach refreshToken to the user and save it
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // Set the refreshToken in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    // Respond with tokens and user info
    res.status(201).json({
      token: newToken,
      refreshToken,
      user: {
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      message: "Account created successfully.",
    });
  } catch (error) {
    console.error("Error during invitation acceptance:", error);

    // Handle specific errors
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res
      .status(500)
      .json({ message: "An error occurred while accepting the invitation." });
  }
};

const getInvitationDetails = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    // Find the invitation based on the token
    const invitation = await Invitation.findOne({ token });

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    // Check if the invitation has been accepted
    if (invitation.accepted) {
      return res
        .status(400)
        .json({ message: "Invitation has already been accepted" });
    }

    // Respond with the inviter's details
    res.status(200).json({
      senderName: invitation.senderName,
      relationshipType: invitation.relationshipType,
    });
  } catch (error) {
    console.error("Error fetching invitation details:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching invitation details" });
  }
};

// const getUsersInvites = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Fetch all non-expired invites where the user is the sender and populate the invitee details
//     const invites = await Invitation.find({
//       sender: userId,
//     })
//       .populate({
//         path: "invitee",
//         select: "firstName lastName image email",
//       })
//       .select(
//         "recipient token senderName relationshipType createdAt invitee expiresAt"
//       );

//     if (invites.length === 0) {
//       return res.status(404).json({ message: "No active invitations found." });
//     }

//     res.status(200).json(invites);
//   } catch (error) {
//     console.error("Error fetching invites:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching invites." });
//   }
// };
const getUsersInvites = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all invites where the user is the sender, including accepted ones
    const invites = await Invitation.find({
      sender: userId,
      // Remove the expiration check if you want to include all invitations
      // expiresAt: { $gt: new Date() },
    })
      .populate({
        path: "invitee",
        select: "firstName lastName image email",
      })
      .select(
        "recipient token senderName relationshipType createdAt invitee expiresAt accepted acceptedAt"
      );

    if (invites.length === 0) {
      return res.status(404).json({ message: "No invitations found." });
    }

    res.status(200).json(invites);
  } catch (error) {
    console.error("Error fetching invites:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching invites." });
  }
};
const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies; // Retrieve refresh token from cookies

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await UserModel.findById(decoded._id);

    // Check if the refresh token is valid and matches the one stored
    const isValidRefreshToken = user.refreshTokens.some(
      (tokenObj) => tokenObj.token === refreshToken
    );

    if (!isValidRefreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate new access token
    const newAccessToken = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    // Optionally, you can also generate a new refresh token and update it in the DB
    const newRefreshToken = jwt.sign({ _id: user._id }, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    UserModel.refreshToken = newRefreshToken;
    await user.save();

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: "Token refresh failed" });
  }
};

const recordVisit = async (req, res) => {
  const { visitorId, visitedId } = req.body;

  if (visitorId === visitedId) {
    return res.status(200).json({ message: "Visit to self not recorded" });
  }

  try {
    const existingVisit = await Visit.findOne({
      visitor: visitorId,
      visited: visitedId,
    });

    if (existingVisit) {
      existingVisit.visitedAt = new Date();
      await existingVisit.save();

      const populatedVisit = await Visit.findById(existingVisit._id)
        .populate({ path: "visitor", select: "email firstName lastName image" })
        .populate({
          path: "visited",
          select: "email firstName lastName image",
        });

      // Log the populated visit for debugging
      console.log("Updated Visit:", populatedVisit);

      res.status(200).json(populatedVisit);
    } else {
      const visit = new Visit({
        visitor: visitorId,
        visited: visitedId,
        visitedAt: new Date(),
      });

      await visit.save();

      const populatedVisit = await Visit.findById(visit._id)
        .populate({ path: "visitor", select: "email firstName lastName image" })
        .populate({
          path: "visited",
          select: "email firstName lastName image",
        });

      console.log("Created Visit:", populatedVisit);

      res.status(201).json(populatedVisit);
    }
  } catch (error) {
    console.error("Error recording visit:", error);
    res.status(500).json({ message: "Failed to record visit" });
  }
};
const fetchVisits = async (req, res) => {
  const { visitorId, visitedId } = req.query; // Assuming you pass query parameters

  try {
    // Build query based on provided parameters
    const query = {};
    if (visitorId) query.visitor = visitorId;
    if (visitedId) query.visited = visitedId;

    // Fetch visit records
    const visits = await Visit.find(query)
      .populate({ path: "visitor", select: "email firstName lastName image" })
      .populate({
        path: "visited",
        select: "email firstName lastName image",
      });

    res.status(200).json(visits);
  } catch (error) {
    console.error("Error fetching visits:", error);
    res.status(500).json({ message: "Failed to fetch visits" });
  }
};

module.exports = {
  registerMail,
  sendInviteEmail,
  acceptInvite,
  recordVisit,
  fetchVisits,
  refreshToken,
  getInvitationDetails,
  getUsersInvites,
};
