import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Meteor.methods({
    'voucher.validate'(code, roomId) {
        if(!Meteor.userId()){
            throw new Meteor.Error('User should be authenticated');
        }


    }
});