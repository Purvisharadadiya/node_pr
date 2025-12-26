 const express=require('express'); 
const { AddBlog } = require('../cntroller/Blog.controller');



 const routes=express.Router()
 
 routes.get("/Add-Blog",AddBlog)
 
 module.exports=routes
  