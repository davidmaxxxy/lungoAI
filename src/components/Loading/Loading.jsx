import React from "react";
import "./Loading.scss";

function Loading({ message = "Loading... This might take up to 1min." }) {
  return (
    <div className="loading-component">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default Loading;
