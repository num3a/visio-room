import * as types from './actionTypes';

const openLoginModal = () => ({
  type: types.APPBAR_OPEN_LOGIN_MODAL,
  openLoginModal: true,
});

const closeLoginModal = () => ({
  type: types.APPBAR_OPEN_LOGIN_MODAL,
  openLoginModal: false,
});

export {
  openLoginModal,
  closeLoginModal,
};
