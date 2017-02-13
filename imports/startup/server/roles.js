import { Roles } from 'meteor/alanning:roles';
//aidjZcsH7KYbWxTX3

Meteor.startup(() => {
    Roles.addUsersToRoles( '27jM4cW3nn8ZZEBbh', 'super-admin', Roles.GLOBAL_GROUP );
    Roles.addUsersToRoles('27jM4cW3nn8ZZEBbh', 'admin' , Roles.GLOBAL_GROUP);
});