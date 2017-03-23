import * as types from './actionTypes';

const openAddCardModal = () => {
    return {
        type: types.PAYMENTS_OPEN_ADD_CARD_MODAL,
        openAddPaymentModal: true
    };
};

const loadingAddCard  = (loadingAddCard) => {
    return {
        type: types.PAYMENTS_LOADING_ADD_CARD,
        loadingAddCard: loadingAddCard,
    }
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
    loadingAddCard,
};