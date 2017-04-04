import { Meteor } from 'meteor/meteor';
import RoomInternals from './server/roomInternals';

const roomInternals = new RoomInternals();

Meteor.methods({
    'rooms.createOrUpdate'(room){
        return roomInternals.createOrUpdate(room);
    },
});