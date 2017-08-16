import * as types from './actionTypes';

const messageChanged = message => ({
  type: types.MESSAGE_CHANGED,
  message,
});

export {
  messageChanged,
};
