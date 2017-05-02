import React, { Component } from 'react';
import PropTypes from 'prop-types';

const width = { width: '40px' };
const starColor = { color: '#ed6c63' };
const marginBottom = { marginBottom: '15px' };

const RoomAdditionalInfos = props => (
  <div className="section main" >
    <div className="container">
      <div className="tabs">
        <ul>
          <li className="is-active"><a>Overview</a></li>
          <li><a>Equipment</a></li>
          <li><a>Access Details</a></li>
          <li><a>Reviews</a></li>
        </ul>
      </div>
      <div className="box">
        <p>
          {props.description}
        </p>
      </div>
      <div className="box">
        <p className="">
          <i className="fa fa-star title is-5" style={starColor} />
          <i className="fa fa-star title is-5" style={starColor} />
          <i className="fa fa-star title is-5" style={starColor} />
          <i className="fa fa-star title is-5" />
          <i className="fa fa-star title is-5" />
          &nbsp; &nbsp;
          <strong>41 Reviews</strong>
          &nbsp; &nbsp;
          <a href="#">show all</a>
        </p>
      </div>
    </div>
  </div>
);

RoomAdditionalInfos.propType = {
  description: PropTypes.string.isRequired,
};

export default RoomAdditionalInfos;
