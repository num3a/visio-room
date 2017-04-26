import { Meteor } from 'meteor/meteor';
import { Profiles } from '../profile.js';

Meteor.publish('profile.byConnectedUser', function () {
  return Profiles.findOne(this.userId);
});
