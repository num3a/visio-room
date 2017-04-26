import { Meteor } from 'meteor/meteor';
import { PaymentTokens } from '../paymentTokens';
import SimpleSchema from 'simpl-schema';

Meteor.publish('payments.tokenByUser', function () {
  /*new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },

  }).validate({ userId });*/

  return PaymentTokens.find({ userId: this.userId, expired: false });
});
