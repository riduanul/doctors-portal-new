const express = require("express");
const verifyJWT = require('../middlewares/verifyJWT')
const {
  getBooking,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getPersonsBooking,
} = require("../controllers/bookingConroller");
const router = express.Router();



// Get a PersonsBooking
router.get("/",  getPersonsBooking);


// Get all Bookings
router.get("/", getBookings);



// Create a Booking
router.post("/", createBooking);

// Delete a Booking
router.delete("/", deleteBooking);

// Upadate a Booking
router.put("/", updateBooking);

module.exports = router;
