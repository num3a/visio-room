import { Meteor } from 'meteor/meteor';
import { BookingsTransactions } from '../bookings-transactions-collection';

Meteor.publish('bookings-transactions.byUserId', () => {
  const query = {
    userId: Meteor.userId(),
  };

  const options = {
    limit: 30,
  };
  return BookingsTransactions.find(query, options);
});
