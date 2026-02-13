const express = require("express");
let port = 8080;
const app = express();

const dbconnect = require("./config/db.connect");
dbconnect();


app.use(express.json());
app.use(express.urlencoded()); 


app.use("/uploads", express.static("src/uploads"));


app.use("/api", require("../src/routers/user.router"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
