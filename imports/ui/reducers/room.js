import * as types from '../actions/actionTypes';

const initialSate = {
    roomId: '',
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
        default:
            return state;
    }
};

export default roomReducer;