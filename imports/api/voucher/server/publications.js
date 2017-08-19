import { Meteor } from 'meteor/meteor';
import { Voucher } from '../vouchers-collection';

Meteor.publish('voucher.byCode', code => Voucher.find({ isValid: true, code }, {}));
