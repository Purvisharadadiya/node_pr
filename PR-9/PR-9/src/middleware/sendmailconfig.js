const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "purva.radadiya3110@gmail.com",
            pass: "ztld pdxk bwff kmak"
        }
})

const sendEmail = async (message) => {
    let res = await transporter.sendMail(message);
    console.log(res);
}

module.exports = sendEmail;

