import React from "react";
import "../FixedButtonContainer/FixedButtonContainer.scss";

function FixedButtonContainer({ children }) {
  return <div className="fixed-button-container">{children}</div>;
}

export default FixedButtonContainer;
