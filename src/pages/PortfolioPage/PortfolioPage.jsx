// src/pages/PortfolioPage/PortfolioPage.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Buttons/Button";
import Loading from "../../components/Loading/Loading";
import "./PortfolioPage.scss";

function PortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [investmentIdeas, setInvestmentIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/portfolio/1"
        );
        if (response.status === 200) {
          setPortfolio(response.data);
        } else {
          setError("Failed to fetch portfolio.");
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError("Failed to fetch portfolio. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchInvestmentIdeas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/investment-ideas"
        );
        if (response.status === 200) {
          setInvestmentIdeas(response.data);
        } else {
          setError("Failed to fetch investment ideas.");
        }
      } catch (err) {
        console.error("Error fetching investment ideas:", err);
        setError("Failed to fetch investment ideas. Please try again.");
      }
    };

    fetchPortfolio();
    fetchInvestmentIdeas();
  }, []);

  const handleAddToPortfolio = async (idea) => {
    try {
      const requestData = {
        // userId: 1, // Replace with the correct user ID, this should come from your user authentication/session management
        // investmentIdea: idea,
        // themeId: 9, // Replace with the correct theme ID
      };

      console.log("Adding to portfolio:", requestData);

      const response = await axios.post(
        "http://localhost:5001/api/portfolio/add", // Ensure this is the correct endpoint
        requestData
      );

      if (response.status === 200) {
        setSuccessMessage(`Successfully added ${idea.name} to your portfolio.`);
      } else {
        setError("Failed to add item to portfolio.");
      }
    } catch (err) {
      console.error("Error adding to portfolio:", err);
      setError("Failed to add item to portfolio. Please try again.");
    }
  };

  const handleRemoveFromPortfolio = async (ideaId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/portfolio/1/${ideaId}`
      );
      if (response.status === 200) {
        setPortfolio((prev) => prev.filter((item) => item.id !== ideaId));
      } else {
        setError("Failed to remove item.");
      }
    } catch (err) {
      console.error("Error removing item from portfolio:", err);
      setError("Failed to remove item. Please try again.");
    }
  };

  return (
    <div className="portfolio-page">
      <h2>Your Portfolio</h2>
      {isLoading && <Loading message="Loading your portfolio..." />}
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
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((idea, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{idea.ticker}</td>
                  <td>{idea.name}</td>
                  <td>{idea.assetType}</td>
                  <td>
                    <Button
                      text="Remove"
                      onClick={() => handleRemoveFromPortfolio(idea.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2>Add Investment Ideas</h2>
      {investmentIdeas.length > 0 ? (
        <div className="investment-ideas">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Ticker</th>
                <th>Name</th>
                <th>Asset Type</th>
                <th>Position</th>
                <th>Add to Portfolio</th>
              </tr>
            </thead>
            <tbody>
              {investmentIdeas.map((idea, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{idea.ticker}</td>
                  <td>{idea.name}</td>
                  <td>{idea.assetType}</td>
                  <td>{idea.position}</td>
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
        <Loading message="Loading investment ideas..." />
      )}
    </div>
  );
}

export default PortfolioPage;
