import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Voucher } from './vouchers';

Meteor.methods({
    'voucher.validate'(code) {
        if(!Meteor.userId()){
            throw new Meteor.Error('User is not authenticated');
        }

        let voucher = Voucher.findOne({ isValid: true, code: code}, {});
        if(voucher != null){
            console.log('Cannot find voucher:' + code, code);
            return {
                isValid: true,
                code: code,
            };
        }

        return {
            isValid: false,
            code: null
        };
    }
});