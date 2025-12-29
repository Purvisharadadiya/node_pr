const BlogModel = require('../model/Blog.model')

exports.AddBlogpage = async (req, res) => {
    try {

        return res.render("Blog/Add-Blog")

    }
    catch (error) {
        console.log("error")

        return res.redirect("/");
    }

}

exports.AddBlog = async (req, res) => {
    try {
        let imgpath = ""
        if (req.file) {
            imgpath = `/uploads/${req.file.filename}`
            console.log(req.file)
        }

        let Blog = await BlogModel.create({
            ...req.body,
            image: imgpath
        })
        return res.render("Blog/Add-Blog")

    }

    catch (error) {
        console.log("error")

        return res.redirect("/");
    }

}