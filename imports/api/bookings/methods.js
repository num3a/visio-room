import { Meteor } from 'meteor/meteor';
import BookingInternals from './server/bookingInternals';

const bookingInternals = new BookingInternals();

Meteor.methods({
  'bookings.bookWithPayment'(bookingWithPayment){
    return bookingInternals.bookWithPayment(bookingWithPayment);
  },
  'bookings.bookWithVoucher'(bookingWithVoucher) {
    return bookingInternals.bookWithVoucher(bookingWithVoucher);
  }
});