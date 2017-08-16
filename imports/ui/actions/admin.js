import * as types from './actionTypes';

const selectedRoomChanged = roomId => ({
  type: types.ADMIN_ROOM_SELECTED_CHANGED,
  roomId,
});

export {
  selectedRoomChanged,
};
