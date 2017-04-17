import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { PaymentTokens } from '../../../api/payments/paymentTokens';
import { notificationOpenError } from '../../actions/notification';
import { closeAddCardModal, openAddCardModal } from '../../actions/payments';
import PaymentTable from './PaymentTable';

class Payments extends Component {
  handleCloseDialog() {
    const { dispatch } = this.props;
    dispatch(closeAddCardModal());
  }

  onPaymentTokenDelete(paymentToken) {
    console.log('delete card', paymentToken);

    const { dispatch } = this.props;
    const tokenId = paymentToken._id;
    Meteor.call('payments.revokeToken', tokenId, (err, result) => {
      if (err) {
        dispatch(notificationOpenError(err.message));
      }
      console.log('payments.revokeToken', result);
    });
  }

  openAddCardModal() {
    const { dispatch } = this.props;
    dispatch(openAddCardModal());
  }

  _renderPayments() {
    const { loadingTokens, paymentTokens } = this.props;
    if (loadingTokens) {
      return <h3>Loading payments ..</h3>;
    }
    return (<PaymentTable
      paymentTokens={paymentTokens}
      onPaymentTokenDelete={paymentToken => this.onPaymentTokenDelete(paymentToken)}
    />);
  }

  render() {
    return (<div className="container">
      <h1 className="title">Payments</h1>
      <div className="box" >
        {this._renderPayments()}
      </div>
      <a className="button is-success is-focused" onClick={() => this.openAddCardModal()}>Add a card</a>
    </div>);
  }
}


const PaymentsContainer = createContainer(() => {
  const userId = Meteor.userId();
  const tokenHandle = Meteor.subscribe('payments.tokenByUser', userId);
  const loading = !tokenHandle.ready();
  const paymentTokens = PaymentTokens.find({ userId }).fetch();

  return {
    isAuthenticated: Meteor.userId(),
    currentUser: Meteor.user(),
    loadingTokens: loading,
    paymentTokens: paymentTokens || [],
  };
}, Payments);


const mapStateToProps = state => ({
  openAddPaymentModal: state.payments.openAddPaymentModal,
});

export default connect(mapStateToProps)(PaymentsContainer);
