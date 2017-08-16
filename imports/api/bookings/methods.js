import { Meteor } from 'meteor/meteor';
import BookingInternals from './server/bookings-internals';

const bookingInternals = new BookingInternals();

Meteor.methods({
  'bookings.bookWithPayment'(bookingWithPayment) {
    return bookingInternals.bookWithPayment(bookingWithPayment);
  },
});
