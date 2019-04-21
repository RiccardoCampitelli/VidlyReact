import React from "react";

const Like = props => {
  return (
    <i
      onClick={props.onClick}
      className={props.isLiked ? "fa fa-heart" : "fa fa-heart-o"}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
