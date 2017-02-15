import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Bookings } from '../bookings/bookings';
import { Voucher } from '../voucher/vouchers';
import moment from 'moment';

import AdminInternals from './server/adminInternals';

const adminInternals = new AdminInternals();

Meteor.methods({
    'admin.toggleBooking'(toggleBooking){
        return adminInternals.toggleBooking(toggleBooking);
    },
});