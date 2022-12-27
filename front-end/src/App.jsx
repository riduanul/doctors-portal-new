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
import MyAppointments from "./pages/Dashboard/MyAppointments";
import Reviews from "./pages/Dashboard/Reviews";
import TreatmentHistory from "./pages/Dashboard/TreatmentHistory.jsx";

function App() {
  const email = useSelector((state) => state.user.email);
  return (
    <div>
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
              <Route index element={<MyAppointments />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="history" element={<TreatmentHistory />} />
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
