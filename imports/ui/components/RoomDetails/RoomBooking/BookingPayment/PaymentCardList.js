import React, { Component } from 'react';
import {connect} from "react-redux";
import {createContainer} from "meteor/react-meteor-data";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { PaymentTokens } from '../../../../../api/payments/paymentTokens';
import FlatButton from 'material-ui/FlatButton';
import { openAddCardModal  } from '../../../../actions/payments';
import { selectedCardChanged } from '../../../../actions/booking';
import _ from 'lodash';
import { grey500, green500, red500} from "material-ui/styles/colors";

class PaymentCardList extends Component {
  componentWillMount(){

    if(this.props.paymentTokens.length === 1) {
      const firstCard = this.props.paymentTokens[0];

      this.dispatchSelectedCard(firstCard);
    }
  }
  onAddCardClick(){
    const { dispatch } = this.props;
    dispatch(openAddCardModal());
  }

  onSelectedCardChange(customerId){
    let selectedPaymentToken =  _.find(this.props.paymentTokens,{ 'customerId' : customerId });
    this.dispatchSelectedCard(selectedPaymentToken);
  }

  dispatchSelectedCard(card){
    const { dispatch } = this.props;
    dispatch(selectedCardChanged(card))
  }

  renderCardList(){
    //TODO: change to SelectField
    if(this.props.paymentTokens.length == 0){
      return <div></div>;
    }

    const { paymentTokens, loadingTokens } = this.props;

    const firstCard = paymentTokens[0];

    return        <div>

        <RadioButtonGroup
          name="payments" defaultSelected={firstCard.customerId}
          onChange={(event, value) => this.onSelectedCardChange(value)}

        >
          {paymentTokens.map((payment) => {
            const last4 = payment.card.brand + " **** " + payment.card.last4;
            return    <RadioButton
              key={payment._id}
              value={payment.customerId}
              label={last4}
            />
          })}
        </RadioButtonGroup>
        <div>
            <a className="button is-primary" onClick={() => this.onAddCardClick()}>Add a payment card</a>
        </div>
    </div>;
  }

  render(){
    return        <div className="column is-4">
      <div className="subtitle is-4">Bookings:</div>
        <div className="subtitle is-4">Card list:</div>
      {this.renderCardList()}
        <div>
          {this.props.children}
        </div>
    </div>;
  }
}



const PaymentCardListContainer = createContainer(() => {
  let userId = Meteor.userId();
  const tokenHandle = Meteor.subscribe('payments.tokenByUser', userId);
  const loading = !tokenHandle.ready();
  const paymentTokens = PaymentTokens.find({}).fetch();

  return {
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user(),
    loadingTokens: loading,
    paymentTokens: paymentTokens || [],
  };
}, PaymentCardList);


const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(PaymentCardListContainer);


