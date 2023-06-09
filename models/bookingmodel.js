const mongoose = require("mongoose")


const bookingSchema = new mongoose.Schema({
    profile:{type:String, required:true},
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true},
    mobile:{type:Number, required:true},
    amount:{type:Number, required:true},
    date_paid:{type:String, required:true},
    expired_date:{type:String, required:true},
    payment_for: {type:String, required:true},
    tour_id: {type:String, required:true},
    userId:{required:true, type:String},
    ref:{type:Number, required:true},
}, {timestamps: true})

module.exports = mongoose.model("Bookings", bookingSchema)


