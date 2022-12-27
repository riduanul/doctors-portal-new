import React from "react";
import Service from "./Service";
import fluoride from "../../../assets/images/fluoride.png";
import whitening from "../../../assets/images/whitening.png";
import cavity from "../../../assets/images/cavity.png";

const Services = () => {
  const services = [
    {
      _id: 1,
      name: "Fluoride Treatment",
      desc: "",
      img: fluoride,
    },
    {
      _id: 2,
      name: "Whitening",
      desc: "",
      img: whitening,
    },
    {
      _id: 3,
      name: "Cavity Filling",
      desc: "",
      img: cavity,
    },
  ];

  return (
    <div className="my-28">
      <div className="text-center">
        <h3 className="text-primary text-xl font-bold uppercase ">
          Our Services
        </h3>
        <h2 className="text-4xl font-bold ">Services We Provide</h2>
      </div>
      <div className="grid sm-grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <Service key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
