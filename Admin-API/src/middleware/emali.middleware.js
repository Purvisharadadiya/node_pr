const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "purva.radadiya3110@gmail.com",
    pass: "ztld pdxk bwff kmak"
  }
});

const sendEmail = async (Message) => {
  let res = await transporter.sendMail(Message);
  console.log("Mail sent:", res.response);
};

module.exports = sendEmail;
