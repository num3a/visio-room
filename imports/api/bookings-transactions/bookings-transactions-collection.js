import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { Rooms } from '../rooms/rooms-collection';
import { Bookings } from '../bookings/bookings-collection';

class BookingsTransactionsCollection extends Mongo.Collection {
  insert(list, callback) {
    return super.insert(list, callback);
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

export const BookingsTransactions = new BookingsTransactionsCollection('BookingsTransactions');

// Deny all client-side updates since we will be using methods to manage this collection
BookingsTransactions.deny({
  insert() { return false; },
  update() { return false; },
  remove() { return false; },
});

BookingsTransactions.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  roomId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
  bookedBy: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  voucherUsed: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
  room: { type: Rooms.schema, optional: true },
    amount: { type: Number },
  bookings: { type: Array, optional: true },
  'bookings.$': { type: Bookings.schema },
}, { tracker: Tracker });

BookingsTransactions.attachSchema(BookingsTransactions.schema);

// This represents the keys from YachtieProfiles objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
/*
 Bookings.publicFields = {
 name: 1,
 incompleteCount: 1,
 userId: 1,
 };

 */


BookingsTransactions.helpers({
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
