const express = require('express');
const { loginpage, dashboard, loginuser, logout, myprofilepage, updatepassword, chagepasswordpage } = require('../controller/auth.controller');
const passport = require('passport');
const routes = express.Router();

routes.get('/', loginpage)
routes.get('/dashboard', passport.checkAuthenticate, dashboard)
routes.post('/login', passport.authenticate('local', { failureRedirect: '/' }), loginuser)
routes.get('/logout', logout)
routes.get('/myprofile', myprofilepage)
routes.get('/change-password', chagepasswordpage)
routes.post('/change-password', updatepassword)

routes.use('/admin', passport.checkAuthenticate, require('../routes/admin.routes'))

routes.use('/blog', passport.checkAuthenticate, require('../routes/blog.routes'))



module.exports = routes;
