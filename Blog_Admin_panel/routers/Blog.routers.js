const express = require('express');
const { AddBlogpage, AddBlog, BlogView, deleteBlog, editBlog, updateBlog, singlBlog } = require('../cntroller/Blog.controller');
const uploadSImage = require('../middelware/Blog.imgupaloding');



const routes = express.Router()

routes.get("/Add-Blog", AddBlogpage)
routes.post("/Add-Blog", uploadSImage.single("image"), AddBlog)
routes.get("/view-Blog", BlogView)
routes.get("/delete-Blog/:id", deleteBlog)
routes.get("/edit-Blog/:id", editBlog)
routes.get("/single-Blog/:id",singlBlog)
routes.post("/update-Blog/:id", uploadSImage.single("image"), updateBlog);

module.exports = routes
