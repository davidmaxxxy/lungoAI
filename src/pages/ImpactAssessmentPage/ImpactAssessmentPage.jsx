import React from "react";
import Button from "../../components/Buttons/Button";
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

function ImpactAssessmentPage({ data, onNextStage }) {
  if (!data || !data.asset_classes) {
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

  return (
    <div className="impact-assessment-page">
      <h2>Impact Analysis of Macroeconomic Trend</h2>

      {data.asset_classes.map((assetClass, index) => (
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
      <div className="impact-assessment-page__generate-ideas-button-container">
        <Button
          text="Generate Investment Ideas"
          className="stages-button"
          onClick={onNextStage}
        />
      </div>
    </div>
  );
}

function formatSubcategoryTitle(subcategory) {
  return subcategory
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize first letter of each word
}

export default ImpactAssessmentPage;
