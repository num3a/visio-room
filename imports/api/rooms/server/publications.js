import { Meteor } from 'meteor/meteor';
import { Rooms } from '../rooms.js';

Meteor.publish('rooms.all', () => {
    return Rooms.find({});
});