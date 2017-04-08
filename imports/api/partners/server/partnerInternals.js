import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Partners } from '../partners';
import { Roles } from 'meteor/alanning:roles';

export default class PartnerInternals {
    constructor(){

    }

    createOrUpdate(partner) {
        let isAdmin = Roles.userIsInRole(Meteor.userId(),'admin');

        if(!isAdmin){
            throw new Meteor.Error('User is not admin');
        }

        let schema = Partners.schema;
        schema.validate(partner);

        if(partner._id !== '' && partner._id !== null && partner._id !== undefined){
            let updatePartnerQuery = {
                $set: {
                    ...partner,
                }
            };

           Partners.update({ _id: partner._id}, updatePartnerQuery);
            return {
                id: partner._id,
                success: true
            };
        }
        else {
            let partnerId = Partners.insert(partner);

            return {
                id: partnerId,
                success: true
            };
        }
    }
}
