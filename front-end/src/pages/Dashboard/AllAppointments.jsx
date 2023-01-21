import React from 'react'
import Loading from '../Shared/Loading';
import { toast } from "react-toastify";
import {useGetBookingsQuery} from '../../features/booking/bookingApiSlice'

const AllAppointments = () => { 


  const {data, isLoading, isError, error,} = useGetBookingsQuery()


   let content;

   if(isLoading){
      return   content = <Loading/>
    }
    if(isError){
      return  content = <div className='text-red-500 text-center bg-red-200 p-2 mt-5'>{error.data.message}</div>
    }
   
    if(data && data.bookings.length > 0){
      return  content =   
      <div> 
        <h2 className='text-center text-2xl p-3'>All Appointments</h2>
        <table className="table table-zebra w-full ">
            <thead>
              <tr className='text-purple-600 '>
                    <th>Sl</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Treatment</th>
              </tr>
            </thead>

            <tbody>
            {data.bookings.map((b, i) => 
                      <tr key={i}>
                            <td>{i+1} </td>
                            <td>{b.patientName}</td>
                            <td>{b.date}</td>
                            <td>{b.slot}</td>
                            <td>{b.treatmentType}</td>
                            
                      </tr>
              )}
              </tbody>
             </table>
        </div>  
    }

    return (
    <div> {content}</div>
    
  )
}

export default AllAppointments