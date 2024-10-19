import React, { useState } from "react";
import Button from "../../components/Buttons/Button";
import Loading from "../../components/Loading/Loading";
import "./ImpactAssessmentPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faFileContract,
  faWheatAlt,
  faGem,
  faMoneyBillAlt,
  faBitcoinSign,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ImpactAssessmentPage({ data, onNextStage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!data || !data.impact_analysis || !data.impact_analysis.asset_classes) {
    console.error("Impact data is missing or incomplete:", data);
    return null;
  }

  const assetClassIcons = {
    Stocks: faChartLine,
    Bonds: faFileContract,
    "Soft Commodities": faWheatAlt,
    "Hard Commodities": faGem,
    Currencies: faMoneyBillAlt,
    Cryptocurrencies: faBitcoinSign,
  };

  const handleGenerateInvestmentIdeas = async () => {
    setIsLoading(true);
    setError("");

    console.log(
      "Sending request to generate investment ideas with id:",
      data.id
    ); // Debugging line

    try {
      // Send a POST request to generate investment ideas
      const response = await axios.post(
        "http://localhost:5001/api/ideas/generate-investment-ideas",
        {
          impact_assessment_id: data.id, // Ensure data.id is the correct impact assessment ID
        }
      );

      console.log("Response from backend:", response.data); // Debugging step: Log response data

      if (response.status === 200) {
        const { impact_assessment_id, investmentIdeas } = response.data;

        // Check if the `impact_assessment_id` exists
        if (!impact_assessment_id) {
          console.error(
            "Missing impact_assessment_id in response data",
            response.data
          );
          setError(
            "Missing impact assessment ID in response. Please try again."
          );
          return;
        }

        // Pass both `impact_assessment_id` and `investmentIdeas` to `onNextStage`
        onNextStage({ id: impact_assessment_id, investmentIdeas });
      }
    } catch (err) {
      console.error("Error generating investment ideas", err);
      setError("Failed to generate investment ideas. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="impact-assessment-page">
      <h2>Impact Analysis of the Provided Macroeconomic Trend</h2>

      {data.impact_analysis.asset_classes.map((assetClass, index) => (
        <div key={index} className="impact-assessment-page__asset">
          <div className="impact-assessment-page__asset-header">
            <FontAwesomeIcon
              icon={assetClassIcons[assetClass.assetClass]}
              className="impact-assessment-page__icon"
            />
            <h3>{assetClass.assetClass}</h3>
          </div>
          <div className="impact-assessment-page__impact-level">
            <h4>Impact Level: {assetClass.impactLevel}</h4>
          </div>
          <div className="impact-assessment-page__subcategories">
            {Object.entries(assetClass.subcategories).map(
              ([subcategory, description], subIndex) => (
                <div
                  key={subIndex}
                  className="impact-assessment-page__subcategory"
                >
                  <h4>{formatSubcategoryTitle(subcategory)}</h4>
                  <p>{description}</p>
                </div>
              )
            )}
          </div>
        </div>
      ))}

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <Loading message="Generating investment ideas... This might take up to 1min." />
      ) : (
        <div className="impact-assessment-page__generate-ideas-button-container">
          <Button
            text="Generate Investment Ideas"
            className="stages-button"
            onClick={handleGenerateInvestmentIdeas}
          />
        </div>
      )}
    </div>
  );
}

function formatSubcategoryTitle(subcategory) {
  return subcategory
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize first letter of each word
}

export default ImpactAssessmentPage;
