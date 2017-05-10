import React, { Component } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';


const BookingSelector = props => (
  <div className="is-inline-flex" >
    <div className="subtitle is-3">
      {props.t('selection_table_header_date')}:
    </div>
    <div style={{ marginLeft: 10 }}>
      <DateRangePicker
        startDate={props.startDate}
        endDate={props.endDate}
        onDatesChange={props.onDatesChange}
        focusedInput={props.focusedInput}
        onFocusChange={props.onFocusChange}
        minimumNights={0}
        isDayBlocked={props.dayIsBlocked}
      />
    </div>
    <hr />
  </div>
);

BookingSelector.propTypes = {
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func.isRequired,
  focusedInput: PropTypes.oneOf(['startDate', 'endDate']),
  onFocusChange: PropTypes.func.isRequired,
};
export default translate(['booking'], { wait: true })(BookingSelector);
