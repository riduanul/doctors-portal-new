import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const AddDoctor = () => {
    const [error, setError] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const handleAddDoctor = (data) => {
        console.log(data)
      }
  return (
    <div className='w-97 p-7'>
        <form onSubmit={handleSubmit(handleAddDoctor)} className="w-full">
        <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                placeholder="User Name"
                className="input input-bordered w-full max-w-xs"
                {...register("name", {
                  required: { value: true, message: "User Name is required!" },
                  minLength: {
                    value: 4,
                    message: "must be 4 charecters or more!",
                  },
                })}
              />
              <label className="label">
                <span className="label-text-alt">
                  {errors.name?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      {errors.name?.message}
                    </p>
                  )}
                  {errors.name?.type === "minLength" && (
                    <p role="alert" className="text-red-500">
                      {errors.name?.message}
                    </p>
                  )}
                </span>
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: { value: true, message: "email is required!" },
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Enter Valid Email ex: something@something.com",
                  },
                })}
              />
              <label className="label">
                <span className="label-text-alt">
                  {errors.email?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      {errors.email?.message}
                    </p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p role="alert" className="text-red-500">
                      {errors.email?.message}
                    </p>
                  )}
                </span>
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Speciality</span>
              </label>
              <select className="select select-ghost w-full max-w-xs">
                    <option disabled selected>Pick a speciality</option>
                    <option>Cosmetic Dentist</option>
                    <option>Teeth Orthodontics</option>
                    <option>Root Canel</option>
                </select>
              
              
            </div>
            <input
              className="btn btn-outline border border-primary  w-full max-w-xs hover:bg-primary hover:border-none"
              type="submit"
              value="Add Doctor"
            />
          
                    <div> {error && (
              <p className="text-red-500 text-center">{error.message}</p>
            ) }</div>
           
          </form>
    </div>
  )
}

export default AddDoctor