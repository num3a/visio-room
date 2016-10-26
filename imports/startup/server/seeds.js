import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../api/rooms/rooms';

//TODO: initialize bookings

Meteor.startup(() =>{
    let roomsCount = Rooms.find({}).count();
    if(roomsCount === 0){
//TODO: initialize bookings
        Rooms.insert({
            pricePerDay: 10,
            name: 'test',
            address: 'lool',
            capacity: 10,
            description: 'lool'
        });
    }

});