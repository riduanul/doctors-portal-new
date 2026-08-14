import React from "react";

const AppointmentService = ({ service, setTreatment }) => {
  const { name, slots, price } = service;
  const isAvailable = slots && slots.length > 0;

  return (
    <div className="bg-base-100 rounded-2xl p-6 border border-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-extrabold text-xl text-base-content group-hover:text-primary transition-colors">
            {name}
          </h3>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary border border-primary/20">
            ${price || 99}
          </span>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-base-content/80">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">
              {isAvailable ? slots[0] : "No slots available"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2.5 py-0.5 rounded-full font-bold ${isAvailable ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'}`}>
              {isAvailable ? `${slots.length} ${slots.length > 1 ? "Slots Left" : "Slot Left"}` : "Fully Booked"}
            </span>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="booking-modal"
          onClick={() => isAvailable && setTreatment(service)}
          className={`w-full btn border-none font-bold text-white uppercase tracking-wider rounded-xl shadow-md transition-all ${
            isAvailable 
              ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90 cursor-pointer" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
          }`}
        >
          {isAvailable ? "Book Appointment" : "Unavailable"}
        </label>
      </div>
    </div>
  );
};

export default AppointmentService;
