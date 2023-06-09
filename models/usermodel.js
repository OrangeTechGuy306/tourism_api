const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    profile:{type:String, required:true},
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    mobile:{type:Number, required:true, unique:true},
    state:{type:String, required:true},
    gender:{type:String, required:true},
    password:{type:String, required:true},
    verifyToken:{type:String}
}, {timestamps: true})

module.exports = mongoose.model("Users", userSchema)


