const express = require('express');
const { addadminpage, addadmin, viewalladminpage, deleteadmin, editadminpage,updateadmin } = require('../controller/admin.controller');
const uploadImage = require('../middleware/uploadImage');
const routes = express.Router();

routes.get('/add-admin', addadminpage)
routes.post('/add-admin', uploadImage.single('profileImage'), addadmin);
routes.get('/view-admin', uploadImage.single('profileImage'), viewalladminpage)
routes.get('/delete-admin/:id', deleteadmin)
routes.get('/edit-admin/:id', editadminpage)
routes.post('/update-admin/:id',uploadImage.single('profileImage'), updateadmin)

module.exports = routes;