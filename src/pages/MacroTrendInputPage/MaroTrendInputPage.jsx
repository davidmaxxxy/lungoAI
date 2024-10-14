import React, { useState } from "react";

import ImpactAssessmentPage from "../ImpactAssessmentPage/ImpactAssessmentPage";
import axios from "axios";
import "../MacroTrendInputPage/MacroTrendInputPage.scss";
import Button from "../../components/Buttons/Button";

function MacroTrendInputPage() {
  const [activeStage, setActiveStage] = useState(1);
  const [themeDescription, setThemeDescription] = useState("");
  const [impactData, setImpactData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormSubmitted(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/generate-impact-analysis",
        {
          data: themeDescription,
        }
      );

      if (response.status === 200) {
        setImpactData(response.data);
        setActiveStage(2);
      }
    } catch (error) {
      console.error("Error generating impact analysis:", error);
      setError("Failed to generate impact analysis. Please try again");
      setFormSubmitted(false);
    } finally {
      setIsLoading(false);
    }
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

      {!formSubmitted && (
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
          <Button
            text={isLoading ? "Generating..." : "Generate Impact Assessment"}
            type={"submit"}
            disabled={isLoading}
          />
        </form>
      )}

      {isLoading && (
        <div className="macro-trend-input-page__loading">
          <div className="spinner"></div>
          <p>Generating impact assessment...</p>
        </div>
      )}

      {error && <div className="error-message"> {error}</div>}
      {impactData && <ImpactAssessmentPage data={impactData} />}
    </div>
  );
}

export default MacroTrendInputPage;
