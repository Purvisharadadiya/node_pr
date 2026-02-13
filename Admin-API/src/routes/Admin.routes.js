const express = require("express");
const { viewAllAdmin, AddAdmin, singleAdmin, deleteAdmin, updateAdmin } = require("../controller/Admin.controller");
const uploadImage = require("../middleware/uploadimage");
const verifyAdmin = require("../middleware/veryfie.token");

const routes = express.Router();

routes.get("/", viewAllAdmin);
routes.post("/Add-Admin", uploadImage.single('ProfileImage') ,AddAdmin);
routes.get("/single-Admin/:id",singleAdmin)
routes.delete("/delete-Admin/:id",verifyAdmin,deleteAdmin)
routes.put("/update-Admin/:id",verifyAdmin,uploadImage.single('ProfileImage'),updateAdmin)



module.exports = routes;
