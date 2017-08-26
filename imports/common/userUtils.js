import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const checkByUserId = (userId) => {
  new SimpleSchema({
    userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  })
  .validate({ userId });

  const currentUserId = Meteor.userId();
  if (!currentUserId) {
    throw new Meteor.Error('User is not authenticated');
  }

  if (userId !== currentUserId) {
    throw new Meteor.Error('Connected user does not match sended data.');
  }
};

export {
  checkByUserId,
};
