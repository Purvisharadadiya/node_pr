const passport = require('passport')
const localstrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const Admin = require('../model/admin.model')

passport.use(new localstrategy({ usernameField: 'email' }, async (email, password, cb) => {
    let admin = await Admin.findOne({ email: email })
    if (!admin) {
        return cb(null, false)
    }

    let matchpass = await bcrypt.compare(password, admin.password)
    if (!matchpass) {
        return cb(null, false)
    }

    return cb(null, admin)
}))

passport.serializeUser((user, cb) => {
    return cb(null, user.id)
})
passport.deserializeUser(async (id, cb) => {
    let admin = await Admin.findById(id);
    return cb(null, admin)
})

passport.checkAuthenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/')
    }
}

passport.setUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}