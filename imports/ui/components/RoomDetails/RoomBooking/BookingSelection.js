import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import { selectedBookingChanged } from '../../../actions/booking';
import { Bookings } from '../../../../api/bookings/bookings';
import { addDays } from '../../../../common/utils/dateUtils';
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
      <div className="container">
        <div className="subtitle is-3">Select a booking date</div>
        <div className="box">
          {this.renderBookings(bookings)}
        </div>
      </div>
    );
  }
}


const BookingSelectionContainer = createContainer(({ roomId }) => {

  const now = moment().toDate();
  const maxDate = addDays(now, 30);

  // TODO: get booking by date range
  const bookingHandle = Meteor.subscribe('bookings.byRoom', roomId, now, maxDate);
  const bookings = Bookings.find({ roomId }).fetch();
  return {
    isAuthenticated: Meteor.userId(),
    bookings: bookings || [],
    loadingBookings: !bookingHandle.ready(),
    roomId,
  };
}, BookingSelection);


const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(BookingSelectionContainer);
