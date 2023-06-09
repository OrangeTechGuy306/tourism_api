const router = require("express").Router()
const {register, login, getAllUsers, updateUser, deleteUser, getUserInfo, resetPasswordRoute, sendOtp, resetPassword} = require("../controllers/usercontroller")
// const { verifyAdminUser } = require("../utils/verifyToken")



router.post("/register/user", register)
router.post("/login/user", login)
router.post("/auth/forgotpassword", sendOtp)

router.get("/auth/resetpass/:userId/:token", resetPasswordRoute)
router.post("/resetpassword/:userId/:token", resetPassword)

router.get("/user/:id", getUserInfo)
router.get("/users",  getAllUsers)
router.put("/update/user/:id",updateUser)
router.delete("/delete/user/:id", deleteUser)



module.exports = router