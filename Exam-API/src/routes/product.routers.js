const express = require("express");
const { AddProduct, viewAllproduct, deleteProduct, updateProduct } = require("../controller/product.controller");
const uploadImage = require("../middleware/uploadimage");
const verifyAdmin = require("../middleware/veryfie.token");
const router = express.Router()

router.get("/",verifyAdmin,viewAllproduct)
router.post("/add-product",verifyAdmin,uploadImage.single('image'),AddProduct );
router.delete("/delete-product/:id", verifyAdmin,deleteProduct)
router.put("/update-product/:id" ,verifyAdmin,updateProduct)
  
module.exports = router;
