import React from "react";
import PrimaryButton from "../Shared/PrimaryButton";
const ServiceAppointment = ({ service, setTreatment }) => {
  const { name, slots } = service;
  return (
    <div className="card lg:max-w-lg bg-base-100 shadow-xl text-center">
      <div className="card-body">
        <h2 className=" font-bold text-xl text-center text-secondary">
          {name}
        </h2>
        <p>
          {slots.length ? (
            <span>{slots[0]}</span>
          ) : (
            <span className="text-red-500 ">Try another day!</span>
          )}
        </p>
        <p>
          {slots.length} {slots.length > 1 ? "spaces" : "space"} available
        </p>
        <div className="card-actions justify-center">
          <label
            htmlFor="booking-modal"
            disabled={slots == 0}
            className="btn btn-primary  bg-gradient-to-r from-primary to-secondary"
            onClick={() => setTreatment(service)}
          >
            BOOK APPOINTMENT
          </label>
        </div>
      </div>
    </div>
  );
};

export default ServiceAppointment;
