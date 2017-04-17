import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';



const SearchBar = props => (
  <nav className="level">
    <div className="level-left">
      <div className="level-item">
        <p className="subtitle is-5">
          <strong>{props.count}</strong> rooms
        </p>
      </div>
      <div className="level-item">
        <p className="control has-addons">
          <input className="input" type="text" placeholder="Find a room" />
        </p>
      </div>
      <div className="level-item">
        <p className="control has-addons" />
      </div>
      <div className="level-item">
        <button className="button">
          Search
        </button>
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
      <p className="level-item"><strong>All</strong></p>
      <p className="level-item is-disabled"><a>Small rooms</a></p>
      <p className="level-item is-disabled"><a>Conference rooms</a></p>
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
  date: momentPropTypes.momentObj,
  onDateChange: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  onFocusChange: PropTypes.func.isRequired,
};

export default SearchBar;

