import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { LocationSchema } from '../common/schema/location';

class RoomsCollection extends Mongo.Collection {
    insert(list, callback) {
        return super.insert(list, callback);
    }
    remove(selector, callback) {
        return super.remove(selector, callback);
    }
}

export const Rooms = new RoomsCollection('Rooms');

// Deny all client-side updates since we will be using methods to manage this collection
Rooms.deny({
    insert() { return false; },
    update() { return false; },
    remove() { return false; },
});

Rooms.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    pricePerDay: { type: Number},
    name: { type: String },
    address: { type: String },
    location: { type: Array, optional: true },
    'location.$' : { type: Number },
    capacity: { type: Number },
    description: { type: String },
    createdAt: { type: Date, defaultValue: new Date(), optional: false},
    contactEmail: { type: String,regEx: SimpleSchema.RegEx.Email, optional: false},
    administrator: { type: Array },
    'administrator.$': { type: String }
    //TODO: add phone number, equipments, access details
},{tracker: Tracker });

Rooms.attachSchema(Rooms.schema);

if(Meteor.isServer){
    Rooms._ensureIndex({ "location": "2dsphere"});
}

// This represents the keys from YachtieProfiles objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Rooms.publicFields = {
    name: 1,
    incompleteCount: 1,
    userId: 1,
};


Rooms.helpers({
    // A list is considered to be private if it has a userId set
    /*  isPrivate() {
     return !!this.userId;
     },
     isLastPublicList() {
     const publicListCount = YachtieProfiles.find({ userId: { $exists: false } }).count();
     return !this.isPrivate() && publicListCount === 1;
     },
     editableBy(userId) {
     if (!this.userId) {
     return true;
     }

     return this.userId === userId;
     },
     */
});