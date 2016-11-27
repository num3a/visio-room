import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

Meteor.methods({
    'email.send'() {
        Email.send({
            to: 'ernest.emmanuel@hotmail.fr',
            from: 'noreply@visioroom.co',
            subject: "Example Email",
            html: "<p><strong>This will render as bold text</strong>, but this will not.</p>",
        });

    }
});