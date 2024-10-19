import React, { useEffect, useState } from "react";
import "./InvestmentIdeasPage.scss";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import Button from "../../components/Buttons/Button";

function InvestmentIdeasPage({ impactData }) {
  const [investmentIdeas, setInvestmentIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Directly use the passed `investmentIdeas` if available
    if (impactData && impactData.investmentIdeas) {
      console.log(
        "Using provided investment ideas:",
        impactData.investmentIdeas
      );
      setInvestmentIdeas(impactData.investmentIdeas);
      setIsLoading(false);
    } else if (impactData && impactData.id) {
      console.log(
        "Fetching investment ideas using impact assessment ID:",
        impactData.id
      );
      const fetchInvestmentIdeas = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:5001/api/ideas/${impactData.id}`
          );
          if (response.status === 200) {
            setInvestmentIdeas(response.data.investmentIdeas);
          } else {
            console.error(
              "Failed to fetch investment ideas. Status code:",
              response.status
            );
            setError("Failed to fetch investment ideas. Please try again.");
          }
        } catch (err) {
          console.error("Error fetching investment ideas:", err);
          setError("Failed to fetch investment ideas. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchInvestmentIdeas();
    } else {
      console.error("Missing impactData or investmentIdeas:", impactData);
      setError("Missing assessment ID or investment ideas. Unable to proceed.");
      setIsLoading(false);
    }
  }, [impactData]);

  return (
    <div className="investment-ideas-page">
      <h2>Investment Ideas</h2>

      {isLoading && (
        <Loading message="Loading investment ideas... This might take up to 1 minute." />
      )}

      {error && <div className="error-message">{error}</div>}

      {!isLoading && investmentIdeas.length > 0 && (
        <div className="investment-ideas-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Stock Ticker</th>
                <th>Stock Name</th>
                <th>Stock Price</th>
                <th>Position</th>
                <th>Reason</th> {/* New column for Reason */}
                <th>Add to Portfolio</th>
              </tr>
            </thead>
            <tbody>
              {investmentIdeas.map((idea, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{idea.ticker}</td>
                  <td>{idea.name}</td>
                  <td>{idea.currentPrice}</td>
                  <td>{idea.position}</td>
                  <td>{idea.reason}</td> {/* Render the reason */}
                  <td>
                    <Button
                      text="+"
                      className="add-button"
                      // onClick={() => handleAddToPortfolio(idea)}
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
