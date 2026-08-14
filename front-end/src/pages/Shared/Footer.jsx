import React from "react";
import footerbg from "../../../assets/images/footer.png";
import logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ background: `url(${footerbg})` }}>
      <div className="footer p-10 pt-20 text-base-content ">
        <div className="grid grid-flow-row">
          <div className="ml-4">
            <img src={logo} alt="" />
          </div>
          <div>
            <span className="text-2xl font-bold"> Doctors Portal</span>
            <br />
            <span className="text-primary font-semibold">
              Your New Smile Starts Here!
            </span>
          </div>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <Link to="/appointment" className="link link-hover">Teeth Whitening</Link>
          <Link to="/appointment" className="link link-hover">Cavity Filling</Link>
          <Link to="/appointment" className="link link-hover">Fluoride Treatment</Link>
          <Link to="/appointment" className="link link-hover">Root Canal</Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link to="/about" className="link link-hover">About Us</Link>
          <a href="/#contact" className="link link-hover">Contact</a>
          <Link to="/appointment" className="link link-hover">Book Appointment</Link>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <Link to="/terms" className="link link-hover">Terms of Use</Link>
          <Link to="/privacy" className="link link-hover">Privacy Policy</Link>
          <Link to="/cookie" className="link link-hover">Cookie Policy</Link>
        </div>
      </div>

      <div className="text-center">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Doctors
          Portal{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
