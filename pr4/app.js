const express = require("express");
const dbconnect = require("./confing/db.connect");

const app = express();
const port = 8080;

dbconnect();

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.use("/", require ('./routes/book.routes'))

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});
