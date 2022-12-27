import React from "react";

const PrimaryButton = ({ title }) => {
  return (
    <button className="btn btn-primary uppercase font-bold bg-gradient-to-r from-primary to-secondary mt-2">
      {title}
    </button>
  );
};

export default PrimaryButton;
