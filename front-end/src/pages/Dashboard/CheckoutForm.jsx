import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useConfirmPaymentMutation, useCreatePaymentIntentMutation } from '../../features/booking/bookingApiSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ booking }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const [confirmPayment] = useConfirmPaymentMutation();

    const { _id, price, patientName, patientEmail } = booking;

    useEffect(() => {
        if (price) {
            createPaymentIntent({ bookingId: _id })
                .unwrap()
                .then(data => setClientSecret(data.clientSecret))
                .catch(err => {
                    console.log(err);
                    toast.error("Failed to initialize payment");
                });
        }
    }, [price, _id, createPaymentIntent]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
            setProcessing(false);
            return;
        } else {
            setCardError('');
        }

        // Confirm Card Payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: patientEmail,
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        } else {
            setCardError('');
            
            // Save payment info to backend
            confirmPayment({ 
                id: _id, 
                transactionId: paymentIntent.id 
            })
            .unwrap()
            .then(() => {
                toast.success('Payment completed successfully!', { position: "bottom-left" });
                navigate('/dashboard/myAppointments');
            })
            .catch(err => {
                toast.error("Payment successful but failed to update record.");
                setProcessing(false);
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="modern-form">
                <div className="form-group p-4 bg-white dark:bg-gray-800 rounded-xl border border-[var(--border-color)]">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                {cardError && <p className="text-red-500 mt-2 text-sm">{cardError}</p>}
                
                <button 
                    className="form-submit mt-6 w-full max-w-xs" 
                    type="submit" 
                    disabled={!stripe || !clientSecret || processing}
                >
                    {processing ? 'Processing...' : `Pay $${price}`}
                </button>
            </form>
        </>
    );
};

export default CheckoutForm;
