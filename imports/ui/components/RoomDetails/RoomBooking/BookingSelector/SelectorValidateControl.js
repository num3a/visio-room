import React, { Component } from 'react';
import { translate } from 'react-i18next';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';

const SelectorValidateControl = (props) => (
  <div>
    <button className={classnames('button', 'is-primary', props.isActive ? '' : 'is-disabled')} onClick={props.validate}>
      {props.t('selection_validate')}
    </button>
  </div>
);

SelectorValidateControl.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default translate(['booking'], { wait: true })(SelectorValidateControl);
