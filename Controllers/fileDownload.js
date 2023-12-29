const path = require("path");
const fs = require("fs");

const fileDownload = (req, res) => {
  const filePath = path.join(__dirname, "../sampleFolder/sample.zip");
  console.log(filePath);
  //If file not found the send error response
  if (!fs.existsSync(filePath)) {
    console.log("File Not Found Error");
    return res.status(404).json({ message: "File Not Found" });
  }
  //Set Header
  res.setHeader("Content-Disposition", "attachment; filename=sample.zip");
  res.setHeader("Content-Type", "application/zip");

  fs.createReadStream(filePath).pipe(res);
};

module.exports = fileDownload;
