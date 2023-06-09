const Blogs = require("../models/blogmodel")



module.exports.uploadBlog = async(req,res, next)=>{
    const {title, desc, image} = req.body

    try {
        const blogUpload = await Blogs.create({title, desc, image})
        if(blogUpload) return res.json({status:true, msg: "blog uploaded successful"})
        else{
            return res.json({status:false, msg: "something went wrong"})
        }
    } catch (error) {
        next(error)
    }
}


module.exports.getSingleBlog = async(req,res, next)=>{

    try {
        const blog = await Blogs.findById(req.params.id)
       res.json(blog)
    } catch (error) {
        next(error)
    }
}


module.exports.getAllBlogs = async(req,res, next)=>{

    try {
        const blogs = await Blogs.find()
       res.json(blogs)
    } catch (error) {
        next(error)
    }
}


module.exports.deleteBlog = async(req,res, next)=>{

    try {
        const deleteBlog = await Blogs.findByIdAndDelete(req.params.id)
        if(deleteBlog) res.json({status:true, msg: "Blog deleted successfully"})

    } catch (error) {
        next(error)
    }
}


module.exports.updateBlog = async(req,res, next)=>{

    try {
        
        const updateBlog = await Blogs.findByIdAndUpdate(req.params.id, {$set:req.body})
        if(updateBlog) res.json({status:true, msg: "Blog updated successfully"})

    } catch (error) {
        next(error)
    }
}