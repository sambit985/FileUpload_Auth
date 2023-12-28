const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const uploadRouter = require("./routes/uploadRoutes");
app.use("/api/v1", uploadRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error in server setup");
  }
  console.log("Server is up and runnin gon port", PORT);
});
