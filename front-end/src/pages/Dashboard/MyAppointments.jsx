import React from "react";
import { useSelector } from "react-redux";
import { useGetSingleBookingQuery } from "../../features/booking/bookingApiSlice";

const MyAppointments = () => {
  const { email } = useSelector((state) => state.user);

  const { data, isLoading, isError, error } = useGetSingleBookingQuery(email);

  if (isLoading) {
    return (
      <div className="premium-loading">
        <div className="spinner-ring"></div>
        <div className="premium-loading-text">Loading your appointments...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-banner">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        {error?.data?.message || error?.message || "Failed to load your appointments"}
      </div>
    );
  }

  return (
    <div className="slide-up">
      <div className="page-header">
        <div>
          <h2 className="page-title">My Appointments</h2>
          <p className="page-subtitle">View and manage your upcoming medical visits</p>
        </div>
        <div className="count-badge">{data?.booking?.length || 0} Total</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.booking?.map((a) => (
          <div className="appointment-card" key={a._id}>
            <div className="appointment-card-header">
              <div className="appointment-card-treatment">{a.treatmentType}</div>
              <span className={`status-badge status-${a.status || 'pending'}`}>
                {a.status || 'Pending'}
              </span>
            </div>
            
            <div className="appointment-card-details">
              <div className="appointment-detail-item">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {a.date}
              </div>
              <div className="appointment-detail-item">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {a.slot}
              </div>
              <div className="appointment-detail-item">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Patient: {a.patientName}
              </div>
            </div>

            <div className="appointment-card-footer flex justify-between items-center mt-4">
              {a.price && !a.paid && (
                <div className="text-[var(--text-secondary)] font-medium">
                  Price: <span className="text-[var(--text-primary)] font-bold">${a.price}</span>
                </div>
              )}
              {a.paid && (
                <div className="text-green-600 dark:text-green-400 font-bold text-sm">
                  PAID
                </div>
              )}
              
              {!a.paid && (
                <a href={`/dashboard/payment/${a._id}`} className="btn-action btn-action-primary ml-auto">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  Pay Now
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {(!data || data.booking?.length === 0) && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <div className="empty-state-title">No appointments found</div>
          <div className="empty-state-desc">You don't have any upcoming appointments.</div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
