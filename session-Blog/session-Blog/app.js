const express = require('express');
const port = 9090;
const app = express();
const passport = require('passport')
const localstrategy = require('./middleware/localstrategy')
const session = require('express-session')
const flash = require('connect-flash');


app.set("view engine", 'ejs')

const dbconnect = require('./config/db.connection')
const flashmessage = require('./middleware/flashmessage');
dbconnect();
app.use(express.static('public'))
app.use(express.urlencoded());

app.use(session({
    name: 'session-blog',
    secret: 'test',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser)
app.use(flashmessage)

app.use('/uploads', express.static('uploads'))
app.use('/', require('./routes/index.routes'))

app.listen(port, () => {
    console.log(`Server Start At http://localhost:${port}`);
})