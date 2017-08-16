import { Meteor } from 'meteor/meteor';
import PartnerInternals from './server/partner-internals';

const partnerInternals = new PartnerInternals();

Meteor.methods({
  'partners.createOrUpdate'(partner) {
    return partnerInternals.createOrUpdate(partner);
  },
});
