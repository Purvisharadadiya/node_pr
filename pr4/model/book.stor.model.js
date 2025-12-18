const mongoose = require("mongoose");

const bookStoreSchema = new mongoose.Schema({
    bookName: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number,
    description: String,
    img :String,
    
});

module.exports = mongoose.model("Book", bookStoreSchema);
