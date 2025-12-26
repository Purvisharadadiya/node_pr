const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  language: String,
  description: String,
  poster: String,
 
  
});

module.exports = mongoose.model("Movie", movieSchema);
