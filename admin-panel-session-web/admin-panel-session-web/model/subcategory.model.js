const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    SubCategoryName: {
        type: String
    }
})

module.exports = mongoose.model('subcategory', subcategorySchema);