import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Bookings } from '../../bookings/bookings-collection';
import { Rooms } from '../../rooms/rooms-collection';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

export default class AdminInternals {
  constructor() {

  }

  toggleBooking(toggleBooking) {
    new SimpleSchema({
      bookingId: { type: String, regEx: SimpleSchema.RegEx.Id },
      isBlocked: { type: Boolean },
    }).validate(toggleBooking);

    let successful = false;

    this.checkUser();

    const booking = this.getBooking(toggleBooking.bookingId);
    const room = this.getRoom(booking.roomId);
    const { emailAddress } = Meteor.user().profile;

    const admin = room.administrators.indexOf(emailAddress);

    if (admin === -1) {
      throw new Meteor.Error('Current user is not admin of the selected room');
    }
    if (booking.isBooked) {
      throw new Meteor.Error('Rooms has already been booked');
    }

    this.updateBooking(toggleBooking.bookingId, toggleBooking.isBlocked);

    successful = true;
    return {
      successful,
      blocked: toggleBooking.isBlocked,
    };
  }

  checkUser() {
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
    if (isAdmin === false) {
      throw new Meteor.Error('User is not admin');
    }

    if (!Meteor.userId()) {
      throw new Meteor.Error('User is not authenticated');
    }
  }

  getRoom(roomId) {
    const room = Rooms.findOne({ _id: roomId });
    // TODO: check data
    if (room == null) {
      throw new Meteor.Error(`No bookings available for booking.json id: ${roomId}`);
    }

    return room;
  }

  getBooking(bookingId) {
    const booking = Bookings.findOne({ _id: bookingId });
    // TODO: check data
    if (booking == null) {
      throw new Meteor.Error(`No bookings available for booking.json id: ${bookingId}`);
    }

    return booking;
  }

  updateBooking(bookingId, isBlocked) {
    const updateBookingQuery = {
      $set: {
        isBlocked,
      },
    };

    Bookings.update({ _id: bookingId }, updateBookingQuery, (error, result) => {
      if (error) {
        throw new Meteor.Error('An error occured when updating booking.json');
      }
      console.log('result', result);
    });
  }

}
