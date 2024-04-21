import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Header.css";
import logo from "./UNITRY.png";
import cartIcon from "./cart.png"; // Ensure you have a cart icon image in the appropriate path
import ConditionalLink from "./ConditionalLink";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { signout, currentUser } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <ScrollLink to="hero-section" spy={true} smooth={true} duration={500}>
          <img src={logo} alt="Company Logo" />
        </ScrollLink>
      </div>
      <nav className="nav-center">
        <ConditionalLink to="about-us-section" spy={true} smooth={true} offset={-70} duration={500} className="nav-item" route="/#about-us-section">
          About Us
        </ConditionalLink>
        <ConditionalLink to="categories-section" spy={true} smooth={true} offset={-70} duration={500} className="nav-item" route="/#categories-section">
          Our Solution
        </ConditionalLink>
        <ConditionalLink to="contact-form-section" spy={true} smooth={true} offset={-70} duration={500} className="nav-item" route="/#contact-form-section">
          Contact Us
        </ConditionalLink>
        <ConditionalLink to="testimonials-section" spy={true} smooth={true} offset={-70} duration={500} className="nav-item" route="/#testimonials-section">
          Reviews
        </ConditionalLink>
      </nav>
      <div className="nav-right">
        <Link to="/cart" className="nav-item">
          <img src={cartIcon} alt="Cart" style={{ width: '24px', marginRight: '10px' }} />
        </Link>
        {currentUser ? (
          <button onClick={() => signout()} className="button sign-out">Log Out</button>
        ) : (
          <>
            <Link to="/signin" className="button sign-in">
              Sign In
            </Link>
            <Link to="/signup" className="button sign-up">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
