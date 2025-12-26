const express = require("express");
const dbconnect = require("./confing/dbconnection.movie");

const app = express();
const port = 8080;
dbconnect()
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static("public"))
app.use("/uploads",express.static("uploads"))
app.use("/", require ('./routers/movie.routers'))

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});

