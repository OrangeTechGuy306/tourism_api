const Bookings = require("../models/bookingmodel")




module.exports.createBookings = async (req,res, next)=>{

    const {payment_for, profile, first_name, last_name, email, mobile, amount, date_paid, expired_date, userId, ref,tour_id} =req.body

    try {
        const booking = await Bookings.create({
            payment_for,  profile, first_name, last_name, email, mobile, date_paid, expired_date, ref, amount, userId,tour_id
        })
       return res.json({status:true, msg: "You have successfully booked for the trip"})
    } catch (error) {
        next(error)
    }
}

// GET ALL BOOKINGS FOR A SINGLE USER
module.exports.getUserBookings = async (req,res, next)=>{

    try {
      const singleBookings = await Bookings.find({userId:req.params.id})
       return res.json({status:true, msg:singleBookings})
    } catch (error) {
        next(error)
    }
}

// CHECK USER'S CURRENT BOOKING STATUS
module.exports.CheckUserBooking = async (req,res, next)=>{

    const {id,userId} = req.params

    try {
      const userBooking = await Bookings.findOne({tour_id:id, userId:userId})
      if(userBooking > 0){
          return res.json({status:false, msg:"It is either you are not Login or Alright book for this tour"})
      } else{
        return res.json({status:true, msg:userBooking})
      }
    } catch (error) {
        next(error)
    }
}


// SHOWING ALL DETAILS FOR SINGLE BOOKING
module.exports.bookingDetails = async (req,res, next)=>{

    const {id} = req.params

    try {
      const userBooking = await Bookings.findOne({_id:id})
        return res.json({status:true, msg:userBooking})
    } catch (error) {
        next(error)
    }
}




module.exports.updateBookings = async (req,res, next)=>{

    try {
       await Bookings.findByIdAndUpdate(req.params.id, {$set:req.body})
       return res.json({status:true, msg: "You have successfully updated your booking"})
    } catch (error) {
        next(error)
    }
}

module.exports.deleteBooking = async (req,res, next)=>{

    try {
        await Bookings.findByIdAndDelete(req.params.id)
       return res.json({status:true, msg: "Booking deleted successfully"})
    } catch (error) {
        next(error)
    }
}

module.exports.getAllBookings = async (req,res, next)=>{

    try {
        const allBookings = await Bookings.find()
        if(allBookings.length > 0){
            return res.json({status:true, msg: allBookings})
        }else{
            return res.json({status:false, msg: "No bookings"})
        }
    } catch (error) {
        next(error)
    }
}
