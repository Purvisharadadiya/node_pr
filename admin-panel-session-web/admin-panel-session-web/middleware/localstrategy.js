const passport = require('passport');
const Admin = require('../model/Admin.model');
const bcrypt = require('bcrypt');

const localstrategy = require('passport-local').Strategy;


passport.use(new localstrategy({ usernameField: 'Email' }, async (Email, password, cb) => {
    let admin = await Admin.findOne({ Email: Email })
    if (!admin) {
        return cb(null, false);
    }
    let matchpass = await bcrypt.compare(password, admin.password)
    if (!matchpass) {
        return cb(null, false);
    }
    return cb(null, admin)
}))


passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
    let admin = await Admin.findById(id);
    cb(null, admin)
})


passport.checkAuthentication = (req, res, next) => {
    // console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

passport.setuser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;