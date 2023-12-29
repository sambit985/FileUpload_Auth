const router = require("express").Router();

const fileDownloadController = require("../Controllers/fileDownload");

router.post("/download/file", fileDownloadController);

module.exports = router;
