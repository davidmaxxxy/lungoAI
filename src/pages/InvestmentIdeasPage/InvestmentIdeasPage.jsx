import React from "react";
import axios from "axios";
import Button from "../../components/Buttons/Button";
import "./InvestmentIdeasPage.scss";

function InvestmentIdeasPage({ impactData, investmentIdeas }) {
  const handleAddToPortfolio = async (idea) => {
    // Check if themeId is available in the impactData
    if (!impactData.theme_id) {
      console.error("Cannot add to portfolio: themeId is missing.");
      return;
    }

    try {
      const requestData = {
        userId: 1, // Replace with the correct user ID, ideally from user authentication/session management
        investmentIdea: idea,
        themeId: impactData.theme_id, // Ensure themeId is passed here
      };

      console.log("Adding to portfolio:", requestData);

      const response = await axios.post(
        "http://localhost:5001/api/portfolio/add",
        requestData
      );

      if (response.status === 200) {
        console.log(`Successfully added ${idea.name} to your portfolio.`);
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
                  <td>{idea.ticker}</td>
                  <td>{idea.name}</td>
                  <td>{idea.assetType}</td>
                  <td>{idea.currentPrice || "N/A"}</td>
                  <td>{idea.position}</td>
                  <td>{idea.reason}</td>
                  <td>
                    <Button
                      text="Add"
                      onClick={() => handleAddToPortfolio(idea)}
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
    </div>
  );
}

export default InvestmentIdeasPage;
ç