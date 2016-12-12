import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Bookings } from './bookings';
import { Voucher } from '../voucher/vouchers';
import moment from 'moment';

Meteor.methods({
    'bookings.bookWithVoucher'(bookWithVoucher) {
        let successful = false;
        let sent = false;

        let currentUserId = Meteor.userId();
        if(!currentUserId){
            throw new Meteor.Error('User is not authenticated');
        }

        new SimpleSchema({
            bookingId: { type: String, regEx: SimpleSchema.RegEx.Id },
            userId: { type: String, regEx: SimpleSchema.RegEx.Id },
            code: { type: String },
        }).validate(bookWithVoucher);

        if(bookWithVoucher.userId !== currentUserId){
            throw new Meteor.Error('Connected user does not match sended data.');
        }

        let voucher = Voucher.findOne({ isValid: true, code: bookWithVoucher.code}, {});

        if(voucher == null){
            throw new Meteor.Error('Cannot find a valid voucher with code' + bookWithVoucher.code);
        }

        let booking = Bookings.findOne({ _id: bookWithVoucher.bookingId, isBooked: false, isBlocked: false});
        //TODO: check data
        if(booking == null){
            throw new Meteor.Error('No bookings available for booking id: ' + bookWithVoucher.bookingId);
        }
        //doc ? Collection.update({_id: doc._id}, {$set: {field: value}})  : Collection.insert({owner: Meteor.userId(), field: value});
        let updateBookingQuery = {
            $set: {
                isBooked: true,
                bookedAt: moment().toDate(),
                bookedBy: currentUserId,
                voucherUsed: voucher._id,
            }
        };

        let updateVoucherQuery = {
            $set: {
                isValid: false,
                usedAt: moment().toDate(),
                usedBy: currentUserId,
                usedFor: bookWithVoucher.bookingId
            }
        };
        
        
        Bookings.update({_id: booking._id}, updateBookingQuery, (error, result) => {
            if(error){
                throw new Meteor.Error('An error occured when updating booking');
            }
            console.log('result', result);
        });
        Voucher.update({_id: voucher._id}, updateVoucherQuery, (error, result) => {
            if(error){
                throw new Meteor.Error('An error occured when updating voucher');
            }
            console.log('result', result);

        });

        Meteor.call('email.bookings.confirmation', booking, voucher, (error, result)=> {
            if(!error){
                sent = true;
            }
        });

        return {
            success: successful,
            mailSent: sent,
        };
    }
});