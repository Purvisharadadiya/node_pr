const Admin = require("../model/Admin");
const bcrypt = require("bcrypt");


exports.getBlog = async (req, res) => {
  try {
    if (req.cookies.admin) {
      return res.redirect("/");
    }
    return res.render("dashboard");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};


exports.loginpage = async (req, res) => {
  try {
    if (req.cookies.admin) {
      return res.redirect("/dashboard");
    }
    return res.render("loginpage");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      console.log("Admin not found");
      return res.redirect("/");
    }

   
    const matchPassword = await bcrypt.compare(password, admin.password);
    if (!matchPassword) {
      console.log("Password not match");
      return res.redirect("/");
    }
    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};


