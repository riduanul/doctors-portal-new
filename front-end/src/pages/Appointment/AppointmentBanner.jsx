import React from "react";
import chair from "../../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const AppointmentBanner = ({ date, setDate }) => {
  return (
    <section>
      <div className="hero ">
        <div className="hero-content flex-col-reverse lg:flex-row gap-60">
          <div>
            <DayPicker mode="single" selected={date} onSelect={setDate} />
          </div>
          <img src={chair} className="max-w-md rounded-lg shadow-2xl" />
        </div>
      </div>
    </section>
  );
};

export default AppointmentBanner;
