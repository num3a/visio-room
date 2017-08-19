import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Partners } from '../partners-collection';

export default class PartnerInternals {
  createOrUpdate(partner) {
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');

    if (!isAdmin) {
      throw new Meteor.Error('User is not admin');
    }

    const schema = Partners.schema;
    schema.validate(partner);

    if (partner._id !== '' && partner._id !== null && partner._id !== undefined) {
      const updatePartnerQuery = {
        $set: {
          ...partner,
        },
      };

      Partners.update({ _id: partner._id }, updatePartnerQuery);
      return {
        id: partner._id,
        success: true,
      };
    }

    const partnerId = Partners.insert(partner);

    return {
      id: partnerId,
      success: true,
    };
  }
}
