import React from "react";

const Gold = props => {
  return (
    <i
      className={props.isGold ? "fa fa-star" : "fa fa-star-o"}
      aria-hidden="true"
    />
  );
};

export default Gold;
