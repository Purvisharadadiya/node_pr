 const express=require('express'); 
 const passport = require('passport');

const {  loginpage, getBlog, login } = require('../cntroller/cntroller.auth');

 const routes=express.Router()
 routes.get("/dashboard",passport.checkAuthentication,getBlog);
 routes.get("/",loginpage)
 routes.post("/login ", passport.authenticate('local',{failureRedirect:"/"}),login)
 routes.use("/Blog", passport.checkAuthenticationrequire("../routers/Blog.routers"))
 
 module.exports=routes
  