import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserByEmailQuery, useUpdateUserProfileMutation } from '../../features/user/userApi';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const PatientProfile = () => {
  const { email } = useSelector((state) => state.user);
  const { data, isLoading, refetch } = useGetUserByEmailQuery(email, {
    skip: !email
  });
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();
  
  const [isEditing, setIsEditing] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (data?.user) {
      reset({
        username: data.user.username || '',
        phone: data.user.phone || '',
        age: data.user.age || '',
        bloodGroup: data.user.bloodGroup || '',
        address: data.user.address || '',
        medicalHistory: data.user.medicalHistory || ''
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      if (!data?.user?._id) return;
      await updateProfile({ id: data.user._id, ...formData }).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="premium-loading">
        <div className="spinner-ring"></div>
        <div className="premium-loading-text">Loading profile...</div>
      </div>
    );
  }

  const patient = data?.user;

  if (!patient) return null;

  return (
    <div className="slide-up max-w-4xl mx-auto py-8">
      <div className="page-header">
        <div>
          <h2 className="page-title">My Profile</h2>
          <p className="page-subtitle">Manage your personal and medical information</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`btn-action ${isEditing ? 'btn-action-outline' : 'btn-action-primary'}`}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>

      <div className="content-card">
        {/* Header / Avatar */}
        <div className="border-b border-[var(--border-color)] p-8 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-dark)] text-white flex items-center justify-center text-3xl font-bold shadow-lg">
            {patient.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">{patient.username}</h3>
            <p className="text-[var(--text-secondary)]">{patient.email}</p>
            <div className="mt-2 flex gap-2">
              {patient.bloodGroup && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                  Blood: {patient.bloodGroup}
                </span>
              )}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                Patient
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="modern-form grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  {...register("username", { required: "Name is required" })}
                />
                {errors.username && <p className="form-error">{errors.username.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="+1 234 567 8900"
                  {...register("phone")}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Age</label>
                <input 
                  type="number" 
                  className="form-input" 
                  {...register("age")}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Blood Group</label>
                <select className="form-select" {...register("bloodGroup")}>
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="form-group md:col-span-2">
                <label className="form-label">Address</label>
                <textarea 
                  className="form-input min-h-[100px]" 
                  {...register("address")}
                />
              </div>

              <div className="form-group md:col-span-2">
                <label className="form-label">Medical History / Notes</label>
                <textarea 
                  className="form-input min-h-[100px]" 
                  placeholder="Any previous medical conditions, allergies, etc."
                  {...register("medicalHistory")}
                />
              </div>

              <div className="md:col-span-2 flex justify-end mt-4">
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="form-submit w-auto px-8"
                >
                  {isUpdating ? 'Saving...' : 'Save Profile'}
                </button>
              </div>

            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Contact Information</h4>
                  <div className="bg-[var(--surface-secondary)] p-4 rounded-xl border border-[var(--border-color)]">
                    <div className="mb-3">
                      <span className="text-[var(--text-muted)] text-sm block mb-1">Email</span>
                      <span className="text-[var(--text-primary)] font-medium">{patient.email}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] text-sm block mb-1">Phone</span>
                      <span className="text-[var(--text-primary)] font-medium">{patient.phone || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Personal Details</h4>
                  <div className="bg-[var(--surface-secondary)] p-4 rounded-xl border border-[var(--border-color)]">
                    <div className="mb-3">
                      <span className="text-[var(--text-muted)] text-sm block mb-1">Age</span>
                      <span className="text-[var(--text-primary)] font-medium">{patient.age || 'Not provided'}</span>
                    </div>
                    <div className="mb-3">
                      <span className="text-[var(--text-muted)] text-sm block mb-1">Blood Group</span>
                      <span className="text-[var(--text-primary)] font-medium">{patient.bloodGroup || 'Not provided'}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] text-sm block mb-1">Address</span>
                      <span className="text-[var(--text-primary)] font-medium">{patient.address || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Medical History</h4>
                <div className="bg-[var(--surface-secondary)] p-4 rounded-xl border border-[var(--border-color)] h-[calc(100%-1.75rem)]">
                  {patient.medicalHistory ? (
                    <p className="text-[var(--text-primary)] whitespace-pre-wrap">{patient.medicalHistory}</p>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-[var(--text-muted)] p-4">
                      <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-3 opacity-50"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <p>No medical history notes added yet.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
