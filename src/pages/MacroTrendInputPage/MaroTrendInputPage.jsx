import React, { useState } from "react";
import axios from "axios";
import "./MacroTrendInputPage.scss";
import Button from "../../components/Buttons/Button";

function MacroTrendInputPage({ onNextStage }) {
  const [themeDescription, setThemeDescription] = useState("");
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
        onNextStage(response.data);
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
            placeholder="Provide a short theme description... E.g. Inflation has been rising across the world"
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
          <p>Generating impact assessment... This might take up to 1 min.</p>
        </div>
      )}

      {error && <div className="error-message"> {error}</div>}
    </div>
  );
}

export default MacroTrendInputPage;
