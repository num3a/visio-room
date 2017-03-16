import React, { Component } from 'react';
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import CompletePayment from './CompletePayment';
import { Rooms } from '../../../../../api/rooms/rooms';
import SelectedBookingDetails from '../SelectedBookingDetails';
import Voucher from './Voucher';
import PaymentCardList from './PaymentCardList';
import { closeBookingModal, openBookingModal, selectedBookingChanged, selectedVoucherChanged, voucherIsValid } from '../../../../actions/booking';
import BookingPaymentRoomDetails from './BookingPaymentRoomDetails';
class BookingPayment extends Component {

    render(){
        return  <div className="container">
            <div className="columns  is-multiline">
                <BookingPaymentRoomDetails room={this.props.room} />
                <PaymentCardList >
                    <SelectedBookingDetails bookingId={this.props.bookingId}/>
                    <Voucher
                        data={this.props.voucher}
                    />
                    <CompletePayment
                        roomId={this.props.roomId}
                    />
                </PaymentCardList>
            </div>
        </div>;
    }
}



const BookingPaymentContainer = createContainer(({roomId}) => {
    let roomHandle = Meteor.subscribe('rooms.byId', roomId);
    let room = Rooms.findOne(roomId);

    return {
        roomId: roomId,
        room: room || {},
        loadingRooms: !roomHandle.ready(),
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
    };
}, BookingPayment);


const mapStateToProps = (state) => {
    return {
        bookingId: state.booking.bookingId,
        voucher: state.booking.voucher,
    };
};

export default connect(mapStateToProps)(BookingPaymentContainer);


