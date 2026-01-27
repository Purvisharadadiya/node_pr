const Blog = require('../model/blog.model')
const path = require('path');
const fs = require('fs');
const { log } = require('console');
exports.addblogpage = async (req, res) => {
    try {
        return res.render('blog/addblog');

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard');
    }
}
exports.addblog = async (req, res) => {
    try {
        // let imagepath = "";
        let blogImagePath = '';
        let authorImagePath = "";
        if (req.files.blogImage) {
            blogImagePath = `/uploads/${req.files.blogImage[0].filename}`;
        }
        if (req.files.authorImage) {
            authorImagePath = `/uploads/${req.files.authorImage[0].filename}`;
        }

        let blog = await Blog.create({
            ...req.body,
            blogImage: blogImagePath,
            authorImage: authorImagePath,
        })

        console.log(blog);

        req.flash('success', 'Add Blog Sucessfully !!')
        return res.redirect('/blog/view-blog')


    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard');
    }

}

exports.viewblogpage = async (req, res) => {
    try {
        let blogs = await Blog.find();
        console.log(blogs);
        return res.render('blog/viewblog', { blogs })


    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.deleteblog = async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id);
        if (!blog) {
            console.log('Blog is missing');

        }
        if (blog.blogImage != "") {
            let blogImagePath = path.join(__dirname, '..', blog.blogImage);
            fs.unlinkSync(blogImagePath);
        }
        if (blog.authorImage != "") {
            let authorImagePath = path.join(__dirname, '..', blog.authorImage);
            fs.unlinkSync(authorImagePath);
        }
        await Blog.findByIdAndDelete(id);
        req.flash('success', 'Delete Blog Sucessfully !!')
        return res.redirect('/blog/view-blog');
    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}
exports.editblog = async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id);
        return res.render('blog/editblog', { blog })

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.updateblog = async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id);

        if (req.files && req.files.blogImage) {
            if (blog.blogImage != '') {
                let filepath = path.join(__dirname, '..', blog.blogImage)
                try {
                    await fs.unlinkSync(filepath);
                } catch (error) {
                    console.log('file missing');
                }
            }
            filepath = `/uploads/${req.files.blogImage[0].filename}`;
        } else {
            filepath = blog.blogImage;
        }

        let authorfilepath;
        if (req.files && req.files.authorImage) {
            if (blog.authorImage != '') {
                let afilepath = path.join(__dirname, '..', blog.authorImage);
                try {
                    fs.unlinkSync(afilepath);
                } catch (error) {
                    console.log('author image missing');
                }
            }
            authorfilepath = `/uploads/${req.files.authorImage[0].filename}`;
        } else {
            authorfilepath = blog.authorImage;
        }
        await Blog.findByIdAndUpdate(blog._id, {
            ...req.body,
            blogImage: filepath,
            authorImage: authorfilepath
        }, { new: true })

        req.flash('success', 'Update Blog Sucessfully !!')
        return res.redirect('/blog/view-blog')

    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard')
    }
}

exports.viewblog = async (req, res) => {
    try {
        let id = req.params.id;
        let singleview = await Blog.findById(id);
        return res.render('blog/singleview', { singleview });
    } catch (error) {
        console.log(error);
        return res.redirect('/dashboard');
    }
}