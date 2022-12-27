import React from "react";
const InfoCard = ({ clock, cardTitle, bgClass }) => {
  return (
    <div className={` card lg:card-side bg-accent shadow-xl ${bgClass} `}>
      <figure>
        <img src={clock} alt="Album" />
      </figure>
      <div className="card-body text-left">
        <h2 className="card-title">{cardTitle}</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
      </div>
    </div>
  );
};

export default InfoCard;
