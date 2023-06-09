const Users = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { transporter } = require("../utils/message")



// USER REGISTRATION CONTROLLER
module.exports.register = async(req, res, next)=>{
    const {
        profile,first_name, last_name, email, mobile, state, gender, password
    } = req.body

    try {
        const userEmailCheck = await Users.findOne({email})
        if(userEmailCheck) return res.json({status:false, msg: "Email already exist"})
    
        const useMobileCheck = await Users.findOne({mobile:mobile})
        if(useMobileCheck) return res.json({status:false, msg: "Mobile No. already exist"})
    
        const salt = bcrypt.genSaltSync(10)
        const hashpassword = bcrypt.hashSync(password, salt)
    
    
        await Users.create({
            profile, first_name, last_name, email,  mobile, state,gender, password:hashpassword
        })
        // const user =  await Users.save()
        return res.json({status:true, msg: "Registration successful!"})

    } catch (error) {
        next(error)
    }

   

}


// USER LOGIN CONTROLLER
module.exports.login = async(req, res, next)=>{
    const {email,  userpassword} = req.body

    try {
        const user= await Users.findOne({email})
        if(!user) return res.json({status:false, msg: "Email not registered"})
    
        const userpassCheck = await bcrypt.compare(userpassword, user.password)
        if(!userpassCheck) return res.json({status:false, msg: "Username or password not correct!"})

        const token =  jwt.sign({userId:user._id}, process.env.TOKEN_KEY)

        const {password, ...data} = user._doc
        // return res.json({status:true,...data})
        return res.cookie("access_token", token,{httpOnly:true}).json({status:true,...data})

    } catch (error) {
        next(error)
    }

   

}


// SENDING OTP TO THE USER FOR PASSWORD RESETTING
module.exports.sendOtp = async(req, res, next)=>{
    
    const {email} = req.body
    // const randomNumber = Math.ceil(Math.random() * 9999 + 1000 )

    try {
        const user= await Users.findOne({email:email})
        if(!user) return res.json({status:false, msg: "Email not registered"})

        const token = jwt.sign({userId:user.email}, process.env.PASSWORD_AUTH_TOKEN_KEY,{expiresIn:"1d"})
        const updateToken = await Users.findByIdAndUpdate({_id:user._id},{verifyToken:token}, {new:true})

        if(!updateToken){
            res.json({status:false, msg:"There was a problem while trying to change your password"})
        } else{
            mailOption={
                from: "Orange Coding Academy",
                to:email,
                subject: "One time password",
                text:`http://localhost:3000/resetpassword/${user._id}/${token}` 
            }
            transporter.sendMail(mailOption, (err, info)=>{
                    if(err){
                        res.json({status:false, msg:"Message not sent"})
                    }else{
                        res.json({status:false, msg:"Message sent"})
                    }
            })
        }

    } catch (error) {
        next(error)
    }

   

}

// RESETTING PASSWORD FOR THE USER
module.exports.resetPasswordRoute = async(req, res, next)=>{

    const {userId,token} = req.params
    try {
        const user= await Users.findOne({_id:userId, verifyToken:token})
        if(!user) return res.json({status:false, msg: "The link is either broken or invalid"})

        const verifyToken = jwt.verify(token, process.env.PASSWORD_AUTH_TOKEN_KEY)
        if(user && verifyToken.userId){
            res.json({status:true, msg: "You only have 2minutes to validate your password"})
        } else{
            res.json({status:false, msg:"User does not exist"})
        }

    } catch (error) {
        next(error)
    }

}


module.exports.resetPassword = async(req, res, next)=>{

    const {userId, token} = req.params
    const {password} = req.body
    try {
        const user= await Users.findOne({_id:userId, verifyToken:token})
        if(!user) return res.json({status:false, msg: "User or token not valid"})

        const verifyToken = jwt.verify(token, process.env.PASSWORD_AUTH_TOKEN_KEY)
        if(user && verifyToken.userId){
         const hashpassword = await bcrypt.hash(password, 10)
         await Users.findByIdAndUpdate({_id:user._id},{password:hashpassword})
         res.json({status:true, msg:"Password successfully changed"})
        } else{
            res.json({status:false, msg:"Token expired! Please resend the link"})
        }

    } catch (error) {
        next(error)
    }

}


// GETIING A SINGLE USER INFORMATION
module.exports.getUserInfo = async(req, res, next)=>{

    try {
        const user= await Users.findById(req.params.id)
        res.json({status:true, msg: user})
    } catch (error) {
        next(error)
    }

}


// FETCHING ALL USERS BY THE ADMIN
module.exports.getAllUsers = async(req, res, next)=>{

    try {
        const allUsers= await Users.find()
        res.json({status:true, msg: allUsers})
    } catch (error) {
        next(error)
    }

}

// UPDATING A SINGLE USER
module.exports.updateUser = async(req, res, next)=>{

    try {
        const updateUser= await Users.findByIdAndUpdate(req.params.id,{$set: req.body})
        res.json({status:true, msg: updateUser})
    } catch (error) {
        next(error)
    }

}

// DELETING A USER
module.exports.deleteUser = async(req, res, next)=>{

    try {
        const deleteUser = await Users.findByIdAndDelete(req.params.id)
        res.json({status:true, msg: "User deleted successfully"})
    } catch (error) {
        next(error)
    }

}

