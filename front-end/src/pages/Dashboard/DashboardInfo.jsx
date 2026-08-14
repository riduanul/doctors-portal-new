import React from 'react';
import { useSelector } from 'react-redux';
import { useGetBookingsQuery } from '../../features/booking/bookingApiSlice';
import { useGetDoctorsQuery } from '../../features/doctor/doctorApi';
import { useAllUsersQuery } from '../../features/user/userApi';
import Loading from '../Shared/Loading';
import useAdmin from '../../Hooks/useAdmin';

const DashboardInfo = () => {
  const { userName, email } = useSelector(state => state.user);
  const [isAdmin] = useAdmin(email);
  
  // Queries
  const { data: bookingsData, isLoading: bookingsLoading } = useGetBookingsQuery(undefined, { skip: !isAdmin });
  const { data: doctorsData, isLoading: doctorsLoading } = useGetDoctorsQuery(undefined, { skip: !isAdmin });
  const { data: usersData, isLoading: usersLoading } = useAllUsersQuery(undefined, { skip: !isAdmin });

  // Today's date for display
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getStatusCounts = () => {
    if (!bookingsData?.allBookings) return { pending: 0, ongoing: 0, done: 0, total: 0 };
    const counts = { pending: 0, ongoing: 0, done: 0 };
    bookingsData.allBookings.forEach(b => {
      const status = b.status || 'pending';
      if (counts[status] !== undefined) counts[status]++;
    });
    return { ...counts, total: bookingsData.allBookings.length };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="slide-up">
      <div className="welcome-banner">
        <h2 className="welcome-title">Welcome back, {userName || 'User'}!</h2>
        <p className="welcome-subtitle">
          {isAdmin ? "Here's what's happening with your clinic today." : "Manage your appointments and medical records."}
        </p>
        <p className="welcome-date">{today}</p>
      </div>

      {isAdmin ? (
        <>
          <div className="page-header">
            <div>
              <h3 className="page-title">Overview Statistics</h3>
              <p className="page-subtitle">Summary of your platform activity</p>
            </div>
          </div>

          <div className="stats-grid mb-8">
            {/* Appointments Stat */}
            <div className="stat-card stat-primary">
              <div className="stat-icon icon-primary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div className="stat-info">
                <div className="stat-label">Total Appointments</div>
                <div className="stat-value">
                  {bookingsLoading ? '...' : (bookingsData?.allBookings?.length || 0)}
                </div>
                <div className="stat-change positive">
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  <span>12% this month</span>
                </div>
              </div>
            </div>

            {/* Doctors Stat */}
            <div className="stat-card stat-purple">
              <div className="stat-icon icon-purple">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <div className="stat-info">
                <div className="stat-label">Total Doctors</div>
                <div className="stat-value">
                  {doctorsLoading ? '...' : (doctorsData?.doctor?.length || 0)}
                </div>
                <div className="stat-change positive">
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  <span>Active specialists</span>
                </div>
              </div>
            </div>

            {/* Users Stat */}
            <div className="stat-card stat-warm">
              <div className="stat-icon icon-warm">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <div className="stat-info">
                <div className="stat-label">Registered Patients</div>
                <div className="stat-value">
                  {usersLoading ? '...' : (usersData?.users?.length || 0)}
                </div>
                <div className="stat-change positive">
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  <span>24 new this week</span>
                </div>
              </div>
            </div>
            
            {/* Revenue Stat */}
            <div className="stat-card stat-fire">
              <div className="stat-icon icon-fire">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="stat-info">
                <div className="stat-label">Revenue Overview</div>
                <div className="stat-value">${(bookingsData?.allBookings?.length || 0) * 150}</div>
                <div className="stat-change positive">
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  <span>8% this month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Appointments by Status Chart */}
            <div className="content-card lg:col-span-1 p-6">
              <h4 className="font-bold text-lg text-[var(--text-primary)] mb-6">Appointments by Status</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-[var(--text-secondary)]">Pending</span>
                    <span className="font-bold text-[var(--text-primary)]">{statusCounts.pending}</span>
                  </div>
                  <div className="w-full bg-[var(--border-color)] rounded-full h-3">
                    <div className="bg-amber-400 h-3 rounded-full" style={{ width: `${statusCounts.total ? (statusCounts.pending / statusCounts.total) * 100 : 0}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-[var(--text-secondary)]">Ongoing</span>
                    <span className="font-bold text-[var(--text-primary)]">{statusCounts.ongoing}</span>
                  </div>
                  <div className="w-full bg-[var(--border-color)] rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${statusCounts.total ? (statusCounts.ongoing / statusCounts.total) * 100 : 0}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-[var(--text-secondary)]">Done</span>
                    <span className="font-bold text-[var(--text-primary)]">{statusCounts.done}</span>
                  </div>
                  <div className="w-full bg-[var(--border-color)] rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${statusCounts.total ? (statusCounts.done / statusCounts.total) * 100 : 0}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="content-card lg:col-span-2 p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-lg text-[var(--text-primary)]">Recent Appointments</h4>
                <a href="/dashboard/allAppointments" className="text-[var(--primary)] text-sm font-medium hover:underline">View All</a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[var(--text-muted)] text-sm border-b border-[var(--border-color)]">
                      <th className="pb-3 font-medium">Patient</th>
                      <th className="pb-3 font-medium">Treatment</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingsData?.allBookings?.slice(0, 5).map(b => (
                      <tr key={b._id} className="border-b border-[var(--border-color)] last:border-0">
                        <td className="py-4 font-medium text-[var(--text-primary)]">{b.patientName}</td>
                        <td className="py-4 text-[var(--text-secondary)]">{b.treatmentType}</td>
                        <td className="py-4 text-[var(--text-secondary)]">{b.date}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            b.status === 'done' ? 'bg-green-100 text-green-800' : 
                            b.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : 
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {b.status || 'pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {!bookingsData?.allBookings?.length && (
                      <tr>
                        <td colSpan="4" className="py-8 text-center text-[var(--text-muted)]">
                          No recent appointments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="content-card">
          <div className="content-card-header">
            <h3 className="content-card-title">Getting Started</h3>
          </div>
          <div className="content-card-body">
            <div className="quick-actions">
              <a href="/appointment" className="quick-action-card">
                <div className="quick-action-icon icon-primary">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <div className="quick-action-label">Book Appointment</div>
                  <div className="quick-action-desc">Schedule a new visit</div>
                </div>
              </a>
              <a href="/dashboard/myAppointments" className="quick-action-card">
                <div className="quick-action-icon icon-purple">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                </div>
                <div>
                  <div className="quick-action-label">My Appointments</div>
                  <div className="quick-action-desc">View your upcoming visits</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardInfo;