import * as types from './actionTypes';

const openForgotPasswordModal = () => ({
  type: types.ACCOUNTS_OPEN_FORGOT_PASSWORD_MODAL,
  openForgotPasswordModal: true,
});

const closeForgotPasswordModal = () => ({
  type: types.ACCOUNTS_CLOSE_FORGOT_PASSWORD_MODAL,
  openForgotPasswordModal: false,
});

export {
  openForgotPasswordModal,
  closeForgotPasswordModal,
};
