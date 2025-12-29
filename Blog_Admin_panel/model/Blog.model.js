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
    image: {
        type: String
    },
    Status: {
        type: String
    }
})
module.exports = mongoose.model('Blog', Blogschema)