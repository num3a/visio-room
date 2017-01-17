import { Stripe } from "stripe";
//const stripe = require("stripe")("sk_test_XpBlmXOXgKrcpz0MBUVM4E13");

class PaymentInternals {
    constructor(stripeKey){
        this.stripeInstance = Stripe(stripeKey);
    }

    createCustomer(customer){

    }

    getCustomer(email){

    }

    createCharge(charge){
        new SimpleSchema({
            amount: { type: Number },
            currency: { type: String, allowedValues: ["eur"]},
            description: { type: String },
            source: { type: String }
        }).validate(charge);

        //var token = request.body.stripeToken; // Using Express
        const { amount, currency, description, source } = charge;

        const newCharge = this.stripeInstance.charges.create({
            amount: amount,
            currency: currency,
            description: description,
            source: source,
        }, (err, charge) => {
            if(err){
                throw new Meteor.Error(err.message);
            }
            else {
                return charge;
            }
        });

        return newCharge;
    }

    captureCharge(charge){

    }

    refund(refund){

    }
}



/*
*
*
*        return PaymentInternals.createCustomer(customer);
 },
 'payments.getCustomer'(email){
 return PaymentInternals.getCustomer(email);
 },
 'payments.charge'(charge){
 return PaymentInternals.charge(charge);
 },
 'payments.refund'(refund){
 return PaymentInternals.refund(refund);
 */
export default PaymentInternals;