import { Meteor } from 'meteor/meteor';
import PaymentInternals from './paymentInternals';
const stripeKey = '';

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