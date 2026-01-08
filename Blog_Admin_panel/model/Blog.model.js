const mongoose = require('mongoose')

const Blogschema = mongoose.Schema({


    title: {
        type: String
    },
    short_desc: {
        type: String
    },

    content: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String
    },


})
module.exports = mongoose.model('Blog', Blogschema)