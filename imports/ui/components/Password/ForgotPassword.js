import React from 'react';
import { PropTypes } from 'prop-types';
import { translate } from 'react-i18next';
import { Input } from '../common/Form';

const ForgotPassword = props => (
  <div className="row">
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <form onSubmit={event => props.onSubmitEmail(event)}>
        <Input name="email" placeholder={props.t('submit_button')} defaultValue="" type="email" required />

        <a className="button is-large is-danger is-outlined">{props.t('submit_button')}</a>
      </form>
    </div>
  </div>
);

ForgotPassword.propTypes = {
  onSubmitEmail: PropTypes.func.isRequired,
};

export default translate(['password'], { wait: true })(ForgotPassword);

