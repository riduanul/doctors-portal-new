import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../../features/user/userApi";

const Register = () => {
  const [signup, { data, isLoading, isError }] = useSignupMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const handleSignup = async (data) => {
    const { name: username, email, password } = data;
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: data.name,
      })
        .then(() => {
          console.log("profile Updated");
        })
        .catch((err) => console.log(err));
      const user = userCredential.user;

      signup({ username, email, password });

      setLoading(false);
      setError(false);
      reset();
      toast.success("Successfully Registered!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      navigate("/appointment");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body text-center space-y-8 border border-primary px-20">
          <h2 className="text-2xl font-bold text-primary">Register</h2>
          <form onSubmit={handleSubmit(handleSignup)} className="w-full">
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
                      {errors.anme?.message}
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
                    <p role="alert" className="text-red-500"></p>
                  )}
                </span>
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: { value: true, message: "password is required!" },
                  minLength: {
                    value: 6,
                    message: "must be 6 characters  or long",
                  },
                })}
              />
              <label className="label">
                <span className="label-text-alt">
                  {errors.password?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p role="alert" className="text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </span>
              </label>
            </div>

            <input
              className="btn btn-outline border border-primary  w-full max-w-xs hover:bg-primary hover:border-none"
              type="submit"
            />
            <div className=" mt-2">
              <span className="text-red-500 mr-2"> Already Registered ? </span>
              <Link to="/login" className="text-green-500 font-bold">
                Login
              </Link>
            </div>
            {error && <p className="text-red-500">{error.message}</p>}
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
