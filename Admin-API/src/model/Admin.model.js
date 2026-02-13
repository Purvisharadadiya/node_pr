const mongoose = require("mongoose");

const adminSchema =  mongoose.Schema(
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
      default: "Admin"   
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Admin", adminSchema);
