import React from "react";
import Banner from "./banner";
import Contact from "./Contact";

import Hero from "./Hero";
import Info from "./Info";
import MakeAppointment from "./MakeAppointment";
import Services from "./Services";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div >
      <Banner />
      <Info />
      <Services />
      <Hero />
      <MakeAppointment />
      <Testimonials />
      <Contact />
   
    </div>
  );
};

export default Home;
