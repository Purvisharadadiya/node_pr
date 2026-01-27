const bcrypt = require('bcrypt')
const Admin = require('../model/admin.model')
exports.loginpage = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/dashboard')
        } else {

            return res.render('login')
        }

    } catch (error) {
        console.log(error);
        return res.redirect('/')
    }
}
exports.dashboard = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.render('dashboard')
        } else {
            return res.redirect('/')
        }

    } catch (error) {
        console.log(error);
        return res.redirect('/')
    }
}

exports.loginuser = async (req, res) => {
    try {
        req.flash('success', 'login successfully !!')
        return res.redirect('/dashboard')

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.logout = async (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                console.log(error);
                return res.redirect('/dashboard')
            } else {
                return res.redirect('/')
            }
        })

    } catch (error) {
        req.flash('error', 'Not a Logout');
        console.log(error);

    }
}

exports.myprofilepage = async (req, res) => {
    try {
        return res.render('myprofile')


    } catch (error) {
        console.log(error);

    }
}

exports.chagepasswordpage = async (req, res) => {
    try {
        let user = req.user;
        console.log(user);
        return res.render('chagepassword', { user })
    } catch (error) {
        console.log(error);
    }
}

exports.updatepassword = async (req, res) => {
    try {
        let { newpass, oldpass, cpassword } = req.body;
        let user = req.user;
        let matchpass = await bcrypt.compare(oldpass, user.password)

        if (!matchpass) {
            req.flash('error', 'password not match')
        }

        if (newpass == cpassword) {
            const hashpassword = await bcrypt.hash(newpass, 10);
            await Admin.findByIdAndUpdate(user._id, {
                password: hashpassword
            }, { new: true })
            req.flash('success', 'Change Password Succssfully !!')
            return res.redirect('/dashboard')

        } else {
            req.flash('error', 'New and old password not match !!')
            return res.redirect('/change-password')
        }
    } catch (error) {
        console.log(error);

    }
}