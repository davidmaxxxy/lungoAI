import React from "react";
import "../Buttons/Button.scss";

function Button({ text, type, className = "", onClick, disabled = false, variant = "primary" }) {
  return (
    <button
      className={`stages-button stages-button--${variant} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
