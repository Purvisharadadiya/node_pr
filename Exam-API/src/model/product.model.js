const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
   
  },
  description: {
    type: String
  },
  price: {
    type: Number,
   
  },
 image: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
