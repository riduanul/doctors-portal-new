import React from "react";
import doctor from "../../../assets/images/doctor.png";
import PrimaryButton from "../Shared/PrimaryButton";
import appointment from "../../../assets/images/appointment.png";

const MakeAppointment = () => {
  return (
    <section
      style={{
        background: `url(${appointment})`,
      }}
    >
      <div className=" lg:flex justify-around items-center mt-20 text-center lg:text-left  ">
        <div className="flex-1">
          <img src={doctor} alt="" className="mt-[-100px] hidden lg:block" />
        </div>
        <div className="flex-1 space-y-4 ">
          <h3 className="text-xl text-primary font-bold">Appointment</h3>
          <h2 className=" text-xl lg:text-3xl font-bold text-white">
            Make An Appointment Today
          </h2>
          <p className="text-white/90 leading-relaxed">
            Don't delay your health. Schedule your consultation with our experienced physicians in just a few clicks. Select your preferred date, time slot, and treatment specialty today.
          </p>
          <PrimaryButton title="GET APPOINTMENT" />
        </div>
      </div>
    </section>
  );
};

export default MakeAppointment;
