const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://purvisharadadiya:purvisha3110@cluster0.lonolu3.mongodb.net/Blog-Admin-panel"
    );
    console.log("Database connected successfully...");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

module.exports = dbconnection;
