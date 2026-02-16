const mongoose = require('mongoose');

const dbconnect = () => {
    mongoose.connect('mongodb+srv://purvisharadadiya:purvisha3110@cluster0.lonolu3.mongodb.net/Admin-RolBase-Api')
        .then(() => {
            console.log("database conected successfully");
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = dbconnect;