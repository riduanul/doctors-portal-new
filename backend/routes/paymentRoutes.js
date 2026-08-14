const express = require('express');
const { createPaymentIntent, confirmPayment } = require('../controllers/paymentController');
const verifyJWT = require('../middlewares/verifyJWT');
const router = express.Router();

router.post('/create-payment-intent', verifyJWT, createPaymentIntent);
router.patch('/:id', verifyJWT, confirmPayment);

module.exports = router;
