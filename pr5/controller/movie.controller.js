const Movie = require("../model/movie.model");
const fs = require("fs");
const path = require("path");



exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.render("index", { movies });
  } catch (error) {
    console.log(error);
    return res.send("Error loading movies");
  }
};


exports.addMoviePage = (req, res) => {
  return res.render("add-movie");
};


exports.addMovie = async (req, res) => {
  try {
    let poster = "";

    if (req.file) {
      poster = `/uploads/${req.file.filename}`;
    }

    await Movie.create({
      ...req.body,
      poster: poster
    });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send("Error adding movie");
  }
};



exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie?.poster) {
      const imgPath = path.join(__dirname, "..", "uploads", path.basename(movie.poster)
      );

      try {
        fs.unlinkSync(imgPath);
      } catch (e) {
        console.log("file already deleted");
      }
    }

    await Movie.findByIdAndDelete(req.params.id);

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send("Delete error");
  }
};


exports.editMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    return res.render("movies-edit", { movie });
  } catch (error) {
    console.log(error);
    res.send("Edit error");
  }
};


exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.send("Movie not found");

    let poster = movie.poster;


    if (req.file) {
      if (movie.poster) {
        const oldPath = path.join(__dirname, "..", "uploads",
          path.basename(movie.poster)
        );

        try {
          fs.unlinkSync(oldPath);
        } catch (e) {
          console.log("Old image missing");
        }
      }

      poster = `/uploads/${req.file.filename}`;
    }

    await Movie.findByIdAndUpdate(req.params.id, {
      ...req.body,
      poster
    });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send("Update error");
  }
};
