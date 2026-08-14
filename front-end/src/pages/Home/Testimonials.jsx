import React from "react";
import quote from "../../../assets/icons/quote.svg";
import people1 from "../../../assets/images/people1.png";
import people2 from "../../../assets/images/people2.png";
import people3 from "../../../assets/images/people3.png";
import Review from "./Review";

const Testimonials = () => {
  const reviews = [
    {
      _id: 1,
      name: "Winson Herry",
      review: "The online booking process was super smooth, and the dental team made me feel completely relaxed throughout my procedure. Highly recommended!",
      location: "California",
      img: people1,
    },
    {
      _id: 2,
      name: "Sophia Martinez",
      review: "Doctors Portal helped me find a top-tier specialist within minutes. The doctors are incredibly caring and attentive to detail.",
      location: "New York",
      img: people2,
    },
    {
      _id: 3,
      name: "Emily Watson",
      review: "Clean clinic, professional environment, and zero waiting time. Truly the best healthcare experience I've had in years!",
      location: "Texas",
      img: people3,
    },
  ];
  return (
    <section id="reviews" className="my-20 scroll-mt-24">
      <div className="flex justify-between">
        <div>
          <h4 className="text-xl text-primary font-bold ">Testimonials</h4>
          <h2 className="text-2xl  font-bold">What is our patients says</h2>
        </div>
        <div>
          <img src={quote} alt="" className=" w-24 lg:w-48" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
