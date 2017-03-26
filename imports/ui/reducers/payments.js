import * as types from '../actions/actionTypes';

const initialState = {
    openAddPaymentModal: false,
    loadingAddCard: false,
};

const payments = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.PAYMENTS_OPEN_ADD_CARD_MODAL:
            return {
                ...state,
                openAddPaymentModal: action.openAddPaymentModal
            };
        case types.PAYMENTS_LOADING_ADD_CARD:
            return {
                ...state,
                loadingAddCard: action.loadingAddCard,
            };
        case types.PAYMENTS_CLOSE_ADD_CARD_MODAL:
            return {
                ...state,
                openAddPaymentModal: action.openAddPaymentModal,
            };
        default:
            return state;
    }
};

export default payments;
