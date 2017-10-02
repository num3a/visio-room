/* @flow */
import { Meteor } from 'meteor/meteor';
// import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import _ from 'lodash';

import { Bookings } from '../bookings-collection';
import EmailInternals from '../../email/server/email-service';
import PaymentInternals from '../../payments/server/payment-service';
import VoucherInternals from '../../voucher/server/voucher-internals';
import BookingTransactionInternals from '../../bookings-transactions/server/booking-transaction-service';
import { checkByUserId } from '../../../common/userUtils';

const STRIPE_API_KEY = Meteor.settings.STRIPE_API_KEY || 'sk_test_XpBlmXOXgKrcpz0MBUVM4E13';

type VoucherType = {
  _id: string,
  isValid: boolean,
  code: string,
  percentage: number,
  createdAt: Date,
  usedAt: Date,
  usedBy: ?string,
  usedFor: ?string
}

type BookingsType = {
  _id: string,
  roomId: string,
  bookedBy: ?string,
  voucherUsed: ?string,
  isBooked: boolean,
  isBlocked: boolean,
  bookingDate: ?Date,
  bookedAt: ?Date,
  attendeeCount:?number,
  createdAt:Date,
  price: number,
  capacity:number,
  room: ?Object
};

type BookingsWithPayment = {
  bookingIds: Array<string>,
  userId: string,
  voucher: ?string,
  customerId: string
};

export default class BookingService {

  getVoucher(code: string): ?VoucherType {
    const voucherInternals = new VoucherInternals();
    const voucher = voucherInternals.getVoucherByCode(code);

    if (_.isNil(voucher)) {
      console.log(`Cannot find a valid voucher with code${code}`);
      return null;
    }
    return voucher;
  }

  invalidateVoucher(voucher: ?VoucherType, userId: string, bookingIds: Array<string>) {
    if (voucher) {
      const voucherInternals = new VoucherInternals();
      voucherInternals.invalidateVoucher(voucher._id, userId, bookingIds);
    }
  }

  getBookings(bookingIds: Array<string>) {
    const bookings =
      Bookings.find(
        {
          _id: { $in: bookingIds },
          isBooked: false,
          isBlocked: false,
        }).fetch();

    if (_.isNil(bookings)) {
      throw new Meteor.Error(`No bookings available for booking id: ${bookings.map(booking => booking._id).join('/')}`);
    }

    return bookings;
  }

  applyDiscount(price: number, percentage: number): number {
    if (_.isNil(percentage)) {
      return price;
    }

    if (percentage > 51) {
      return price;
    }
    if (isNaN(percentage)) {
      return price;
    }

    const discountRatio = percentage / 100;
    return price * discountRatio;
  }

  updateBookingList(bookings: Array<Object>, voucher: ?VoucherType) {
    if (bookings == null) {
      throw new Meteor.Error('Booking list cannot be empty');
    }

    bookings.forEach((booking, index) => {
      if (index === 0) {
        this.updateBooking(booking._id, voucher);
      } else {
        this.updateBooking(booking._id, null);
      }
    });
  }

  updateBooking(bookingId: string, voucher: ?VoucherType): void {
    let voucherId = null;
    if (voucher) {
      voucherId = voucher._id;
    }

    const updateBookingQuery = {
      $set: {
        isBooked: true,
        bookedAt: moment().toDate(),
        bookedBy: Meteor.userId(),
        voucherUsed: voucherId,
      },
    };

    Bookings.update({ _id: bookingId }, updateBookingQuery, (error, result) => {
      if (error) {
        throw new Meteor.Error('An error occured when updating booking.json');
      }
      console.log('result', result);
    });
  }

  sendMailToUser(bookings: Array<Object>, voucher: ?VoucherType, chargeData: Object) {
    const emailSender = new EmailInternals();
    emailSender.sendBookingConfirmation(bookings, voucher, chargeData);
  }

  saveTransaction(bookings: Array<Object>, chargeData: Object, voucher: ?VoucherType) {
    const bookingTransaction = new BookingTransactionInternals();
    const currentUserId = Meteor.userId();
    bookingTransaction.saveTransaction(bookings, voucher, chargeData, currentUserId);
  }

 /* validateInputs(bookingWithPayment) {
    new SimpleSchema({
      bookingIds: { type: Array, optional: false },
      'bookingIds.$': { type: String, regEx: SimpleSchema.RegEx.Id },
      userId: { type: String, regEx: SimpleSchema.RegEx.Id },
      voucher: { type: String, optional: true },
      customerId: { type: String },
      // TODO: add payment token infos to check tokens
    }).validate(bookingWithPayment);
  }
*/

  calculatePrice(bookings: Array<Object>, voucher: ?VoucherType): number {
    const amount = bookings
      .map(booking => booking.price)
      .reduce((acc, price, index) => {
        if (index === 0) {
          if (voucher) {
            return acc + this.applyDiscount(price, voucher.percentage);
          }

          return acc + price;
        }
        return acc + price;
      });
    return amount.toFixed(2);
  }

  checkBookingsAvailability(bookings: Array<BookingsType>) {
    return bookings
      .every(booking =>
        booking.isBooked === false
        && booking.isBlocked === false);
  }

  bookWithPayment(bookingWithPayment: BookingsWithPayment) {
    // this.validateInputs(bookingWithPayment); // Validate inputs
    checkByUserId(bookingWithPayment.userId); // Check user
    const bookingIds = bookingWithPayment.bookingIds; // Extract booking ids
    const bookings = this.getBookings(bookingIds); // Get related bookings

    if (!this.checkBookingsAvailability(bookings)) {
      throw new Meteor.Error('One or more booking(s) are not valid.');
    }

    // Get the voucher object
    let voucher = null;
    if (bookingWithPayment.voucher) {
      voucher = this.getVoucher(bookingWithPayment.voucher);
    }
   // const voucher = _.isNil(bookingWithPayment.voucher) ?
    //  null : this.getVoucher(bookingWithPayment.voucher);
    const price = this.calculatePrice(bookings, voucher);

    const chargeData = {
      amount: parseFloat(price),
      currency: 'eur',
      description: 'Example charge',
      customerId: bookingWithPayment.customerId,
    };

    const paymentService = new PaymentInternals(STRIPE_API_KEY);
    const chargeResult = paymentService.createCharge(chargeData);

    if (_.isNil(chargeResult)) {
      throw new Meteor.Error('An error occured during payment.');
    }

    this.invalidateVoucher(voucher, bookingWithPayment.userId, bookingIds);
    this.updateBookingList(bookings, voucher);
    this.saveTransaction(bookings, chargeData, voucher);
    this.sendMailToUser(bookings, voucher, chargeData);

    return chargeResult;
  }

}
