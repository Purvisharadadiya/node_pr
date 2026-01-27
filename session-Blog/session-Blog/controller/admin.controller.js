const Admin = require('../model/admin.model')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')
exports.addadminpage = async (req, res) => {
    try {
        return res.render('admin/addadmin');

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.addadmin = async (req, res) => {
    try {
        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`
        }
        let hashpassword = await bcrypt.hash(req.body.password, 10)
        let admin = await Admin.create({
            ...req.body,
            password: hashpassword,
            profileImage: imagepath
        })

        req.flash('success', 'Add Admin Sucessfully !!')
        return res.redirect('/admin/view-admin')

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.viewalladminpage = async (req, res) => {
    try {
        let admin = await Admin.find();
        return res.render('admin/viewadmin', { admin });
    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}
exports.deleteadmin = async (req, res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);

        if (admin.profileImage != '') {
            let filepath = path.join(__dirname, '..', admin.profileImage);
            try {
                await fs.unlinkSync(filepath)
            } catch (error) {
                console.log('file is missing');
            }
        }
        await Admin.findByIdAndDelete(id);
        req.flash('success', 'Delete Admin Sucessfully !!')
        return res.redirect('/admin/view-admin')

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.editadminpage = async (req, res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);

        return res.render('admin/editadmin', { admin })

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.updateadmin = async (req, res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);

        if (req.file) {
            if (admin.profileImage != '') {
                let filepath = path.join(__dirname, '..', admin.profileImage);
                try {
                    await fs.unlinkSync(filepath)
                } catch (error) {
                    console.log('file is missing');
                }
            }
            filepath = `/uploads/${req.file.filename}`
        }
        else {
            filepath = admin.profileImage
        }
        let update = await Admin.findByIdAndUpdate(admin._id, {
            ...req.body,
            profileImage: filepath,
        }, { new: true })

        req.flash('success', 'update Admin Sucessfully !!')
        return res.redirect('/admin/view-admin')

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}