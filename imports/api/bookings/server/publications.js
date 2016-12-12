import { Meteor } from 'meteor/meteor';
import { Bookings } from '../bookings.js';
import { surroundingDates } from '../../../common/utils/dateUtils';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Meteor.publish('bookings.all', () => {
    return Bookings.find({});
});

Meteor.publish('bookings.byRoom', (roomId, minDate, maxDate) => {
    new SimpleSchema({
        roomId: { type: String, regEx: SimpleSchema.RegEx.Id},
        minDate: { type: Date},
        maxDate: { type: Date}

    }).validate({ roomId, minDate, maxDate});

    const query = {
        roomId: roomId,
        bookingDate: { $gt: minDate, $lt: maxDate }
    };

    return Bookings.find(query);
});

Meteor.publish('bookings.byUserId', (userId) => {
    new SimpleSchema({
        userId: { type: String, regEx: SimpleSchema.RegEx.Id},
    }).validate({ userId });

    const query = {
        bookedBy: userId
    };

    const options = {
        limit: 30,
    };
    return Bookings.find(query, options);
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