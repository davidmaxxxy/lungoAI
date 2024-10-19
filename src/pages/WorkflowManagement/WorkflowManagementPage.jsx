import React, { useState } from "react";
import MacroTrendInputPage from "../MacroTrendInputPage/MaroTrendInputPage";
import ImpactAssessmentPage from "../ImpactAssessmentPage/ImpactAssessmentPage";
import InvestmentIdeasPage from "../InvestmentIdeasPage/InvestmentIdeasPage";
import "./WorkflowManagementPage.scss";

function WorkflowManagementPage() {
  const [activeStage, setActiveStage] = useState(1);
  const [impactData, setImpactData] = useState(null);

  // Move to the next stage and pass the data if available
  const handleNextStage = (data = null) => {
    setActiveStage((prevStage) => prevStage + 1);
    if (data) {
      setImpactData(data);
    }
  };

  return (
    <div className="workflow-management-page">
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
      {activeStage === 3 && <InvestmentIdeasPage impactData={impactData} />}
    </div>
  );
}

export default WorkflowManagementPage;
