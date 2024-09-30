const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const app = express();

const {
  createOrUpdateProfile,
  getProfile,
  AllProfiles,
  getAllUsers,
  deleteFamilyImage,
  getuserByQuery,
} = require("../../controller/authController");
const {
  createPerson,
  createMother,
  GetMother,
  createFather,
  paternalGrandMother,
  paternalGrandFather,
  maternalGrandFather,
  maternalGrandMother,
  Getperson,
  updatePerson,
  deletePerson,
  GetFather,
  GetPGFather,
  GetPGMother,
  GetMGFather,
  GetMGMother,
} = require("../../controller/FamilyTreeController");
const {
  maternalGrtGrandFather,
  maternalGrtGrandMother,
  paternalGrtGrandMother,
  paternalGrtGrandFather,
  get_MGrtGrandFather,
  get_MGrtGrandMother,
  get_PGrtGrandMother,
  get_PGrtGrandFather,
} = require("../../controller/FamilyTreeController2");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    console.log("Saving file with name:", file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer for handling multiple files
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const checkFileType = function (file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  // Check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  // Check mime type
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      res.status(200).json({ imageUrl });
    } else {
      res.status(400).json({ error: "No file uploaded" });
    }
  } catch (err) {
    console.error("Error during file upload:", err.message);
    res.status(500).json({ error: "File upload failed" });
  }
});

// creeateRoutes
router.route("/createPerson").post(upload.single("image"), createPerson);
router.route("/createMother").post(upload.single("image"), createMother);
router.route("/createFather").post(upload.single("image"), createFather);
router
  .route("/paternalGrandFather")
  .post(upload.single("image"), paternalGrandFather);
router
  .route("/paternalGrandMother")
  .post(upload.single("image"), paternalGrandMother);
router
  .route("/maternalGrandFather")
  .post(upload.single("image"), maternalGrandFather);
router
  .route("/maternalGrandMother")
  .post(upload.single("image"), maternalGrandMother);
//  extra..........................................................................
router
  .route("/maternalGrtGrandFather")
  .post(upload.single("image"), maternalGrtGrandFather);
router
  .route("/maternalGrtGrandMother")
  .post(upload.single("image"), maternalGrtGrandMother);
router
  .route("/paternalGrtGrandMother")
  .post(upload.single("image"), paternalGrtGrandMother);
router
  .route("/paternalGrtGrandFather")
  .post(upload.single("image"), paternalGrtGrandFather);

router.route("/profile").post(
  upload.fields([
    { name: "image", maxCount: 1 }, // Main profile image
    { name: "images", maxCount: 10 }, // Additional images (up to 5)
  ]),
  createOrUpdateProfile
);

router.route("/updatePerson/:id").put(upload.single("image"), updatePerson);
// deleteRoute
router.route("/deletePerson/:id").delete(deletePerson);

// getRoutes
router.route("/getProfile/:userId").get(getProfile);
router.route("/getAllProfiles").get(AllProfiles);
router.route("/family-image/:imageIndex").delete(deleteFamilyImage);

router.route("/GetPerson/:userId").get(Getperson);
router.route("/GetMother/:userId").get(GetMother);
router.route("/GetFather/:userId").get(GetFather);
router.route("/GetPGFather/:userId").get(GetPGFather);
router.route("/GetPGMother/:userId").get(GetPGMother);
router.route("/GetMGFather/:userId").get(GetMGFather);
router.route("/GetMGMother/:userId").get(GetMGMother);
// ......................................
router.route("/get_MGrtGrandFather/:userId").get(get_MGrtGrandFather);
router.route("/get_MGrtGrandMother/:userId").get(get_MGrtGrandMother);
router.route("/get_PGrtGrandMother/:userId").get(get_PGrtGrandMother);
router.route("/get_PGrtGrandFather/:userId").get(get_PGrtGrandFather);
//  Search All users
router.route("/").get(getAllUsers);

// Search users by query
router.route("/searches").get(getuserByQuery);

module.exports = router;
