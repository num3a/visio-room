import * as types from '../actions/actionTypes';

const initialSate = {
    roomId: '',
    bookingId: '',
    openBookingModal: false,

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
        default:
            return state;
    }
};

export default roomReducer;