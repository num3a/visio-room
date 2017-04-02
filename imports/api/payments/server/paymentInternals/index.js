import { Stripe } from "stripe";
import { PaymentTokens } from '../../paymentTokens';
import { Meteor } from 'meteor/meteor';
import { getFirstEmail } from '../../../../common/emailHelper';

//const stripe = require("stripe")("sk_test_XpBlmXOXgKrcpz0MBUVM4E13");

class PaymentInternals {
    constructor(stripeKey){
        this.stripeInstance = Stripe(stripeKey);
    }

    saveToken(data, userId){
        if(!userId){
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

        let newPaymentToken = {
            userId: userId,
            token: token,
            type: type,
            clientIp: clientIp,
            created: created,
            card: card,
            expired: expired,
        };

        this.createCustomer(data.token, newPaymentToken);

        return {
            saved: true,
            token: token,
        };

    }

    revokeToken(tokenId){
        if(!Meteor.userId()){
            throw new Meteor.Error('User is not authenticated');
        }

        let userId = Meteor.userId();

        new SimpleSchema({
            tokenId: { type: String, regEx: SimpleSchema.RegEx.Id },
        }).validate({tokenId});


        let revokeTokenQuery = {
            $set: {
                expired: true,
            }
        };

        let tokenToUpdate = PaymentTokens.findOne({ _id: tokenId, userId: userId });

        if(!tokenToUpdate){
            throw new Meteor.Error(`No token found for tokenId: ${tokenId} and userId: ${userId}`);
        }


        PaymentTokens.update({_id: tokenId }, revokeTokenQuery, (error, result) => {
            if(error){
                throw new Meteor.Error('An error occured when updating payment tokens');
            }
            console.log('result', result);

            return { revoked: true };
        });
    }

    createCustomer(token, paymentToken){

        /*

         this.stripeInstance.customers.create({
         email: emailAddress,
         description: 'Customer for ' + emailAddress,
         metadata: {'userId': Meteor.userId()},
         source: token // obtained with Stripe.js
         }, function(err, customer) {
         if(err){
         throw new Meteor.Error(err.message);
         }
         else {

         }
         });
        * */

        let {  firstName, lastName }  = Meteor.user().profile;
        let email = getFirstEmail(Meteor.user());
        let wrappedCustomerCreate = Meteor.wrapAsync(this.stripeInstance.customers.create, this.stripeInstance.customers);

        let customer = null;

        try {
            customer = wrappedCustomerCreate({
                email: email,
                description: 'Customer for ' + email,
                metadata: {
                    'userId': paymentToken.userId,
                    'firstName': firstName,
                    'lastName': lastName,
                },
                source: token // obtained with Stripe.js
            });
        }
        catch (e){
            throw  new Meteor.Error(e.message);
        }

        if(customer){
            paymentToken.customerId = customer.id;

        }
        PaymentTokens.insert(paymentToken);

    }

    getCustomer(email){

    }

    createCharge(charge){
        new SimpleSchema({
            amount: { type: Number},
            currency: { type: String, allowedValues: ["eur"]},
            description: { type: String },
            customerId: { type: String }
        }).validate(charge);

        //var token = request.body.stripeToken; // Using Express
        const { amount, currency, description, customerId } = charge;

        const newCharge = this.stripeInstance.charges.create({
            amount: amount * 100,
            currency: currency,
            description: description,
            customer: customerId,
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