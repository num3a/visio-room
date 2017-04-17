import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import SearchBar from './SearchBar';
import { selectedDateChanged } from '../../../actions/booking';

class SearchBarContainer extends Component {
  constructor() {
    super();
    this.state = {
      focused: false,
    };
  }

  onDateChange(date) {
    debugger;
    const { dispatch } = this.props;
    dispatch(selectedDateChanged(date));
  }
  render() {
    return (
      <SearchBar
        count={this.props.count}
        date={this.props.selectedDate} // momentPropTypes.momentObj or null
        onDateChange={date => this.onDateChange(date)} // PropTypes.func.isRequired
        focused={this.state.focused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
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
  selectedDate: state.booking.selectedDate,
});

export default connect(mapStateToProps)(SearchBarContainer);
