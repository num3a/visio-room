import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';

import { Bookings } from '../../bookings/bookings-collection';
import { Voucher } from '../../voucher/vouchers-collection';
import { Rooms } from '../../rooms/rooms-collection';
import { SSR } from 'meteor/meteorhacks:ssr';

import moment from 'moment';

export default class EmailService {
  constructor() {
    SSR.compileTemplate('userBookingConfirmation', Assets.getText('templates/bookingConfirmation.html'));
    SSR.compileTemplate('partnerBookingConfirmation', Assets.getText('templates/partnerBookingConfirmation.html'));
  }

  sendBookingConfirmation(bookings, voucher, chargeData) {
    const booking = _.head(bookings);
    const successful = false;
    const currentUserId = Meteor.userId();
    if (!currentUserId) {
      throw new Meteor.Error('User is not authenticated');
    }

    const user = Meteor.user();
    const firstBooking = _.head(bookings);
    const room = Rooms.findOne(firstBooking.roomId);

    if (room == null) {
      throw new Meteor.Error('Cannot find room.');
    }

    const bookingDates = bookings.map(boo => boo.bookingDate);

    const emailData = {
      name: `${user.profile.firstName} ${user.profile.lastName}`,
      roomName: room.name,
      bookingDate: booking.bookingDate,
      bookingDates: bookingDates,
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
