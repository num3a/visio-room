import { Meteor } from 'meteor/meteor';
import PaymentInternals from './server/payment-internals';

const stripeKey = 'sk_test_XpBlmXOXgKrcpz0MBUVM4E13';

const payments = new PaymentInternals(stripeKey);

Meteor.methods({
  'payments.saveToken'(token) {
    const userId = this.userId;
    return payments.saveToken(token, userId);
  },
  'payments.revokeToken'(tokenId) {
    return payments.revokeToken(tokenId);
  },
  'payments.createCustomer'(customer) {
    return payments.createCustomer(customer);
  },
  'payments.getCustomer'(email) {
    return payments.getCustomer(email);
  },
  'payments.createCharge'(charge) {
    return payments.createCharge(charge);
  },
  'payments.captureCharge'(charge) {
    return payments.captureCharge(charge);
  },
  'payments.refund'(refund) {
    return payments.refund(refund);
  },
});
