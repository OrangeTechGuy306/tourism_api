const { createBookings, updateBookings, deleteBooking, getAllBookings, getUserBookings, CheckUserBooking, bookingDetails } = require("../controllers/bookingController")

const router = require("express").Router()


router.post("/book", createBookings)

router.get("/mybookings/:id", getUserBookings)
router.get("/booking/info/:id", bookingDetails)

router.get("/checkbookings/:id/:userId", CheckUserBooking)

router.put("/update/booking/:id", updateBookings)
router.delete("/delete/booking/:id", deleteBooking)
router.get("/bookings", getAllBookings)





module.exports = router