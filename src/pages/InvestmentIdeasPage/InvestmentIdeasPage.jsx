import React, { useEffect, useState } from "react";
import "./InvestmentIdeasPage.scss";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import Button from "../../components/Buttons/Button";

const formatPrice = (price, currency = "USD") => {
  if (!price) return "N/A"; // Handle missing price data
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
  return formattedPrice;
};

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
                <th>Ticker</th>
                <th>Name</th>
                <th>Asset Type</th>
                <th>Price</th>
                <th>Position</th>
                <th>Reason</th>
                <th>Add to Portfolio</th>
              </tr>
            </thead>
            <tbody>
              {investmentIdeas.map((idea, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {idea.ticker}
                  </td>
                  <td>
                    {idea.name}
                  </td>
                  <td>{idea.assetType || determineAssetType(idea)}</td>{" "}
                  {/* Display correct asset type */}
                  <td>{formatPrice(idea.currentPrice, idea.currency)}</td>
                  <td>{idea.position}</td>
                  <td>{idea.reason}</td>
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

// Helper function to determine the asset type based on the data
function determineAssetType(idea) {
  if (idea.ticker && idea.ticker.match(/^[A-Z]+$/)) {
    return "Stock";
  } else if (idea.ticker && idea.ticker.match(/^[A-Z]+\/[A-Z]+$/)) {
    return "Currency Pair";
  } else if (idea.name && idea.name.toLowerCase().includes("crypto")) {
    return "Cryptocurrency";
  }
  return "Commodity"; // Default fallback
}

export default InvestmentIdeasPage;
