import { useState } from "react";
import googleIcon from "../../../assets/icons/google.png";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../../features/services/userSlice";
import Loading from "../shared/Loading.jsx";
import { useLoginUserMutation, useUpdateUserMutation } from "../../features/user/userApi";



const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const [updateUser,{data, isloading, isError}] = useUpdateUserMutation()
  const [loginUser, {data:loginUserData}] = useLoginUserMutation()
  let from = location.state?.from?.pathname || "/";
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //userName and Email Signin
  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
     
        loginUser({email, password})
           
      dispatch(
        setActiveUser({
          userName: user.displayName,
          email: user.email,
        })
      );

      setLoading(false);
      
      navigate(from, { replace: true });
    } catch (err) {
      setLoading(false)
      setError(err)
     }
  };

  //google Signin

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          setActiveUser({
            userName: result.user.displayName,
            email: result.user.email,
          })
        );
    
        const currentUser = {username:result.user.displayName, email: result.user.email}
        const email = result.user.email
          updateUser({email, currentUser })
          const accessToken = result.user.accessToken
          localStorage.setItem('accessToken', accessToken)
          navigate(from, {replace: true})
          
      
      })

      .catch((err) => setError(err));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center h-screen pt-20 ">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body text-center space-y-8 border border-primary px-20">
          <h2 className="text-2xl font-bold text-primary">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: { value: true, message: "Password is required!" },
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
              value="Login"
            />
            <div className=" mt-2">
              <span className="text-red-500 mr-2"> New ? </span>
              <Link to="/register" className="text-green-500 font-bold">
                Register
              </Link>
             
            </div>
                    <div> {error && (
              <p className="text-red-500 text-center">{error.message.substring(0, 45)}</p>
            ) }</div>
           
          </form>
          <div className="divider">OR</div>
          <button
            className="btn btn-outline hover:border-none hover:bg-primary border-primary "
            onClick={signInWithGoogle}
          >
            <span className="mr-2 ">
              <img src={googleIcon} alt="" width={25} />
            </span>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
