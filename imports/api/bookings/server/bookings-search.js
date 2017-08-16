import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import { Bookings } from '../bookings';
import _ from 'lodash';
import { surroundingDates, toDayBegin, toDayEnd } from '../../../common/utils/dateUtils';

const getAvailableRoomsIds = (startDate, endDate, capacity) => {
  new SimpleSchema({
    startDate: { type: Date },
    endDate: { type: Date },
  }).validate({ startDate, endDate });

  const from = moment(startDate);
  const to = moment(endDate);

  const days = to.diff(from, 'days');

  const distinctRoomIds = [];

  const dateQuery = {
    isBooked: false,
    isBlocked: false,
    capacity: { $gt: capacity - 1 },
    bookingDate: { $gt: from.toDate(), $lt: to.toDate() },
  };
  const bookings = Bookings.find(dateQuery, { disableOplog: true }).fetch();

  // get all roomIds
  bookings.forEach((booking) => {
    if (distinctRoomIds.indexOf(booking.roomId) === -1) {
      distinctRoomIds.push(booking.roomId);
    }
  });

  const roomIds = [];

  distinctRoomIds.forEach((id) => {
    const bookingDays = bookings.filter(item => item.roomId === id).length;

    if (bookingDays === days) {
      roomIds.push(id);
    }
  });

  return roomIds;
};

export {
  getAvailableRoomsIds,
};
