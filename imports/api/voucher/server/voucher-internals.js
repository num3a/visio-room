import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import _ from 'lodash';
import { Voucher } from '../vouchers-collection';
import { checkByUserId } from '../../../common/userUtils';

export default class VoucherInternals {
  getVoucherByCode(code) {
    new SimpleSchema({
      code: { type: String },
    }).validate({ code });

    return Voucher.findOne({ isValid: true, code }, {});
  }

  invalidateVoucher(voucherId, currentUserId, bookingIds) {
    const updateVoucherQuery = {
      $set: {
        isValid: false,
        usedAt: moment().toDate(),
        usedBy: currentUserId,
        usedFor: bookingIds,
      },
    };

    Voucher.update({ _id: voucherId }, updateVoucherQuery, (error, result) => {
      if (error) {
        throw new Meteor.Error('An error occured when updating voucher');
      }
    });
  }
}
