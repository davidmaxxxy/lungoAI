import React from "react";
import { useNavigate } from "react-router-dom";
import "../Hero/Hero.scss";
import Button from "../Buttons/Button";

function Hero() {
  const navigate = useNavigate();

  // Handle redirection when the button is clicked
  const handleCTAButtonClick = () => {
    navigate("/stages"); // Navigate to the workflow management page
  };

  return (
    <div className="hero">
      <div className="hero__header">
        <h1>
          Beat the odds with AI-driven insights and take your investments to the
          next level
        </h1>
        <div className="hero__header--container">
          <p>
            Studies show that 70% to 90% of retail traders lose money, depending
            on the platform and type of trading.
          </p>
          <p>
            LungoAI is designed to help you beat the odds by equipping you with
            AI-driven insights, enabling long-term investment strategies with
            ease, and increasing your success rate.
          </p>
        </div>
        <div className="hero__cta-container">
          {/* <h1>TRY IT YOURSELF</h1> */}
          {/* Use button element for the CTA button to navigate */}
          <button
            className="hero__cta-container__button"
            onClick={handleCTAButtonClick}
          >
            Try it Yourself
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
