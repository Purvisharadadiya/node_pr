const express = require("express");
const { addadminpage, addadmin, viewadmin, deleteadmin, editadmin, updateadmin } = require("../controller/admin.controller");
const uploadsimage = require("../middleware/image.upload");
const routes = express.Router();

routes.get("/add-admin", addadminpage);

routes.post("/add-admin", uploadsimage.single("ProfileImage"), addadmin);
routes.get("/view-admin", viewadmin);
routes.get("/delete-admin/:id", deleteadmin);
routes.get("/edit-admin/:id",editadmin);
routes.post("/update-admin/:id",uploadsimage.single("ProfileImage"),updateadmin);

module.exports = routes;