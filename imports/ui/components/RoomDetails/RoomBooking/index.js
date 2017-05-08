import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import BookingPayment from './BookingPayment';
import BookingSelector from './BookingSelector';

import { selectedBookingChanged, selectedVoucherChanged } from '../../../actions/booking';

class RoomBooking extends Component {
  render() {
    if (!this.props.bookingList) {
      return (
        <div className="column is-6">
          <BookingSelector
            roomId={this.props.roomId}
          />
        </div>);
    }

    return (
      <div className="column is-6">
        <BookingPayment
          roomId={this.props.roomId}
        />
      </div>);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(selectedVoucherChanged(''));
    dispatch(selectedBookingChanged(''));
  }
}

const RoomBookingContainer = createContainer((props) => {
  const { roomId } = props;
  return {
    roomId,
  };
}, RoomBooking);

const mapStateToProps = state => ({
  bookingId: state.booking.bookingId,
  bookingList: state.booking.bookingList,
});

export default connect(mapStateToProps)(RoomBookingContainer);
