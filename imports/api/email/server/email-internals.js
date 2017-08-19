import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Bookings } from '../../bookings/bookings-collection';
import { Voucher } from '../../voucher/vouchers-collection';
import { Rooms } from '../../rooms/rooms-collection';
import { SSR } from 'meteor/meteorhacks:ssr';

import moment from 'moment';

export default class EmailInternals {
  constructor() {
    SSR.compileTemplate('userBookingConfirmation', Assets.getText('templates/bookingConfirmation.html'));
    SSR.compileTemplate('partnerBookingConfirmation', Assets.getText('templates/partnerBookingConfirmation.html'));
  }

  sendBookingConfirmation(booking, voucher, chargeData) {
    const successful = false;
    const currentUserId = Meteor.userId();
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
      price: chargeData.amount,
      emailContact: room.contactEmail,
    };

    Meteor.defer(() => {
      Email.send({
        to: user.profile.emailAddress,
        from: 'noreply.bookings@visioroom.co',
        subject: 'Booking confirmation',
        html: SSR.render('userBookingConfirmation', emailData),
      });
    });

    const partnerEmail = {
      to: room.contactEmail,
      bookingDate: booking.bookingDate,
      booker: emailData.name,
      roomName: room.name,

    };

    Meteor.defer(() => {
      Email.send({
        to: room.contactEmail,
        from: 'noreply.bookings@visioroom.co',
        subject: `Booking confirmation for ${room.name}`,
        html: SSR.render('partnerBookingConfirmation', partnerEmail),
      });
    });
  }
}
