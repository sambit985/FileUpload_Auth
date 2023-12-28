const express = require("express");
const router = express.Router();
//import controller
const { uploadAsset, upload } = require("../controllers/uploadAsset");

//create route for file uplaod
router.post("/upload", upload.single("file"), uploadAsset);

module.exports = router;
