const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    Firstname: {
      type: String,

    },
    Lastname: {
      type: String
    },
    Email: {
      type: String,
    },
    password: {
      type: String,

    },
    gender: {
      type: String,
      enum: ["Male", "Female"]
    },
    ProfileImage: {
      type: String
    },
    MobileNumber: {
      type: Number
    },
    DOB: {
      type: Date
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("user", userSchema);
