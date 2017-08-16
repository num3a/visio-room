import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import _ from 'lodash';
import { translate } from 'react-i18next';

import { createContainer } from 'meteor/react-meteor-data';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { PaymentTokens } from '../../../../../api/payments/payment-token';
import { openAddCardModal } from '../../../../actions/payments';
import { selectedCardChanged } from '../../../../actions/booking';

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

  onSelectedCardChange(customerId) {
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

    return (<div>
      <RadioButtonGroup
        name="payments" defaultSelected={firstCard.customerId}
        onChange={(event, value) => this.onSelectedCardChange(value)}
      >
        {paymentTokens.map((payment) => {
          const last4 = `${payment.card.brand} **** ${payment.card.last4}`;
          return (<RadioButton
            key={payment._id}
            value={payment.customerId}
            label={last4}
          />);
        })}
      </RadioButtonGroup>
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
});

export default translate(['booking'], { wait: true })(connect(mapStateToProps)(PaymentCardListContainer));

