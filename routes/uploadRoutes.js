const express = require("express");
const router = express.Router();
//import controller
const { uploadController, upload } = require("../controllers/uploadAsset");

//create route for file uplaod
router.post("/upload", upload.single("file"), uploadController);

module.exports = router;
