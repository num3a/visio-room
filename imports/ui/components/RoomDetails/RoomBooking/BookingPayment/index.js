import React, { Component } from 'react';
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import CompletePayment from './CompletePayment';
import SelectedBookingDetails from '../SelectedBookingDetails';
import Voucher from './Voucher';
import PaymentCardList from './PaymentCardList';
import { closeBookingModal, openBookingModal, selectedBookingChanged, selectedVoucherChanged, voucherIsValid } from '../../../../actions/booking';

class BookingPayment extends Component {

    render(){

        return  <div>
            <div className="row">
                <div className="col-sm-12">
                    <SelectedBookingDetails
                        bookingId={this.props.bookingId}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <PaymentCardList />
                </div>
            </div>
            <Voucher
                data={this.props.voucher}
            />
            <div className="row">
                <div className="col-sm-12">
                    <CompletePayment
                        roomId={this.props.roomId}
                    />
                </div>
            </div>
        </div>;
    }
}



const BookingPaymentContainer = createContainer(() => {
    return {
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


