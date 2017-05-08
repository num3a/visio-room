import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import SearchBar from './SearchBar';
import { selectedStartDateChanged, selectedEndDateChanged, selectedCapacityChanged } from '../../../actions/booking';

class SearchBarContainer extends Component {
  constructor() {
    super();
    this.state = {
      focusedInput: null,
    };
  }

  onStartDateChange(date) {
    const { dispatch } = this.props;
    dispatch(selectedStartDateChanged(date));
  }

  onDatesChanged(dates) {
    const { dispatch } = this.props;

    const startDate = dates.startDate;
    const endDate = dates.endDate;
    dispatch(selectedStartDateChanged(startDate));
    dispatch(selectedEndDateChanged(endDate));
  }

  onCapacityChange(event) {
    const capacity = parseInt(event.target.value, 10);
    const { dispatch } = this.props;

    dispatch(selectedCapacityChanged(capacity));
  }

  render() {
    return (
      <SearchBar
        capacity={this.props.capacity}
        count={this.props.count}
        onCapacityChange={capacity => this.onCapacityChange(capacity)}
        initialStartDate={moment().add(1, 'days')}
        startDate={this.props.selectedStartDate} // momentPropTypes.momentObj or null,
        endDate={this.props.selectedEndDate} // momentPropTypes.momentObj or null,
        onDatesChange={({ startDate, endDate }) => this.onDatesChanged({ startDate, endDate })} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
      />
    );
  }
}

SearchBarContainer.defaultProps = {
  count: 0,
};

SearchBarContainer.propTypes = {
  count: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  selectedRoomId: state.admin.roomId,
  selectedStartDate: state.booking.selectedStartDate,
  selectedEndDate: state.booking.selectedEndDate,
  capacity: state.booking.capacity,
});

export default connect(mapStateToProps)(SearchBarContainer);
