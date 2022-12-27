import React from "react";
import chair from "../../../assets/images/chair.png";
import bg from "../../../assets/images/bg.png";
import PrimaryButton from "../Shared/PrimaryButton";

const Banner = () => {
  return (
    <section style={{background: `url(${bg})` }}>
      <div className=" mb-20 mt-20  " >
      <div className="hero-content flex flex-col lg:flex-row-reverse">
        <img src={chair} className=" lg:w-[600px] md:w-[400px] sm:w-[380px] rounded-lg shadow-2xl " />
        <div>
          <h1 className="lg:text-5xl font-bold sm:text-xl">
            Your New Smile Starts Here!
          </h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. hello fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <PrimaryButton title="GET STARTED" />
        </div>
      </div>
    </div>
    </section>
  );
};

export default Banner;
