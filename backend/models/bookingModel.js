const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  treatmentId: {
    type: Number,
  },
  treatmentType: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    trim: true,
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
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
