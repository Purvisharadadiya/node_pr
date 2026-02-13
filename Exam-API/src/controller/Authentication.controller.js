
const Adminmodel = require("../model/Admin");
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
        const token = jwt.sign(payload, "admin");

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