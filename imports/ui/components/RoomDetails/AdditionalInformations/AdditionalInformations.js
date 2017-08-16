import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classnames from 'classnames';

const AdditionalInfos = (props) => {
  let infos = <div />;

  if (props.activeTab === 'overview') {
    infos = (<p> {props.overview}
    </p>);
  } else if (props.activeTab === 'equipments') {
    infos = (<div className="content">
      <ul>
        <li><i className="fa fa-wifi" style={{ marginRight: '5px' }} />{props.t('equipment_wifi')}</li>
        <li><i className="fa fa-wheelchair" style={{ marginRight: '5px' }} />{props.t('equipment_disabled_people')}</li>
        <li><i className="fa fa-snowflake-o" style={{ marginRight: '5px' }} />{props.t('equipment_ac')}</li>
        <li><i className="fa fa-print" style={{ marginRight: '5px' }} />{props.t('equipment_printer')}</li>
        <li><i className="fa fa-coffee" style={{ marginRight: '5px' }} />{props.t('equipment_coffee')}</li>
      </ul>
    </div>);
  } else if (props.activeTab === 'access') {
    infos = (<p>
      <img src={props.staticImageUrl} />
    </p>);
  } else if (props.activeTab === 'reviews') {
    infos = (<p>
      {props.t('no_reviews')}
    </p>);
  }
  return (<div className="section main">
    <div className="container">
      <div className="box" style={{ minHeight: 400 }}>
        <div className="tabs">
          <ul>
            <li
              className={classnames(props.activeTab === 'overview' ? 'is-active' : '')}
              onClick={props.onOverviewClick}
            >
              <a>{props.t('info_tab_overview')}</a>
            </li>
            <li
              className={classnames(props.activeTab === 'equipments' ? 'is-active' : '')}

              onClick={props.onEquipmentsClick}
            >
              <a>{props.t('info_tab_equipments')}</a>
            </li>
            <li
              className={classnames(props.activeTab === 'access' ? 'is-active' : '')}
              onClick={props.onAccessClick}
            >
              <a>{props.t('info_tab_access_details')}</a>
            </li>
            <li
              className={classnames(props.activeTab === 'review' ? 'is-active' : '')}
              onClick={props.onReviewsClick}
            >
              <a>{props.t('info_tab_reviews')}</a>
            </li>
          </ul>
        </div>
        <div>
          {infos}
        </div>
      </div>
    </div>
  </div>);
};

AdditionalInfos.propType = {
  overview: PropTypes.string.isRequired,
  activeTab: PropTypes.bool.isRequired,
  onOverviewClick: PropTypes.func.isRequired,
  onEquipmentsClick: PropTypes.func.isRequired,
  onAccessClick: PropTypes.func.isRequired,
  onReviewsClick: PropTypes.func.isRequired,
};

export default translate(['roomdetails'], { wait: true })(AdditionalInfos);

