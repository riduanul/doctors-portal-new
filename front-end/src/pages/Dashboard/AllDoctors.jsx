import React from 'react'
import { toast } from "react-toastify";
import { useDeleteDoctorMutation, useGetDoctorsQuery } from '../../features/doctor/doctorApi';
import { useState } from 'react';
import ConfirmationModal from '../Shared/ConfirmationModal';
import { Link } from 'react-router-dom';


const AllDoctors = () => { 
  const [deletingDoctor, setDeletingDoctor] = useState(null)

  const {data, isLoading, isError, error, refetch} = useGetDoctorsQuery()
  const [deleteDoctor] = useDeleteDoctorMutation();
  
  const closeModal = () => {
    setDeletingDoctor(null)
  }
  
  const handleDeleteDoctor = (doctor) => {
    deleteDoctor(doctor._id)
    .unwrap()
    .then(() => {
      refetch()
      toast.success(`${doctor.name} Successfully Deleted !`, {
        position: "bottom-left",
      });
      closeModal();
    })
    .catch(err => {
      toast.error(`${err.data?.message || err.message}`, {
        position: "bottom-left",
      });
      closeModal();
    })
  }
   
  const getInitials = (name) => {
    if (!name) return "Dr.";
    return name.charAt(0).toUpperCase();
  };

  if(isLoading){
    return (
      <div className="premium-loading">
        <div className="spinner-ring"></div>
        <div className="premium-loading-text">Loading doctors...</div>
      </div>
    );
  }

  if(isError){
    return (
      <div className="error-banner">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        {error.data?.message || "Failed to load doctors"}
      </div>
    );
  }
 
  return (
    <div className="slide-up">
      <div className="page-header">
        <div>
          <h2 className="page-title">Manage Doctors</h2>
          <p className="page-subtitle">View and manage clinic specialists</p>
        </div>
        <div className="count-badge">{data?.doctor?.length || 0} Total</div>
      </div>

      {data?.doctor?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.doctor.map((d, i) => (
            <div className="doctor-card" key={d._id || i}>
              <div className={`doctor-card-avatar avatar-gradient-${(i % 4) + 1}`}>
                {getInitials(d.name)}
              </div>
              <div className="doctor-card-name">{d.name}</div>
              <div className="doctor-card-email">{d.email}</div>
              <div className="doctor-card-speciality">{d.speciality}</div>
              
              <div className="doctor-card-actions flex gap-2">
                <Link to={`/doctor/${d._id}`} className="btn-action btn-action-primary flex-1 text-center">
                  Profile
                </Link>
                <label 
                  onClick={() => setDeletingDoctor(d)} 
                  htmlFor="confirmation-modal" 
                  className="btn-action btn-action-danger flex-1 text-center cursor-pointer"
                >
                  Remove
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <div className="empty-state-title">No doctors found</div>
          <div className="empty-state-desc">There are no doctors registered in the system yet.</div>
        </div>
      )}

      {deletingDoctor && (
        <ConfirmationModal
          title={`Are you sure you want to remove?`}
          message={`If you remove Dr. ${deletingDoctor.name}, they will lose access and their data cannot be recovered.`}
          closeModal={closeModal}
          modalData={deletingDoctor}
          successAction={handleDeleteDoctor}
          successButtonName="Remove"
        />
      )}
    </div>
  )
}

export default AllDoctors