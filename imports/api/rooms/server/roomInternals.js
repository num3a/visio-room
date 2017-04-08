import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Rooms } from '../rooms';
import { Roles } from 'meteor/alanning:roles';
import moment from 'moment';

export default class PartnerInternals {
    constructor(){

    }

    createOrUpdate(room) {
        let isAdmin = Roles.userIsInRole(Meteor.userId(),'admin');

        if(!isAdmin){
            throw new Meteor.Error('User is not admin');
        }

        room.createdAt = moment.utc().toDate();

        let schema = Rooms.schema;
        schema.validate(room);

        if(room._id !== '' && room._id !== null && room._id !== undefined){
            let updateRoomQuery = {
                ...room,
            };
            Rooms.update({ _id: room._id}, updateRoomQuery);
            return {
                id: room._id,
                success: true
            };
        }
        else {
            let roomId = Rooms.insert(room);
            return {
                id: roomId,
                success: true,
            };
        }
    }
}
