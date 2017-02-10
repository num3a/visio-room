import React, { Component } from 'react';
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { PaymentTokens } from '../../../api/payments/paymentTokens';
import { closeBookingModal, openBookingModal, selectedBookingChanged, selectedVoucherChanged, voucherIsValid } from '../../actions/room';
import CompletePayment from './CompletePayment';

class BookingPayment extends Component {
    onVoucherChange(voucher){
        const { dispatch } = this.props;
        dispatch(selectedVoucherChanged(voucher));

        //TODO: encapsulate validation in async redux action
        Meteor.call('voucher.validate', voucher, (error, result) => {
            if(error){
                console.log('cannot validate voucher', error);
                dispatch(voucherIsValid(false));
                return;
            }
            if (result.isValid === true) {
                console.log('validation result', result);
                dispatch(voucherIsValid(true));
            }
            else {
                dispatch(voucherIsValid(false));
            }

        });
    }

    render(){
        const { paymentTokens, loadingTokens } = this.props;
        if(loadingTokens && paymentTokens == null){
            return <FlatButton>Add a payment card</FlatButton>
        }

        const firstCard = paymentTokens[0];

        return  <div>
            <div className="row">
                <RadioButtonGroup name="payments" defaultSelected={firstCard._id}>
                    {paymentTokens.map((payment) => {
                        const last4 = "**** **** **** " + payment.card.last4;
                        return    <RadioButton
                            key={payment.id}

                            value={payment.id}
                            label={last4}
                        />
                    })}
                </RadioButtonGroup>
            </div>
            <div className="row">
                <TextField
                    hintText="Enter your voucher"
                    onChange={(event, value) => this.onVoucherChange(value)}
                />
            </div>
            <div className="row">
                <CompletePayment/>
            </div>
        </div>;
    }
}



const BookingPaymentContainer = createContainer(() => {
    let userId = Meteor.userId();
    const tokenHandle = Meteor.subscribe('payments.tokenByUser', userId);
    const loading = !tokenHandle.ready();
    const paymentTokens = PaymentTokens.find({}).fetch();

    return {
        isAuthenticated: Meteor.userId(),
        currentUser: Meteor.user(),
        loadingTokens: loading,
        paymentTokens: paymentTokens,
    };
}, BookingPayment);


const mapStateToProps = (state) => {
    return {
        cguAccepted: state.room.cguAccepted,
    };
};

export default connect(mapStateToProps)(BookingPaymentContainer);


