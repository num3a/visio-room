import { Meteor } from 'meteor/meteor';
import { Partners } from '../partners';

Meteor.publish('partners.getIdWithName', () => {
    return Partners.find({},{ fields: {_id: 1, name: 1}});
});