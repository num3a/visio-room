import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { translate } from 'react-i18next';
import moment from 'moment';
import { Bookings } from '../../../../../api/bookings/bookings';
import Selector from './BookingSelector';
import { selectedStartDateChanged, selectedEndDateChanged, addToBookingList, removeFromBookingList, updateBookingList } from '../../../../actions/booking';
import { notificationOpenError } from '../../../../actions/notification';
import BookingTable from './BookingTable';
import SelectorHeader from './SelectorHeader';

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

  addBooking(bookingId) {
    const { dispatch } = this.props;
    dispatch(addToBookingList(bookingId));
  }

  calculateTotal(bookings) {
    let total = 0;

    if (bookings && bookings.length > 0) {
      total = bookings
        .filter(booking => !booking.isBooked && !booking.isBlocked)
        .map(booking => booking.price)
        .reduce((acc, price) => acc + price);
    }
    return total.toFixed(2);
  }

  calculateBookingValidity(bookings) {
    let active = false;

    if (bookings && bookings.length > 0) {
      active = bookings
        .map(booking => !booking.isBooked && !booking.isBlocked)
        .reduce((acc, available) => acc && available);
    }
    return active;
  }

  validateSelection() {
    const { bookings, dispatch } = this.props;
    const isValid = this.calculateBookingValidity(bookings);

    if (!isValid) {
      dispatch(notificationOpenError('Cannot validate bookings'));
    }

    const bookingList = bookings.map((booking) => {
      const { _id, roomId, price, capacity, bookingDate } = booking;
      return {
        _id,
        roomId,
        price,
        capacity,
        bookingDate,
      };
    });
    dispatch(updateBookingList(bookingList));
  }

  removeBooking(bookingId) {
    const { dispatch } = this.props;
    dispatch(removeFromBookingList(bookingId));
  }

  render() {
    const { bookings } = this.props;
    const total = this.calculateTotal(bookings);
    const validateIsActive = this.calculateBookingValidity(bookings);

    return (
      <div className="is-centered">
        <SelectorHeader />
        <Selector
          initialStartDate={moment().add(1, 'days')}
          startDate={this.props.selectedStartDate}
          endDate={this.props.selectedEndDate}
          onDatesChange={({ startDate, endDate }) => this.onDatesChanged({ startDate, endDate })}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          bookings={bookings}
          dayIsBlocked={day => this.dayIsBlocked(day)}
        />
        <BookingTable
          bookings={bookings}
          totalPrice={total}
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

export default translate(['booking'], { wait: true })(connect(mapStateToProps)(BookingSelectorContainer));

