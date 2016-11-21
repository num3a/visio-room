import { Meteor } from 'meteor/meteor';
import { Voucher } from '../vouchers.js';

Meteor.publish('voucher.byCode', (code) => {
    return Voucher.find({ isValid: true, code: code}, {});
});