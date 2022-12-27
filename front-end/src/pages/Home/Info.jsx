import React from "react";
import InfoCard from "./InfoCard";
import clock from "../../../assets/icons/clock.svg";
import marker from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";

const Info = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-30 text-white sm:text-center">
      <InfoCard
        cardTitle="Opening Hours"
        bgClass="bg-gradient-to-r from-primary to-secondary"
        clock={clock}
      />
      <InfoCard cardTitle="Our Location" bgClass="bg-accenet" clock={marker} />
      <InfoCard
        cardTitle="Contact Us"
        bgClass="bg-gradient-to-r from-secondary to-primary"
        clock={phone}
      />
    </div>
  );
};

export default Info;
