const mongoose = require("mongoose");

const adminSchema =  mongoose.Schema(
  {
   username: {
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
      enum: ["Male", "Female"],
      required: true,
    },

    image: {
      type: String, 
     
    },

}
  
);

module.exports = mongoose.model("Admin", adminSchema);
