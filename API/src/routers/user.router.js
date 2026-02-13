const express = require("express");
const { Adduser, getAlluser, singleuser, deleteuser,updateUser, Register, loginUser } = require("../controller/user.controller");
const uploadImage = require('../middleware/uploadImage');
const verifyToken = require("../middleware/veryfie.token");

const routes = express.Router();

routes.get("/",verifyToken,getAlluser)
routes.post("/add-user",verifyToken, uploadImage.single('ProfileImage') , Adduser);
routes.get("/single-user/:id", verifyToken,singleuser)
routes.delete("/delete-user/:id",deleteuser)
routes.put("/update-user/:id",uploadImage.single('ProfileImage'),updateUser)


routes.post("/registeruser", uploadImage.single('ProfileImage'),Register)
routes.post("/login-user" ,loginUser)


module.exports = routes;