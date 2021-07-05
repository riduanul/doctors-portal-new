import React, { useContext } from 'react';
import loginbg from '../../../images/loginbg.png';
import { useForm } from 'react-hook-form';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        // var credential = result.credential;
        // var token = credential.accessToken;
        var {displayName, email} = result.user;
        const signedInUser ={isSignedIn: true, name: displayName,email}       
        // setUser(signedInUser); 
        setLoggedInUser(signedInUser);
        history.replace (from);
    }).catch((error) => {
       var errorMessage = error.message;
      console.log(errorMessage); 
      });
       
    }

    // const handleGoogleSignOut = () => {
    //     firebase.auth().signOut().then(() => {
    //         const signedOutUser ={
    //             isSignedIn: false,
    //             name:'',
    //             email:''
    // }
    //         // setUser(signedOutUser);
    //         setLoggedInUser(signedOutUser);
    //       }).catch((error) => {
    //         // An error happened.
    //       });
    //     console.log('clicked')
    // }


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
        
    }

    return (

        <section className="container"> 
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
                
                <button onClick={handleGoogleSignIn} className="btn-brand"> Google Sign In</button>
                
                </div>
                <div className="col-md-6">
                    <div className="img-fluid">
                        <img src={loginbg} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;