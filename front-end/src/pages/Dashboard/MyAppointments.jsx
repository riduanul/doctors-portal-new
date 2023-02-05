import React from "react";
import { useSelector } from "react-redux";
import { useGetSingleBookingQuery } from "../../features/booking/bookingApiSlice";
import Loading from "../Shared/Loading";

const MyAppointments = () => {
  const { email } = useSelector((state) => state.user);

  const { data, isLoading, isError, error } = useGetSingleBookingQuery(email);


  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p className="text-red-500 text-center bg-red-200 p-2">{error.message}</p>;
  }
  if (data && data?.booking?.length === 0) {
    
    return (
      <p className="text-red-500 text-center mt-5 bg-red-200 p-3 ">User has no Booking!</p>
    );
  }

  // useEffect(()=>{
  //   fetch(`http://localhost:5000/api/booking/single?patientEmail=${email}`)
  //   .then(res => res.json() )
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err))
  // },[])

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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.booking?.map((a, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatmentType}</td>
                <td className={`text-${a.status === 'pending' ? 'red-400' : a.status === 'success' ? 'green-400' : 'yellow-400'}`}>{a.status}</td>
                <td>
                  <button className="btn btn-sm btn-primary">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
