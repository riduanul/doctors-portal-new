const Booking = require("../models/bookingModel");
const mongoose = require("mongoose");




//Get All Bookings
const getAllBookings = async (req, res) => {

  const allBookings = await Booking.find({});
  res.status(200).json({
    allBookings,
  });
};


// Get A Single Person's Booking
const getPersonsBooking = async (req, res) => {
  const email = req.query.email;
  const decodedEmail = req.decoded.email;
  if(email !== decodedEmail){
    return res.status(403).json({message: "forbidden access!"})
  }
  const booking = await Booking.find({ patientEmail: decodedEmail });
  
  if (booking) {
    res.status(200).json({
      booking,
    });
  } else {
    res.status(500).json({
      error: "No such a booking Found!",
    });
  }
};



// Create a New Booking
const createBooking = async (req, res) => {
  const { bookingData } = req.body;

  const {
    treatmentId,
    treatmentType,
    date,
    slot,
    patientEmail,
    patientName,
    phoneNumber,
  } = bookingData;

  const query = {
    treatmentType: treatmentType,
    date: date,
    patientEmail: patientEmail,
  };
  try {
    const exist = await Booking.findOne(query);
    if (exist) {
      return res.status(208).json({
        success: false,
        message: `${patientName} has alrady an appointment on ${exist.date} at ${exist.slot}`,
        booking: exist,
      });
    }

    const booking = await Booking.create({
      treatmentId,
      treatmentType,
      date,
      slot,
      patientEmail,
      patientName,
      phoneNumber,
    });
    res.status(200).json({
      success: true,
      booking,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};


// Update a Booking

const updateBooking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      error: "Invalid Id",
    });
  }
  const booking = await Booking.findByIdAndUpdate(
    {
      _id: id,
    },
    { ...req.body }
  );
  if (booking) {
    res.status(200).json({
      message: "Successfully Updated!",
    });
  } else {
    res.status(400).json({
      error: "No such a Booking!",
    });
  }
};

// Delate a Booking

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      message: "Invalid Id",
    });
  }

  const booking = await Booking.findOneAndDelete({ _id: id });
  if (booking) {
    res.status(200).json({
      memssage: "Successfully Delated!",
    });
  } else {
    res.status(400).json({
      error: "No such a Booking!",
    });
  }
};

module.exports = {
  getAllBookings,
  getPersonsBooking,
  createBooking,
  deleteBooking,
  updateBooking,
};
