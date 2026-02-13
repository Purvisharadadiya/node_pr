const express = require("express");

const { RegisterUser, loginUser, singleProduct } = require("../controller/user");
const uploadImage = require("../middleware/uploadimage");
const verifyUser = require("../middleware/user.veryfie");

const router = express.Router()

router.post("/register",uploadImage.single('ProfileImage'),RegisterUser);
router.post("/login",loginUser );

router.get("/single-product/:id", verifyUser,singleProduct );




  
module.exports = router;
