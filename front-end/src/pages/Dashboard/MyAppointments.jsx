import React from "react";
import { useSelector } from "react-redux";
import { useGetBookingQuery } from "../../features/booking/bookingApiSlice";
import Loading from "../Shared/Loading";

const MyAppointments = () => {
  const { email } = useSelector((state) => state.user);

  const { data, isLoading, isError, error } = useGetBookingQuery(email);

  if (isLoading) {
    return <Loading />;
  }
  if (!isLoading && isError) {
    return <p className="text-red-500 text-center">{error.message}</p>;
  }
  if (!isLoading && !isError && data?.booking?.length === 0) {
    return (
      <p className="text-red-500 text-center mt-5 bg-red-200 p-3 ">User has no Booking!</p>
    );
  }

  return (
    <div>
      <h2 className="text-center p-5 ">My Appointments {data.booking.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Treatment</th>
            </tr>
          </thead>
          <tbody>
            {data.booking.map((a, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatmentType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
