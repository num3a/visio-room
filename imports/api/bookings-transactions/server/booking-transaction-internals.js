import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';
import { Bookings } from '../../bookings/bookings-collection';
import { Rooms } from '../../rooms/rooms-collection';

export default class BookingTransactionInternals {
  saveTransaction( bookings, voucher, chargeData) {
    return null;
  }
}
