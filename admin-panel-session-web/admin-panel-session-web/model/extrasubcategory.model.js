const mongoose = require("mongoose");

const extrasubcategorySchema = new mongoose.Schema({
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    SubCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subcategory"
    },
    ExtraSubCategoryname:{
        type: String
    }

});

module.exports = mongoose.model('extrasubcategory', extrasubcategorySchema);