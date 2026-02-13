const express = require("express");
const uploadImage = require("../middleware/uploadimage");
const { RegisterAdmin, loginAdmin, myProfile, changePassword, loginManager } = require("../controller/authe.conttroller");
const verifyAdmin = require("../middleware/veryfie.token");
const { managerProfile, updateManagerProfile } = require("../controller/Manager.controller");
const verifyManager = require("../middleware/manager.token");

const routes = express.Router();

// Admin routes//
routes.post("/register-Admin",uploadImage.single('ProfileImage'),RegisterAdmin)
routes.post("/login-Admin" ,loginAdmin)
routes.get("/my-profile",verifyAdmin,myProfile);
routes.post("/change-password",verifyAdmin, changePassword);

// Manager router//


routes.post("/login-manager" ,loginManager)
routes.get("/my-profile-M",verifyManager,managerProfile);
routes.put("/update-profile", verifyManager, uploadImage.single('ProfileImage'), updateManagerProfile);

routes.use("/Admin", require("./Admin.routes"));
routes.use("/Manager",require("./Manager.routes"))
module.exports = routes;
