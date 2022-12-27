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

// Get a single Service
const getService = async (req, res) => {
  const { id } = req.params;
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
  const date = req.query.date;
  const services = await Services.find();

  const query = { date: date };
  //get the booking of that day
  const bookings = await Booking.find(query);

  //find the bookings for that service
  services.forEach((service) => {
    const serviceBookings = bookings.filter(
      (book) => book.treatmentType === service.name
    );
    const bookedSlots = serviceBookings.map((book) => book.slot);
    const availableSlots = service.slots.filter(
      (slot) => !bookedSlots.includes(slot)
    );
    service.slots = availableSlots;
  });
  res.status(200).json({
    services,
  });
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

module.exports = {
  createService,
  getServices,
  getService,
  deleteService,
  updateService,
  getAvailableServices,
};
