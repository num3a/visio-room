import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const marginLeft = { marginLeft: '5px' };

const RoomCard = props => (
  <div className="column is-3">
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{props.name}</p>
      </header>
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={props.staticImageUrl} alt="" />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <strong className="timestamp">Price: {props.pricePerDay}€</strong>
          <br />
          <span>Room capacity: {props.capacity}</span>
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
        <NavLink disabled className="card-footer-item" to={`/rooms/${props.roomId}`} >Open</NavLink>
      </footer>
    </div>
  </div>
);

RoomCard.propTypes = {
  capacity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  pricePerDay: PropTypes.number.isRequired,
  roomId: PropTypes.string.isRequired,
  staticImageUrl: PropTypes.string.isRequired,
};

RoomCard.defaultProps = {
  capacity: 0,
  name: '',
  pricePerDay: 0,
  roomId: '',
  staticImageUrl: '',
};

export default RoomCard;
