import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Partners } from '../partners';
import { Roles } from 'meteor/alanning:roles';

export default class PartnerInternals {
    constructor(){

    }

    callback(err, result){

    }

    createOrUpdate(partner) {
        let isAdmin = Roles.userIsInRole(Meteor.userId(),'admin');

        if(!isAdmin){
            throw new Meteor.Error('User is not admin');
        }

        let schema = Partners.schema;
        schema.validate(partner);
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
        if(partner._id){
            let updatePartnerQuery = {
                ...partner,
            };
            Partners.update({ _id: partner._id}, updatePartnerQuery);
        }
        else {
            Partners.insert(partner);
        }
    }
}
