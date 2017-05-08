import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

import { Bookings } from '../bookings';
import { Voucher } from '../../voucher/vouchers';
import EmailInternals from '../../email/server/emailInternals';

export default class BookingInternals {
  constructor() {

  }

  checkUser(userId) {
    const currentUserId = Meteor.userId();
    if (!currentUserId) {
      throw new Meteor.Error('User is not authenticated');
    }

    if (userId !== currentUserId) {
      throw new Meteor.Error('Connected user does not match sended data.');
    }
  }

  getVoucher(code) {
    const voucher = Voucher.findOne({ isValid: true, code }, {});

    if (voucher == null) {
      console.log(`Cannot find a valid voucher with code${code}`);
      return null;
    }
    return voucher;
  }

  getBooking(bookingId) {
    const booking = Bookings.findOne({ _id: bookingId, isBooked: false, isBlocked: false });
    // TODO: check data
    if (booking == null) {
      throw new Meteor.Error(`No bookings available for booking id: ${bookingId}`);
    }

    return booking;
  }

  applyDiscount(price, percentage) {
    if (percentage == null) {
      return price;
    }

    if (percentage > 51) {
      return price;
    }
    if (isNaN(percentage)) {
      return price;
    }

    return price * percentage / 100;
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

  updateBooking(bookingId, voucher) {
    const voucherId = voucher == null ? null : voucher._id;
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
    const emailSender = new EmailInternals();
    emailSender.sendBookingConfirmation(booking, voucher, chargeData);
  }

  bookWithVoucher(bookWithVoucher) {
    const successful = false;
    let sent = false;

    const currentUserId = Meteor.userId();
    if (!currentUserId) {
      throw new Meteor.Error('User is not authenticated');
    }

    new SimpleSchema({
      bookingId: { type: String, regEx: SimpleSchema.RegEx.Id },
      userId: { type: String, regEx: SimpleSchema.RegEx.Id },
      code: { type: String },
    }).validate(bookWithVoucher);

    if (bookWithVoucher.userId !== currentUserId) {
      throw new Meteor.Error('Connected user does not match sended data.');
    }

    const voucher = Voucher.findOne({ isValid: true, code: bookWithVoucher.code }, {});

    if (voucher == null) {
      throw new Meteor.Error(`Cannot find a valid voucher with code${bookWithVoucher.code}`);
    }

    const booking = Bookings.findOne({ _id: bookWithVoucher.bookingId, isBooked: false, isBlocked: false });
    // TODO: check data
    if (booking == null) {
      throw new Meteor.Error(`No bookings available for booking id: ${bookWithVoucher.bookingId}`);
    }
    // doc ? Collection.update({_id: doc._id}, {$set: {field: value}})  : Collection.insert({owner: Meteor.userId(), field: value});
    const updateBookingQuery = {
      $set: {
        isBooked: true,
        bookedAt: moment().toDate(),
        bookedBy: currentUserId,
        voucherUsed: voucher._id,
      },
    };

    const updateVoucherQuery = {
      $set: {
        isValid: false,
        usedAt: moment().toDate(),
        usedBy: currentUserId,
        usedFor: bookWithVoucher.bookingId,
      },
    };


    Bookings.update({ _id: booking._id }, updateBookingQuery, (error, result) => {
      if (error) {
        throw new Meteor.Error('An error occured when updating booking.json');
      }
      console.log('result', result);
    });
    Voucher.update({ _id: voucher._id }, updateVoucherQuery, (error, result) => {
      if (error) {
        throw new Meteor.Error('An error occured when updating voucher');
      }
      console.log('result', result);
    });

    Meteor.call('email.bookings.confirmation', booking, voucher, (error, result) => {
      if (!error) {
        sent = true;
      }
    });

    return {
      success: successful,
      mailSent: sent,
    };
  }

  bookWithPayment(bookingWithPayment) {
    let successful = false;
    let internalError = null;
    let chargeResult = null;
    // TODO: check has not been booked

    new SimpleSchema({
      bookingId: { type: String, regEx: SimpleSchema.RegEx.Id },
      userId: { type: String, regEx: SimpleSchema.RegEx.Id },
      voucher: { type: String, optional: true },
      customerId: { type: String },
      // TODO: add payment token infos to check tokens
    }).validate(bookingWithPayment);

    this.checkUser(bookingWithPayment.userId);

    const booking = this.getBooking(bookingWithPayment.bookingId);
    const voucher = this.getVoucher(bookingWithPayment.voucher);

    const amount = voucher === null ? booking.price :
      this.applyDiscount(booking.price, voucher.percentage);


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

        const bookingId = booking._id;
        this.updateBooking(bookingId, voucher);
        if (voucher != null) {
          this.invalidateVoucher(voucher._id, bookingId);
        }

        this.sendMailToUser(booking, voucher, chargeData);
      }
    });

    return {
      successful,
      internalError,
      chargeResult,
    };
  }
}
