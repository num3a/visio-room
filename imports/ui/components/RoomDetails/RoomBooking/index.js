import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import BookingPayment from './BookingPayment';
import BookingSelector from './BookingSelector';

import { selectedBookingChanged, selectedVoucherChanged } from '../../../actions/booking';


class RoomBooking extends Component {
  renderBookingSelector() {
    return   <BookingSelector
      roomId={this.props.roomId}
    />;
  }

  renderBookingPayment() {
    return (<BookingPayment
      roomId={this.props.roomId}
    />);
  }

  render(){
    return(
      <div className="column is-6">
        <div className="box">
          {this.renderBookingSelector()}
          {this.renderBookingPayment()}
        </div>
      </div>
    );
  }
  /*
  oldRender() {
    if (!this.props.bookingList || this.props.bookingList.length === 0) {
      return (
        <div className="column is-6">
          <div className="box">
            <BookingSelector
              roomId={this.props.roomId}
            />
          </div>

        </div>);
    }

    return (
      <div className="column is-6">
        <div className="box">
          <BookingPayment
            roomId={this.props.roomId}
          />
        </div>

      </div>);
  }

  */

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
  bookingList: state.booking.bookingList,
});

export default connect(mapStateToProps)(RoomBookingContainer);
