import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';
import EmailInternals from './server/email-internals';

SSR.compileTemplate('htmlEmail', Assets.getText('templates/template.html'));
const emailInternals = new EmailInternals();

Meteor.methods({
  'email.send'() {
    Email.send({
      to: 'ernest.emmanuel@hotmail.fr',
      from: 'noreply@visioroom.co',
      subject: 'Example Email',
      html: SSR.render('htmlEmail'),
    });
  },
  'email.bookings.confirmation'(booking, voucher) {
    return emailInternals.sendBookingConfirmation(booking, voucher);
  },

});
