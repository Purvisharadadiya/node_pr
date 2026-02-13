const mongoose = require("mongoose");

const userSchema =  mongoose.Schema(
  {
    name: {
      type: String,
     
    },

    email: {
      type: String,
     
    },

    password: {
      type: String,
      
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    
    },

    mobile: {
      type: Number,
      
    },

    ProfileImage: {
      type: String,
    
    },

    role: {
      type: String,
      default: "User"   
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("user", userSchema);
