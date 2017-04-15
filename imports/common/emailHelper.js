import _ from 'lodash';

const getFirstEmail = (user)  => {
  if(user.emails){
    return _.head(user.emails).address;
  }
  return user.profile.emailAddress;
};

export {
  getFirstEmail
};