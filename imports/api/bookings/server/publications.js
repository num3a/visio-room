import { Meteor } from 'meteor/meteor';
import { Bookings } from '../bookings.js';

Meteor.publish('Bookings.all', () => {
    return Bookings.find({}).fetch();
});