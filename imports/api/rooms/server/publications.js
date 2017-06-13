import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Rooms } from '../rooms.js';
import { Bookings } from '../../bookings/bookings';

import { surroundingDates } from '../../../common/utils/dateUtils';

Meteor.publish('rooms.all', () => Rooms.find({}));

Meteor.publish('rooms.byId', (roomId) => {
  new SimpleSchema({
    roomId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  }).validate({ roomId });

  return Rooms.find({ _id: roomId });
});

Meteor.publish('rooms.byAdmin', (email) => {
  new SimpleSchema({
    email: { type: String, regEx: SimpleSchema.RegEx.Email },
  }).validate({ email });

  return Rooms.find({ administrator: { $elemMatch: { $eq: email } } });
});

Meteor.publish('rooms.byIds', (roomIds) => {
  new SimpleSchema({
    roomIds: { type: [String], regEx: SimpleSchema.RegEx.Id },
  }).validate({ roomIds });
  return Rooms.find({ _id: { $in: roomIds } });
});

Meteor.publishComposite('rooms.bookingsAvailable.byDate', (bookingDate) => {
  new SimpleSchema({
    bookingDate: { type: Date },
  }).validate({ bookingDate });

  const surround = surroundingDates(bookingDate);

  return {
    find() {
      const query = {
        bookingDate: { $gt: surround.minDate, $lt: surround.maxDate },
      };

      const options = {
        fields: { roomId: 1 },
      };

      return Bookings.find(query, options);
    },

    children: [{
      find(booking) {
        return Rooms.find({ _id: booking.roomId });
      },
    }],
  };
});
