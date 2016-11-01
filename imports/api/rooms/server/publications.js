import { Meteor } from 'meteor/meteor';
import { Rooms } from '../rooms.js';
import { Bookings } from '../../bookings/bookings';

import { surroundingDates } from '../../../common/utils/dateUtils';

Meteor.publish('rooms.all', () => {
    return Rooms.find({});
});

Meteor.publish('rooms.byId', (roomId) => {
    new SimpleSchema({
        roomId: { type: String, regEx: SimpleSchema.RegEx.Id},
    }).validate({roomId});

    return Rooms.find({_id: roomId});
});

Meteor.publishComposite('rooms.bookingsAvailable.byDate', function(bookingDate) {
    new SimpleSchema({
        bookingDate: { type: Date}
    }).validate({bookingDate});

    var surround = surroundingDates(bookingDate);

    return {
        find() {
            const query = {
                bookingDate: { $gt: surround.minDate, $lt: surround.maxDate },
            };

            const options = {
                fields: { roomId: 1 }
            };

            return Bookings.find(query, options);
        },

        children: [{
            find(booking) {
                return Rooms.find({ _id: booking.roomId });
            }
        }]
    };
});