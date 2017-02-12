import { Stripe } from "stripe";
import { PaymentTokens } from '../../paymentTokens';
//const stripe = require("stripe")("sk_test_XpBlmXOXgKrcpz0MBUVM4E13");

class PaymentInternals {
    constructor(stripeKey){
        this.stripeInstance = Stripe(stripeKey);
    }

    saveToken(data){
        if(!Meteor.userId()){
            throw new Meteor.Error('User is not authenticated');
        }

        const CardSchema  = new SimpleSchema({
            id: { type: String},
            expMonth: { type: Number},
            expYear: { type: Number},
            last4: { type: String},
            brand: { type: String},
        });

        new SimpleSchema({
            token: { type: String},
            type: { type: String },
            clientIp: { type: String },
            created: { type: Number},
            card: { type: CardSchema },
            expired: { type : Boolean}

        }).validate(data);

        const { token, type, clientIp, created, card, expired } = data;

        PaymentTokens.insert({
            userId: Meteor.userId(),
            token: token,
            type: type,
            clientIp: clientIp,
            created: created,
            card: card,
            expired: expired,
        });

        return {
            saved: true,
            token: token,
        };

    }

    revokeToken(tokenId){
        if(!Meteor.userId()){
            throw new Meteor.Error('User is not authenticated');
        }

        new SimpleSchema({
            tokenId: { type: String, regEx: SimpleSchema.RegEx.Id },
        }).validate({tokenId});


        let revokeTokenQuery = {
            $set: {
                expired: true,
            }
        };

        PaymentTokens.update({_id: tokenId }, revokeTokenQuery, (error, result) => {
            if(error){
                throw new Meteor.Error('An error occured when updating booking');
            }
            console.log('result', result);

            return { revoked: true };
        });
    }

    createCustomer(customer){

    }

    getCustomer(email){

    }

    createCharge(charge){
        new SimpleSchema({
            amount: { type: Number, decimal: true },
            currency: { type: String, allowedValues: ["eur"]},
            description: { type: String },
            source: { type: String }
        }).validate(charge);

        //var token = request.body.stripeToken; // Using Express
        const { amount, currency, description, source } = charge;

        const newCharge = this.stripeInstance.charges.create({
            amount: amount * 100,
            currency: currency,
            description: description,
            source: source,
        }, (err, charge) => {
            if(err){
                throw new Meteor.Error(err.message);
            }
            else {
                return charge;

                //
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