import * as types from '../actions/actionTypes';

const initialSate = {
  roomId: '',
};

const adminReducer = (state = initialSate, action = {}) => {
  switch (action.type) {
    case types.ADMIN_ROOM_SELECTED_CHANGED:
      return {
        ...state,
        roomId: action.roomId,
      };
    default:
      return state;
  }
};

export default adminReducer;
