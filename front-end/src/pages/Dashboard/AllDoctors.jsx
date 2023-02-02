import React from 'react'
import Loading from '../Shared/Loading';
import { toast } from "react-toastify";
import { useDeleteDoctorMutation, useGetDoctorsQuery } from '../../features/doctor/doctorApi';
import { useState } from 'react';
import ConfirmationModal from '../Shared/ConfirmationModal';


const AllDoctors = () => { 
const [deletingDoctor, setDeletingDoctor] = useState(null)

  const {data, isLoading, isError, error, refetch} = useGetDoctorsQuery()
  const [deleteDoctor,{}] = useDeleteDoctorMutation();
  const closeModal = () => {
    setDeletingDoctor(null)
  }
  const handleDeleteDoctor = (doctor) => {
    deleteDoctor(doctor._id)
    .unwrap()
    .then(data => {
      refetch()
      toast.success(`${doctor.name} Successfully Deleted !`, {
        position: "bottom-left",
      });
    })
    .catch(err => {
      console.log(err)
      toast.error(`${err.data.message}`, {
        position: "bottom-left",
      });
    })
  }
   
   let content;
    if(isLoading){
      return   content = <Loading/>
    }
    if(isError){
      return  content = <div className='text-red-500 text-center bg-red-200 p-2 mt-5'>{error.data.message}</div>
    }
   
    if(data && data.doctor.length > 0){
      return  content =   
      <div> 
        <h2 className='text-center text-2xl p-3'>All Doctors</h2>
        <table className="table table-zebra w-full ">
            <thead>
              <tr className='text-purple-600 '>
                    <th>Sl</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Speciality</th>
                    <th>Action</th>
              </tr>
            </thead>

            <tbody>
            {data.doctor.map((d, i) => 
                      <tr key={i}>
                            <td>{i+1} </td>
                            <td>{d.name}</td>
                            <td>{d.email}</td>
                            <td>{d.speciality}</td>
                            <td><label onClick={() => setDeletingDoctor(d)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label> </td>
                            
                            
                      </tr>
              )}
              </tbody>
             </table>
             {
          deletingDoctor && <ConfirmationModal
           title={`Are you sure you want to delete?`}
           message={`If you delete ${deletingDoctor.name} it cannot be undone!`}
           closeModal={closeModal}
           modalData={deletingDoctor}
           successAction={handleDeleteDoctor}
           successButtonName= "Delete"
           />
        }
        </div>  
       
    }

    return (
    <div> {content}</div>
    
  )
}

export default AllDoctors