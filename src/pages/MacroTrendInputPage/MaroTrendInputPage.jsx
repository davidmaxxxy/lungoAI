import React, { useState } from "react";

import ImpactAssessmentPage from "../ImpactAssessmentPage/ImpactAssessmentPage";
import axios from "axios";
import "../MacroTrendInputPage/MacroTrendInputPage.scss";
import Button from "../../components/Buttons/Button";
import "../../components/Buttons/Button.scss";

function MacroTrendInputPage() {
  const [activeStage, setActiveStage] = useState(1);
  const [themeDescription, setThemeDescription] = useState("");
  const [impactDataVisible, setImpactDataVisible] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setImpactDataVisible(true); // Directly set visibility to true to render ImpactAssessmentPage
    setActiveStage(2);
  };

  return (
    <div className="macro-trend-input-page">
      {/* Render the Stages */}
      <div className="macro-trend-input-page__stages">
        {[
          {
            number: 1,
            text: "Describe Macro Trends & Assess Asset Class Impact",
          },
          {
            number: 2,
            text: "Generate Investment Ideas Based on Provided Theme",
          },
          {
            number: 3,
            text: "Analyze Key Metrics & Choose Assets for Your Portfolio",
          },
        ].map((stage, index) => (
          <div
            key={index}
            className={`macro-trend-input-page__stage ${
              activeStage === stage.number
                ? "macro-trend-input-page__stage--active"
                : ""
            }`}
          >
            <span
              className={`macro-trend-input-page__stage-number ${
                activeStage === stage.number
                  ? "macro-trend-input-page__stage-number--active"
                  : ""
              }`}
            >
              {stage.number}
            </span>
            <span
              className={`macro-trend-input-page__stage-text ${
                activeStage === stage.number
                  ? "macro-trend-input-page__stage-text--active"
                  : ""
              }`}
            >
              {stage.text}
            </span>
          </div>
        ))}
      </div>

      {/* Form Section for Theme Description */}
      <form
        className="macro-trend-input-page__form"
        onSubmit={handleFormSubmit}
      >
        <h2 className="macro-trend-input-page__form--header">
          Describe macro trend
        </h2>
        <textarea
          className="macro-trend-input-page__form--textarea"
          value={themeDescription}
          onChange={(e) => setThemeDescription(e.target.value)}
          placeholder="Provide a short theme description... E.g. Inflation has been raising across the world"
          rows={4}
          required
        />
        <Button text={"Generate Impact Assessment"} type={"submit"} />
      </form>

      {/* Render ImpactAssessmentPage below if impactDataVisible is true */}
      {impactDataVisible && <ImpactAssessmentPage />}
    </div>
  );
}

export default MacroTrendInputPage;
