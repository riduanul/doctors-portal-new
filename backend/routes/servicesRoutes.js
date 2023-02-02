const express = require("express");
const {
  createService,
  getServices,
  getService,
  deleteService,
  updateService,
  getAvailableServices,
  appointmentSpeciality,
  tempUpdate,
} = require("../controllers/ServicesController");

const router = express.Router();



//Temporary UPdate
router.get("/tempUpdate", tempUpdate)

// Get all Services
router.get("/", getServices);

// Special appointment name
router.get("/special", appointmentSpeciality);

// Get Available services
router.get("/available", getAvailableServices);

// Get a single service
router.get("/:id", getService);

// Post a new Service
router.post("/", createService);

// Delete a Service
router.delete("/:id", deleteService);

// Update a Service
router.patch("/:id", updateService);


module.exports = router;
