const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/bookingModel');

// Create payment intent
const createPaymentIntent = async (req, res) => {
    try {
        const { bookingId } = req.body;
        
        // Find booking
        const booking = await Booking.findById(bookingId);
        
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        
        const price = booking.price;
        // Stripe expects price in cents
        const amount = price * 100;
        
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card']
        });
        
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
        
    } catch (error) {
        console.log("Stripe Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update booking after payment
const confirmPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { transactionId } = req.body;
        
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { 
                paid: true, 
                transactionId: transactionId,
                status: 'ongoing' // Mark as ongoing once paid
            },
            { new: true }
        );
        
        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        
        res.status(200).json({ success: true, booking: updatedBooking });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createPaymentIntent,
    confirmPayment
};
