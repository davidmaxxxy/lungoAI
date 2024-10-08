import React, { useState } from "react";
import FormTableWrapper from "../../components/TableForms/FormTableWrapper";
import axios from "axios";
import "../MacroTrendInputPage/MacroTrendInputPage.scss";

function MacroTrendInputPage() {
  const [activeStage, setActiveStage] = useState(1);

  const headers = [
    { text: "#" },
    { text: "Theme" },
    { text: "Theme Description" },
  ];

  const rows = [
    ["1", "Rising Global Inflation", "Describe the impact here..."],
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rowData = [];

    formData.forEach((value) => rowData.push(value));

    // Assuming you have backend logic to call ChatGPT API
    try {
      const response = await axios.post("/api/generate-impact-analysis", {
        data: rowData,
      });

      const data = response.data;
      console.log("Generated Impact Analysis: ", data);
    } catch (error) {
      console.error("Error generating impact analysis: ", error);
    }
  };

  return (
    <div className="macro-trend-input-page">
      <div className="macro-trend-input-page__stages">
        {[
          {
            number: 1,
            text: "Identify Macro Trends & Assess Asset Class Impact",
          },
          {
            number: 2,
            text: "Generate Potential Winners & Losers from Asset Impact",
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

      <FormTableWrapper
        headers={headers}
        rows={rows}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default MacroTrendInputPage;
