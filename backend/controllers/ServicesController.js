const Services = require("../models/servicesModel");
const mongoose = require("mongoose");

const Booking = require("../models/bookingModel");
// get All Services
const getServices = async (req, res) => {
  const services = await Services.find({});
  res.status(200).json({
    services,
  });
};
//Special Appointment Options
const appointmentSpeciality = async(req, res)=> {
  try {
    let result = await Services.find({}).select('name _id');
    if (!result || result.length === 0) {
      result = [
        { name: "Teeth Cleaning & Hygiene" },
        { name: "Cosmetic Dentistry" },
        { name: "Teeth Whitening" },
        { name: "Cavity Protection & Fillings" },
        { name: "Pediatric Dental Care" },
        { name: "Oral Surgery & Extractions" }
      ];
    }
    res.status(200).json({ result });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

// Get a single Service
const getService = async (req, res) => {
  const { id } = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Service" });
  }
  const service = await Services.findById(id);
  if (!service) {
    return res.status(404).json({
      error: "No such service",
    });
  } else {
    res.status(200).json({
      service,
    });
  }
};
// create a new service
const createService = async (req, res) => {
  const { name, slots } = req.body;

  // add doc to db
  try {
    const service = await Services.create({ name, slots });
    res.status(200).json({
      service,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
// Get remaining data after booking
const getAvailableServices = async (req, res) => {
  try {
    const date = req.query.date;
    let services = await Services.find().lean();

    // Auto-seed default services if DB is empty
    if (!services || services.length === 0) {
      const defaultServices = [
        {
          name: "Teeth Cleaning & Hygiene",
          price: 49,
          slots: [
            "08:00 AM - 08:30 AM",
            "09:00 AM - 09:30 AM",
            "10:00 AM - 10:30 AM",
            "11:00 AM - 11:30 AM",
            "02:00 PM - 02:30 PM",
            "03:00 PM - 03:30 PM",
            "04:00 PM - 04:30 PM",
            "05:00 PM - 05:30 PM"
          ]
        },
        {
          name: "Cosmetic Dentistry",
          price: 120,
          slots: [
            "09:00 AM - 09:45 AM",
            "10:00 AM - 10:45 AM",
            "11:00 AM - 11:45 AM",
            "02:00 PM - 02:45 PM",
            "03:00 PM - 03:45 PM",
            "04:00 PM - 04:45 PM"
          ]
        },
        {
          name: "Teeth Whitening",
          price: 79,
          slots: [
            "08:30 AM - 09:15 AM",
            "10:30 AM - 11:15 AM",
            "01:30 PM - 02:15 PM",
            "03:30 PM - 04:15 PM"
          ]
        },
        {
          name: "Cavity Protection & Fillings",
          price: 95,
          slots: [
            "09:00 AM - 09:30 AM",
            "10:00 AM - 10:30 AM",
            "11:30 AM - 12:00 PM",
            "02:30 PM - 03:00 PM",
            "04:30 PM - 05:00 PM"
          ]
        },
        {
          name: "Pediatric Dental Care",
          price: 65,
          slots: [
            "08:00 AM - 08:45 AM",
            "09:30 AM - 10:15 AM",
            "11:00 AM - 11:45 AM",
            "02:00 PM - 02:45 PM",
            "04:00 PM - 04:45 PM"
          ]
        },
        {
          name: "Oral Surgery & Extractions",
          price: 220,
          slots: [
            "10:00 AM - 11:00 AM",
            "01:00 PM - 02:00 PM",
            "03:00 PM - 04:00 PM"
          ]
        }
      ];
      await Services.insertMany(defaultServices);
      services = await Services.find().lean();
    }

    const query = { date: date };
    const bookings = await Booking.find(query);

    services.forEach((service) => {
      const serviceBookings = bookings.filter(
        (book) => book.treatmentType === service.name
      );
      const bookedSlots = serviceBookings.map((book) => book.slot);
      const availableSlots = (service.slots || []).filter(
        (slot) => !bookedSlots.includes(slot)
      );
      service.slots = availableSlots;
    });

    res.status(200).json({
      services,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// delete a service
const deleteService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such service" });
  }

  const service = await Services.findOneAndDelete({ _id: id });
  if (service) {
    res.status(200).json({
      message: "Deleted Successfully!",
    });
  } else {
    res.status(400).json({
      error: "No such service",
    });
  }
};
// update a service
const updateService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such service" });
  }

  const service = await Services.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!service) {
    return res.status(404).json({
      error: "No such service",
    });
  } else {
    res.status(200).json({
      message: "Updated Successfully!",
    });
  }
};

//Temporari field update
const tempUpdate = async(req, res) => {
  const filter = {}
 options= {upsert: true}
  const updateDoc = {
    $set: {
      price: 99
    }
  }
  const result = await Services.updateMany(filter, updateDoc, options);
  res.send(result);
}



module.exports = {
  createService,
  getServices,
  getService,
  deleteService,
  updateService,
  getAvailableServices,
  appointmentSpeciality,
  tempUpdate,
};
