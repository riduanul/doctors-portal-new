const express = require('express');
const { getDoctor, addDoctor, deleteDoctor } = require('../controllers/doctorController');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
const verifyAdmin = require('../middlewares/verifyAdmin')

//Get all doctor
router.get('/', verifyJWT, verifyAdmin, getDoctor)

// Add adoctor
router.post('/', verifyJWT, verifyAdmin, addDoctor)


// Delete a doctor
router.delete('/:id', verifyJWT, verifyAdmin, deleteDoctor)

module.exports = router;