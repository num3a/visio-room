import React, { Component } from 'react';

import {connect} from "react-redux";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {createContainer} from "meteor/react-meteor-data";
import { PaymentTokens } from '../../../api/payments/paymentTokens';
import FlatButton from 'material-ui/FlatButton';


class BookingPayment extends Component {
    render(){
        const { paymentTokens, loadingTokens } = this.props;
        if(loadingTokens && paymentTokens == null){
            return <FlatButton>Add a payment card</FlatButton>
        }

        const firstCard = paymentTokens[0];

        return  <div>
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

    };
};

export default connect(mapStateToProps)(BookingPaymentContainer);


