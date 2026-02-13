const User = require("../model/user.model");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");


exports.getAlluser = async (req, res) => {
  try {
    let user = await User.find()
    console.log("user")
    return res.status(StatusCodes.OK).json({ message: "Fech All user", data: user });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message
    });
  }
}

exports.singleuser = async (req, res) => {
  try {
    let id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    return res.status(StatusCodes.OK).json({ message: "Fetch single user", data: user });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message
    });
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const id = req.params.id;


    const user = await User.findById(id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found"
      });
    }


    if (user.ProfileImage) {
      const filepath = path.join(__dirname, "..", user.ProfileImage);

      try {
        fs.unlinkSync(filepath);
      } catch (err) {
        console.log("Image file not found, skipping delete");
      }
    }


    await User.findByIdAndDelete(id);

    return res.status(StatusCodes.OK).json({
      message: "User deleted successfully"
    });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message
    });
  }
};


exports.updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      console.log("user not found");
    }

    let filepath = "";

    if (req.file) {
      if (user.ProfileImage != "") {
        filepath = path.join(__dirname, "..", user.ProfileImage);
        try {
          fs.unlinkSync(filepath);
        } catch (err) {
          console.log("file is missing");
        }
      }
      filepath = `/uploads/${req.file.filename}`;
    } else {
      filepath = user.ProfileImage;
    }

    user = await User.findByIdAndUpdate(
      user._id,
      { ...req.body, ProfileImage: filepath },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      message: "User UPDATE successfully"
    });
  } catch (err) {
    console.log(err);
  }
};



exports.Adduser = async (req, res) => {
  try {

    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);
    let imagepath = "";

    if (req.file) {
      imagepath = `/uploads/${req.file.filename}`;
    }

    const hashpassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashpassword,
      ProfileImage: imagepath
    });

    return res.status(StatusCodes.CREATED).json({ message: "User added successfully", user });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message
    });
  }
};


exports.Register = async (req, res) => {
  try {

    console.log("register BODY ", req.body);
    const existingUser = await User.findOne({
      Email: req.body.Email
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


    const user = await User.create({
      ...req.body,
      password: hashpassword,
      ProfileImage: imagepath
    });

    return res.status(StatusCodes.CREATED).json({
      message: "User registered successfully", user
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
    console.log("login BODY ", req.body);

    const { Email, password } = req.body;

    if (!Email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const matchpass = await bcrypt.compare(password, user.password);

    if (!matchpass) {
      return res.status(401).json({ message: "Password wrong" });
    }

   
    const payload = {
      userId: user._id,
    
    };

    
    const token = jwt.sign(payload, "web-dev" );

    return res.status(200).json({
      message: "Login successful",token,user });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error"
    });
  }
};

