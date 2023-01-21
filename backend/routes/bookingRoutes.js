const express = require("express");
const verifyJWT = require('../middlewares/verifyJWT')
const {
  createBooking,
  updateBooking,
  deleteBooking,
  getPersonsBooking,
  getAllBookings,
} = require("../controllers/bookingConroller");
const router = express.Router();



// Get all Bookings
router.get("/", verifyJWT, getAllBookings);

// Get a single PersonsBooking
router.get("/:email", verifyJWT, getPersonsBooking);


// Create a Booking
router.post("/", createBooking);

// Upadate a Booking
router.put("/:id", updateBooking);

// Delete a Booking
router.delete("/:id", deleteBooking);



module.exports = router;
