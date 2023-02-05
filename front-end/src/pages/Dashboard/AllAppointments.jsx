import React, {useState} from "react";
import { useDeleteBookingMutation, useGetBookingsQuery,useStatusUpdateMutation } from "../../features/booking/bookingApiSlice";
import Loading from "../Shared/Loading";
import Select from 'react-select';
import { toast } from "react-toastify";

const AllAppointments = () => {
  
    const { data, isLoading, isError, error, refetch } = useGetBookingsQuery();
    const [status, setStatus] = useState('pending')
    const [deleteBooking, {data:deletedData}] = useDeleteBookingMutation()
    const [statusUpdate, {}] = useStatusUpdateMutation()
   
    const  handleStatusChange = (e, id) =>{
      setStatus(e.value)
      statusUpdate(id, status)
      .unwrap()
      .then(data => {
        refetch()
        
      })
      
    }

    const handleDelete =(id)=> {

      deleteBooking(id)
      .unwrap()
      .then(data => {
        refetch()
        toast.success(`Booking Deleted Successfully !`, {
          position: "bottom-left",
        });
      })
      .catch(err => console.log(err))
    }
    const options = [
      {value: 'pending', label: "Pending", color:"#FF0000"},
      {value: 'ongoing', label: "Ongoing", color:"#36B37E"},
      {value: 'done', label: "Done", color:"#00FF00"}
    ]
    const colorStyles = {
      control: (styles) => ({...styles, backgroundColor:"white"}),
      option:(styles, {data, isDisabled, isFocused, isSelected})=>{
        return {...styles, color: data.color}
      },
      multiValue: (styles, {data})=> {
        return {
          ...styles,
          backgroundColor: data.color,
          color: "#fff"
        }
      },
      multiValueLabel: (styles, {data}) => {
        return {
          ...styles,
          color:"#fff"
        }
      }
      
    }

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p className="text-red-500 text-center bg-red-200 p-2">{error?.data?.message}</p>;
  }
  if (data && data?.allBookings?.length === 0) {
    
    return (
      <p className="text-red-500 text-center mt-5 bg-red-200 p-3 ">User has no Booking!</p>
    );
  }

  return (
    <div>
      <h2 className="text-center p-5 ">All Appointments </h2>
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
            {data.allBookings.map((a, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatmentType}</td>
                
                <td>
                 <Select options={options} styles={colorStyles}  onChange={(e)=>handleStatusChange(e, a._id)}></Select>
                 </td>
                <td>
                  <button className="btn btn-sm btn-primary" onClick={()=> handleDelete(a._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
