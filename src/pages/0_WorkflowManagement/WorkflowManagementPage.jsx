// WorkflowManagementPage.jsx
import React, { useState } from "react";
import MacroTrendInputPage from "../1_MacroTrendInputPage/MacroTrendInputPage";
import ImpactAssessmentPage from "../2_ImpactAssessmentPage/ImpactAssessmentPage";
import InvestmentIdeasPage from "../3_InvestmentIdeasPage/InvestmentIdeasPage";
import Header from "../../components/Header/Header";
import "./WorkflowManagementPage.scss";

function WorkflowManagementPage() {
  const [portfolioCount, setPortfolioCount] = useState(0); // Track portfolio count
  const [activeStage, setActiveStage] = useState(1);
  const [impactData, setImpactData] = useState(null);
  const [investmentIdeas, setInvestmentIdeas] = useState([]);

  const handleNextStage = (data = null) => {
    console.log("Moving to next stage, current active stage:", activeStage);
    console.log("Data received for next stage:", data);

    setActiveStage((prevStage) => prevStage + 1);
    if (data) {
      if (activeStage === 1) {
        // Stage 1 to Stage 2 - Saving impact analysis data
        console.log("Saving impact analysis data with themeId:", data.theme_id);
        setImpactData(data);
      } else if (activeStage === 2) {
        // Stage 2 to Stage 3 - Saving investment ideas
        console.log("Saving investment ideas with themeId:", data.themeId);
        setInvestmentIdeas(data.investmentIdeas);
        setImpactData((prevImpactData) => ({
          ...prevImpactData,
          themeId: data.themeId,
        }));
      }
    }
  };

  const handlePortfolioUpdate = () => {
    setPortfolioCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="workflow-management-page">
      <Header portfolioCount={portfolioCount} />
      <div className="workflow-management-page__stages">
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
            className={`workflow-management-page__stage ${
              activeStage === stage.number
                ? "workflow-management-page__stage--active"
                : ""
            }`}
          >
            <span className="workflow-management-page__stage-number">
              {stage.number}
            </span>
            <span className="workflow-management-page__stage-text">
              {stage.text}
            </span>
          </div>
        ))}
      </div>

      {activeStage === 1 && (
        <MacroTrendInputPage onNextStage={handleNextStage} />
      )}
      {activeStage === 2 && impactData && (
        <ImpactAssessmentPage data={impactData} onNextStage={handleNextStage} />
      )}
      {activeStage === 3 && impactData && investmentIdeas.length > 0 && (
        <InvestmentIdeasPage
          impactData={impactData} // Pass the complete impact data, including themeId
          investmentIdeas={investmentIdeas}
          onPortfolioUpdate={handlePortfolioUpdate} // Pass portfolio update handler
        />
      )}
    </div>
  );
}

export default WorkflowManagementPage;
