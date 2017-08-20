import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import _ from 'lodash';
import { translate } from 'react-i18next';

import { createContainer } from 'meteor/react-meteor-data';
import { PaymentTokens } from '../../../../../api/payments/payment-token-collection';
import { openAddCardModal } from '../../../../actions/payments';
import { selectedCardChanged } from '../../../../actions/booking';
import { RadioSet } from '../../../common/Form';

class PaymentCardList extends Component {
  componentWillMount() {
    if (this.props.paymentTokens.length === 1) {
      const firstCard = this.props.paymentTokens[0];

      this.dispatchSelectedCard(firstCard);
    }
  }

  onAddCardClick() {
    const { dispatch } = this.props;
    dispatch(openAddCardModal());
  }

  onRadioChange(event) {
    const customerId = event.target.value;
    const selectedPaymentToken = _.find(this.props.paymentTokens, { customerId });
    this.dispatchSelectedCard(selectedPaymentToken);
  }
  onSelectedCardChange(customerId) {
    debugger;
    const selectedPaymentToken = _.find(this.props.paymentTokens, { customerId });
    this.dispatchSelectedCard(selectedPaymentToken);
  }

  dispatchSelectedCard(card) {
    const { dispatch } = this.props;
    dispatch(selectedCardChanged(card));
  }

  renderCardList() {
    if (this.props.paymentTokens.length == 0) {
      return <div />;
    }

    const { paymentTokens, loadingTokens, t } = this.props;
    const firstCard = paymentTokens[0];
    const selectedCard = this.props.selectedCard;
    let customerID = '';
    if(selectedCard != null){
      customerID = selectedCard.customerId;
    }

    return (<div>
      <form
        onChange={(event) => this.onRadioChange(event)}
      >
        {paymentTokens.map((payment) => {
          const last4 = `${payment.card.brand} **** ${payment.card.last4}`;
          return (<RadioSet
            key={payment._id}
            name="card_list"
            value={payment.customerId}
            label={last4}
            onChange={(event) => this.onRadioChange(event)}
            checked={customerID === payment.customerId}
          />);
        })}
        </form>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <a className="button is-primary" onClick={() => this.onAddCardClick()}>{t('booking_payment_add')}</a>
      </div>
    </div>);
  }

  render() {
    const { t } = this.props;
    return (<div className="column is-4">
      <div className="subtitle is-4">{t('booking_payment_methods')}</div>
      {this.renderCardList()}
      <div>
        {this.props.children}
      </div>
    </div>);
  }
}

const PaymentCardListContainer = createContainer(() => {
  const userId = Meteor.userId();
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


const mapStateToProps = state => ({
  selectedCard: state.booking.selectedCard,
});

export default translate(['booking'], { wait: true })(connect(mapStateToProps)(PaymentCardListContainer));

