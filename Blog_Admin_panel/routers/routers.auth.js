 const express=require('express'); 

const {  loginpage, getBlog } = require('../cntroller/cntroller.auth');

 const routes=express.Router()
 routes.get("/dasbord",getBlog);
 routes.get("/",loginpage)
 routes.use("/Blog",require("../routers/Blog.routers"))
 
 module.exports=routes
  