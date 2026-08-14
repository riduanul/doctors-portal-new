import React, { useState } from "react";
import AppointmentService from "./AppointmentService";
import BookingModal from "./BookingModal";
import { useGetAvailableServicesQuery } from "../../features/services/apiSlice";
import Loading from "../Shared/Loading";

const AvailableAppointmets = ({ date, format }) => {
  const [treatment, setTreatment] = useState(null);
  const formatedDate = format(date, "PP");
  
  const { data, isLoading, error, refetch } = useGetAvailableServicesQuery(formatedDate);

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <Loading />
        <p className="mt-4 text-base-content/60 text-sm">Fetching available appointment slots...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-500">
        <p className="font-bold text-lg">Failed to load appointment services.</p>
        <button onClick={() => refetch()} className="btn btn-outline btn-error btn-sm mt-4">
          Try Again
        </button>
      </div>
    );
  }

  const services = data?.services || [];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-widest mb-2">
          Select Specialty
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-base-content">
          Available Appointments on <span className="text-primary">{formatedDate}</span>
        </h2>
        <p className="text-base-content/70 mt-2 text-sm max-w-md mx-auto">
          Choose your desired medical treatment service and book your time slot.
        </p>
      </div>

      {services.length === 0 ? (
        <div className="bg-base-200 p-12 rounded-3xl text-center max-w-lg mx-auto border border-base-300">
          <p className="text-lg font-bold text-base-content/70">No appointment slots available for this date.</p>
          <p className="text-sm text-base-content/50 mt-1">Please select another calendar date above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <AppointmentService
              key={service._id}
              service={service}
              setTreatment={setTreatment}
            />
          ))}
        </div>
      )}

      {treatment && (
        <BookingModal
          treatment={treatment}
          date={date}
          format={format}
          refetch={refetch}
          setTreatment={setTreatment}
        />
      )}
    </section>
  );
};

export default AvailableAppointmets;
