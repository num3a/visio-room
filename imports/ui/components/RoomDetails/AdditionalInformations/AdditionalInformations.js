import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const AdditionalInfos = props => (
  <div className="section main" >
    <div className="container">
      <div className="tabs">
        <ul>
          <li className="is-active"><a>{props.t('info_tab_overview')}</a></li>
          <li><a>{props.t('info_tab_equipments')}</a></li>
          <li><a>{props.t('info_tab_access_details')}</a></li>
          <li><a>{props.t('info_tab_reviews')}</a></li>
        </ul>
      </div>
      <div className="box">
        <p>
          {props.description}
        </p>
      </div>
    </div>
  </div>
);

AdditionalInfos.propType = {
  description: PropTypes.string.isRequired,
};

export default translate(['roomdetails'], { wait: true })(AdditionalInfos);

