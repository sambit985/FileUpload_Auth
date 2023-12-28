const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use an absolute path for the destination directory
    const absolutePath = path.resolve(__dirname, "..", "uploads");
    cb(null, absolutePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadAsset = (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ message: "No file has uploaded" });
  }

  console.log(req.file);

  const projectDir = path.join(__dirname, "..");
  const filePath = path.join(projectDir, "uploads", req.file.filename);

  return res
    .status(200)
    .json({ message: "File uploaded successfully", filePath });
};

module.exports = { uploadAsset, upload };
