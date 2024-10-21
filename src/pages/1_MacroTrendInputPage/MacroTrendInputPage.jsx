import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MacroTrendInputPage.scss";
import Button from "../../components/Buttons/Button";
import FixedButtonContainer from "../../components/FixedButtonContainer/FixedButtonContainer";
import Loading from "../../components/Loading/Loading";

function MacroTrendInputPage({ onNextStage, onPreviousStage }) {
  const [themeDescription, setThemeDescription] = useState(() => {
    const savedThemeDescription = localStorage.getItem("themeDescription");
    return savedThemeDescription ? savedThemeDescription : "";
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("themeDescription", themeDescription);
  }, [themeDescription]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const payload = {
      data: themeDescription,
      user_id: 1,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/impact/generate-impact-analysis",
        payload
      );

      if (response.status === 200) {
        onNextStage({
          ...response.data,
          id: response.data.impact_assessment_id,
        });
      } else {
        throw new Error("Failed to generate impact analysis.");
      }
    } catch (error) {
      console.error("Error generating impact analysis:", error);
      setError("Failed to generate impact analysis. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="macro-trend-input-page">
      {!isLoading && (
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
            placeholder="Provide a short theme description... E.g. US Elections - Trump vs Harris"
            rows={4}
            required
          />
        </form>
      )}

      {isLoading && (
        <Loading message="Generating impact assessment... This might take up to 1 min." />
      )}

      {error && (
        <div className="macro-trend-input-page__error-message">{error}</div>
      )}

      <FixedButtonContainer>
        {!isLoading && (
          <>
            <Button
              variant="primary"
              text="Generate Impact Assessment"
              type={"submit"}
              onClick={handleFormSubmit}
            />
            <Button variant="back" text="Back" onClick={onPreviousStage} />
          </>
        )}
      </FixedButtonContainer>
    </div>
  );
}

export default MacroTrendInputPage;
