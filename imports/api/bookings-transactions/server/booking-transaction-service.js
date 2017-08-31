import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';
import { Bookings } from '../../bookings/bookings-collection';
import { Rooms } from '../../rooms/rooms-collection';
import { BookingsTransactions } from '../bookings-transactions-collection';

export default class BookingTransactionService {
  saveTransaction( bookings, voucher, chargeData) {
    const firstBooking = _.head(bookings);
    const roomId = firstBooking.roomId;
    const amount = chargeData.amount;

    let voucherId = _.isNil(voucher) ? '' : voucher._id;

    const transaction = {
      amount,
      voucherUsed: voucherId,
      roomId,
      bookings,
    };

    BookingsTransactions.insert(transaction);
    const test = '';
  }
}
