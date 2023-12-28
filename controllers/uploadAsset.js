const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadAsset = (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ message: "No file has uploded" });
  }
  console.log(req.file);
  const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
  return res
    .status(200)
    .json({ message: "File uploaded successfully", filePath });
};

module.exports = { uploadAsset, upload };
