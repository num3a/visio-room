import * as types from './actionTypes';

const openAddCardModal = () => {
    return {
        type: types.PAYMENTS_OPEN_ADD_CARD_MODAL,
        openAddPaymentModal: true
    };
};

const closeAddCardModal = () => {
    return {
        type: types.PAYMENTS_CLOSE_ADD_CARD_MODAL,
        openAddPaymentModal: false
    };
};

export {
    openAddCardModal,
    closeAddCardModal,
};