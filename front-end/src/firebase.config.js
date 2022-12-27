// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAezUTYtb4pXdPgb5W4yrqP-ZtYnoRhEuk",
  authDomain: "doctors-portal-19acd.firebaseapp.com",
  projectId: "doctors-portal-19acd",
  storageBucket: "doctors-portal-19acd.appspot.com",
  messagingSenderId: "859241021147",
  appId: "859241021147:web:7a4a13f4c0fc44840096fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


