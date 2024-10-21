// Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Header/Header.scss";
import { FaSun, FaBars, FaTimes } from "react-icons/fa";

const Header = ({ portfolioCount }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolioAnimation, setPortfolioAnimation] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handlePortfolioNavigation = () => {
    navigate("/portfolio");
  };

  useEffect(() => {
    if (portfolioCount > 0) {
      setPortfolioAnimation(true);
      // Remove animation class after 1.5 seconds
      const timer = setTimeout(() => {
        setPortfolioAnimation(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [portfolioCount]);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <h1>LungoAI</h1>
        </div>
        <div className="header__menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <nav
          className={`header__buttons ${
            menuOpen ? "header__buttons--open" : ""
          }`}
        >
          <div className="header__button header__button--light-mode">
            <FaSun className="header__icon" />
          </div>
          <div
            className={`header__button header__button--portfolio ${
              portfolioAnimation ? "header__button--animate" : ""
            }`}
            onClick={handlePortfolioNavigation}
          >
            Portfolio
            {portfolioCount > 0 && ` (${portfolioCount})`}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
