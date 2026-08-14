const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  treatmentId: {
    type: String,
  },
  treatmentType: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
    trim: true,
  },
  patientName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status:{
    type: String,
    enum: ["pending", "done", "ongoing"],
    default:"pending"
  },
  price: {
    type: Number,
    default: 150
  },
  paid: {
    type: Boolean,
    default: false
  },
  transactionId: {
    type: String,
    default: ""
  }
 
});



module.exports = mongoose.model("Booking", bookingSchema);
