import * as types from './actionTypes';

const openLoginModal = () => {
    return {
        type: types.APPBAR_OPEN_LOGIN_MODAL,
        openLoginModal: true
    };
};

const closeLoginModal = () => {
    return {
        type: types.APPBAR_OPEN_LOGIN_MODAL,
        openLoginModal: false
    };
};

export {
    openLoginModal,
    closeLoginModal,
};