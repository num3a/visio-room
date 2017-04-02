import { Meteor } from 'meteor/meteor';
import { PaymentTokens } from '../paymentTokens';
import SimpleSchema from 'simpl-schema';

Meteor.publish('payments.tokenByUser', () => {
    return PaymentTokens.find({ userId: this.userId, expired: false});
});