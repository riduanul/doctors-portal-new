import React from "react";
import { useSelector } from "react-redux";
import { useGetSingleBookingQuery } from "../../features/booking/bookingApiSlice";
import Loading from "../Shared/Loading";

const MyAppointments = () => {
  const { email } = useSelector((state) => state.user);
console.log(email)
  const { data, isLoading, isError, error } = useGetSingleBookingQuery(email);
console.log(data)

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p className="text-red-500 text-center bg-red-200 p-2">{error.data.message}</p>;
  }
  if (data && data?.allBookings?.length === 0) {
    return (
      <p className="text-red-500 text-center mt-5 bg-red-200 p-3 ">User has no Booking!</p>
    );
  }

  return (
    <div>
      <h2 className="text-center p-5 ">My Appointments </h2>
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
            {data.allBookings.map((a, index) => (
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
