import React from 'react'
import { useGetBookingsQuery } from '../../features/booking/bookingApiSlice'
import { useGetDoctorsQuery } from '../../features/doctor/doctorApi'
import{ useAllUsersQuery } from '../../features/user/userApi'
import Loading from '../Shared/Loading'

const DashboardInfo = () => {

  return (
    <div className='container'>
      <div className="flex justify-center mt-5">
          <div  className='w-23 h-23 border border-purple-300 p-5 m-2'>
            Total Appointments:
            <p className='text-center'>{}</p> 
          </div>
      
        </div> 

    </div>
  )
}

export default DashboardInfo;