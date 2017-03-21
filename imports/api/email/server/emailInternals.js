import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Bookings } from '../../bookings/bookings';
import { Voucher } from '../../voucher/vouchers';
import { Rooms } from '../../rooms/rooms';
import { SSR } from 'meteor/meteorhacks:ssr';

import moment from 'moment';

export default class EmailInternals {
    constructor() {
        SSR.compileTemplate('userBookingConfirmation', Assets.getText('templates/bookingConfirmation.html'));
        SSR.compileTemplate('partnerBookingConfirmation', Assets.getText('templates/partnerBookingConfirmation.html'))
    }

    sendBookingConfirmation(booking, voucher, chargeData){
        let successful = false;
        let currentUserId = Meteor.userId();
        if(!currentUserId){
            throw new Meteor.Error('User is not authenticated');
        }

        let user = Meteor.user();
        let room = Rooms.findOne(booking.roomId);

        if(room == null){
            throw new Meteor.Error('Cannot find room.');
        }

        let emailData = {
            name: `${user.profile.firstName} ${user.profile.lastName}`,
            roomName: room.name,
            bookingDate: booking.bookingDate,
            bookingAddress: room.address,
            price: chargeData.amount,
            emailContact: room.contactEmail
        };

        Meteor.defer(() => {
            Email.send({
                to: user.profile.emailAddress,
                from: 'noreply.bookings@visioroom.co',
                subject: 'Booking confirmation',
                html: SSR.render('userBookingConfirmation', emailData),
            });
        });

        let partnerEmail = {
            to: room.contactEmail,
            bookingDate: booking.bookingDate,
            booker: emailData.name,
            roomName: room.name,

        };

        Meteor.defer(() => {
            Email.send({
                to: room.contactEmail,
                from: 'noreply.bookings@visioroom.co',
                subject: 'Booking confirmation for ' + room.name,
                html: SSR.render('partnerBookingConfirmation', partnerEmail),
            });
        });
    }
}