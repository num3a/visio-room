import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';
import { Rooms } from '../rooms/rooms-collection';

SSR.compileTemplate('htmlEmail', Assets.getText('templates/bookingConfirmation.html'));
/*
* @obsolete
* *
* */

Meteor.methods({
  'email.bookings.confirmatdion'(booking, voucher) {
    const successful = false;
        // let currentUserId = Meteor.userId();
    const currentUserId = this.userId;
    if (!currentUserId) {
      throw new Meteor.Error('User is not authenticated');
    }

    const user = Meteor.user();
    const room = Rooms.findOne(booking.roomId);

    if (room == null) {
      throw new Meteor.Error('Cannot find room.');
    }

    const emailData = {
      name: `${user.profile.firstName} ${user.profile.lastName}`,
      roomName: room.name,
      bookingDate: booking.bookingDate,
      bookingAddress: room.address,
    };

    Email.send({
      to: user.profile.emailAddress,
      from: 'noreply@visioroom.co',
      subject: 'Booking confirmation',
      html: SSR.render('htmlEmail', emailData),
    });
  },

});
