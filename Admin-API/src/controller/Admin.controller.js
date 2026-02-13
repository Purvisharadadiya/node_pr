const Adminmodel = require("../model/Admin.model");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const path = require("path");
exports.viewAllAdmin = async (req, res) => {
  try {
    const admin = await Adminmodel.find();
    return res.status(StatusCodes.OK).json({
      message: "Fetch all admin",
      data: admin
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.singleAdmin = async (req, res) => {
  try {
    let id = req.params.id;

    const admin = await Adminmodel.findById(id);

    if (!admin) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    return res.status(StatusCodes.OK).json({ message: "Fetch single user", data: admin });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message
    });
  }
};

exports.AddAdmin = async (req, res) => {
  try {
 console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    let imagepath = "";

    if (req.file) {
      imagepath = `/uploads/${req.file.filename}`;
    }

    if (!req.body.password) {
      throw new Error("Password missing in request");
    }

    const hashpassword = await bcrypt.hash(req.body.password, 10);
    const admin = await Adminmodel.create({
      ...req.body,
      password: hashpassword,
      ProfileImage: imagepath
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Admin added successfully", admin });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message
    });
  }
};


exports.deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;


    const admin = await Adminmodel.findById(id);

    if (!admin) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found"
      });
    }


    if (admin.ProfileImage) {
      const filepath = path.join(__dirname, "..", admin.ProfileImage);

      try {
        fs.unlinkSync(filepath);
      } catch (err) {
        console.log("Image file not found, skipping delete");
      }
    }


    await Adminmodel.findByIdAndDelete(id);

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



exports.updateAdmin = async (req, res) => {
  try {
    let admin = await Adminmodel.findById(req.params.id);

    if (!admin) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Admin not found"
      });
    }

    let filepath = "";

    if (req.file) {
     
      if (admin.ProfileImage) {
        filepath = path.join(__dirname, "..", admin.ProfileImage);
        try {
          fs.unlinkSync(filepath);
        } catch (err) {
          console.log("old image not found");
        }
      }
      filepath = `/uploads/${req.file.filename}`;
    } else {
      filepath = admin.ProfileImage;
    }

    admin = await Adminmodel.findByIdAndUpdate(
      admin._id,
      { ...req.body, ProfileImage: filepath },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      message: "Admin updated successfully",
      admin
    });

  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error"
    });
  }
};


