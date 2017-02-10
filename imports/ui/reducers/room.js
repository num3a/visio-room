import * as types from '../actions/actionTypes';

const initialSate = {
    roomId: '',
    bookingId: '',
    openBookingModal: false,
    voucher: '',
    voucherIsValid: false,
    cguAccepted: false,
};

const roomReducer = (state = initialSate, action = {}) => {
    switch (action.type){
        case types.SELECTED_ROOM_CHANGED:
            return {
                ...state,
                roomId: action.roomId,
            };
        case types.ROOM_OPEN_BOOKING_MODAL:
            return {
                ...state,
                openBookingModal: action.openBookingModal,
            };
        case types.ROOM_SELECTED_BOOKING_CHANGED:
            return {
                ...state,
                bookingId: action.bookingId
            };
        case types.ROOM_SELECTED_VOUCHER_CHANGED:
            return {
                ...state,
                voucher: action.voucher,
            };
        case types.ROOM_VOUCHER_IS_VALID:
            return {
                ...state,
                voucherIsValid: action.isValid,
            };
        case types.ROOM_CGU_ACCEPTED:
            return {
                ...state,
                cguAccepted: action.accepted,
            };
        default:
            return state;
    }
};

export default roomReducer;