import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Buttons/Button";
import "./InvestmentIdeasPage.scss";

function InvestmentIdeasPage() {
  const [investmentIdeas, setInvestmentIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const generateInvestmentIdeas = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/ideas/generate-investment-ideas",
          {
            impact_assessment_id: 9, // You can change this ID as per your requirement
          }
        );
        if (response.status === 200) {
          setInvestmentIdeas(response.data.investmentIdeas);
        } else {
          setError("Failed to generate investment ideas.");
        }
      } catch (err) {
        console.error("Error generating investment ideas:", err);
        setError("Failed to generate investment ideas. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    generateInvestmentIdeas();
  }, []);

  const handleAddToPortfolio = (idea) => {
    // Add functionality for adding the idea to the portfolio.
    console.log("Adding to portfolio:", idea);
    // You can add an API call or any logic to handle this action.
  };

  return (
    <div className="investment-ideas-page">
      <h2>Generated Investment Ideas</h2>
      {isLoading && <Loading message="Generating investment ideas..." />}
      {error && <div className="error-message">{error}</div>}
      {!isLoading && investmentIdeas.length > 0 && (
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
                      text="+"
                      onClick={() => handleAddToPortfolio(idea)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InvestmentIdeasPage;
