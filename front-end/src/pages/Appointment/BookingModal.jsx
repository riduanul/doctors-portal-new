import React from "react";
import { useSelector } from "react-redux";
import { useAddBookingMutation } from "../../features/booking/bookingApiSlice";
import { toast } from "react-toastify";

const BookingModal = ({ treatment, date, format, setTreatment, refetch }) => {
  const { id, name, slots } = treatment;
  const { email, userName } = useSelector((state) => state.user);
  const [addBooking, { isSuccess, isError, error }] = useAddBookingMutation();

  const handleBooking = (event) => {
    event.preventDefault();
    const slot = event.target.slot.value;
    const formatedDate = format(date, "PP");
    const bookingData = {
      treatmentId: id,
      treatmentType: name,
      date: formatedDate,
      slot,
      patientEmail: email,
      patientName: userName,
      phoneNumber: event.target.phone.value,
    };

    addBooking({ bookingData })
      .unwrap()
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success(`Appointment Is set, ${formatedDate} at ${slot}`, {
            position: "bottom-left",
          });
        } else {
          toast.error(
            `You already have an appointment, ${formatedDate} at ${slot}`,
            {
              position: "bottom-left",
            }
          );
        }
      });
    refetch();
    setTreatment(null);
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box ">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-secondary text-center mb-2">
            Booking for: {name}
          </h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols1 gap-1 justify-center"
          >
            <input
              type="text"
              value={format(date, "PP")}
              className="input input-bordered w-full max-w-xs"
            />
            <select
              name="slot"
              className="select select-bordered w-full max-w-xs"
            >
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              value={userName ? ` ${userName}` : ""}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              name="email"
              value={email ? ` ${email}` : ""}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              placeholder="SUBMIT"
              className="btn btn-secondary w-full max-w-xs"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
