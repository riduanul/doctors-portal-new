const express = require('express');
const { getDoctor, addDoctor, deleteDoctor } = require('../controllers/doctorController');
const router = express.Router()


//Get all doctor
router.get('/', getDoctor)

// Add adoctor
router.post('/', addDoctor)


// Delete a doctor
router.delete('/:id', deleteDoctor)

module.exports = router;