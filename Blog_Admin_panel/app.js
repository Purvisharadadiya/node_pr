const express = require('express');
const dbconnection = require('./confing/db.auth.connection');
const app = express();
const cookieParser = require("cookie-parser");
const passport = require('passport');
const localstrategy = require("./middelware/localstrategy")
const session = require('express-session');
const port = 9000;

dbconnection();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(cookieParser());

app.use(session({
    name: 'admin',
    secret: 'test',
    saveUninitialized: false,
    resave: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setuser);

app.use("/", require('./routers/routers.auth'));

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});
