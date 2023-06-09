const Admins = require("../models/adminmodel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


module.exports.newAdminReg = async(req, res, next)=>{

    const {profile, first_name, last_name, email, password} = req.body
   
    try {

        const confirmEmail = await Admins.findOne({email})
        if(confirmEmail) return res.json({status:false, msg:"Email already registered"})

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        const newAdmin = await Admins.create({profile, first_name, last_name, email, password:hashPassword})

        if(newAdmin) return res.json({status:true, msg:newAdmin})

    } catch (error) {
        next(error)
    }
}


module.exports.adminLogin = async(req, res, next)=>{

    const {userEmail, userpassword} = req.body

    try {
        const admin = await Admins.findOne({email:userEmail})
        if(!admin) return res.json({status:false, msg: "Email is not registered"})

        const confirmPass = await bcrypt.compare(userpassword, admin.password)
        if(!confirmPass) return res.json({status:false, msg:"Email or password not correct"})

        await Admins.findOneAndUpdate({email:userEmail},{$set:{isAdmin:true}})

        const token =jwt.sign({admin_id:admin._id, isAdmin:admin.isAdmin}, process.env.TOKEN_KEY)

        const {password, ...adminDetails} = admin._doc
        // res.json({status:true, ...adminDetails})
        res.cookie("admin_token",token,{httpOnly:true}).json({status:true, ...adminDetails})

    } catch (error) {
        next(error)
    }
}


module.exports.getAllAdmins = async(req, res, next)=>{


    try {
        const admins = await Admins.find()
        res.json({status:true, msg:admins})

    } catch (error) {
        next(error)
    }
}


module.exports.updateAdmin = async(req, res, next)=>{

    try {
        const updateAdmin = await Admins.findByIdAndUpdate(req.params.id,{$set:req.body})
        if(updateAdmin)  return res.json({status:true, msg:"admin updated successfully"})

    } catch (error) {
        next(error)
    }
}

module.exports.deleteAdmin = async(req, res, next)=>{

    try {
        const delAdmin = await Admins.findByIdAndDelete(req.params.id)
        if(delAdmin)  return res.json({status:true, msg:"you deleted admin"})

    } catch (error) {
        next(error)
    }
}