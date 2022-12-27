import React, { useState, useEffect } from "react";
import AppointmentService from "./AppointmentService";
import BookingModal from "./BookingModal";
import {
  useGetServicesQuery,
  useGetAvailableServicesQuery,
} from "../../features/services/apiSlice";
import Loading from "../Shared/Loading";

const AvailableAppointmets = ({ date, format }) => {
  const [treatment, setTreatment] = useState(null);
  const formatedDate = format(date, "PP");
  const { data, isLoading, error, refetch } =
    useGetAvailableServicesQuery(formatedDate);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <p className="text-red-500 text-center"> There was an error occured!</p>
    );
  }
  if (!isLoading && !error && data.services === 0) {
    return <p>There is no Service available!</p>;
  }
  if (!isLoading && !error && data.services > 0) {
    console.log(data.services);
  }

  return (
    <section className="pt-5">
      <div>
        <h3 className="text-primary text-2xl font-bold text-center">
          Available Appointments on {format(date, "PP")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.services &&
            data.services.map((service) => (
              <AppointmentService
                key={service._id}
                service={service}
                setTreatment={setTreatment}
              />
            ))}
        </div>
        {treatment && (
          <BookingModal
            treatment={treatment}
            date={date}
            format={format}
            refetch={refetch}
            setTreatment={setTreatment}
          />
        )}
      </div>
    </section>
  );
};

export default AvailableAppointmets;
