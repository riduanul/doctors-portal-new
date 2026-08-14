import React from "react";
const InfoCard = ({ clock, cardTitle, description, bgClass }) => {
  return (
    <div className={`card lg:card-side shadow-xl p-4 items-center ${bgClass}`}>
      <figure className="p-4 flex justify-center items-center flex-shrink-0">
        <img src={clock} alt={cardTitle} className="w-12 h-12 lg:w-14 lg:h-14 object-contain" />
      </figure>
      <div className="card-body p-4 text-left">
        <h2 className="card-title text-white font-bold">{cardTitle}</h2>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
