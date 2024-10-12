import React, { useState } from "react";
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
  // Asset classes and respective icons
  const assetClasses = [
    {
      name: "Stocks",
      icon: faChartLine,
      impact: "High - Negative impact expected due to increased inflation.",
    },
    {
      name: "Bonds",
      icon: faFileContract,
      impact: "Medium - Yields may fluctuate.",
    },
    {
      name: "Soft Commodities",
      icon: faWheatAlt,
      impact: "Medium - Increased volatility in prices.",
    },
    {
      name: "Hard Commodities",
      icon: faGem,
      impact: "High - Price increases expected in precious metals.",
    },
    {
      name: "Currencies",
      icon: faMoneyBillAlt,
      impact: "Low - Some devaluation risk.",
    },
    {
      name: "Cryptocurrencies",
      icon: faBitcoinSign,
      impact: "Medium - Uncertain response to macro conditions.",
    },
  ];

  return (
    <div className="impact-assessment-page">
      <div className="impact-assessment-page__table">
        {/* Headers */}
        <div className="impact-assessment-page__header">
          <div className="impact-assessment-page__header--cell">
            Asset Class
          </div>
          <div className="impact-assessment-page__header--cell">
            Impact Assessment
          </div>
        </div>

        {/* Body */}
        {assetClasses.map((assetClass, index) => (
          <div key={index} className="impact-assessment-page__row">
            <div className="impact-assessment-page__cell impact-assessment-page__cell--asset-class">
              <FontAwesomeIcon
                icon={assetClass.icon}
                className="impact-assessment-page__icon"
              />{" "}
              {assetClass.name}
            </div>
            <div className="impact-assessment-page__cell impact-assessment-page__cell--impact">
              {assetClass.impact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImpactAssessmentPage;
