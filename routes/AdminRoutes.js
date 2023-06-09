const { newAdminReg, adminLogin, getAllAdmins, updateAdmin, deleteAdmin } = require("../controllers/adminController")
// const { verifyAdminUser } = require("../utils/verifyToken")

const router = require("express").Router()



router.get("/admins", getAllAdmins)
router.post("/admin/login", adminLogin)
router.post("/new/admin",  newAdminReg)
router.put("/update/admin/:id", updateAdmin)
router.delete("/delete/admin/:id",  deleteAdmin)



module.exports = router