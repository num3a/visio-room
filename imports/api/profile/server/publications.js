import { Meteor } from 'meteor/meteor';
import { Profiles } from '../profile.js';

Meteor.publish('profile.byConnectedUser', () => {
    if(this.userId){
        return Profiles.findOne(this.userId);
    }
    else {
        this.ready();
    }
});