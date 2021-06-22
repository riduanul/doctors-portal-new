import React from 'react';
import loginbg from '../../../images/loginbg.png';
import { useForm } from 'react-hook-form';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../../firebaseConfig';


firebase.initializeApp(firebaseConfig)

const provider = new firebase.auth.GoogleAuthProvider();

const handleGoogleSignIn = () => {
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
        
    }

    return (

        <div className="container"> 
            <div className="row">
                <div className="col-md-6 col-sm-12 input ">
               <form onSubmit={handleSubmit(onSubmit)}>
                   <h1 className="text-brand text-center pb-5 ">Login</h1>
                    <div className="form-group p-2">
                        <label className='text-secondary'>User Name</label>
                        <input type="text" {...register('userName',{ required: true })} className="form-control" />
                        {errors.userName && <span className="text-danger">This field is required</span>}

                    </div>
                    <div className="form-group p-2">
                    <label className='text-secondary'>Password</label>
                        <input type="password" {...register('password',{ required: true })} className="form-control" />
                        {errors.password && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group p-2 pt-3 text-right d-flex justify-content-center">
                        <button type="submit" className="btn btn-brand">Login</button>
                    </div>
                   
               </form>
                <button onClick="handleGoogleSignIn" className="btn-brand">Google Sign In</button>
                </div>
                <div className="col-md-6">
                    <div className="img-fluid">
                        <img src={loginbg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;