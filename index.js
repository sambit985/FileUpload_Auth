const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const csvParser = require("csv-parser");

app.use(express.json());

const uploadRouter = require("./routes/uploadRoutes");
app.use("/api/v1", uploadRouter);


//csv file read
app.get("/data", (req, res) => {
  const csvPath = path.join(__dirname, 'uploads', 'username.csv');
  console.log(csvPath);
  const metaData = [];
  fs.createReadStream(csvPath)
    .pipe(csvParser())
    .on("data", (data) => {
      metaData.push(data);
    })
    .on("end", () => {
      console.log("Finished parsing!!");
      return res.status(200).json({ metaData: metaData });
    })
    .on("error", (error) => {
      console.log("Error while parsing csv file");
      res.json({ Error: error });
    });
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error in server setup");
  }
  console.log("Server is up and runnin gon port", PORT);
});
