const Usermodel = require("../model/user.model");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
exports.RegisterUser = async (req, res) => {
  try {

    console.log("register BODY ", req.body);
    console.log("FILE:", req.file);

    const existingUser = await Usermodel.findOne({
      email: req.body.email
    });

    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "User already exists"
      });
    }

   
    let imagepath = "";
    if (req.file) {
      imagepath = `/uploads/${req.file.filename}`;
    }

    
    const hashpassword = await bcrypt.hash(req.body.password, 10);

    const user = await Usermodel.create({
      ...req.body,
      password: hashpassword,
      ProfileImage: imagepath,   
      role: "User"               
    });

    return res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message
    });
  }
};






exports.loginUser = async (req, res) => {
  try {

    console.log("login BODY", req.body);

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Email and password are required"
      });
    }

    const user = await Usermodel.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found"
      });
    }

    const matchpass = await bcrypt.compare(password, user.password);

    if (!matchpass) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Password wrong"
      });
    }

    const payload = {
      userId: user._id,
      role: "User"
    };

    const token = jwt.sign(payload,"User");

    return res.status(StatusCodes.OK).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error"
    });
  }
};


exports.singleProduct = async (req, res) => {
  try {

    const product = await Productmodel.findById(req.params.id);

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
    return res.status(500).json({
      message: "Server Error"
    });
  }
};
