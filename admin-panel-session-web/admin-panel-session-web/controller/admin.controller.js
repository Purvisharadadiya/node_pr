const Admin = require("../model/Admin.model");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");


exports.addadminpage = async (req, res) => {
    try {

        return res.render("admin/add-admin");
    }
    catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

exports.viewadmin = async (req, res) => {
    try {
        // console.log(req.cookies);
        // res.cookie("denisha",["abc","xyz"]);
        // let user = req.cookies.admin;
        let admin = await Admin.find();
        return res.render("admin/view-admin", { admin });
    }
    catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

exports.addadmin = async (req, res) => {
    try {
        let imagepath = "";
        if (req.file) {
            console.log(req.file);
            imagepath = `/uploads/${req.file.filename}`
        }
        let hashpassword = await bcrypt.hash(req.body.password, 10);
        let admin = await Admin.create({
            ...req.body,
            password: hashpassword,
            ProfileImage: imagepath
        });
        req.flash("success", "Admin Added Successfully");
        return res.redirect("/admin/add-admin");
    }
    catch (err) {
        console.log(err);
        return res.redirect("/dashboard");
    }
}


exports.deleteadmin = async (req, res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);
        if (!admin) {
            console.log("admin not found");
        }

        let filepath = "";
        if (admin.ProfileImage != "") {
            filepath = path.join(__dirname, "..", admin.ProfileImage);
        }

        try {
            await fs.unlinkSync(filepath);
        }
        catch (err) {
            console.log("fille is missing");
        }
        await Admin.findByIdAndDelete(id);
        req.flash("success", "Admin Deleted Successfully");
        return res.redirect("/admin/view-admin");
    }
    catch (err) {
        console.log(err);
        return res.redirect("/dashboard");
    }
}

exports.editadmin = async (req, res) => {
    try {
        let id = req.params.id;
        // let user = req.cookies.admin;
        let admin = await Admin.findById(id);
        return res.render("admin/edit-admin", { admin });
    }
    catch (err) {
        console.log(err);
        return res.redirect("/dashboard");
    }
}

exports.updateadmin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (!admin) {
            console.log("admin not found");
        }
        let filepath = "";
        if (req.file) {
            if (admin.ProfileImage != "") {
                filepath = path.join(__dirname, "..", admin.ProfileImage);
                try {
                    await fs.unlinkSync(filepath);
                }
                catch (err) {
                    console.log("file is missing");
                }
            }

            filepath = `/uploads/${req.file.filename}`;
        }
        else {
            filepath = admin.ProfileImage;
        }
        admin = await Admin.findByIdAndUpdate(admin._id, { ...req.body, ProfileImage: filepath }, { new: true });
        if (admin) {
            req.flash("success", "Admin updated Successfully");
            return res.redirect("/admin/view-admin");
        }
    }
    catch (err) {
        console.log(err);
    }

}
