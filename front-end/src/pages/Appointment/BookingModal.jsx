import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddBookingMutation, useGetBookingsQuery, useGetSingleBookingQuery } from "../../features/booking/bookingApiSlice";
import { toast } from "react-toastify";

const BookingModal = ({ treatment, date, format, setTreatment, refetch }) => {
  const { _id, id, name, slots, price } = treatment;
  const { email, userName } = useSelector((state) => state.user);
  const [addBooking, { isLoading: isSubmitting }] = useAddBookingMutation();
  const { refetch: bookingRefetch } = useGetSingleBookingQuery(email, { skip: !email });
  const { refetch: allBookingRefetch } = useGetBookingsQuery();
  
  const [phone, setPhone] = useState("");

  const handleBooking = async (event) => {
    event.preventDefault();
    const slot = event.target.slot.value;
    const formatedDate = format(date, "PP");
  
    const bookingData = {
      treatmentId: _id || id,
      treatmentType: name,
      date: formatedDate,
      slot,
      price: price || 99,
      patientEmail: email,
      patientName: userName || "Patient",
      phoneNumber: phone,
    };

    try {
      const data = await addBooking({ bookingData }).unwrap();
      if (data.success) {
        toast.success(`🎉 Appointment booked for ${formatedDate} at ${slot}!`, {
          position: "bottom-right",
        });
        refetch();
        if (email) bookingRefetch();
        allBookingRefetch();
      } else {
        toast.error(`⚠️ ${data.message || 'You already have an appointment on this date'}`, {
          position: "bottom-right",
        });
      }
    } catch (err) {
      toast.error(err?.data?.error || err?.data?.message || "Failed to complete booking.");
    }
  
    setTreatment(null);
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" defaultChecked={true} />
      <div className="modal modal-bottom sm:modal-middle bg-slate-950/70 backdrop-blur-sm z-[200]">
        <div className="modal-box bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative max-w-lg text-slate-900 dark:text-white">
          <label
            htmlFor="booking-modal"
            onClick={() => setTreatment(null)}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            ✕
          </label>

          {/* Modal Header */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
              Confirm Appointment
            </span>
            <h3 className="font-bold text-2xl text-slate-900 dark:text-white">
              {name}
            </h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Consultation Fee</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                ${price || 99}
              </span>
            </div>
          </div>

          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Appointment Date
              </label>
              <input
                type="text"
                disabled
                value={format(date, "PP")}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-semibold text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Select Available Time Slot *
              </label>
              <select
                name="slot"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-sm text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {slots && slots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Patient Name
              </label>
              <input
                type="text"
                disabled
                value={userName || "Patient"}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-semibold text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Patient Email
              </label>
              <input
                type="email"
                disabled
                value={email || ""}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-semibold text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 234 567 8900"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold text-sm text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Confirm & Reserve Slot"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
