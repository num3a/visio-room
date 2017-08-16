import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Rooms } from '../rooms/rooms';

class BookingsCollection extends Mongo.Collection {
  insert(list, callback) {
    return super.insert(list, callback);
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

export const Bookings = new BookingsCollection('Bookings');

// Deny all client-side updates since we will be using methods to manage this collection
Bookings.deny({
  insert() { return false; },
  update() { return false; },
  remove() { return false; },
});

Bookings.schema = new SimpleSchema({
  roomId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
  bookedBy: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  voucherUsed: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  isBooked: { type: Boolean, optional: false },
  isBlocked: { type: Boolean, optional: false },
  bookingDate: { type: Date, optional: true },
  bookedAt: { type: Date, optional: true },
  attendeeCount: { type: Number, optional: true },
  createdAt: { type: Date, optional: false },
  price: { type: Number, optional: false },
  capacity: { type: Number, optional: false },
  room: { type: Rooms.schema, optional: true },
}, { tracker: Tracker });

Bookings.attachSchema(Bookings.schema);

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


Bookings.helpers({
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
