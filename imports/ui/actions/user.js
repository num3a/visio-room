import * as types from './actionTypes';

const usernameChanged = username => ({
  type: types.USER_NAME_CHANGED,
  username,
});

export {
  usernameChanged,
};
