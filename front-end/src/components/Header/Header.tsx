import { ROUTES } from "@/constants/routes";
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

import { Link, NavLink } from "react-router-dom";

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
          <NavLink to={ROUTES.ROOT} className="header__navbar__link">
            <FaHome className="header__navbar__icon" />
            Home
          </NavLink>
          <NavLink to={ROUTES.PUBLIC.POSTS} className="header__navbar__link">
            <FaThLarge className="header__navbar__icon" />
            Posts
          </NavLink>
          <NavLink to={ROUTES.PRIVATE.CREATE_POST} className="header__navbar__link">
            <FaPencilAlt className="header__navbar__icon" />
            New Post
          </NavLink>
          <NavLink to={ROUTES.PRIVATE.DASHBOARD} className="header__navbar__link">
            <FaUserCheck className="header__navbar__icon" />
            Admin Dashboard
          </NavLink>
        </ul>
      </nav>

      {/* Right Section: User Actions */}
      <div className="header__header-right">
        <ul className="header__user-actions">
          <Link to={ROUTES.PUBLIC.LOGIN} className="header__user-action">
            <FaSignInAlt className="header__user-icon" />
            Login
          </Link>
          <Link to={ROUTES.PUBLIC.REGISTER} className="header__user-action">
            <FaUserPlus className="header__user-icon" />
            Register
          </Link>
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
