import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';

SSR.compileTemplate('htmlEmail', Assets.getText('templates/template.html'));

Meteor.methods({
    'email.send'() {
        Email.send({
            to: 'ernest.emmanuel@hotmail.fr',
            from: 'noreply@visioroom.co',
            subject: "Example Email",
            html: SSR.render('htmlEmail'),
        });

    }
});