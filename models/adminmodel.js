const mongoose = require("mongoose")


const adminSchema = new mongoose.Schema({
    profile:{type:String, required:true},
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    isAdmin: {type:Boolean, default:false}
}, {timestamps: true})

module.exports = mongoose.model("Admins", adminSchema)


