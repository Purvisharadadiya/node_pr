const mongoose = require("mongoose");

const dbconnect = () => {
      mongoose.connect("mongodb+srv://purvisharadadiya:purvisha3110@cluster0.lonolu3.mongodb.net/movie")
        .then(() => {
            console.log("Database connected...");
        })
        .catch((error) => {
            console.log("Database connection error:", error);
        });
};

module.exports = dbconnect;
