import React, { useState } from "react";
import FormTableWrapper from "../../components/TableForms/FormTableWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faFileContract,
  faWheatAlt,
  faGem,
  faMoneyBillAlt,
  faBitcoinSign,
} from "@fortawesome/free-solid-svg-icons";
import "./ImpactAssessmentPage.scss";

function ImpactAssessmentPage() {
  const [activeStage, setActiveStage] = useState(2);

  const headers = [
    { text: "#" },
    { text: "Theme Description" },
    { text: "Impact on Stocks", icon: <FontAwesomeIcon icon={faChartLine} /> },
    {
      text: "Impact on Bonds",
      icon: <FontAwesomeIcon icon={faFileContract} />,
    },
    {
      text: "Impact on Soft Commodities",
      icon: <FontAwesomeIcon icon={faWheatAlt} />,
    },
    {
      text: "Impact on Hard Commodities",
      icon: <FontAwesomeIcon icon={faGem} />,
    },
    {
      text: "Impact on Currencies",
      icon: <FontAwesomeIcon icon={faMoneyBillAlt} />,
    },
    {
      text: "Impact on Cryptocurrencies",
      icon: <FontAwesomeIcon icon={faBitcoinSign} />,
    },
  ];

  // Placeholder rows for demonstration
  const rows = [
    [
      "1",
      "Rising Global Inflation",
      "High - Negative effect on stocks.",
      "Medium - Changes in yields expected.",
      "Medium - Volatility expected in commodities like wheat.",
      "High - Hard commodities may see price increase.",
      "Medium - Possible currency devaluation.",
      "Low - Cryptos may behave differently.",
    ],
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted for Impact Assessment.");
  };

  return (
    <div className="impact-assessment-page">
      <div className="impact-assessment-page__stages">
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
            className={`impact-assessment-page__stage ${
              activeStage === stage.number
                ? "impact-assessment-page__stage--active"
                : ""
            }`}
          >
            <span
              className={`impact-assessment-page__stage-number ${
                activeStage === stage.number
                  ? "impact-assessment-page__stage-number--active"
                  : ""
              }`}
            >
              {stage.number}
            </span>
            <span
              className={`impact-assessment-page__stage-text ${
                activeStage === stage.number
                  ? "impact-assessment-page__stage-text--active"
                  : ""
              }`}
            >
              {stage.text}
            </span>
          </div>
        ))}
      </div>

      <h1>Impact Assessment for Macro Trends</h1>
      <FormTableWrapper
        headers={headers}
        rows={rows}
        handleFormSubmit={handleFormSubmit}
        isInput={false} // Set as false to display static content
      />
    </div>
  );
}

export default ImpactAssessmentPage;
