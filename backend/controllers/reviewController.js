const Review = require('../models/reviewModel');
const Doctor = require('../models/doctorModel');

// Add a new review
const addReview = async (req, res) => {
    try {
        const { doctorId, patientId, patientName, rating, comment } = req.body;
        
        // Ensure rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
        }

        const newReview = await Review.create({
            doctorId,
            patientId,
            patientName,
            rating,
            comment
        });

        // Update doctor's average rating (simplified calculation)
        const allReviews = await Review.find({ doctorId });
        const totalRating = allReviews.reduce((acc, rev) => acc + rev.rating, 0);
        const avgRating = totalRating / allReviews.length;
        
        await Doctor.findByIdAndUpdate(doctorId, { rating: avgRating.toFixed(1) });

        res.status(201).json({ success: true, review: newReview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get reviews for a specific doctor
const getDoctorReviews = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const reviews = await Review.find({ doctorId }).sort({ createdAt: -1 }); // Newest first
        
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addReview, getDoctorReviews };
