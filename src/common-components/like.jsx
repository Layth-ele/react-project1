/** @format */

import React from "react";

export const Like = (props) => {
  let likeClass = "fa fa-heart";
  if (!props.like) likeClass += "-o";
  return (
    <i className={likeClass} aria-hidden="true" onClick={props.onClick}></i>
  );
};
