 const express=require('express'); 
const {  AddBlogpage, AddBlog } = require('../cntroller/Blog.controller');
const uploadSImage = require('../middelware/Blog.imgupaloding');



 const routes=express.Router()
 
 routes.get("/Add-Blog",AddBlogpage)
 routes.post("/Add-Blog",uploadSImage.single("image") ,AddBlog)
 
 module.exports=routes
  