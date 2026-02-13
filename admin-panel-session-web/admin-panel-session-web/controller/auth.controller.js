const Admin = require("../model/Admin.model");
const bcrypt = require("bcrypt");
const otpgenerator = require("otp-generator");
const sendEmail = require("../middleware/sendmailconfig");
const session = require("express-session");


exports.loginpage = ((req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.redirect("/dashboard");
        }
        else {
            return res.render("loginpage");
        }
    }
    catch (err) {
        console.log(err);
    }
})

exports.logout = ((req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) console.log(err);
            else res.redirect("/");
        })
    }
    catch (err) {
        console.log(err);
    }
});

exports.adminloginpage = async (req, res) => {
    try {
        req.flash("success", "login successfully");
        return res.redirect("/dashboard");
    }
    catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

exports.getdashboard = ((req, res) => {
    try {
        // console.log(req.user);
        return res.render("dashboard");
    }
    catch (err) {
        console.log(err);
        return res.redirect("/");
    }
})

exports.myprofile = ((req, res) => {
    try {
        return res.render("myprofile");
    }
    catch (err) {
        console.log(err);
    }
})

exports.changepasswordpage = async (req, res) => {
    try {
       
        return res.render("changepassword");
    }
    catch (err) {
        console.log(err);
    }
}

exports.changepassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        let user = req.cookies.admin;
        let matchpass = await bcrypt.compare(oldPassword, user.password);
        if (!matchpass) {
            console.log("old password is not match");
            return res.redirect("/change-password");
        }
        if (newPassword == confirmPassword) {
            let hashpassword = await bcrypt.hash(newPassword, 10);
            await Admin.findByIdAndUpdate(user._id, { password: hashpassword }, { new: true });
            // res.clearCookie("admin");
            // return res.redirect("/");
            return res.redirect("/dashboard");
        }
        else {
            console.log("new and confirm password is not match");
            return res.redirect("/change-password");
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

exports.forgotpassword = async (req, res) => {
    try {
        let user = req.cookies.admin;
        return res.render("forgotpassword/forgotpassword", { user });
    }
    catch (err) {
        console.log(err);
    }
}

exports.sendotp = async (req, res) => {
    try {
        let admin = await Admin.findOne({ Email: req.body.Email });
        if (!admin) {
            console.log('admin not found');
            return res.redirect("/forgot-password");
        }

        let otp = otpgenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        console.log(otp);

        let message = {
            form: `denishadashlani@gmail.com`,
            to: `${admin.Email}`,
            subject: "reset password otp",
            html: `
                <h1>Welcome ${admin.Firstname}</h1>
                <p>reset password otp is ${otp} send within 5 minutes </p>

                `
        }
        sendEmail(message);
        res.cookie('otp', otp);
        res.cookie('Email', admin.Email);
        return res.redirect("/verify-otp");
    }
    catch (err) {
        console.log(err);
    }
}

exports.verifyotppage = async (req, res) => {
    try {
        return res.render("forgotpassword/verifyotp");
    }
    catch (err) {
        console.log(err);
    }
}

exports.verifyotp = async (req, res) => {
    try {
        let otp = req.cookies.otp;
        if (otp == req.body.otp) {
            res.clearCookie('otp');
            return res.redirect("update-password");
        }
        else {
            console.log("otp is not match");
            return res.redirect("/verify-otp");
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

exports.updatepasswordpage = async (req, res) => {
    try {
        return res.render("forgotpassword/updatepassword");
    }
    catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}


exports.updatepassword = async (req, res) => {
    try {
        let Email = req.cookies.Email;
        if (req.body.password != req.body.cpassword) {
            console.log("password not macth");
            return res.redirect("/update-password");
        }
        let hashpassword = await bcrypt.hash(req.body.password, 10);
        await Admin.findOneAndUpdate({ Email: Email }, { password: hashpassword }, { new: true });
        res.clearCookie('Email');
        return res.redirect("/");
    }
    catch (err) {
        console.log(err)
        return res.redirect("/")
    }
}