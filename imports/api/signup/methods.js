import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'signup.basic'(authData) {
        new SimpleSchema({
            email: { type: String, regEx: SimpleSchema.RegEx.Email },
            password: { type: String },
            firstName: { type: String },
            lastName: { type: String }
        }).validate(authData);

        return Accounts.createUser({
            email: authData.email,
            password: authData.password,
            profile: {
                firstName: authData.firstName,
                lastName: authData.lastName,
            }
        });
    }
});