import * as types from './actionTypes';

const selectedRoomChanged = (roomId) => {
    return {
        type: types.SELECTED_ROOM_CHANGED,
        roomId: roomId
    };
};

const openBookingModal = () => {
    return {
        type: types.ROOM_OPEN_BOOKING_MODAL,
        openBookingModal: true
    };
};

const closeBookingModal = () => {
    return {
        type: types.ROOM_OPEN_BOOKING_MODAL,
        openBookingModal: false
    };
};

export {
    selectedRoomChanged,
    openBookingModal,
    closeBookingModal,
}