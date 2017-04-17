import { Meteor } from 'meteor/meteor';
import { PaymentTokens } from '../paymentTokens';
import SimpleSchema from 'simpl-schema';

Meteor.publish('payments.tokenByUser', (userId) => {
  new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },

  }).validate({ userId });

  return PaymentTokens.find({ userId, expired: false });
});
