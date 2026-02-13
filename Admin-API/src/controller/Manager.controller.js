const Managermodel = require("../model/Manager.model");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const Employeemodel=require("../model/Employee")
const sendEmail = require("../../../Admin-panel/middeware/sendMaile");
const fs = require("fs");
const path = require("path");

// exports.AddManager = async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     let imagepath = "";

//     if (req.file) {
//       imagepath = `/uploads/${req.file.filename}`;
//     }

//     if (!req.body.password) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         message: "Password is required"
//       });
//     }

//     const hashpassword = await bcrypt.hash(req.body.password, 10);

//     const manager = await Managermodel.create({
//       ...req.body,
//       password: hashpassword,
//       ProfileImage: imagepath,

//     });

//     return res.status(StatusCodes.CREATED).json({
//       message: "Manager added successfully",
//       manager
//     });

//   } catch (error) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       message: "Server Error",
//       error: error.message
//     });
//   }
// };

exports.AddManager = async (req, res) => {
  try {
    let imagepath = "";
    if (req.file) {
      imagepath = `/uploads/${req.file.filename}`;
    }

    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const exist = await Managermodel.findOne({ email });
    if (exist) {
      return res.status(409).json({ message: "Manager already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const manager = await Managermodel.create({
      ...req.body,
      password: hashpassword,
      ProfileImage: imagepath,
      role: "Manager"
    });


    let Message = {
      from: "purva.radadiya3110@gmail.com",
      to: email,
      subject: "Manager Account Created",
      html: `
        <h2>Hello ${name}</h2>
        <p>Your manager account has been created.</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${password}</p>
        <p>Please login and change your password.</p>
      `
    };

    await sendEmail(Message);

    return res.status(StatusCodes.CREATED).json({
      message: "Manager added & email sent successfully",
      manager
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};



exports.viewAllManager = async (req, res) => {
  try {
    const manager = await Managermodel.find();

    return res.status(StatusCodes.OK).json({
      message: "Fetch all managers",
      data: manager
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};


exports.updateManager = async (req, res) => {
  try {
    let manager = await Managermodel.findById(req.params.id);

    if (!manager) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Manager not found"
      });
    }

    let filepath = "";

    if (req.file) {

      if (manager.ProfileImage && manager.ProfileImage !== "") {
        let oldPath = path.join(__dirname, "..", manager.ProfileImage);
        try {
          fs.unlinkSync(oldPath);
        } catch (err) {
          console.log("Old image not found");
        }
      }

      filepath = `/uploads/${req.file.filename}`;
    } else {
      filepath = manager.ProfileImage;
    }

    manager = await Managermodel.findByIdAndUpdate(
      manager._id,
      { ...req.body, ProfileImage: filepath },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      message: "Manager UPDATE successfully",
      data: manager
    });

  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong"
    });
  }
};

exports.deleteManager = async (req, res) => {
  try {
    const id = req.params.id;

    const manager = await Managermodel.findById(id);

    if (!manager) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Manager not found"
      });
    }


    if (manager.ProfileImage) {
      const filepath = path.join(__dirname, "..", manager.ProfileImage);

      try {
        fs.unlinkSync(filepath);
      } catch (err) {
        console.log("Image file not found, skipping delete");
      }
    }

    await Managermodel.findByIdAndDelete(id);

    return res.status(StatusCodes.OK).json({
      message: "Manager deleted successfully"
    });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
      error: error.message
    });
  }
};




exports.managerProfile = async (req, res) => {
  try {

    const managerId = req.manager.userId;

    const manager = await Managermodel.findById(managerId);

    if (!manager) {
      return res.status(404).json({
        message: "Manager not found"
      });
    }

    return res.status(200).json({
      message: "Manager Profile",
      manager
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error"
    });
  }
};




exports.updateManagerProfile = async (req, res) => {
  try {
    const managerId = req.manager.userId;   

    let manager = await Managermodel.findById(managerId);

    if (!manager) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Manager not found"
      });
    }

    let filepath = "";

    
    if (req.file) {

      
      if (manager.ProfileImage) {
        const oldPath = path.join(__dirname, "..", manager.ProfileImage);
        try {
          fs.unlinkSync(oldPath);
        } catch (err) {
          console.log("Old image not found");
        }
      }

      filepath = `/uploads/${req.file.filename}`;
    } else {
      filepath = manager.ProfileImage;
    }

   
    const updateData = {
      name: req.body.name || manager.name,
      email: req.body.email || manager.email,
      mobile: req.body.mobile || manager.mobile,
      gender: req.body.gender || manager.gender,
      ProfileImage: filepath
    };

    const updatedManager = await Managermodel.findByIdAndUpdate(
      managerId,
      updateData,
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      message: "Manager profile updated successfully",
      data: updatedManager
    });

  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error"
    });
  }
};




exports.AddEmployee = async (req, res) => {
  try {
    let imagepath = "";

    // Image Upload
    if (req.file) {
      imagepath = `/uploads/${req.file.filename}`;
    }

    const { name, email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email & password required"
      });
    }

    // Check Already Exist
    const exist = await Employeemodel.findOne({ email });
    if (exist) {
      return res.status(409).json({
        message: "Employee already exists"
      });
    }

    // Password Hash
    const hashpassword = await bcrypt.hash(password, 10);

    // Create Employee
    const employee = await Employeemodel.create({
      ...req.body,
      password: hashpassword,
      ProfileImage: imagepath,
      role: "Employee"
    });

    // Email Message
    let Message = {
      from: "purva.radadiya3110@gmail.com",
      to: email,
      subject: "Employee Account Created",
      html: `
        <h2>Hello ${name}</h2>
        <p>Your employee account has been created.</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${password}</p>
        <p>Please login and change your password.</p>
      `
    };

    await sendEmail(Message);

    return res.status(StatusCodes.CREATED).json({
      message: "Employee added & email sent successfully",
      employee
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error"
    });
  }
};
