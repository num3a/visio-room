import { Meteor } from 'meteor/meteor';
import BookingInternals from './server/bookings-service';

const bookingInternals = new BookingInternals();

Meteor.methods({
  'bookings.bookWithPayment'(bookingWithPayment) {
    return bookingInternals.bookWithPayment(bookingWithPayment);
  },
});
