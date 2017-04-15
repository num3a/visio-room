import * as types from './actionTypes';

const snackBarOpen = () => {
  return {
    type: types.SNACKBAR_ERROR_OPEN,
  };
};

const snackBarClose = () => {
  return {
    type: types.SNACKBAR_ERROR_CLOSE,
  };
};

const snackBarMessageChanged = (message) => {
  return {
    type: types.SNACKBAR_ERROR_MESSAGE_CHANGED,
    errorMessage: message,
  };
};

export {
  snackBarOpen,
  snackBarClose,
  snackBarMessageChanged
}