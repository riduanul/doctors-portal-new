const express = require('express');
const { getDoctor, getDoctorById, addDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyAdmin = require('../middlewares/verifyAdmin')

// Get all doctors (Available to all authenticated users for booking)
router.get('/', verifyJWT, getDoctor)

// Get single doctor by ID
router.get('/:id', verifyJWT, getDoctorById)

// Add a doctor (Admin only)
router.post('/', verifyJWT, verifyAdmin, addDoctor)

// Update a doctor (Admin only for now)
router.patch('/:id', verifyJWT, verifyAdmin, updateDoctor)

// Delete a doctor (Admin only)
router.delete('/:id', verifyJWT, verifyAdmin, deleteDoctor)

module.exports = router;