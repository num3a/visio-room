import { Meteor } from 'meteor/meteor';
import { Profiles } from '../profile-collection.js';

Meteor.publish('profile.byConnectedUser', () => Profiles.findOne(Meteor.userId()));
