import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { Bookings } from '../../../../api/bookings/bookings';

class SelectedBookingDetails extends Component {
  render() {
    if (this.props.booking) {
      const { booking } = this.props;
      const date = moment(booking.bookingDate).format('DD/MM/YYYY');

      return (
        <div className="subtitle is-4">Booking date: {date}</div>
      );
    }

    return (<div />);
  }
}

const SelectedBookingDetailsContainer = createContainer(({ bookingId }) => {
  const bookingHandle = Meteor.subscribe('bookings.byId', bookingId);
  return {
    isAuthenticated: Meteor.userId(),
    booking: Bookings.findOne({ _id: bookingId }),
    loadingBookings: !bookingHandle.ready(),

  };
}, SelectedBookingDetails);

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(SelectedBookingDetailsContainer);
