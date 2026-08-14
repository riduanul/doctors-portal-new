import React from "react";

const Review = ({ review }) => {
  return (
    <div className="card lg:max-w-lg bg-base-100 shadow-xl">
      <div className="card-body">
        <p className="text-base-content/80 italic">
          "{review.review}"
        </p>
      </div>
      <div className="flex flex-rows gap-4 justify-start items-center pb-8 pl-8">
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
