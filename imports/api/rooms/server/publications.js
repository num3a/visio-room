import { Meteor } from 'meteor/meteor';
import { Rooms } from '../rooms.js';

Meteor.publish('Rooms.all', () => {
    return Rooms.find({}).fetch();
});