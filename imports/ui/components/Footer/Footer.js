import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
      <div className="container">
          <div className="has-text-centered">
              <p>
                  &copy; VisioRoom 2017
              </p>
              <p>
                  <NavLink to="/legal"> Legal </NavLink> |
                  <NavLink to="/about" >About us </NavLink> |
                  <NavLink to="/cgu"> CGU </NavLink>
              </p>

          </div>
      </div>
  </footer>
);

export default Footer;