import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

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
        <p>
          <span>{props.t('chang_lang')}:</span>
          <a onClick={props.changeToEn} >{props.t('link_lang_en')} </a> |
          <a onClick={props.changeToFr}>{props.t('link_lang_fr')}</a>
        </p>

      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  changeToFr: PropTypes.func.isRequired,
  changeToEn: PropTypes.func.isRequired,
};

export default translate(['footer'], { wait: true })(Footer);
