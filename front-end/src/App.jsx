import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages//About/About.jsx";
import Login from "./pages/Login/Login.jsx";
import Navbar from "./pages/Shared/Navbar";
import Footer from "./pages/Shared/Footer.jsx";
import Appointment from "./pages/Appointment/Appointment.jsx";
import Register from "./pages/Login/Register";
import { useSelector } from "react-redux";
import RequireAuth from "./pages/Login/RequireAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardInfo from './pages/Dashboard/DashboardInfo';
import MyAppointments from "./pages/Dashboard/MyAppointments";
import useAuthCheck from "./Hooks/useAuthCheck";
import AllUsers from "./pages/Dashboard/AllUsers";
import AllDoctors from "./pages/Dashboard/AllDoctors";
import AddDoctor from "./pages/Dashboard/AddDoctor";
import AllAppointments from "./pages/Dashboard/AllAppointments";



function App() {
  const authChecked = useAuthCheck() 

  return (
      !authChecked ? <div>Checking Authentication....</div> : <div>
      <BrowserRouter>
        <div className="max-w-7xl mx-auto">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route
              path="appointment"
              element={
                <RequireAuth>
                  <Appointment />
                </RequireAuth>
              }
            />
            <Route
              path="dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            >
              <Route index element={<DashboardInfo/>}/>
              <Route path="myAppointments" element={<MyAppointments />} />
              
              <Route path="allAppointments" element={<AllAppointments />} />
              <Route path="doctors" element={<AllDoctors />} />
              <Route path="adddoctor" element={<AddDoctor />} />
              <Route path="users" element={<AllUsers />} />
              
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
