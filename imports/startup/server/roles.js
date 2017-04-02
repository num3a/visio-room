import { Roles } from 'meteor/alanning:roles';
//aidjZcsH7KYbWxTX3

Meteor.startup(() => {
    Roles.addUsersToRoles( '72bxFC36Ro7nn4xM8', 'super-admin', Roles.GLOBAL_GROUP );
    Roles.addUsersToRoles('72bxFC36Ro7nn4xM8', 'admin' , Roles.GLOBAL_GROUP);
});