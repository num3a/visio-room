import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Bookings } from '../bookings/bookings-collection';
import { Voucher } from '../voucher/vouchers-collection';
import moment from 'moment';

import AdminInternals from './server/admin-internals';

const adminInternals = new AdminInternals();

Meteor.methods({
  'admin.toggleBooking'(toggleBooking) {
    return adminInternals.toggleBooking(toggleBooking);
  },
});
