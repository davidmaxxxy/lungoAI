import React from "react";
import "../Hero/Hero.scss";

function Hero() {
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
          <h1>TRY IT YOURSELF</h1>
          <span className="hero__cta-container__triangle"></span>
        </div>
      </div>
    </div>
  );
}

export default Hero;
