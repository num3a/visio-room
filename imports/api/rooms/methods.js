import { Meteor } from 'meteor/meteor';
import RoomInternals from './server/rooms-internals';

const roomInternals = new RoomInternals();

Meteor.methods({
  'rooms.createOrUpdate'(room) {
    return roomInternals.createOrUpdate(room);
  },
});
