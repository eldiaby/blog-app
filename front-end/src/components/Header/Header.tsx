import "./Header.scss";
import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaPencilAlt,
  FaSignInAlt,
  FaThLarge,
  FaTimes,
  FaUserCheck,
  FaUserPlus,
} from "react-icons/fa";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      {/* Left Section: Logo */}
      <div className="header__header-left">
        <div className="header__logo">
          <span className="header__logo-text">Blog ui</span>
          <FaPencilAlt className="header__logo-icon" />
        </div>
      </div>

      {/* Center Section: Navbar */}
      <nav className={`header__navbar ${menuOpen ? "open" : ""}`}>
        <ul className="header__navbar__list">
          <li className="header__navbar__link">
            <FaHome className="header__navbar__icon" />
            Home
          </li>
          <li className="header__navbar__link">
            <FaThLarge className="header__navbar__icon" />
            Posts
          </li>
          <li className="header__navbar__link">
            <FaPencilAlt className="header__navbar__icon" />
            New Post
          </li>
          <li className="header__navbar__link">
            <FaUserCheck className="header__navbar__icon" />
            Admin Dashboard
          </li>
        </ul>
      </nav>

      {/* Right Section: User Actions */}
      <div className="header__header-right">
        <ul className="header__user-actions">
          <li className="header__user-action">
            <FaSignInAlt className="header__user-icon" />
            Login
          </li>
          <li className="header__user-action">
            <FaUserPlus className="header__user-icon" />
            Register
          </li>
        </ul>

        {/* Burger Menu Icon */}
        <button
          type="button"
          className="header__burger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Header;
