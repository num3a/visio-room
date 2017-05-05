import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { PropTypes } from 'prop-types';

const PaymentsControl = props => (
  <a
    className="button is-success is-focused"
    onClick={props.openAddCardModal}
  >{props.t('add_card')}</a>
);

PaymentsControl.propTypes = {
  openAddCardModal: PropTypes.func.isRequired,
};

export default translate(['payment'], { wait: true })(PaymentsControl);
