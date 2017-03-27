import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';
import { Rooms } from '../../rooms/rooms';

SSR.compileTemplate('htmlEmail', Assets.getText('templates/bookingConfirmation.html'));

Meteor.methods({
    'email.bookings.confirmatdion'(booking, voucher) {
        let successful = false;
        //let currentUserId = Meteor.userId();
        let currentUserId = this.userId;
        if(!currentUserId){
            throw new Meteor.Error('User is not authenticated');
        }

        let user = Meteor.user();
        let room = Rooms.findOne(booking.roomId);

        if(room == null){
            throw new Meteor.Error('Cannot find room.');
        }

        var emailData = {
            name: `${user.profile.firstName} ${user.profile.lastName}`,
            roomName: room.name,
            bookingDate: booking.bookingDate,
            bookingAddress: room.address
        };

        Email.send({
            to: user.profile.emailAddress,
            from: 'noreply@visioroom.co',
            subject: "Booking confirmation",
            html: SSR.render('htmlEmail', emailData),
        });

    }

});