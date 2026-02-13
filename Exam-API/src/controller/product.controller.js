const Productmodel = require("../model/product.model");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const productModel = require("../model/product.model");
const fs = require("fs");
const path = require("path");

exports.deleteProduct = async (req, res) => {
  try {

    const id = req.params.id;

    const product = await Productmodel.findById(id);

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Product not found"
      });
    }

    // ✅ Correct field name
    if (product.image) {

      const filepath = path.join(__dirname, "..", product.image);

      try {
        fs.unlinkSync(filepath);
      } catch (err) {
        console.log("Image file not found, skipping delete");
      }
    }

    await Productmodel.findByIdAndDelete(id);

    return res.status(StatusCodes.OK).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message
    });
  }
};


exports.viewAllproduct = async (req, res) => {
  try {

    const products = await Productmodel.find().populate("createdBy");

    return res.status(StatusCodes.OK).json({
      message: "All Products",
      data: products
    });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message
    });
  }
};

exports.AddProduct = async (req, res) => {
  try {

    let imagepath = "";

    if (req.file) {
      imagepath = `/uploads/${req.file.filename}`;
    }

    if (!req.body.name || !req.body.price) {
      throw new Error("Name and Price required");
    }

    const product = await Productmodel.create({
      ...req.body,
      image: imagepath,   
      createdBy: req.user?.id  
    });

    return res.status(StatusCodes.CREATED).json({
      message: "Product added successfully",
      product
    });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message
    });
  }
};

;

exports.updateProduct = async (req, res) => {
  try {

    let product = await Productmodel.findById(req.params.id);

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Product not found"
      });
    }

    let imagepath = "";

    if (req.file) {

     
      if (product.image) {
        const oldPath = path.join(__dirname, "..", product.image);

        try {
          fs.unlinkSync(oldPath);
        } catch (err) {
          console.log("Old image not found");
        }
      }

     
      imagepath = `/uploads/${req.file.filename}`;

    } else {
      imagepath = product.image; 
    }

   
    product = await Productmodel.findByIdAndUpdate(
      product._id,
      { ...req.body, image: imagepath },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message
    });
  }
};


exports.singleProduct = async (req, res) => {
  try {

    const productId = req.params.id;

    const product = await Productmodel
      .findById(productId)
      .populate("createdBy", "username email");

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Single Product",
      product
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error"
    });
  }
};
