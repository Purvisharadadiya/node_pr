
const Product = require("../model/product.model")
const Category = require("../model/category.model");
const Subcategory = require("../model/subcategory.model");
const Extrasubcategory = require("../model/extrasubcategory.model");

exports.websitepage = async (req, res) => {
    try {

        res.render("websitepage/website",);
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
};
exports.contactpage = async (req, res) => {
    try {

        res.render("websitepage/Contact",);
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
};

exports.productPage = async (req, res) => {
    try {
        const products = await Product.find();
        

        res.render("websitepage/product-details", { products});
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
};


exports.singleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("CategoryId")
            .populate("SubCategoryId")
            .populate("ExtraSubCategoryId");
        res.render("websitepage/single-product", {
            product
        });
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
}
