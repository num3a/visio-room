const isLogged = () => {
  if (Meteor.user()) {
    return true;
  }
  return false;
};

export {
  isLogged,
};
