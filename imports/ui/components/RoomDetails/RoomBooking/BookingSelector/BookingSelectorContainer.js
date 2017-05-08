import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import { Bookings } from '../../../../../api/bookings/bookings';
import Selector from './BookingSelector';
import { selectedStartDateChanged, selectedEndDateChanged } from '../../../../actions/booking';
import BookingTable from './BookingTable';


class BookingSelector extends Component {
  constructor() {
    super();
    this.state = {
      focusedInput: null,
    };
  }

  onDatesChanged(dates) {
    const { dispatch } = this.props;

    const startDate = dates.startDate;
    const endDate = dates.endDate;
    dispatch(selectedStartDateChanged(startDate));
    dispatch(selectedEndDateChanged(endDate));
  }

  dayIsBlocked(day) {
    const bookingDays =
      this.props.bookings
        .filter(booking => booking.isBlocked)
        .map(booking => moment(booking.bookingDate).format('DD-MM-YYYY'));

    const currentDay = day.format('DD-MM-YYYY');
    return bookingDays.indexOf(currentDay) !== -1;
  }

  dayIsBooked(day) {
    const bookingDays =
      this.props.bookings
        .filter(booking => booking.isBooked)
        .map(booking => moment(booking.bookingDate).format('DD-MM-YYYY'));

    const currentDay = day.format('DD-MM-YYYY');
    return bookingDays.indexOf(currentDay) !== -1;
  }

  render() {
    const { bookings } = this.props;
    return (
      <div>
        <Selector
          initialStartDate={moment().add(1, 'days')}
          startDate={this.props.selectedStartDate}
          endDate={this.props.selectedEndDate}
          onDatesChange={({ startDate, endDate }) => this.onDatesChanged({ startDate, endDate })}
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          bookings={bookings}
          dayIsBlocked={day => this.dayIsBlocked(day)}
        />
        <BookingTable
          bookings={bookings}
        />
      </div>);
  }
}


const BookingSelectorContainer = createContainer((props) => {
  const { roomId } = props;
  const minDate = props.selectedStartDate ? props.selectedStartDate.toDate() : moment().toDate();
  const maxDate = props.selectedEndDate ? props.selectedEndDate.toDate() : null;

  const search = {
    roomId,
    minDate,
    maxDate,
  };

  const bookingsHandle = Meteor.subscribe('bookings.byRoom', search);
  const loadingBooking = !bookingsHandle.ready();
  const bookings = Bookings.find({}).fetch();


  return {
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user(),
    bookings: bookings || [],
    loadingBooking,
  };
}, BookingSelector);


const mapStateToProps = state => ({
  selectedStartDate: state.booking.selectedStartDate,
  selectedEndDate: state.booking.selectedEndDate,
  capacity: state.booking.capacity,
});

export default connect(mapStateToProps)(BookingSelectorContainer);
