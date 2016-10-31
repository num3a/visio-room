import { Meteor } from 'meteor/meteor';
import { Bookings } from '../bookings.js';

Meteor.publish('bookings.all', () => {
    return Bookings.find({});
});

Meteor.publish('bookings.byRoom', (roomId, minDate, maxDate) => {
   return Bookings.find({
       roomId: roomId,
       bookingDate: { $gt: minDate, $lt: maxDate }
   });
});