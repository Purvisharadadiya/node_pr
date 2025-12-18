const express = require("express");
const routes =express.Router()
const { getdata, adddata, deletdata, editdata, updetdata } = require("../controller/book_conntroller");


routes.get("/",getdata)
routes.post("/add-book", adddata)
routes.get("/delete_book/:id", deletdata)
routes.get("/edit_book/:id", editdata)
routes.post("/update_book/:id", updetdata)

module.exports=routes


