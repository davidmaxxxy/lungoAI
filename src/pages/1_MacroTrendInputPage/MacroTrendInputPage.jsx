import React, { useState } from "react";
import axios from "axios";
import "./MacroTrendInputPage.scss";
import Button from "../../components/Buttons/Button";
import Loading from "../../components/Loading/Loading";

function MacroTrendInputPage({ onNextStage }) {
  const [themeDescription, setThemeDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const payload = {
      data: themeDescription,
      user_id: 1, // Dummy ID for simplicity since login is not needed anymore
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
      setIsLoading(false); // Re-enable form if an error occurs
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
          <Button
            text={isLoading ? "Generating..." : "Generate Impact Assessment"}
            type={"submit"}
            disabled={isLoading}
          />
        </form>
      )}

      {isLoading && (
        <Loading message="Generating impact assessment... This might take up to 1 min." />
      )}

      {error && (
        <div className="macro-trend-input-page__error-message">{error}</div>
      )}
    </div>
  );
}

export default MacroTrendInputPage;
