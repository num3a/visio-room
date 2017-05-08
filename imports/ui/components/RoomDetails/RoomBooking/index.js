import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import BookingPayment from './BookingPayment';
import BookingSelector from './BookingSelector';

import { selectedBookingChanged, selectedVoucherChanged } from '../../../actions/booking';

class RoomBooking extends Component {
  render() {
    if (!this.props.bookingId) {
      return (<BookingSelector
        roomId={this.props.roomId}
      />);
    }

    return (<BookingPayment
      roomId={this.props.roomId}
    />);
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
});

export default connect(mapStateToProps)(RoomBookingContainer);
