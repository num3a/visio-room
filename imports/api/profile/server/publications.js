import { Meteor } from 'meteor/meteor';
import { Profiles } from '../profile.js';

Meteor.publish('profile.byConnectedUser', () => {
        return Profiles.findOne(this.userId);
});