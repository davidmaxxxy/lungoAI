import React, { useEffect, useState } from "react";
import "./PortfolioPage.scss";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Buttons/Button";

// Helper function to format price
const formatPrice = (price, currency = "USD") => {
  if (!price) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

function PortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate data fetching by introducing a delay and setting dummy data
    setTimeout(() => {
      setPortfolio([
        {
          ticker: "AAPL",
          name: "Apple Inc.",
          assetType: "Stock",
          currentPrice: 175.25,
          position: "Long",
          investmentThemes: [
            {
              investmentThemeId: 1,
              investmentThemeName: "US Elections - Trump vs Kamala Harris",
            },
            { investmentThemeId: 2, investmentThemeName: "Technology Growth" },
          ],
        },
        {
          ticker: "TSLA",
          name: "Tesla Inc.",
          assetType: "Stock",
          currentPrice: 850.75,
          position: "Long",
          investmentThemes: [
            { investmentThemeId: 3, investmentThemeName: "Green Energy" },
          ],
        },
        {
          ticker: "BTC/USD",
          name: "Bitcoin to USD",
          assetType: "Cryptocurrency",
          currentPrice: 35000.5,
          position: "Long",
          investmentThemes: [
            {
              investmentThemeId: 4,
              investmentThemeName: "Digital Assets Growth",
            },
          ],
        },
      ]);
      setIsLoading(false);
    }, 1000); // Simulate a 1-second delay to mimic an API call
  }, []);

  // Function to remove an item from the portfolio
  const handleRemoveFromPortfolio = (idea) => {
    setPortfolio(portfolio.filter((item) => item.ticker !== idea.ticker));
  };

  return (
    <div className="portfolio-page">
      <h2>Your Portfolio</h2>

      {isLoading && (
        <Loading message="Loading your portfolio... This might take up to 1 minute." />
      )}

      {error && <div className="error-message">{error}</div>}

      {!isLoading && portfolio.length > 0 && (
        <div className="portfolio-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Ticker</th>
                <th>Name</th>
                <th>Asset Type</th>
                <th>Price</th>
                <th>Position</th>
                <th>Themes</th>
                <th>Remove from Portfolio</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((idea, index) => (
                <tr key={idea.ticker}>
                  <td>{index + 1}</td>
                  <td>{idea.ticker}</td>
                  <td>{idea.name}</td>
                  <td>{idea.assetType}</td>
                  <td>{formatPrice(idea.currentPrice, "USD")}</td>
                  <td>{idea.position}</td>
                  <td>
                    {idea.investmentThemes && idea.investmentThemes.length > 0
                      ? idea.investmentThemes.map((theme) => (
                          <div
                            key={theme.investmentThemeId}
                            className="theme-container"
                          >
                            {theme.investmentThemeName}
                          </div>
                        ))
                      : "No Themes"}
                  </td>
                  <td>
                    <Button
                      text="-"
                      className="remove-button"
                      onClick={() => handleRemoveFromPortfolio(idea)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && portfolio.length === 0 && (
        <div className="empty-portfolio-message">
          Your portfolio is empty. Go to the investment ideas page to add some
          assets!
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;
