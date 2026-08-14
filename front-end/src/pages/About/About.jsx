import React from "react";
import doctor from "../../../assets/images/doctor.png";
import treatment from "../../../assets/images/treatment.png";

const About = () => {
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto space-y-20 slide-up">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-widest">
          About Doctors Portal
        </span>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-base-content leading-tight">
          Pioneering Compassionate, Tech-Driven Healthcare
        </h1>
        <p className="text-base-content/70 text-lg leading-relaxed">
          We connect patients with world-class medical specialists through an effortless digital experience, delivering trusted diagnoses and compassionate clinical care.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-base-200 p-6 rounded-2xl text-center border border-base-300 shadow-sm">
          <h3 className="text-4xl font-extrabold text-primary mb-1">15+</h3>
          <p className="text-sm font-semibold text-base-content/70">Years Experience</p>
        </div>
        <div className="bg-base-200 p-6 rounded-2xl text-center border border-base-300 shadow-sm">
          <h3 className="text-4xl font-extrabold text-secondary mb-1">50k+</h3>
          <p className="text-sm font-semibold text-base-content/70">Satisfied Patients</p>
        </div>
        <div className="bg-base-200 p-6 rounded-2xl text-center border border-base-300 shadow-sm">
          <h3 className="text-4xl font-extrabold text-primary mb-1">120+</h3>
          <p className="text-sm font-semibold text-base-content/70">Expert Specialists</p>
        </div>
        <div className="bg-base-200 p-6 rounded-2xl text-center border border-base-300 shadow-sm">
          <h3 className="text-4xl font-extrabold text-secondary mb-1">99.4%</h3>
          <p className="text-sm font-semibold text-base-content/70">Positive Feedback</p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img 
            src={treatment} 
            alt="Medical treatment" 
            className="rounded-3xl shadow-2xl w-full object-cover max-h-[450px]" 
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-base-content">
            Our Mission & Core Values
          </h2>
          <p className="text-base-content/80 leading-relaxed">
            Doctors Portal was founded with a singular purpose: to remove friction from healthcare. We believe booking a specialist consultation should be as seamless as reserving a table or booking a flight.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-base-content">Patient-Centric Care</h4>
                <p className="text-sm text-base-content/70">Every treatment plan is personalized to suit your exact health requirements.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-base-content">Certified Medical Doctors</h4>
                <p className="text-sm text-base-content/70">Our medical board thoroughly verifies all registered physicians and specialists.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-base-content">24/7 Digital Convenience</h4>
                <p className="text-sm text-base-content/70">Access medical records, prescription history, and booking updates anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
