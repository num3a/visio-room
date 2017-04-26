import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

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
          <DateRangePicker
            startDate={props.startDate}
            endDate={props.endDate}
            onDatesChange={props.onDatesChange}
            focusedInput={props.focusedInput}
            onFocusChange={props.onFocusChange}
            minimumNights={0}
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
        <input type="range" min={1} max={15} step={1} onChange={props.onCapacityChange} defaultValue={1} />
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
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func.isRequired,
  focusedInput: PropTypes.oneOf(['startDate', 'endDate']),
  onFocusChange: PropTypes.func.isRequired,
};

export default SearchBar;

