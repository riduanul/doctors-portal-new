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
    type: Number,
    required: true,
  },
  status:{
    type: String,
    enum: ["pending", "done", "ongoing"],
    default:"pending"
  }
 
});



module.exports = mongoose.model("Booking", bookingSchema);
