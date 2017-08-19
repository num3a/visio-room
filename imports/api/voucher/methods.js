import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Voucher } from './vouchers-collection';

Meteor.methods({
  'voucher.validate'(code) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('User is not authenticated');
    }

    const voucher = Voucher.findOne({ isValid: true, code }, {});
    if (voucher != null) {
      console.log(`Cannot find voucher:${code}`, code);
      return {
        isValid: true,
        code,
        percentage: voucher.percentage,
      };
    }

    return {
      isValid: false,
      code: null,
    };
  },
});
