import React from "react";
import InfoCard from "./InfoCard";
import clock from "../../../assets/icons/clock.svg";
import marker from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";

const Info = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 text-white">
      <InfoCard
        cardTitle="Opening Hours"
        description="Open Mon - Sat: 9:00 AM - 8:00 PM. Emergency care 24/7."
        bgClass="bg-gradient-to-r from-primary to-secondary"
        clock={clock}
      />
      <InfoCard 
        cardTitle="Our Location" 
        description="123 Medical Center Drive, Suite 400, New York, NY 10001"
        bgClass="bg-accent" 
        clock={marker} 
      />
      <InfoCard
        cardTitle="Contact Us"
        description="Call +1 (800) 555-0199 or email support@doctorsportal.com"
        bgClass="bg-gradient-to-r from-secondary to-primary"
        clock={phone}
      />
    </div>
  );
};

export default Info;
