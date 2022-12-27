import React from "react";
import footerbg from "../../../assets/images/footer.png";
import logo from "../../../assets/images/logo.png";
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
            <span className="text-green-700 font-semibold">
              Your New Smile Starts Here!
            </span>
          </div>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Whitening</a>
          <a className="link link-hover">Cavity Filling</a>
          <a className="link link-hover">Fluoride Treatment</a>
          <a className="link link-hover">Root Cannal</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
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
