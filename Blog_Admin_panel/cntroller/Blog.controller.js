const BlogModel = require('../model/Blog.model')

const path = require("path");
const fs = require("fs");

exports.AddBlogpage = async (req, res) => {
    try {

        return res.render("Blog/Add-Blog")

    }
    catch (error) {
        console.log("error")

        return res.redirect("/");
    }

}



exports.BlogView = async (req, res) => {
    try {

        let search = req.query.search || "";

        let Blog = await BlogModel.find({
            title: { $regex: search, $options: "i" }
        });

        return res.render("Blog/view-Blog", { Blog, search });

    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};


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
        return res.redirect("/Blog/view-Blog")

    }

    catch (error) {
        console.log("error")

        return res.redirect("/");
    }

}

exports.singlBlog = async (req, res) => {
    try {
        let id = req.params.id;

        let Blog = await BlogModel.findById(id);

        if (!Blog) {
            return res.redirect("/Blog/view-Blog");
        }


        Blog.views = (Blog.views || 0) + 1;
        await Blog.save();

        return res.render("Blog/single-Blog", { Blog });

    } catch (error) {
        console.log(error);
        return res.redirect("/Blog/view-Blog");
    }
};


exports.deleteBlog = async (req, res) => {
    try {
        let id = req.params.id;
        let Blog = await BlogModel.findById(id);
        if (!Blog) {
            console.log("admin not found");
        }

        let filepath = "";
        if (Blog.image != "") {
            filepath = path.join(__dirname, "..", Blog.image);
        }

        try {
            await fs.unlinkSync(filepath);
        }
        catch (err) {
            console.log("fille is missing");
        }
        await BlogModel.findByIdAndDelete(id);
        return res.redirect("/Blog/view-Blog");
    }
    catch (err) {
        console.log(err);
        return res.redirect("/dashboard");
    }
}

exports.editBlog = async (req, res) => {
    try {
        let id = req.params.id;
        let Blog = await BlogModel.findById(id);

        return res.render("Blog/edit-Blog", { Blog });
    }

    catch (err) {
        console.log(err);
        return res.redirect("/dashboard");
    }
};



exports.updateBlog = async (req, res) => {
    try {
        let Blog = await BlogModel.findById(req.params.id);
        if (!Blog) {
            console.log("admin not found");
        }
        let filepath = "";
        if (req.file) {
            if (Blog.image != "") {
                filepath = path.join(__dirname, "..", Blog.image);
                try {
                    await fs.unlinkSync(filepath);
                }
                catch (err) {
                    console.log("file is missing");
                }
            }

            filepath = `/uploads/${req.file.filename}`;
        }
        else {
            filepath = Blog.image;
        }
        Blog = await BlogModel.findByIdAndUpdate(Blog._id, { ...req.body, image: filepath }, { new: true });
        if (Blog) {
            return res.redirect("/Blog/view-Blog");
        }
    }
    catch (err) {
        console.log(err);
    }

}
