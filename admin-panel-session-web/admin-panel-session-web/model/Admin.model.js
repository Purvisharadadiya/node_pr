const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    Firstname: {
        type: String
    },
    Lastname: {
        type: String
    },
    password: {
        type: String
    },
    Email: {
        type: String
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    Hobbies: [{
        type: String
    }],
    ProfileImage: {
        type: String
    },
    Moblienumber: {
        type: Number
    }
});

module.exports = mongoose.model("Admin", adminSchema);