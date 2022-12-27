import React from "react";
import appointmentbg from "../../../assets/images/appointment.png";
import PrimaryButton from "../Shared/PrimaryButton";
const Contact = () => {
  return (
    <section
      style={{
        background: `url(${appointmentbg})`,
        backgroundPosition: "cover",
        padding: "20px",
      }}
    >
      <h3 className="text-primary font-bold text-center text-xl">Contact Us</h3>
      <p className="text-2xl font-bold text-white text-center pb-10">
        Stay connected with us
      </p>
      <form action="" className="text-center space-y-10">
        <input
          type="text"
          placeholder="Email Address"
          className="input input-bordered w-full max-w-xs"
        />{" "}
        <br />
        <input
          type="text"
          placeholder="Subject"
          className="input input-bordered w-full max-w-xs"
        />
        <br />
        <textarea
          type="textarea"
          placeholder="Your Message"
          rows={10}
          className="textarea textarea-bordered h-24 w-full max-w-xs"
        ></textarea>
        <br />
        <PrimaryButton title="submit" />
      </form>
    </section>
  );
};

export default Contact;
