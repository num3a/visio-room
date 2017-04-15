import * as types from './actionTypes';

const selectedRoomChanged = (roomId) => {
  return {
    type: types.ADMIN_ROOM_SELECTED_CHANGED,
    roomId: roomId
  };
};

export {
  selectedRoomChanged,
}