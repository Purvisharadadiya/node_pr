
const express = require("express");
const {  addToCart, cartSingleView, getCartJson, updateQuantity,removeFromCart
} = require("../controller/cart.controller");

const router = express.Router();

router.post("/add-to-cart", addToCart);
router.get("/cart-single", cartSingleView);

router.get("/cart-json", getCartJson);
router.post("/cart-update", updateQuantity);
router.post("/cart-remove", removeFromCart);


router.get("/checkout", (req, res) => {
  res.render("websitepage/checkout");
});

module.exports = router;
