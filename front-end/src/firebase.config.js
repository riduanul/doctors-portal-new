// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-7ev-CewmDSfSmjoWvkaU3VNDSn_QQ4M",
  authDomain: "doctors-portal-1c00a.firebaseapp.com",
  projectId: "doctors-portal-1c00a",
  storageBucket: "doctors-portal-1c00a.firebasestorage.app",
  messagingSenderId: "1034167462473",
  appId: "1:1034167462473:web:f3e8fdcc7c3a762f6e6d98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


