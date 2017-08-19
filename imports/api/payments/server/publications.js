import { Meteor } from 'meteor/meteor';
import { PaymentTokens } from '../payment-token-collection';
import SimpleSchema from 'simpl-schema';

Meteor.publish('payments.tokenByUser', () => PaymentTokens.find({ userId: Meteor.userId(), expired: false }));
