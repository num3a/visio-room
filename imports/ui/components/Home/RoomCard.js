import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { translate } from 'react-i18next';
const marginLeft = { marginLeft: '5px' };

const RoomCard = (props) => {
  const { t } = props;
  return (
    <div className="column is-3">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{props.room.name}</p>
        </header>
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={props.staticImageUrl} alt="" />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <strong className="timestamp">{t('price')}: {props.room.pricePerDay}€</strong>
            <br />
            <span>{t('room_capacity')}: {props.room.capacity}</span>
            <br />
            <div>
              <span className="icon is-small" style={marginLeft}><i className="fa fa-wheelchair" /></span>
              <span className="icon is-small" style={marginLeft}><i className="fa fa-wifi" /></span>
              <span className="icon is-small" style={marginLeft}><i className="fa fa-snowflake-o" /></span>
              <span className="icon is-small" style={marginLeft}><i className="fa fa-print" /></span>
            </div>
          </div>
        </div>
        <footer className="card-footer">
          <NavLink disabled className="card-footer-item" to={`/rooms/${props.room._id}`}>Open</NavLink>
        </footer>
      </div>
    </div>);
};

export default translate(['home'], { wait: true })(RoomCard);
