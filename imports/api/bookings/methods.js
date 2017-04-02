import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Bookings } from './bookings';
import { Voucher } from '../voucher/vouchers';
import moment from 'moment';
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