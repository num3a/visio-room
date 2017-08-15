import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import _ from 'lodash';
import { Bookings } from '../bookings';
import { Voucher } from '../../voucher/vouchers';
import EmailInternals from '../../email/server/email-internals';
import PaymentInternals from '../../payments/server/payment-internals';
// import BookingTransactionInternals from '../../bookings-transactions/bookings-transactions';
import { checkByUserId } from '../../common/user';

const stripeApiKey = Meteor.settings.STRIPE_API_KEY;

export default class BookingInternals {

  //
  getVoucher(code) {
    const voucher = Voucher.findOne({ isValid: true, code }, {});

    if (_.isNil(voucher)) {
      console.log(`Cannot find a valid voucher with code${code}`);
      return null;
    }
    return voucher;
  }

  // TODO: add booking service
  getBookings(bookingIds) {
    const bookings = Bookings.find({ _id: { $in:  bookingIds}, isBooked: false, isBlocked: false });

    // TODO: check data
    if (_.isNil(bookings)) {
      throw new Meteor.Error(`No bookings available for booking id: ${bookingId}`);
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

  invalidateVoucher(voucherId, currentUserId, bookingId) {
    const updateVoucherQuery = {
      $set: {
        isValid: false,
        usedAt: moment().toDate(),
        usedBy: currentUserId,
        usedFor: bookingId,
      },
    };

    Voucher.update({ _id: voucherId }, updateVoucherQuery, (error, result) => {
      if (error) {
        throw new Meteor.Error('An error occured when updating voucher');
      }
      console.log('result', result);
    });
  }

  updateBookingList(bookingList) {
    if(bookingList == null){
      throw new Meteor.Error('Booking list cannot be empty');
    }
  }

  updateBooking(bookingId, voucher) {
    const voucherId = _.isNil(voucher) ? null : voucher._id;
    const updateBookingQuery = {
      $set: {
        isBooked: true,
        bookedAt: moment().toDate(),
        bookedBy: Meteor.userId(),
        voucherUsed: voucherId,
        //TODO: add price payed
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

  saveTransaction() {
    // TODO: save transaction in booking-transaction collection
    // const bookingTransaction = new BookingTransactionInternals();
    // bookingTransaction.saveTransaction();
  }

  bookWithPayment(bookingWithPayment) {
    new SimpleSchema({
      bookingList: { type: Array, optional: true },
      'bookingList.$': { type: String, regEx: SimpleSchema.RegEx.Id },
      // bookingId: { type: A, regEx: SimpleSchema.RegEx.Id },
      userId: { type: String, regEx: SimpleSchema.RegEx.Id },
      voucher: { type: String, optional: true },
      customerId: { type: String },
      // TODO: add payment token infos to check tokens
    }).validate(bookingWithPayment);

    // TODO: refactor app with multiple bookings

    let successful = false;
    let internalError = null;
    let chargeResult = null;
    // TODO: check has not been booked


    // Check user validity
    checkByUserId(bookingWithPayment.userId);
    // this.checkUser(bookingWithPayment.userId);

    // Get the booking list ids
    const bookingIds = bookingWithPayment.bookingList
      .map((item) => item._id);
    const bookings = this.getBookings(bookingIds);

    // Get the voucher object
    const voucher = this.getVoucher(bookingWithPayment.voucher);

    //TODO: bypass voucher
    /*
    const amount = voucher === null ? booking.price :
      this.applyDiscount(booking.price, voucher.percentage);*/

    // Calculate discount on first booking of the list
    const amountToPay = bookings
      .map((booking) => booking.pricePerDay)
      .reduce((acc, price, index) => {
        if(index === 0){
          return acc + this.applyDiscount(price, voucher.percentage);
        }
        return acc + price;
      });

    const chargeData = {
      amount,
      currency: 'eur',
      description: 'Example charge',
      customerId: bookingWithPayment.customerId,
    };

    const paymentInstance = new PaymentInternals(stripeApiKey);

    //TODO: remove call method, use paymentsInternals directly
    Meteor.call('payments.createCharge', chargeData, (err, charge) => {
      if (err) {
        console.log('payments.charge.err', err);
        internalError = err;
        successful = false;
      } else {
        console.log('payments.charge.data', charge);
        chargeResult = charge;
        successful = true;

        //const bookingId = booking._id;
        const bookingIds = bookings.map((booking) => booking._id);

        this.saveTransaction(bookings, chargeData);

        bookingIds.forEach((item) => {
          this.updateBooking(bookingId, voucher);
        });

        if (voucher != null) {
          this.invalidateVoucher(voucher._id, bookingId);
        }

        //TODO: fix
        this.sendMailToUser(bookings[0], voucher, chargeData);
      }
    });

    return {
      successful,
      internalError,
      chargeResult,
    };
  }
}
