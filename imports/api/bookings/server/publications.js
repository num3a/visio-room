import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import { Bookings } from '../bookings.js';
import { surroundingDates } from '../../../common/utils/dateUtils';

Meteor.publish('bookings.all', () => Bookings.find({}));

Meteor.publish('bookings.byRoom', (roomId, minDate, maxDate) => {
  new SimpleSchema({
    roomId: { type: String, regEx: SimpleSchema.RegEx.Id },
    minDate: { type: Date },
    maxDate: { type: Date },
  }).validate({ roomId, minDate, maxDate });

  const query = {
    roomId,
    bookingDate: { $gt: minDate, $lt: maxDate },
  };

  return Bookings.find(query);
});

Meteor.publish('bookings.byUserId', () => {
  const query = {
    bookedBy: this.userId,
  };

  const options = {
    limit: 30,
  };
  return Bookings.find(query, options);
});

Meteor.publish('bookings.byId', (bookingId) => {
  new SimpleSchema({
    bookingId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validate({ bookingId });

  const query = {
    _id: bookingId,
  };

  return Bookings.find(query);
});

Meteor.publish('bookings.byDate.roomIdOnly', (bookingDate) => {
  new SimpleSchema({
    bookingDate: { type: Date },
  }).validate({ bookingDate });

  const surround = surroundingDates(bookingDate);
  const query = {
    bookingDate: { $gt: surround.minDate, $lt: surround.maxDate },
  };

  const options = {
    fields: { roomId: 1 },
  };

  return Bookings.find(query, options);
});


Meteor.publish('bookings.byDate', (bookingDate) => {
  new SimpleSchema({
    bookingDate: { type: Date },
  }).validate({ bookingDate });

  const surround = surroundingDates(bookingDate);
  const query = {
    bookingDate: { $gt: surround.minDate, $lt: surround.maxDate },
  };

  return Bookings.find(query);
});
