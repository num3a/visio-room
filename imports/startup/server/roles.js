import { Roles } from 'meteor/alanning:roles';
//aidjZcsH7KYbWxTX3

Meteor.startup(() => {
  Roles.addUsersToRoles('9XjE3CGMch8NPvJYY', 'super-admin', Roles.GLOBAL_GROUP);
  Roles.addUsersToRoles('9XjE3CGMch8NPvJYY', 'admin' , Roles.GLOBAL_GROUP);

  Roles.addUsersToRoles('wurM8DD5q2Cm6N8TC', 'super-admin', Roles.GLOBAL_GROUP);
  Roles.addUsersToRoles('wurM8DD5q2Cm6N8TC', 'admin' , Roles.GLOBAL_GROUP);
});