import React from "react";
import "../Buttons/Button.scss";

function Button({ text, type }) {
  return (
    <button className="stages-button" type={type}>
      {text}
    </button>
  );
}

export default Button;
