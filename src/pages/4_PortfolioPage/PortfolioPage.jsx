import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Buttons/Button";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import FixedButtonContainer from "../../components/FixedButtonContainer/FixedButtonContainer";
import "./PortfolioPage.scss";

function PortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true);
  const [errorPortfolio, setErrorPortfolio] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const handleCTAButtonClick = () => {
    navigate("/stages/macro-theme");
  };

  const handlePreviousStage = () => {
    navigate("/stages/investment-ideas");
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/portfolio/1`);
        if (response.status === 200) {
          setPortfolio(response.data);
        } else {
          setErrorPortfolio("Failed to fetch portfolio.");
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setErrorPortfolio("Failed to fetch portfolio. Please try again.");
      } finally {
        setIsLoadingPortfolio(false);
      }
    };

    fetchPortfolio();
  }, []);

  const handleRemoveFromPortfolio = async (ideaId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/portfolio/1/${ideaId}`
      );
      if (response.status === 200) {
        setPortfolio((prev) => prev.filter((item) => item.id !== ideaId));

        // Show success pop-up when item is successfully removed
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 2000);
      } else {
        setErrorPortfolio("Failed to remove item.");
      }
    } catch (err) {
      console.error("Error removing item from portfolio:", err);
      setErrorPortfolio("Failed to remove item. Please try again.");
    }
  };

  return (
    <div className="portfolio-page">
      <h2 className="portfolio-page__title">Your Portfolio</h2>
      <Button variant="back" text="Back" onClick={handlePreviousStage} />

      {isLoadingPortfolio ? (
        <Loading message="Loading your portfolio..." />
      ) : (
        <>
          {errorPortfolio && (
            <div className="portfolio-page__error-message">
              {errorPortfolio}
            </div>
          )}
          {!errorPortfolio && portfolio.length > 0 ? (
            <div className="portfolio-page__table">
              <table className="portfolio-page__table-element">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ticker</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Theme Names</th>
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
                      <td>{idea.position}</td>
                      <td>
                        {idea.theme_names && idea.theme_names.length > 0 ? (
                          <div className="portfolio-page__theme-container">
                            {idea.theme_names.map((theme, themeIndex) => (
                              <span
                                key={themeIndex}
                                className="portfolio-page__theme-container--theme"
                              >
                                {theme}
                              </span>
                            ))}
                          </div>
                        ) : (
                          "No themes"
                        )}
                      </td>
                      <td>{idea.asset_type}</td>
                      <td>
                        <Button
                          text="-"
                          onClick={() => handleRemoveFromPortfolio(idea.id)}
                          variant="negative"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !isLoadingPortfolio &&
            !errorPortfolio && (
              <div className="portfolio-page__empty-message">
                No items in your portfolio yet. Use the tool to generate and add
                ideas.
                <button
                  className="portfolio-page__cta-button"
                  onClick={handleCTAButtonClick}
                >
                  Add Investment Ideas
                </button>
              </div>
            )
          )}
        </>
      )}

      {/* Success Popup for Removal */}
      {showSuccessPopup && (
        <div className="portfolio-page__success-popup">
          Successfully removed item from portfolio!
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;
