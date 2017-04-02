import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class VoucherCollection extends Mongo.Collection {
    insert(list, callback) {
        return super.insert(list, callback);
    }
    remove(selector, callback) {
        return super.remove(selector, callback);
    }
}

export const Voucher = new VoucherCollection('Voucher');

// Deny all client-side updates since we will be using methods to manage this collection
Voucher.deny({
    insert() { return false; },
    update() { return false; },
    remove() { return false; },
});

Voucher.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id, optional: false },
    isValid: { type: Boolean},
    code: {type: String},
    percentage: { type: Number },
    createdAt: { type: Date, defaultValue: new Date(), optional: false},
    usedAt: { type: Date, optional: true },
    usedBy: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
    usedFor: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
},{tracker: Tracker });

Voucher.attachSchema(Voucher.schema);

Voucher.publicFields = {
    name: 1,
    incompleteCount: 1,
    userId: 1,
};


Voucher.helpers({
});