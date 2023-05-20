const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Content");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 * 10 },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpg|png|mp4|mkv|flv|mov|wmv|gif/;
      return cb(null, true);
    },
}).single("content");

module.exports = upload;