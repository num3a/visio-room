import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import { selectedBookingChanged } from '../../../actions/booking';
import { Bookings } from '../../../../api/bookings/bookings-collection';
import BookingSelector from './BookingSelector';

import BookingTable from './BookingTable';

class BookingSelection extends Component {
  handleBookingSelection(booking) {
    const { dispatch } = this.props;
    dispatch(selectedBookingChanged(booking._id));
  }

  renderBookings (bookings) {
    return (<BookingTable
      bookings={bookings}
      onSelect={booking => this.handleBookingSelection(booking)}
    />);
  }
  render() {
    const { bookings } = this.props;
    if (!bookings) {
      return <h1>No data</h1>;
    }

    return (
      <div className="column is-6">
        <div className="subtitle is-3">Select a booking date</div>
        <div className="box">
          {this.renderBookings(bookings)}
        </div>
      </div>
    );
  }
}


const BookingSelectionContainer = withTracker((props) => {
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
}, BookingSelection);


const mapStateToProps = state => ({
  selectedStartDate: state.booking.selectedStartDate,
  selectedEndDate: state.booking.selectedEndDate,
  capacity: state.booking.capacity,
});

export default connect(mapStateToProps)(BookingSelectionContainer);
