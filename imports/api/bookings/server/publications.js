import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

import { Bookings } from '../bookings-collection.js';
import { surroundingDates, toDayBegin, toDayEnd } from '../../../common/utils/dateUtils';
import { getAvailableRoomsIds } from './bookings-search';
import { Rooms } from '../../rooms/rooms-collection';

Meteor.publish('bookings.all', () => Bookings.find({}));

Meteor.publish('bookings.byRoom', (search) => {
  new SimpleSchema({
    roomId: { type: String, regEx: SimpleSchema.RegEx.Id },
    minDate: { type: Date },
    maxDate: { type: Date },
  }).validate(search);

  const { roomId } = search;
  let { minDate, maxDate } = search;

  if (maxDate === null || maxDate === undefined ||
    (moment(minDate).format('DD-MM-YYYY') === moment(maxDate).format('DD-MM-YYYY'))
    || (moment(maxDate).isBefore(minDate))) {
    const surround = surroundingDates(minDate);
    minDate = surround.minDate;
    maxDate = surround.maxDate;
  } else {
    maxDate = toDayEnd(maxDate);
  }
  const query = {
    roomId,
    bookingDate: {
      $gt: minDate,
      $lt: maxDate,
    },
  };

  return Bookings.find(query);
});

Meteor.publish('bookings.byUserId', () => {
  const query = {
    bookedBy: Meteor.userId(),
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


// OBSOLETE => bookings.search
Meteor.publish('bookings.search', (search) => {
  new SimpleSchema({
    bookingDate: { type: Date },
    capacity: { type: Number },
  }).validate(search);

  const surround = surroundingDates(search.bookingDate);
  const query = {
    bookingDate: { $gt: surround.minDate, $lt: surround.maxDate },
    isBlocked: false,
    isBooked: false,
    capacity: { $gt: search.capacity - 1 },
  };

  return Bookings.find(query);
});

Meteor.publish('bookings.searchWithDates', (search) => {
  new SimpleSchema({
    startDate: { type: Date },
    endDate: { type: Date, optional: true },
    capacity: { type: Number },
  }).validate(search);

  let bookingDate = {};

  if (search.endDate === null || search.endDate === undefined ||
    (moment(search.startDate).format('DD-MM-YYYY') === moment(search.endDate).format('DD-MM-YYYY'))) {
    const surround = surroundingDates(search.startDate);
    bookingDate = { $gt: surround.minDate, $lt: surround.maxDate };
  } else {
    bookingDate = {
      $gt: search.bookingDateBegin,
      $lt: search.bookingDateEnd,
    };
  }

  const query = {
    bookingDate,
    isBlocked: false,
    isBooked: false,
    capacity: { $gt: search.capacity - 1 },
  };

  return Bookings.find(query);
});


Meteor.publish('bookings.availableRoomIds', (search) => {
  new SimpleSchema({
    startDate: { type: Date },
    endDate: { type: Date, optional: true },
    capacity: { type: Number },
  }).validate(search);
  // TODO: test that the correct list of room is returned

  if (search.endDate === null || search.endDate === undefined ||
    (moment(search.startDate).format('DD-MM-YYYY') === moment(search.endDate).format('DD-MM-YYYY'))
    || (moment(search.endDate).isBefore(search.startDate))) {
    const surround = surroundingDates(search.startDate);
    search.startDate = surround.minDate;
    search.endDate = surround.maxDate;
  }

  const ids = getAvailableRoomsIds(search.startDate, search.endDate, search.capacity);

  return Rooms.find({ _id: { $in: ids } });
});
