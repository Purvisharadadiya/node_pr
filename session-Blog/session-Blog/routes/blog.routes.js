const express = require('express');
const { addblogpage, addblog, deleteblog, editblog, updateblog, viewblog, viewblogpage } = require('../controller/blog.controller');
const uploadImage = require('../middleware/uploadImage');
const route = express.Router();

route.get('/add-blog', addblogpage)
route.post('/add-blog', uploadImage.fields([{ name: 'blogImage', maxCount: 1 }, { name: 'authorImage', maxCount: 1 }]), addblog);
route.get('/view-blog', viewblogpage);
route.get('/delete-blog/:id', uploadImage.fields([{ name: 'blogImage', maxCount: 1 }, { name: 'authorImage', maxCount: 1 }]), deleteblog);
route.get('/edit-blog/:id', editblog);
route.post('/update-blog/:id', uploadImage.fields([{ name: 'blogImage', maxCount: 1 }, { name: 'authorImage', maxCount: 1 }]), updateblog);
route.get('/view-blog/:id', uploadImage.fields([{ name: 'blogImage', maxCount: 1 }, { name: 'authorImage', maxCount: 1 }]), viewblog);

module.exports = route;