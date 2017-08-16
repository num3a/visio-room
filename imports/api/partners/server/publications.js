import { Meteor } from 'meteor/meteor';
import { Partners } from '../partners';
import SimpleSchema from 'simpl-schema';

Meteor.publish('partners.getIdWithName', () => Partners.find({}, { fields: { _id: 1, name: 1 } }));

Meteor.publish('partners.byId', (partnerId) => {
  new SimpleSchema({
    partnerId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  }).validate({ partnerId });

  return Partners.find({ _id: partnerId });
});
