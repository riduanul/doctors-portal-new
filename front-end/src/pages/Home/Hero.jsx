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
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <PrimaryButton title="GET STARTED" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
