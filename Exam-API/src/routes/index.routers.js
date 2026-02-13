const express = require("express");
const { RegisterAdmin, loginAdmin } = require("../controller/Authentication.controller");
const uploadImage = require("../middleware/uploadimage");
const router = express.Router();


router.post("/register",uploadImage.single('ProfileImage'),RegisterAdmin );
router.post("/login",loginAdmin );



router.use("/Admin", require("../model/Admin"));
router.use("/Product",require("./product.routers"))
router.use("/User", require("./user.rouers"));

module.exports = router;
