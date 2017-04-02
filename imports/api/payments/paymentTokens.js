import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { LocationSchema } from '../common/schema/location';

class PaymentTokensCollection extends Mongo.Collection {
    insert(list, callback) {
        return super.insert(list, callback);
    }
    remove(selector, callback) {
        return super.remove(selector, callback);
    }
}

export const PaymentTokens = new PaymentTokensCollection('PaymentTokens');

// Deny all client-side updates since we will be using methods to manage this collection
PaymentTokens.deny({
    insert() { return false; },
    update() { return false; },
    remove() { return false; },
});

const CardSchema  = new SimpleSchema({
    id: { type: String},
    expMonth: { type: Number},
    expYear: { type: Number},
    last4: { type: String},
    brand: { type: String},
});

PaymentTokens.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
    userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
    token: { type: String},
    type: { type: String },
    clientIp: { type: String },
    created: { type: Number},
    card: { type: CardSchema },
    customerId: { type: String },
    expired: { type: Boolean }
},{tracker: Tracker });

PaymentTokens.attachSchema(PaymentTokens.schema);

// This represents the keys from YachtieProfiles objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
PaymentTokens.publicFields = {
    name: 1,
    incompleteCount: 1,
    userId: 1,
};


PaymentTokens.helpers({
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