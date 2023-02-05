const Booking = require("../models/bookingModel");
const User = require('../models/userModel')
const mongoose = require("mongoose");

const stripe = require("stripe")(process.env.STRIPE_SK);


// Create a New Booking
const createBooking = async (req, res) => {
  const { bookingData } = req.body;
console.log(bookingData)
  const {
    treatmentId,
    treatmentType,
    date,
    slot,
    price,
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
      price,
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

//Get All Bookings
const getAllBookings = async (req, res) => {

  const allBookings = await Booking.find({});
  res.status(200).json({
    allBookings,
  });
};


// Get a booking
const getABooking = async(req, res) => {
  const id = req.params.id;
  const query = {_id: id};
  const result = await Booking.findOne(query)
 if(result){
  res.status(200).json({
    result
  })
 }else {
  res.status(500).json({
    message: "no such a booking!"
  })
 }
}


// Get A Single 's Booking
const getPersonsBooking = async (req, res) => {
  const email = req.query.patientEmail;
  const booking = await Booking.find({ patientEmail: email });
 
  res.status(200).json({
      booking,
    });
 
};



// Delete a Booking
const deleteBooking = async (req, res) => {
  const id = req.params.id;
    const filter = {_id : id};
    const result = await Booking.deleteOne(filter);
    res.status(200).json({
        result
    })
};

// //Stripe Payment
// const paymentWithStripe = async(req, res) => {
//   const price = req.body.price;
  
//   const amount = price * 100;
//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     currency: "usd",
//     amount:amount,
//     "payment_method_types":[
//       "card"
//     ]

//   })
//   res.status(200).json({
//     clientSecret: paymentIntent.client_secret,
//   }) 
// }



// update Status

const statusUpdate = async(req, res) => {
 
  const status = req.body.status;

  const id = req.params.id;
  
  const filter = {_id : id}
  const options = {upsert: true};
  const updateDoc = {
    $set: {
      status: status,
    }
  }

const result = await Booking.updateOne(filter, updateDoc, options);

if(result){
  res.status(200).json({result, message:"Status Successfully Updated as an Admin"})
} else {
  res.statu(403).json({error:"Something wrong!"})
}

}

module.exports = {
  createBooking,
  getAllBookings,
  getABooking,
  getPersonsBooking,
  statusUpdate,
  deleteBooking,
  
};

