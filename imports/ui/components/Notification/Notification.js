import React, { Component } from 'react';
import classnames from 'classnames';

const marginBottom = {marginBottom: '10px'};
const Notification = (props) => (
  <div>
    {props.open ?
      <div className="columns">
          <div className="column is-12">
              <div className={classnames('notification', props.type) } style={marginBottom} >
                  <button className="delete" onClick={props.close} />
                {props.message}
              </div>
          </div>
      </div>
      :
      <div />}
  </div>
);

export default Notification;