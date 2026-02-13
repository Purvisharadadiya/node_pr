const mongoose = require("mongoose");

const EmployeeSchema =  mongoose.Schema(
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
      default: "Employee"   
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
