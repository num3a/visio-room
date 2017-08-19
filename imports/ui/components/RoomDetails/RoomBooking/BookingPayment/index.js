import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import CompletePayment from './CompletePayment';
import { Rooms } from '../../../../../api/rooms/rooms-collection';
import Voucher from './Voucher';
import PaymentCardList from './PaymentCardList';
import { openLoginModal, closeLoginModal } from '../../../../actions/login';

class BookingPayment extends Component {
  onLogin() {
    const { dispatch } = this.props;
    dispatch(openLoginModal());
  }
  // TODO: open login modal
  render() {
    return (<div className="container">
      <div className="columns  is-multiline">

        <PaymentCardList >
          {this.props.isAuthenticated ?
            <div>            <Voucher
              data={this.props.voucher}
            />
              <CompletePayment
                roomId={this.props.roomId}
              />
            </div>
            :
            <div>
              <button className="button is-primary" onClick={() => this.onLogin()} >Log In</button>
            </div>
          }
        </PaymentCardList>

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
  bookingList: state.booking.bookingList,

  voucher: state.booking.voucher,
});

export default connect(mapStateToProps)(BookingPaymentContainer);

