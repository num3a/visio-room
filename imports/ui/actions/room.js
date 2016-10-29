import * as types from './actionTypes';

const selectedRoomChanged = (roomId) => {
    return {
        type: types.SELECTED_ROOM_CHANGED,
        roomId: roomId
    };
};

export {
    selectedRoomChanged,
}