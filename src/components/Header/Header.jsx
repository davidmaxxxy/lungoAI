// Header.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Header/Header.scss";
import { FaSun, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Removed useUser import and user related logic
  // import { useUser } from "../../context/UserContext"; // Import useUser hook

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handlePortfolioNavigation = () => {
    navigate("/portfolio");
  };

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
            className="header__button header__button--portfolio"
            onClick={handlePortfolioNavigation}
          >
            Portfolio
          </div>
          {/* Removed login/logout functionality since it's not required */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
