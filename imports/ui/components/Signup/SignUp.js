import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { translate } from 'react-i18next';

class SignUp extends PureComponent {
  render({ props: { t, onSignUpFormSubmit, onOAuthClick, onErrorMessage, errorMessage } = this }) {
    return (<div>
      <h1 className="title">{t('register_account')}</h1>
      <div className="box">
        <form onSubmit={event => onSignUpFormSubmit(event)} >

          <label className="label">{t('first_name')}</label>
          <p className="control">
            <input name="firstName" className="input" type="text" placeholder="John" required />
          </p>
          <label className="label">{t('last_name')}</label>
          <p className="control">
            <input name="lastName" className="input" type="text" placeholder="Smith" required />
          </p>
          <label className="label">{t('email')}</label>
          <p className="control">
            <input name="email" className="input" type="email" placeholder="jsmith@example.org" required />
          </p>
          <hr />
          <label className="label">{t('password')}</label>
          <p className="control">
            <input name="password" className="input" type="password" placeholder="●●●●●●●" required />
          </p>
          <label className="label">{t('confirm_password')}</label>
          <p className="control">
            <input name="confirm" className="input" type="password" placeholder="●●●●●●●" required />
          </p>
          <hr />
          <p className="control">
            <button type="submit" className="button is-primary">{t('register')}</button>
          </p>
        </form>

        <hr />
        <label className="label">{t('continue_linkedin')}</label>
        <p className="control">
          <button className="button is-medium" onClick={onOAuthClick}>
            <span className="icon">
              <i className="fa fa-linkedin" />
            </span>
            <span>Linkedin</span>
          </button>
          </p>

        <div className="content is-danger">
          <p className="is-danger" style={{ color: 'red' }}>
            {errorMessage}
          </p>
        </div>
      </div>
      <p className="has-text-centered">
        <NavLink to="/login">{t('go_to_login')}</NavLink>

      </p>
    </div>);
  }
}

export default translate(['signup'], { wait: true })(SignUp);
