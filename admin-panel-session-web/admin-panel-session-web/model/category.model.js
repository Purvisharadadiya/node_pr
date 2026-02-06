const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    Categoryname: {
        type: String
    },
    CategoryImage: {
        type: String
    }   
},
{
versionKey: false,
timestamps: true
});

module.exports = mongoose.model('category', categorySchema);