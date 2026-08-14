import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddDoctorMutation, useGetDoctorsQuery } from '../../features/doctor/doctorApi';
import { useSpecialAppointmentQuery } from '../../features/services/apiSlice';
import { toast } from "react-toastify";

const defaultSpecialities = [
  { _id: "s1", name: "Teeth Cleaning & Hygiene" },
  { _id: "s2", name: "Cosmetic Dentistry" },
  { _id: "s3", name: "Teeth Whitening" },
  { _id: "s4", name: "Cavity Protection & Fillings" },
  { _id: "s5", name: "Pediatric Dental Care" },
  { _id: "s6", name: "Oral Surgery & Extractions" }
];

const AddDoctor = () => {
    const [submitting, setSubmitting] = useState(false);
    const { data: specialData } = useSpecialAppointmentQuery();
    const [addDoctor] = useAddDoctorMutation();
    const navigate = useNavigate();
    const { refetch } = useGetDoctorsQuery();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleAddDoctor = async (data) => {
        setSubmitting(true);
        const doctor = {
          name: data.name,
          email: data.email,
          speciality: data.speciality
        };

        try {
          await addDoctor(doctor).unwrap();
          refetch();
          toast.success(`🎉 Doctor "${data.name}" successfully registered!`, {
            position: "bottom-right",
          });
          navigate("/dashboard/doctors");
        } catch (err) {
          toast.error(err?.data?.message || err.error || "Failed to register doctor.", {
            position: "bottom-right",
          });
        } finally {
          setSubmitting(false);
        }
    };

    const specialities = (specialData?.result && specialData.result.length > 0)
      ? specialData.result
      : defaultSpecialities;

  return (
    <div className="slide-up max-w-2xl mx-auto py-6">
      <div className="page-header">
        <div>
          <h2 className="page-title">Add New Doctor</h2>
          <p className="page-subtitle">Register a new specialist physician to the portal</p>
        </div>
      </div>

      <div className="content-card modern-form p-8">
        <form onSubmit={handleSubmit(handleAddDoctor)} className="space-y-6">
          
          <div className="form-group">
            <label className="form-label font-bold text-sm text-[var(--text-primary)] mb-2 block">
              Doctor Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Sarah Jenkins"
              className="form-input w-full p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              {...register("name", {
                required: { value: true, message: "Doctor Name is required" },
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <div className="form-error text-red-500 text-xs mt-1">{errors.name.message}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label font-bold text-sm text-[var(--text-primary)] mb-2 block">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="doctor@example.com"
              className="form-input w-full p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <div className="form-error text-red-500 text-xs mt-1">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label font-bold text-sm text-[var(--text-primary)] mb-2 block">
              Medical Speciality *
            </label>
            <select 
              {...register("speciality", {
                required: { value: true, message: "Please select a speciality" }
              })}
              className="form-select w-full p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              defaultValue=""
            >
              <option value="" disabled>Select a medical speciality</option>
              {specialities.map((item, idx) => (
                <option key={item._id || idx} value={item.name}>
                  {item.name}
                </option> 
              ))}
            </select>
            {errors.speciality && (
              <div className="form-error text-red-500 text-xs mt-1">{errors.speciality.message}</div>
            )}
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full py-3.5 px-6 bg-[var(--primary)] text-slate-900 font-extrabold text-base rounded-xl shadow-lg hover:bg-[var(--primary-dark)] hover:text-white transition-all transform active:scale-95 disabled:opacity-50"
            >
              {submitting ? "Registering..." : "Register Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDoctor