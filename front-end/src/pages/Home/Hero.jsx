import React from "react";
import treatment from "../../../assets/images/treatment.png";
import PrimaryButton from "../Shared/PrimaryButton";
const Hero = () => {
  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row gap-20">
        <img src={treatment} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className=" text-3xl lg:text-5xl font-bold">
            Exceptional Dental <br /> Care, on Your Terms
          </h1>
          <p className="py-6 text-base-content/80 leading-relaxed">
            Our state-of-the-art clinic offers gentle, comprehensive dental care tailored to your needs. From routine cleanings to advanced cosmetic procedures, our expert team ensures a comfortable, pain-free experience.
          </p>
          <PrimaryButton title="GET STARTED" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
