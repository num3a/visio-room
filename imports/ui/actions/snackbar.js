import * as types from './actionTypes';

const snackBarOpen = () => ({
  type: types.SNACKBAR_ERROR_OPEN,
});

const snackBarClose = () => ({
  type: types.SNACKBAR_ERROR_CLOSE,
});

const snackBarMessageChanged = message => ({
  type: types.SNACKBAR_ERROR_MESSAGE_CHANGED,
  errorMessage: message,
});

export {
  snackBarOpen,
  snackBarClose,
  snackBarMessageChanged,
};
