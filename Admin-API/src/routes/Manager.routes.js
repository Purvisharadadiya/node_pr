const express = require("express");
const { AddManager, viewAllManager, deleteManager, updateManager, AddEmployee } = require("../controller/Manager.controller");
const uploadImage = require("../middleware/uploadimage");
const verifyAdmin = require("../middleware/veryfie.token");
const routes = express.Router();

routes.get("/", verifyAdmin, viewAllManager)
routes.post("/Add-manager", verifyAdmin,uploadImage.single('ProfileImage'), AddManager )
routes.delete("/delete-manager/:id",verifyAdmin,deleteManager)
routes.put("/update-manager/:id",verifyAdmin,uploadImage.single('ProfileImage'),updateManager)
  
//employ
routes.post("/Add-employee",verifyManager, uploadImage.single('ProfileImage'),AddEmployee )

module.exports = routes;
