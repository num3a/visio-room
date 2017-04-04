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
        /**
         *
         *  let updateBookingQuery = {
            $set: {
                isBooked: true,
                bookedAt: moment().toDate(),
                bookedBy: Meteor.userId(),
                voucherUsed: voucherId,
                //TODO: add price payed
            }
        };

         Bookings.update({_id: bookingId}, updateBookingQuery, (error, result) => {
            if(error){
                throw new Meteor.Error('An error occured when updating booking');
            }
            console.log('result', result);
        });

         * */
        if(room._id){
            let updateRoomQuery = {
                ...room,
            };
            Rooms.update({ _id: room._id}, updateRoomQuery);
        }
        else {
            Rooms.insert(room);
        }
    }
}
