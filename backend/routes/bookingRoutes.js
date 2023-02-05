const express = require("express");
const verifyJWT = require('../middlewares/verifyJWT')
const verifyAdmin = require('../middlewares/verifyAdmin')
const {
  createBooking,
  updateBooking,
  deleteBooking,
  getPersonsBooking,
  getAllBookings,
  tempUpdate,
  getABooking,
  paymentWithStripe,
  statusUpdate,
} = require("../controllers/bookingConroller");
const { verify } = require("jsonwebtoken");
const router = express.Router();




// Create a Booking
router.post("/", createBooking);

// Get all Bookings
router.get("/", verifyJWT, getAllBookings);

// //get a booking
// router.get("/:id", getABooking)

// Get a single PersonsBooking
router.get("/single",  getPersonsBooking);

//update Status
router.put('/updateStatus/:id',  statusUpdate)

// Delete a Booking
router.delete("/:id", deleteBooking);




module.exports = router;
