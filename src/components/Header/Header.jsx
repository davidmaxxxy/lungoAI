import React, { useState } from "react";
import "../Header/Header.scss";
import { FaSun, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
          <div className="header__button header__button--portfolio">
            Portfolio
          </div>
          <div className="header__button header__button--signup">Sign Up</div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
