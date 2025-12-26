const mongoose = require("mongoose");

const dbconnect = () => {
      mongoose.connect("mongodb://localhost:27017/movie")
        .then(() => {
            console.log("Database connected...");
        })
        .catch((error) => {
            console.log("Database connection error:", error);
        });
};

module.exports = dbconnect;
