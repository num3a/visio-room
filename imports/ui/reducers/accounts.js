import * as types from '../actions/actionTypes';

const initialState = {
  openForgotPasswordModal: false,
};

const accountsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ACCOUNTS_OPEN_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        openForgotPasswordModal: action.openForgotPasswordModal,
      };
    case types.ACCOUNTS_CLOSE_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        openForgotPasswordModal: action.openForgotPasswordModal,
      };
    default:
      return state;
  }
};

export default accountsReducer;
