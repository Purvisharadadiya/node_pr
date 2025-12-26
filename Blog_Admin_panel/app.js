const express = require('express');
const dbconnection = require('./confing/db.auth.connection');
const app = express();
const port = 9000;

dbconnection()


app.set("view engine", "ejs");

app.use(express.static("public"))

app.use("/", require ('./routers/routers.auth'))


app.listen(port, () => {
    console.log(`Express server running: http://localhost:${port}`);
});



