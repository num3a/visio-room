import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ProfileCollection extends Mongo.Collection {
    insert(list, callback) {
        return super.insert(list, callback);
    }
    remove(selector, callback) {
        return super.remove(selector, callback);
    }
}

export const Profiles = new ProfileCollection('Rooms');

// Deny all client-side updates since we will be using methods to manage this collection
Profiles.deny({
    insert() { return false; },
    update() { return false; },
    remove() { return false; },
});

Profiles.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
    userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
    stripeCustomerId: { type: String, optional: true},
    firstName: { type: String, optional: false },
    lastName: { type: String, optional: false},
    phoneNumber: { type: String, regEx: SimpleSchema.RegEx.Phone, optional: true}
});

Profiles.attachSchema(Profiles.schema);

// This represents the keys from YachtieProfiles objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Profiles.publicFields = {
    name: 1,
    incompleteCount: 1,
    userId: 1,
};


Profiles.helpers({
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