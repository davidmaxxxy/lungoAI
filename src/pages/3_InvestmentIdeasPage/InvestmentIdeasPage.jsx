import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/Buttons/Button";
import FixedButtonContainer from "../../components/FixedButtonContainer/FixedButtonContainer";
import "./InvestmentIdeasPage.scss";

function InvestmentIdeasPage({
  impactData,
  investmentIdeas,
  onPortfolioUpdate,
  onPreviousStage,
}) {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [addedIdeas, setAddedIdeas] = useState(new Set());

  useEffect(() => {
    if (investmentIdeas.length > 0) {
      localStorage.setItem("investmentIdeas", JSON.stringify(investmentIdeas));
    }
  }, [investmentIdeas]);

  const handleAddToPortfolio = async (idea) => {
    if (!impactData.themeId) {
      console.error("Cannot add to portfolio: themeId is missing.", impactData);
      return;
    }

    try {
      const requestData = {
        userId: 1,
        investmentIdea: idea,
        themeIds: Array.isArray(impactData.themeId)
          ? impactData.themeId
          : [impactData.themeId],
      };

      console.log("Adding to portfolio with requestData:", requestData);

      const response = await axios.post(
        "http://localhost:5001/api/portfolio/add",
        requestData
      );

      if (response.status === 200) {
        console.log(`Successfully added ${idea.name} to your portfolio.`);
        onPortfolioUpdate();

        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 2000);

        setAddedIdeas((prevAddedIdeas) => new Set(prevAddedIdeas).add(idea.id));
      } else {
        console.error("Failed to add item to portfolio.");
      }
    } catch (err) {
      console.error("Error adding to portfolio:", err);
    }
  };

  return (
    <div className="investment-ideas-page">
      <h2>Generated Investment Ideas</h2>
      {investmentIdeas.length > 0 ? (
        <div className="investment-ideas-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Ticker</th>
                <th>Name</th>
                <th>Asset Type</th>
                <th>Price</th>
                <th>Position</th>
                <th>Reason</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              {investmentIdeas.map((idea, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{idea.ticker}</td>
                  <td>{idea.name}</td>
                  <td>{idea.assetType}</td>
                  <td>{idea.currentPrice ? `$${idea.currentPrice}` : "N/A"}</td>
                  <td>{idea.position}</td>
                  <td>{idea.reason}</td>
                  <td>
                    <Button
                      text="Add"
                      variant="primary"
                      onClick={() => handleAddToPortfolio(idea)}
                      disabled={addedIdeas.has(idea.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No investment ideas available.</div>
      )}

      {showSuccessPopup && (
        <div className="investment-ideas-page__success-popup">
          Successfully added to portfolio!
        </div>
      )}

      <FixedButtonContainer>
        <Button variant="back" text="Back" onClick={onPreviousStage} />
      </FixedButtonContainer>
    </div>
  );
}

export default InvestmentIdeasPage;
