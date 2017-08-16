import * as types from '../actions/actionTypes';

const initialSate = {
  openSnackBar: false,
  errorMessage: '',
};

const snackBarReducer = (state = initialSate, action = {}) => {
  switch (action.type) {
    case types.SNACKBAR_ERROR_MESSAGE_CHANGED:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case types.SNACKBAR_ERROR_OPEN:
      return {
        ...state,
        openSnackBar: true,
      };
    case types.SNACKBAR_ERROR_CLOSE:
      return {
        ...state,
        openSnackBar: false,
      };
    default:
      return state;
  }
};

export default snackBarReducer;
