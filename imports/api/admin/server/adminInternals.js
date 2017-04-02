import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Bookings } from '../../bookings/bookings';
import { Rooms } from '../../rooms/rooms';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

export default class AdminInternals {
    constructor(){

    }

    toggleBooking(toggleBooking){

        new SimpleSchema({
            bookingId: { type: String, regEx: SimpleSchema.RegEx.Id },
            isBlocked: { type: Boolean}
        }).validate(toggleBooking);

        let successful = false;

        this.checkUser();

        let booking = this.getBooking(toggleBooking.bookingId);
        let room = this.getRoom(booking.roomId);
        let {  emailAddress }  = Meteor.user().profile;

        let admin = room.administrator.indexOf(emailAddress);

        if(admin === -1){
            throw new Meteor.Error('Current user is not admin of the selected room');
        }
        if(booking.isBooked){
            throw new Meteor.Error('Rooms has already been booked');
        }

        this.updateBooking(toggleBooking.bookingId, toggleBooking.isBlocked);

        successful = true;
        return {
            successful: successful,
            blocked: toggleBooking.isBlocked
        }
    }

    checkUser(){
        let isAdmin = Roles.userIsInRole(Meteor.userId(),'admin');
        if(isAdmin === false){
            throw new Meteor.Error('User is not admin');
        }

        if(!Meteor.userId()){
            throw new Meteor.Error('User is not authenticated');
        }
    }

    getRoom(roomId){
        let room = Rooms.findOne({ _id: roomId});
        //TODO: check data
        if(room == null){
            throw new Meteor.Error('No bookings available for booking id: ' + roomId);
        }

        return room;
    }

    getBooking(bookingId){
        let booking = Bookings.findOne({ _id: bookingId});
        //TODO: check data
        if(booking == null){
            throw new Meteor.Error('No bookings available for booking id: ' + bookingId);
        }

        return booking;
    }

    updateBooking(bookingId, isBlocked){
        let updateBookingQuery = {
            $set: {
                isBlocked: isBlocked,
            }
        };

        Bookings.update({_id: bookingId}, updateBookingQuery, (error, result) => {
            if(error){
                throw new Meteor.Error('An error occured when updating booking');
            }
            console.log('result', result);
        });
    }

}
