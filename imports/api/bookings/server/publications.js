import { Meteor } from 'meteor/meteor';
import { Bookings } from '../bookings.js';
import { surroundingDates } from '../../../common/utils/dateUtils';

Meteor.publish('bookings.all', () => {
    return Bookings.find({});
});

Meteor.publish('bookings.byRoom', (roomId, minDate, maxDate) => {
   return Bookings.find({
       roomId: roomId,
       bookingDate: { $gt: minDate, $lt: maxDate }
   });
});

Meteor.publish('bookings.byDate.roomIdOnly', (bookingDate) => {
    new SimpleSchema({
        bookingDate: { type: Date}
    }).validate({bookingDate});

    var surround = surroundingDates(bookingDate);
    const query = {
        bookingDate: { $gt: surround.minDate, $lt: surround.maxDate },
    };

    const options = {
        fields: { roomId: 1 }
    };

    return Bookings.find(query, options);
});