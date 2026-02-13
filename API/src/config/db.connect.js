const mongoose = require('mongoose');

const dbconnect = () => {
    mongoose.connect('mongodb+srv://purvisharadadiya:purvisha3110@cluster0.lonolu3.mongodb.net/API-CRUD')
        .then(() => { console.log('database is connected') })
        .catch((err) => { console.log(err) })
}
module.exports = dbconnect;