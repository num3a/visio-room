import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

Meteor.methods({
    'email.send'() {
        let htmlText = Assets.getText('templates/template.html').toString();
        Email.send({
            to: 'ernest.emmanuel@hotmail.fr',
            from: 'noreply@visioroom.co',
            subject: "Example Email",
            html: htmlText,
        });

    }
});