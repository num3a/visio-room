import React, { Component } from 'react';
import { translate } from 'react-i18next';

const SelectorHeader = props => (
  <div>
    <div className="title is-2">{props.t('booking_title')}</div>
    <hr />
  </div>
);

export default translate(['booking'], { wait: true })(SelectorHeader);
