import { Meteor } from 'meteor/meteor';
import Rooms from '../../api/rooms/rooms';
import Bookings from '../../bookings/bookings'

//TODO: initialize bookings

Meteor.startup(() =>{
    let roomsCount = Rooms.find({}).count();
//TODO: initialize bookings

});