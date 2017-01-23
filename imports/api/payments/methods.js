import { Meteor } from 'meteor/meteor';
import PaymentInternals from './paymentInternals';
const stripeKey = 'sk_test_XpBlmXOXgKrcpz0MBUVM4E13';

const payments = new PaymentInternals(stripeKey);

Meteor.methods({
    'payments.createCustomer'(customer) {
        return payments.createCustomer(customer);
    },
    'payments.getCustomer'(email){
        return payments.getCustomer(email);
    },
    'payments.createCharge'(charge){
        return payments.createCharge(charge);
    },
    'payments.captureCharge'(charge){
        return payments.captureCharge(charge);
    },
    'payments.refund'(refund){
        return payments.refund(refund);
    }
});