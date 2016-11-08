import * as types from './actionTypes';

const openLoginModal = (isOpen) => {
    return {
        type: types.APPBAR_OPEN_LOGIN_MODAL,
        openLoginModal: isOpen
    };
};

export {
    openLoginModal,
};