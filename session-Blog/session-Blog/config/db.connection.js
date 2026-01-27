const mongoose = require('mongoose')
const dbconnect = () => {
    mongoose.connect('mongodb+srv://purvisharadadiya:purvisha3110@cluster0.lonolu3.mongodb.net/Blog-Admin-panel-session')
        .then(() => console.log('DB is Connected !!!'))
        .catch((error) => console.log(error))
}

module.exports = dbconnect;