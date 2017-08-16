import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class PartnersCollection extends Mongo.Collection {
  insert(list, callback) {
    return super.insert(list, callback);
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

export const Partners = new PartnersCollection('Partners');

// Deny all client-side updates since we will be using methods to manage this collection
Partners.deny({
  insert() { return false; },
  update() { return false; },
  remove() { return false; },
});

Partners.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  name: { type: String },
  address: { type: String },
  email: { type: String, regEx: SimpleSchema.RegEx.Email },
  phoneNumber: { type: String },
}, { tracker: Tracker });

Partners.attachSchema(Partners.schema);


Partners.helpers({
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

