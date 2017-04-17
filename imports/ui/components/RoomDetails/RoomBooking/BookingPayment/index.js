import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import CompletePayment from './CompletePayment';
import { Rooms } from '../../../../../api/rooms/rooms';
import SelectedBookingDetails from '../SelectedBookingDetails';
import Voucher from './Voucher';
import PaymentCardList from './PaymentCardList';
import BookingPaymentRoomDetails from './BookingPaymentRoomDetails';

class BookingPayment extends Component {
  onLogin() {
    this.props.history.push('/login');
  }
  // TODO: open login modal
  render() {
    return (<div className="container">
      <div className="columns  is-multiline">
        <BookingPaymentRoomDetails room={this.props.room} />
        { this.props.isAuthenticated ?
          <PaymentCardList >
            <SelectedBookingDetails bookingId={this.props.bookingId} />
            <Voucher
              data={this.props.voucher}
            />
            <CompletePayment
              roomId={this.props.roomId}
            />
          </PaymentCardList>
            :
          <div className="column is-6">
            <a className="button is-primary is-medium" onClick={() => this.onLogin()}>Login</a>
            {/* <LoginContainer/> */}
          </div>
          }
      </div>
    </div>);
  }
}

const BookingPaymentContainer = createContainer(({ roomId }) => {
  const roomHandle = Meteor.subscribe('rooms.byId', roomId);
  const room = Rooms.findOne(roomId);

  return {
    roomId,
    room: room || {},
    loadingRooms: !roomHandle.ready(),
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user(),
  };
}, BookingPayment);


const mapStateToProps = state => ({
  bookingId: state.booking.bookingId,
  voucher: state.booking.voucher,
});

export default connect(mapStateToProps)(BookingPaymentContainer);

