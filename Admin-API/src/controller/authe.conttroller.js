const Adminmodel = require("../model/Admin.model");
const Managermodel=require("../model/Manager.model")
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

exports.RegisterAdmin = async (req, res) => {
    try {

        console.log("register BODY ", req.body);
        const existingadmin = await Adminmodel.findOne({
            email: req.body.email
        });

        if (existingadmin) {
            return res.status(StatusCodes.CONFLICT).json({
                message: "User already exists"
            });
        }


        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }


        const hashpassword = await bcrypt.hash(req.body.password, 10);


        const admin = await Adminmodel.create({
            ...req.body,
            password: hashpassword,
            ProfileImage: imagepath
        });

        return res.status(StatusCodes.CREATED).json({
            message: "User registered successfully", admin
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Server Error",
            error: error.message
        });
    }
};



// exports.loginAdmin = async (req, res) => {
//     try {
//         console.log("login BODY ", req.body);
//         console.log("BODY KEYS =>", Object.keys(req.body));
//         console.log("EMAIL =>", req.body.email);
//         console.log("PASSWORD =>", req.body.password);



//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "Email and password are required"
//             });
//         }

//         const admin = await Adminmodel.findOne({ email });

//         if (!admin) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }

//         const matchpass = await bcrypt.compare(password, admin.password);

//         if (!matchpass) {
//             return res.status(401).json({ message: "Password wrong" });
//         }


//         const payload = {
//             userId: admin._id,

//         };


//         const token = jwt.sign(payload, "Admin");

//         return res.status(200).json({
//             message: "Login successful", token, admin
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Server Error"
//         });
//     }
// };



exports.loginAdmin = async (req, res) => {
    try {
        console.log("login BODY", req.body);

        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const admin = await Adminmodel.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const matchpass = await bcrypt.compare(password, admin.password);

        if (!matchpass) {
            return res.status(401).json({ message: "Password wrong" });
        }

        const payload = {

            userId: admin._id,
            role: "Admin"
        };
        const token = jwt.sign(payload, "admin-Manager");

        return res.status(200).json({
            message: "Login successful",
            token,
            admin
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};



exports.myProfile = async (req, res) => {
    try {
        
        const adminId = req.admin.userId;

        const admin = await Adminmodel.findById(adminId);

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        return res.status(200).json({
            message: "My profile",
            admin
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};



exports.changePassword = async (req, res) => {
  try {
    const { oldpass, newpass, compass } = req.body;

   
    if (!oldpass || !newpass || !compass) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "All fields are required"
      });
    }

    if (newpass !== compass) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "New password and confirm password do not match"
      });
    }

    
    const adminId = req.admin.userId;

    const admin = await Adminmodel.findById(adminId);
    if (!admin) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Admin not found"
      });
    }

    
    const matchpass = await bcrypt.compare(oldpass, admin.password);
    if (!matchpass) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Old password is incorrect"
      });
    }

  
    const hashpassword = await bcrypt.hash(newpass, 10);

    await Adminmodel.findByIdAndUpdate(
      adminId,{ password: hashpassword },{ new: true }
    );

    return res.status(StatusCodes.OK).json({
      message: "Password changed successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error"
    });
  }
};




//login manager//




exports.loginManager = async (req, res) => {
  try {
    console.log("login BODY", req.body);

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const manager = await Managermodel.findOne({ email });

    if (!manager) {
      return res.status(404).json({
        message: "Manager not found"
      });
    }

    const matchpass = await bcrypt.compare(password, manager.password);

    if (!matchpass) {
      return res.status(401).json({
        message: "Password wrong"
      });
    }

    const payload = {
      userId:manager._id,
      role:"Manager"  
    };

    const token = jwt.sign(payload,"admin-Manager"); 
  

    return res.status(200).json({
      message: "Manager login successful",
      token,
      manager
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error"
    });
  }
};




