import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MacroTrendInputPage from "../1_MacroTrendInputPage/MacroTrendInputPage";
import ImpactAssessmentPage from "../2_ImpactAssessmentPage/ImpactAssessmentPage";
import InvestmentIdeasPage from "../3_InvestmentIdeasPage/InvestmentIdeasPage";
import Header from "../../components/Header/Header";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./WorkflowManagementPage.scss";

function WorkflowManagementPage() {
  const [portfolioCount, setPortfolioCount] = useState(0); // Track portfolio count
  const [impactData, setImpactData] = useState(() => {
    const savedImpactData = localStorage.getItem("impactData");
    return savedImpactData ? JSON.parse(savedImpactData) : null;
  });
  const [investmentIdeas, setInvestmentIdeas] = useState(() => {
    const savedInvestmentIdeas = localStorage.getItem("investmentIdeas");
    return savedInvestmentIdeas ? JSON.parse(savedInvestmentIdeas) : [];
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Save impact data and investment ideas to localStorage on change
    if (impactData) {
      localStorage.setItem("impactData", JSON.stringify(impactData));
    }
    if (investmentIdeas.length > 0) {
      localStorage.setItem("investmentIdeas", JSON.stringify(investmentIdeas));
    }
  }, [impactData, investmentIdeas]);

  // Determine which stage to show based on the current URL path
  const currentStage = location.pathname.split("/")[2];

  // Handlers to move between stages
  const handleNextStage = (data = null) => {
    if (data) {
      if (currentStage === "macro-theme") {
        setImpactData(data);
        navigate("/stages/impact-assessment");
      } else if (currentStage === "impact-assessment") {
        setInvestmentIdeas(data.investmentIdeas);
        setImpactData((prevImpactData) => ({
          ...prevImpactData,
          themeId: data.themeId,
        }));
        navigate("/stages/investment-ideas");
      }
    }
  };

  // Updated handler to navigate back to the previous stage
  const handlePreviousStage = () => {
    if (currentStage === "impact-assessment") {
      navigate("/stages/macro-theme");
    } else if (currentStage === "investment-ideas") {
      navigate("/stages/impact-assessment");
    } else {
      navigate(-1); // Navigate back to the previous page in history if at first stage
    }
  };

  const handlePortfolioUpdate = () => {
    setPortfolioCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="workflow-management-page">
      <Header portfolioCount={portfolioCount} />

      <PageWrapper>
        {/* Stage Navigation Section */}
        <div className="workflow-management-page__stages">
          {[
            {
              number: 1,
              text: "Describe a Theme & Assess Impact Across Asset Classes",
              path: "macro-theme",
            },
            {
              number: 2,
              text: "Generate Investment Ideas for Provided Theme based on Impact Assessment",
              path: "impact-assessment",
            },
            {
              number: 3,
              text: "Analyze Key Metrics & Choose Assets for Your Portfolio",
              path: "investment-ideas",
            },
          ].map((stage, index) => (
            <div
              key={index}
              className={`workflow-management-page__stage ${
                currentStage === stage.path
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

        {/* Render the correct stage based on the current URL */}
        {currentStage === "macro-theme" && (
          <MacroTrendInputPage
            onNextStage={handleNextStage}
            onPreviousStage={handlePreviousStage} // Passing handlePreviousStage
          />
        )}
        {currentStage === "impact-assessment" && impactData && (
          <ImpactAssessmentPage
            data={impactData}
            onNextStage={handleNextStage}
            onPreviousStage={handlePreviousStage} // Passing handlePreviousStage
          />
        )}
        {currentStage === "investment-ideas" &&
          impactData &&
          investmentIdeas.length > 0 && (
            <InvestmentIdeasPage
              impactData={impactData}
              investmentIdeas={investmentIdeas}
              onPortfolioUpdate={handlePortfolioUpdate}
              onPreviousStage={handlePreviousStage} // Passing handlePreviousStage
            />
          )}
      </PageWrapper>
    </div>
  );
}

export default WorkflowManagementPage;
