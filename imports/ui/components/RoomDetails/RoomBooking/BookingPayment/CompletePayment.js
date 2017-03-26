import React, { Component } from 'react';
import {connect} from "react-redux";
import Checkbox from 'material-ui/Checkbox';
import { cguAccepted } from '../../../../actions/room';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { green500 } from "material-ui/styles/colors";
import { closeBookingModal, openBookingModal, selectedBookingChanged } from '../../../../actions/room';
import { resetAvailability } from '../../../../actions/booking'
import { notificationOpenError } from '../../../../actions/notification';
import { withRouter } from 'react-router-dom';


class CompletePayment extends Component {

    handlePrev() {
        const { dispatch } = this.props;
        dispatch(selectedBookingChanged(null));
    };

    onCancel(){
        const { dispatch } = this.props;
        dispatch(cguAccepted(false));
        dispatch(selectedBookingChanged(null));
        dispatch(resetAvailability());
    }

    onCGUChange(isInputChecked){
        const { dispatch } = this.props;
        dispatch(cguAccepted(isInputChecked));
    }
    completeBooking(){
        let code = this.props.voucher !== null && this.props.voucher.code !== null ? this.props.voucher.code : '';

        let bookingData = {
            customerId: this.props.selectedCard.customerId,
            voucher:code,
            bookingId: this.props.bookingId,
            userId: Meteor.userId()
        };

        const { dispatch } = this.props;
        dispatch(openBookingModal());
        Meteor.apply('bookings.bookWithPayment', [bookingData], {noRetry: true}, (err, charge)=> {
            console.log('bookings.err', err);
            console.log('bookings.data', charge);
            if(err){
                dispatch(notificationOpenError(err.message));
            }
            else {
                dispatch(closeBookingModal());
                this.props.history.push('/profile');
            }
         });

    }

    render(){
        return    <div className="row">
            <div className="col-sm-12">
                <p>

                    <span>By using the service, I accepts the <a target="_blank" href="/cgu">CGU</a></span>
                </p>

                <Checkbox
                    label="I accept"
                    onCheck={(event, isInputChecked) => {
                        this.onCGUChange(isInputChecked)}
                    }
                />

                <div style={{marginTop: 12}}>
                    <a className="button is-danger"  style={{marginRight: 12}} onClick={() => this.onCancel()}>Cancel</a>
                    <a
                        style={{marginRight: 12}}
                        className="button is-success"
                        disabled={this.props.cguAccepted == false || !this.props.selectedCard}
                        onClick={() => this.completeBooking()}
                    >Complete</a>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        cguAccepted: state.booking.cguAccepted,
        selectedCard: state.booking.selectedCard,
        voucher: state.booking.voucher,
        bookingId: state.booking.bookingId,

    };
};

export default withRouter(connect(mapStateToProps)(CompletePayment));
