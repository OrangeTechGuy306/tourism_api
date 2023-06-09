const mongoose = require("mongoose")


const tourSchema = new mongoose.Schema({
    destination:{type:String, required:true},
    image:{type:String, required:true},
    price:{type:Number, required:true},
    duration:{type:String, required:true},
    date:{type:Date, required:true},
    desc:{type:String, required:true},
},{timestamps: true})

module.exports = mongoose.model("Tours", tourSchema)


