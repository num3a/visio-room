import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


const SearchBar = props => (
  <nav className="level box">
    <div className="level-left">
      <div className="level-item">
        <p className="subtitle is-5">
          <strong>{props.count}</strong> rooms available
        </p>
      </div>
      <div className="level-item">
        <p className="subtitle is-5">
          Booking date:
        </p>
      </div>
      <div className="level-item">
        <p className="control has-addons" />
      </div>
      <div className="level-item">
        <div className="control has-addons">
          <SingleDatePicker
            date={props.date}
            onDateChange={props.onDateChange}
            focused={props.focused}
            onFocusChange={props.onFocusChange}
          />
        </div>
      </div>
    </div>
    <div className="level-right">
      <div className="level-item">
        <p className="subtitle is-5">
          Capacity:
        </p>
      </div>
      <div className="level-item">
        <input type="range" min={5} max={15} step={5} onChange={props.onCapacityChange} defaultValue={5} />
      </div>
      <p className="level-item is-active">{props.capacity} persons</p>
    </div>
  </nav>
);

SearchBar.defaultProps = {
  count: 0,
  date: moment(),
  focused: false,
};

SearchBar.propTypes = {
  count: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  onCapacityChange: PropTypes.func.isRequired,
  date: momentPropTypes.momentObj,
  onDateChange: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  onFocusChange: PropTypes.func.isRequired,
};

export default SearchBar;

