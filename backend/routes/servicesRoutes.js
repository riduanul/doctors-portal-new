const express = require("express");
const {
  createService,
  getServices,
  getService,
  deleteService,
  updateService,
  getAvailableServices,
} = require("../controllers/ServicesController");

const router = express.Router();

// Get all Services
router.get("/", getServices);
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
