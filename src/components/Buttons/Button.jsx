import React from "react";
import "../Buttons/Button.scss";

function Button({ text, type, className = "", onClick }) {
  return (
    <button className={`stages-button ${className}`} type={type} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
