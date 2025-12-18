const mongoose= require("mongoose")
const Book = require("../model/book.stor.model");
exports.getdata=(req, res) => {
    Book.find()
        .then((books) => {
            res.render("book_stor", { books });
        })
        .catch((err) => console.log(err));
};

exports.adddata=(req, res) => {
    Book.create(req.body)
        .then(() => res.redirect("/"))
        .catch(err => console.log(err));
};

exports.deletdata= async (req, res) => {
    try {
        let id = req.params.id
        let deletebooks = await Book.findByIdAndDelete(id);
        console.log("delete id", deletebooks)
        if(!deletebooks){
            console.log("deltet book not found ....")
        }
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.send("Delete error");
    }
};
exports.editdata=async (req, res) => {
    try {
        let id = req.params.id;
        let books = await Book.findById(id)
        console.log("Edit book", books)
        if (!books) {
            console.log("Edit books not found...")
            return res.redirect("/")
        }
        else {
            return res.render("edit_book", { books })
        }
    } catch (error) {
        console.log(error);
        res.send("edit  error");
    }
};

exports.updetdata=async (req, res) => {
    try {
        let id = req.params.id;
        let updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true }
        );

        if (!updatedBook) {
            console.log("Update book not found...");
            return res.redirect("/");
        }
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        res.send("Update error");
    }
}