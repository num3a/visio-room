import _ from 'lodash';

const getFirstEmail = (user)  => {
    if(user.emails){
        return _.head(user.emails);
    }
   return user.profile.emailAddress;
};

export {
    getFirstEmail
};