import * as types from '../actions/actionTypes';

const initialSate = {
    roomId: '',
    bookingId: '',
    openBookingModal: false,
    voucher: null,
    voucherIsValid: false,
    cguAccepted: false,
    selectedCard: null,
};

//TODO: expose method to reset state on route leave

const roomReducer = (state = initialSate, action = {}) => {
    switch (action.type){
        case types.BOOKING_OPEN_BOOKING_MODAL:
            return {
                ...state,
                openBookingModal: action.openBookingModal,
            };
        case types.BOOKING_SELECTED_BOOKING_CHANGED:
            return {
                ...state,
                bookingId: action.bookingId
            };
        case types.BOOKING_SELECTED_VOUCHER_CHANGED:
            return {
                ...state,
                voucher: action.voucher,
            };
        case types.BOOKING_VOUCHER_IS_VALID:
            return {
                ...state,
                voucherIsValid: action.isValid,
            };
        case types.BOOKING_CGU_ACCEPTED:
            return {
                ...state,
                cguAccepted: action.accepted,
            };
        case types.BOOKING_SELECTED_CARD_CHANGED:
            return {
                ...state,
                selectedCard: action.card,
            };

        default:
            return state;
    }
};

export default roomReducer;