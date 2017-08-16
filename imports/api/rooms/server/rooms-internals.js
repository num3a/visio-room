import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import moment from 'moment';
import { Rooms } from '../rooms';

export default class PartnerInternals {

  createOrUpdate(room) {

    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');

    if (!isAdmin) {
      throw new Meteor.Error('User is not admin');
    }

    room.createdAt = moment.utc().toDate();

    const schema = Rooms.schema;
    schema.validate(room);

    if (room._id !== '' && room._id !== null && room._id !== undefined) {
      const updateRoomQuery = {
        ...room,
      };
      Rooms.update({ _id: room._id }, updateRoomQuery);
      return {
        id: room._id,
        success: true,
      };
    }

    const roomId = Rooms.insert(room);
    return {
      id: roomId,
      success: true,
    };
  }
}
