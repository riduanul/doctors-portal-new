import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDoctorByIdQuery } from '../../features/doctor/doctorApi';
import DoctorReviews from './DoctorReviews';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetDoctorByIdQuery(id);

  if (isLoading) {
    return (
      <div className="premium-loading">
        <div className="spinner-ring"></div>
        <div className="premium-loading-text">Loading profile...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-banner">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        {error?.data?.message || "Failed to load doctor profile"}
        <button onClick={() => navigate(-1)} className="ml-4 underline text-sm">Go Back</button>
      </div>
    );
  }

  const doctor = data?.doctor;

  if (!doctor) {
    return <div className="text-center p-10 text-xl font-semibold">Doctor not found</div>;
  }

  return (
    <div className="slide-up max-w-5xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back
      </button>

      <div className="content-card overflow-hidden">
        {/* Banner Section */}
        <div className="h-48 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-[var(--surface-primary)] bg-[var(--surface-secondary)] flex items-center justify-center text-5xl font-bold text-[var(--primary)] shadow-lg">
              {doctor.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--border-color)] pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{doctor.name}</h1>
              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-semibold">
                  {doctor.speciality}
                </span>
                <span className="flex items-center gap-1 text-sm font-medium">
                  <svg width="16" height="16" fill="currentColor" className="text-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  {doctor.rating || 'New'}
                </span>
              </div>
            </div>
            
            <button className="btn-action btn-action-primary px-8 py-3 rounded-full text-base font-semibold shadow-lg shadow-[var(--primary-light)]">
              Book Appointment
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">About Doctor</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {doctor.biography || `${doctor.name} is a highly skilled ${doctor.speciality} with extensive experience in providing top-tier medical care. Dedicated to patient well-being and advancing medical practices.`}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Qualifications</h3>
                <ul className="space-y-3">
                  {doctor.qualifications?.length > 0 ? doctor.qualifications.map((qual, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[var(--text-secondary)]">
                      <svg width="24" height="24" fill="none" stroke="currentColor" className="text-[var(--primary)] shrink-0" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {qual}
                    </li>
                  )) : (
                    <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                      <svg width="24" height="24" fill="none" stroke="currentColor" className="text-[var(--primary)] shrink-0" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      MBBS, MD - {doctor.speciality}
                    </li>
                  )}
                </ul>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-[var(--surface-secondary)] p-6 rounded-2xl border border-[var(--border-color)]">
                <h4 className="font-bold text-[var(--text-primary)] mb-4">At a Glance</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-[var(--border-color)]">
                    <span className="text-[var(--text-muted)] font-medium">Experience</span>
                    <span className="font-semibold text-[var(--text-primary)]">{doctor.experience || 5}+ Years</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-[var(--border-color)]">
                    <span className="text-[var(--text-muted)] font-medium">Consultation Fee</span>
                    <span className="font-semibold text-[var(--text-primary)]">${doctor.fees || 500}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--text-muted)] font-medium">Email</span>
                    <span className="font-medium text-[var(--primary)] truncate ml-4" title={doctor.email}>{doctor.email}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface-secondary)] p-6 rounded-2xl border border-[var(--border-color)]">
                <h4 className="font-bold text-[var(--text-primary)] mb-4">Available Days</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.availableDays?.length > 0 ? doctor.availableDays.map(day => (
                    <span key={day} className="px-3 py-1.5 bg-[var(--surface-primary)] border border-[var(--border-color)] rounded-lg text-sm font-medium text-[var(--text-secondary)] shadow-sm">
                      {day}
                    </span>
                  )) : (
                    ['Monday', 'Wednesday', 'Friday'].map(day => (
                      <span key={day} className="px-3 py-1.5 bg-[var(--surface-primary)] border border-[var(--border-color)] rounded-lg text-sm font-medium text-[var(--text-secondary)] shadow-sm">
                        {day}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <DoctorReviews doctorId={doctor._id} />
          
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
