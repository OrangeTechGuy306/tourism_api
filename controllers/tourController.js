const Tours = require("../models/tourmodel")


module.exports.createTour = async(req,res,next)=>{

    const {destination, image, price, duration, date, desc} = req.body
    try {
         const tour = await Tours.create({
            destination, image, price, duration, date, desc,
        })

        if(tour) return res.json({status:true, msg:tour})
    } catch (error) {
        next(error)
    }
}

module.exports.getAllTours = async(req,res,next)=>{

    try {

        const tour = await Tours.find()
        return res.json({status:true, msg:tour})
      
      
    } catch (error) {
        next(error)
    }
}

module.exports.getSingleTour = async(req,res,next)=>{

    try {
        const tour = await Tours.findById(req.params.id)
        return res.json({status:true, msg:tour})
    } catch (error) {
        next(error)
    }
}

module.exports.updateTour = async(req,res,next)=>{

    try {
        const updateTour = await Tours.findByIdAndUpdate(req.params.id,{
         $set:req.body
        })

        if(updateTour) return res.json({status:true, msg:"Your tour as been updated successfully"})
      
    } catch (error) {
        next(error)
    }
}


module.exports.deleteTour = async(req,res,next)=>{

    try {
        const deleteTour = await Tours.findByIdAndDelete(req.params.id)

        if(deleteTour) return res.json({status:true, msg:"Tour deleted successfully"})
      
    } catch (error) {
        next(error)
    }
}