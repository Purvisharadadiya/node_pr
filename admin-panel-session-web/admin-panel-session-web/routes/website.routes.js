const express = require("express");
const { websitepage, productPage, singleProduct, contactpage } = require("../controller/website.controller");

const routes = express.Router();

routes.get("/", websitepage);
routes.get("/product-details", productPage);
routes.get("/single-product/:id",singleProduct)
routes.get("/Contact",contactpage)

module.exports = routes;
