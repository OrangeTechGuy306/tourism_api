const { createTour, getAllTours, updateTour, deleteTour, getSingleTour } = require("../controllers/tourController")

const router = require("express").Router()


router.get("/tours", getAllTours)
router.get("/tour/:id", getSingleTour)
router.post("/upload/tour", createTour)
router.put("/update/tour/:id", updateTour)
router.delete("/delete/tour/:id", deleteTour)


module.exports=router