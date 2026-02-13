const express = require("express");
const dbconnect = require("./config/db.connect");

const app = express();
const port = 8080;

dbconnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api", require("./routes/index.routes"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
