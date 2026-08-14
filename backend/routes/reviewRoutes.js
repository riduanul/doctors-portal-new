const express = require('express');
const { addReview, getDoctorReviews } = require('../controllers/reviewController');
const router = express.Router();
const verifyJWT = require('../middlewares/verifyJWT');

// Get reviews for a specific doctor
router.get('/:doctorId', getDoctorReviews);

// Add a new review (Requires Authentication)
router.post('/', verifyJWT, addReview);

module.exports = router;
