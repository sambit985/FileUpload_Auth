//Sample file downloader api
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  return res.status(200).send("HELLO FROM SAMBIT SERVER");
});

//import route
const downloadRoute = require("./routes/download");

app.use("/api/v1", downloadRoute);

app.listen(PORT, (error) => {
  if (error) {
    console.log("Server settingup error");
  }
  console.log("Server is up and running on port:", PORT);
});
