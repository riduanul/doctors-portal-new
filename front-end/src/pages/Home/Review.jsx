import React from "react";

const Review = ({ review }) => {
  return (
    <div className="card lg:max-w-lg bg-base-100 shadow-xl">
      <div className="card-body">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nisi,
          numquam ipsa cumque deserunt esse.
        </p>
      </div>
      <div className="flex flex-rows gap-3 justify-center items-center ">
        <div className="avatar">
          <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={review.img} />
          </div>
        </div>
        <div>
          <h4 className="text-xl font-bold">{review.name}</h4>
          <p>{review.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
