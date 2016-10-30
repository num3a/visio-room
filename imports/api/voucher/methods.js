import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Meteor.methods({
    'voucher.validate'(code) {
        //TODO: handle voucher usage
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