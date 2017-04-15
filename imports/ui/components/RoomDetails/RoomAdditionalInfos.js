import React, { Component } from 'react';

const RoomAdditionalInfos = (props) => (
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
                {props.room.description}
              </p>
          </div>
      </div>
  </div>
);

export default RoomAdditionalInfos;
