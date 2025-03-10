import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({totalItems}) => {
 
  return (
    <nav
      className="navbar bg-light navbar-expand-lg border-bottom border-body"
      data-bs-theme="light"
      aria-label="Main Navigation"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/stack.jpg" alt="Stack Logo" width="150" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <strong>
              <Link className="nav-link" to="/">
                Featured Products
              </Link>
              </strong>
            </li>
            <li className="nav-item">
              <strong>
              <Link className="nav-link" to="/cart">
                <img src="/cart.svg" alt="Cart Logo" width="18px" />
                <sup className="sup-zero">{totalItems}</sup>
              </Link>
              </strong>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
