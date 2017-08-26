import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import _ from 'lodash';

import { Bookings } from '../bookings-collection';
import EmailInternals from '../../email/server/email-internals';
import PaymentInternals from '../../payments/server/payment-service';
import VoucherInternals from '../../voucher/server/voucher-internals';
import BookingTransactionInternals from '../../bookings-transactions/server/booking-transaction-internals';
import { checkByUserId } from '../../../common/userUtils';

const stripeApiKey = Meteor.settings.STRIPE_API_KEY;

export default class BookingService {

  getVoucher(code: string) {
    const voucherInternals = new VoucherInternals();
    const voucher = voucherInternals.getVoucherByCode(code);

    if (_.isNil(voucher)) {
      console.log(`Cannot find a valid voucher with code${code}`);
      return null;
    }
    return voucher;
  }

  invalidateVoucher(voucher, userId, bookingIds) {
    if (voucher != null) {
      const voucherInternals = new VoucherInternals();
      voucherInternals.invalidateVoucher(voucher.id, userId, bookingIds);
    }
  }

  getBookings(bookingIds) {
    const bookings = Bookings.find({ _id: { $in: bookingIds }, isBooked: false, isBlocked: false }).fetch();

    if (_.isNil(bookings)) {
      throw new Meteor.Error(`No bookings available for booking id: ${bookings.map(booking => booking._id).join('/')}`);
    }

    return bookings;
  }

  applyDiscount(price, percentage) {
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

  updateBookingList(bookings, voucher) {
    if (bookings == null) {
      throw new Meteor.Error('Booking list cannot be empty');
    }

    bookings.forEach((booking, index) => {
      if (index === 0) {
        this.updateBooking(booking, voucher);
      } else {
        this.updateBooking(booking, null);
      }
    });
  }

  updateBooking(bookingId, voucher) {
    const voucherId = _.isNil(voucher) ? null : voucher._id;
    const updateBookingQuery = {
      $set: {
        isBooked: true,
        bookedAt: moment().toDate(),
        bookedBy: Meteor.userId(),
        voucherUsed: voucherId,
        // TODO: add price payed
      },
    };

    Bookings.update({ _id: bookingId }, updateBookingQuery, (error, result) => {
      if (error) {
        throw new Meteor.Error('An error occured when updating booking.json');
      }
      console.log('result', result);
    });
  }

  sendMailToUser(booking, voucher, chargeData) {
    // TODO: send booking list
    const emailSender = new EmailInternals();
    emailSender.sendBookingConfirmation(booking, voucher, chargeData);
  }

  saveTransaction(bookings, voucher, chargeData) {
    // TODO: save transaction in booking-transaction collection
    const bookingTransaction = new BookingTransactionInternals();
    bookingTransaction.saveTransaction(bookings, voucher, chargeData);
  }

  validateInputs(bookingWithPayment) {
    new SimpleSchema({
      bookingIds: { type: Array, optional: false },
      'bookingIds.$': { type: String, regEx: SimpleSchema.RegEx.Id },
      userId: { type: String, regEx: SimpleSchema.RegEx.Id },
      voucher: { type: String, optional: true },
      customerId: { type: String },
      // TODO: add payment token infos to check tokens
    }).validate(bookingWithPayment);
  }

  calculatePrice(bookings, voucher) {
    const amount = bookings
      .map(booking => booking.price)
      .reduce((acc, price, index) => {
        if (index === 0) {
          return acc + this.applyDiscount(price, voucher.percentage);
        }
        return acc + price;
      });
    return amount;
  }

  checkBookingsAvailability(bookings) {
    const validity = bookings.every((booking => booking.isBooked === false && booking.isBlocked === false));
    return validity;
  }

  bookWithPayment(bookingWithPayment) {
    let successful = false;
    let internalError = null;
    let chargeResult = null;

    this.validateInputs(bookingWithPayment); // Validate inputs
    checkByUserId(bookingWithPayment.userId); // Check user
    const bookingIds = bookingWithPayment.bookingIds; // Extract booking ids
    const bookings = this.getBookings(bookingIds); // Get related bookings

    if (!this.checkBookingsAvailability(bookings)) {
      throw new Meteor.Error('One or more booking(s) are not valid.');
    }

    // Get the voucher object
    const voucher = bookingWithPayment.voucher != null ?  this.getVoucher(bookingWithPayment.voucher) : null;
    const amount = this.calculatePrice(bookings, voucher);

    const chargeData = {
      amount,
      currency: 'eur',
      description: 'Example charge',
      customerId: bookingWithPayment.customerId,
    };

    Meteor.call('payments.createCharge', chargeData, (err, charge) => {
      if (err) {
        console.log('payments.charge.err', err);
        internalError = err;
        successful = false;
      } else {
        console.log('payments.charge.data', charge);
        chargeResult = charge;
        successful = true;

        // TODO: ensure that updateBookingList and invalidate voucher works
       // this.saveTransaction(bookings, chargeData);
        this.updateBookingList(bookings, voucher);
        this.invalidateVoucher(voucher.id, bookingWithPayment.userId, bookingIds);
        // this.sendMailToUser(bookings[0], voucher, chargeData);
      }
    });

    return {
      successful,
      internalError,
      chargeResult,
    };
  }

}
