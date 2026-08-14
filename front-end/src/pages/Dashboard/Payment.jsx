import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetABookingQuery } from '../../features/booking/bookingApiSlice';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Use environment variable if available, otherwise use a default test key for demo purposes
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK || 'pk_test_51L1nmxJ9o4nF9F9HnQ4H...dummy_key');

const Payment = () => {
    const { id } = useParams();
    const { data: booking, isLoading } = useGetABookingQuery(id);

    if (isLoading) {
        return (
            <div className="premium-loading">
                <div className="spinner-ring"></div>
                <div className="premium-loading-text">Loading payment details...</div>
            </div>
        );
    }

    if (!booking) {
        return <div className="error-banner">Booking not found.</div>;
    }

    return (
        <div className="slide-up max-w-2xl mx-auto mt-10">
            <div className="page-header text-center justify-center flex flex-col items-center">
                <h2 className="page-title text-3xl mb-2">Complete Your Payment</h2>
                <p className="page-subtitle text-lg">Please pay for your appointment on {booking.date} at {booking.slot}</p>
            </div>

            <div className="content-card mt-8 p-8">
                <div className="bg-[var(--surface-secondary)] rounded-2xl p-6 mb-8 border border-[var(--border-color)]">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Payment Summary</h3>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[var(--text-secondary)]">Patient Name</span>
                        <span className="font-semibold text-[var(--text-primary)]">{booking.patientName}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[var(--text-secondary)]">Treatment</span>
                        <span className="font-semibold text-[var(--text-primary)]">{booking.treatmentType}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-[var(--border-color)] mt-4 pt-4">
                        <span className="text-lg font-bold text-[var(--text-primary)]">Total Amount</span>
                        <span className="text-2xl font-bold text-[var(--primary)]">${booking.price || 150}</span>
                    </div>
                </div>

                <div className="payment-form-container">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Credit / Debit Card</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm booking={booking} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
