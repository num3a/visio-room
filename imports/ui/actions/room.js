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

const selectedBookingChanged = (bookingId) => {
    return {
        type: types.ROOM_SELECTED_BOOKING_CHANGED,
        bookingId:bookingId,
    };
};

export {
    selectedRoomChanged,
    openBookingModal,
    closeBookingModal,
    selectedBookingChanged,
}