import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { translate } from 'react-i18next';
import { PropTypes } from 'prop-types';

const Login = (props) => {
  const { t, isModal } = props;

  return (<div>
    { !isModal ?
      <h1 className="title">
        {t('login_title')}
      </h1>
      : <span/>
    }
    <div className="box">
      <form onSubmit={event => props.onLoginFormSubmit(event)}>
        <label className="label">
          {t('email')}
        </label>
        <p className="control">
          <input name="email" className="input" type="email" placeholder="jsmith@example.org" required />
        </p>
        <label className="label">
          {t('password')}
        </label>
        <p className="control">
          <input name="password" className="input" type="password" placeholder="●●●●●●●" required />
        </p>
        <hr />
        <p className="control">
          <button type="submit" className="button is-primary">
            {t('login_button')}
          </button>
        </p>
      </form>
      <hr />
      <label className="label">{t('continue_linkedin')}</label>
      <p className="control">
        <button className="button is-medium" onClick={props.onOAuthClick}>
          <span className="icon">
            <i className="fa fa-linkedin" />
          </span>
          <span>Linkedin</span>
        </button>
      </p>
      <div className="content is-danger">
        <p className="is-danger" style={{ color: 'red' }}>
          {props.errorMessage}
        </p>
      </div>

    </div>
    <p className="has-text-centered">
      <NavLink to="/signup">{t('register_link')}</NavLink>
      |
      <a href="#">{t('forgot_password')}</a>
    </p>
  </div>);
};

Login.propsType = {
  isModal: PropTypes.bool.isRequired,
};

export default translate(['login'], { wait: true })(Login);
