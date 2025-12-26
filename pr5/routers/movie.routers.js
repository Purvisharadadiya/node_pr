const express = require("express");
const { getAllMovies, addMovie,deleteMovie, editMovie, updateMovie,addMoviePage
} = require("../controller/movie.controller");
const uploadSImage = require("../middeware/uplodfile");

const router = express.Router();

router.get("/", getAllMovies);        
 
router.get("/add-movie",  addMoviePage);
router.post("/movie-add", uploadSImage.single("poster"), addMovie);
router.get("/movies-delete/:id", deleteMovie);
router.get("/movies-edit/:id", editMovie);
router.post("/movies-update/:id", uploadSImage.single("poster"),updateMovie);

module.exports = router;
