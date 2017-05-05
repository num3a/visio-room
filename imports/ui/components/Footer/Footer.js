import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { translate } from 'react-i18next';

const Footer = (props) => (
  <footer className="footer">
    <div className="container">
      <div className="has-text-centered">
        <p>
          &copy; VisioRoom 2017
        </p>
        <p>
          <NavLink to="/legal">{props.t('link_legal')} </NavLink> |
          <NavLink to="/about" >{props.t('link_about_us')}</NavLink> |
          <NavLink to="/cgu">{props.t('link_CGU')}</NavLink>
        </p>

      </div>
    </div>
  </footer>
);

export default translate(['footer'], { wait: true })(Footer);
