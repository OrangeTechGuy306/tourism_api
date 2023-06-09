const { getAllBlogs, getSingleBlog, deleteBlog, updateBlog, uploadBlog } = require("../controllers/blogController")
const { verifyAdminUser } = require("../utils/verifyToken")

const router = require("express").Router()



router.post("/upload/blog",  uploadBlog)
router.get("/blogs",  getAllBlogs)
router.get("/blog/:id",  getSingleBlog)
router.put("/update/blog/:id",  updateBlog)
router.delete("/delete/blog/:id",  deleteBlog)


module.exports = router